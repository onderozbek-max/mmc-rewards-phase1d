import { MMCState, WaysToProgressCompletion } from './types';
import { historicalPrefixSummingTo } from './data';

export type ScenarioId = 'primary-180' | 'ordinary-90' | 'exact-220' | 'unlocked-260';

export interface ScenarioDef {
  id: ScenarioId;
  label: string;
  description: string;
  build: () => MMCState;
}

const MEMBER_NAME = 'Onder';
const MEMBER_SINCE = 'June 2026';
const TODAY_LABEL = 'September 25, 2026';

function baseState(historicalTarget: 90 | 180 | 220 | 240, extra: {
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
    id: 'primary-180',
    label: 'Primary demo — 180 → natural milestone journey',
    description: '180 lifetime points. Complete the three Ways to make progress activities (+30, +20, +30) through normal tapping to naturally cross 250 — no developer tool required.',
    build: () => baseState(180),
  },
  {
    id: 'ordinary-90',
    label: 'Ordinary progress — 90 → 120',
    description: 'Shows a normal 1C completion with no milestone in reach.',
    build: () => baseState(90),
  },
  {
    id: 'exact-220',
    label: 'Exact crossing — 220 → 250',
    description: 'Verifies the milestone triggers exactly at 250, not only past it.',
    build: () => baseState(220),
  },
  {
    id: 'unlocked-260',
    label: 'Already unlocked — 260 (post-achievement)',
    description: 'Boots with the 250 benefit already unlocked, recognition already shown, and the journey activities completed — verifies no replay and lets you test ordinary post-unlock earning.',
    build: () =>
      baseState(180, {
        waysToProgressCompletions: [
          { activityId: 'shape-products', dateLabel: TODAY_LABEL },
          { activityId: 'tell-us', dateLabel: TODAY_LABEL },
          { activityId: 'household-favorites', dateLabel: TODAY_LABEL },
        ],
        benefitsUnlocked: ['250'],
        milestonesReached: [250],
        achievementRecognitionShown: true,
      }),
  },
];

export const DEFAULT_SCENARIO: ScenarioId = 'primary-180';
export const TODAYS_DATE_LABEL = TODAY_LABEL;

export function buildScenario(id: ScenarioId): MMCState {
  const scenario = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
  return scenario.build();
}
