import * as React from 'react';
import { MMCState, PendingAchievement, PendingOrdinary } from './types';
import { findActivity, FIRST_MILESTONE_POINTS, FIRST_BENEFIT_LABEL } from './data';
import { buildScenario, DEFAULT_SCENARIO, ScenarioId, TODAYS_DATE_LABEL } from './scenarios';

// ───────────────────────────────────────────────────────────────────────────
// Phase 1D state model.
//
// `lifetimePoints` is NEVER stored directly — it is always derived from the
// historical log + completed "ways to make progress" activities. This is
// what guarantees Home / Community Pass / Profile can never drift out of
// sync with each other (Phase 1D spec §29, §2 advisor note).
//
// `pendingAchievement` / `pendingOrdinary` are transient, in-memory-only
// state (never persisted). That is what prevents the achievement moment
// from replaying on refresh/navigation (spec §17, §18): a refresh reloads
// the persisted `benefitsUnlocked` / `achievementRecognitionShown` flags,
// but pendingAchievement is always null on load, so the modal never
// re-fires just because the member returned to the app.
// ───────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'mmc-phase1d-state-v1';
const SCENARIO_KEY = 'mmc-phase1d-scenario-v1';

interface StoredShape {
  scenarioId: ScenarioId;
  state: MMCState;
}

function loadInitial(): StoredShape {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredShape;
      if (parsed && parsed.state && Array.isArray(parsed.state.historicalLog)) {
        return parsed;
      }
    }
  } catch {
    // fall through to default
  }
  const scenarioId = DEFAULT_SCENARIO;
  return { scenarioId, state: buildScenario(scenarioId) };
}

function persist(shape: StoredShape) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shape));
    window.localStorage.setItem(SCENARIO_KEY, shape.scenarioId);
  } catch {
    // best-effort only — this is a prototype
  }
}

export function computeLifetimePoints(state: MMCState): number {
  const historical = state.historicalLog.reduce((sum, h) => sum + h.points, 0);
  const fromWays = state.waysToProgressCompletions.reduce((sum, c) => {
    const activity = findActivity(c.activityId);
    return sum + (activity?.points ?? 0);
  }, 0);
  return historical + fromWays;
}

export interface MMCContextValue {
  state: MMCState;
  lifetimePoints: number;
  completedWaysToProgressIds: Set<string>;
  isFirstBenefitUnlocked: boolean;
  pendingAchievement: PendingAchievement | null;
  pendingOrdinary: PendingOrdinary | null;
  completeActivity: (activityId: string) => void;
  dismissAchievement: () => void;
  dismissOrdinary: () => void;
  resetToScenario: (id: ScenarioId) => void;
  currentScenarioId: ScenarioId;
}

const MMCContext = React.createContext<MMCContextValue | null>(null);

export function MMCProvider({ children }: { children: React.ReactNode }) {
  const initial = React.useMemo(loadInitial, []);
  const [state, setState] = React.useState<MMCState>(initial.state);
  const [scenarioId, setScenarioId] = React.useState<ScenarioId>(initial.scenarioId);
  const [pendingAchievement, setPendingAchievement] = React.useState<PendingAchievement | null>(null);
  const [pendingOrdinary, setPendingOrdinary] = React.useState<PendingOrdinary | null>(null);

  const lifetimePoints = computeLifetimePoints(state);
  const completedWaysToProgressIds = React.useMemo(
    () => new Set(state.waysToProgressCompletions.map((c) => c.activityId)),
    [state.waysToProgressCompletions],
  );
  const isFirstBenefitUnlocked = state.benefitsUnlocked.includes('250');

  const completeActivity = React.useCallback(
    (activityId: string) => {
      setState((prev) => {
        if (prev.waysToProgressCompletions.some((c) => c.activityId === activityId)) {
          return prev; // already completed — no-op, no re-trigger
        }
        const activity = findActivity(activityId);
        if (!activity) return prev;

        const beforeTotal = computeLifetimePoints(prev);
        const afterTotal = beforeTotal + activity.points;
        const alreadyUnlocked = prev.benefitsUnlocked.includes('250');
        const crossedFirstMilestone = beforeTotal < FIRST_MILESTONE_POINTS && afterTotal >= FIRST_MILESTONE_POINTS && !alreadyUnlocked;

        const next: MMCState = {
          ...prev,
          waysToProgressCompletions: [
            ...prev.waysToProgressCompletions,
            { activityId, dateLabel: TODAYS_DATE_LABEL },
          ],
          benefitsUnlocked: crossedFirstMilestone ? [...prev.benefitsUnlocked, '250'] : prev.benefitsUnlocked,
          milestonesReached: crossedFirstMilestone ? [...prev.milestonesReached, 250] : prev.milestonesReached,
          achievementRecognitionShown: crossedFirstMilestone ? false : prev.achievementRecognitionShown,
        };

        if (crossedFirstMilestone) {
          setPendingAchievement({
            milestone: FIRST_MILESTONE_POINTS,
            pointsEarned: activity.points,
            totalAfter: afterTotal,
            activityTitle: activity.title,
            benefitLabel: FIRST_BENEFIT_LABEL,
          });
        } else {
          setPendingOrdinary({
            pointsEarned: activity.points,
            totalAfter: afterTotal,
            activityTitle: activity.title,
          });
        }

        persist({ scenarioId, state: next });
        return next;
      });
    },
    [scenarioId],
  );

  const dismissAchievement = React.useCallback(() => {
    setPendingAchievement(null);
    setState((prev) => {
      const next = { ...prev, achievementRecognitionShown: true };
      persist({ scenarioId, state: next });
      return next;
    });
  }, [scenarioId]);

  const dismissOrdinary = React.useCallback(() => {
    setPendingOrdinary(null);
  }, []);

  const resetToScenario = React.useCallback((id: ScenarioId) => {
    const next = buildScenario(id);
    setScenarioId(id);
    setState(next);
    setPendingAchievement(null);
    setPendingOrdinary(null);
    persist({ scenarioId: id, state: next });
  }, []);

  const value: MMCContextValue = {
    state,
    lifetimePoints,
    completedWaysToProgressIds,
    isFirstBenefitUnlocked,
    pendingAchievement,
    pendingOrdinary,
    completeActivity,
    dismissAchievement,
    dismissOrdinary,
    resetToScenario,
    currentScenarioId: scenarioId,
  };

  return React.createElement(MMCContext.Provider, { value }, children);
}

export function useMMC(): MMCContextValue {
  const ctx = React.useContext(MMCContext);
  if (!ctx) throw new Error('useMMC must be used within MMCProvider');
  return ctx;
}
