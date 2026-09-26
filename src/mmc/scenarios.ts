import { MMCState, WaysToProgressCompletion } from './types';
import { historicalPrefixSummingTo } from './data';

export type ScenarioId = 'primary-240' | 'ordinary-180' | 'exact-220' | 'unlocked-270';

export interface ScenarioDef {
  id: ScenarioId;
  label: string;
  description: string;
  build: () => MMCState;
}

const MEMBER_NAME = 'Onder';
const MEMBER_SINCE = 'June 2026';
const TODAY_LABEL = 'September 25, 2026';

function baseState(historicalTarget: 180 | 220 | 240, extra: {
  waysToProgressCompletions?: WaysToProgressCompletion[];
  benefitsUnlocked?: string[];
  milestonesReached?: number[];
  achievementRecognitionShown?: boolean;
} = {}): MMCState {
  return {
    memberName: MEMBER_NAME,
    memberSinceLabel: MEMBER_SINCE,
    historicalLog: historicalPrefixSummingTo(historicalTarget),
    waysToProgressCompletions: extra.waysToProgressCompletions ?? [],
    benefitsUnlocked: extra.benefitsUnlocked ?? [],
    milestonesReached: extra.milestonesReached ?? [],
    achievementRecognitionShown: extra.achievementRecognitionShown ?? false,
    benefitFulfillmentStatus: 'available',
  };
}

export const SCENARIOS: ScenarioDef[] = [
  {
    id: 'primary-240',
    label: 'Primary demo — 240 → milestone crossing',
    description: '240 lifetime points, 10 points from the first benefit. Complete the 30-point activity to cross 250.',
    build: () => baseState(240),
  },
  {
    id: 'ordinary-180',
    label: 'Ordinary progress — 180 → 210',
    description: 'Shows a normal 1C completion with no milestone in reach.',
    build: () => baseState(180),
  },
  {
    id: 'exact-220',
    label: 'Exact crossing — 220 → 250',
    description: 'Verifies the milestone triggers exactly at 250, not only past it.',
    build: () => baseState(220),
  },
  {
    id: 'unlocked-270',
    label: 'Already unlocked — 270 (post-achievement)',
    description: 'Boots with the 250 benefit already unlocked and recognition already shown, to verify no replay.',
    build: () =>
      baseState(240, {
        waysToProgressCompletions: [{ activityId: 'shape-products', dateLabel: TODAY_LABEL }],
        benefitsUnlocked: ['250'],
        milestonesReached: [250],
        achievementRecognitionShown: true,
      }),
  },
];

export const DEFAULT_SCENARIO: ScenarioId = 'primary-240';
export const TODAYS_DATE_LABEL = TODAY_LABEL;

export function buildScenario(id: ScenarioId): MMCState {
  const scenario = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
  return scenario.build();
}
