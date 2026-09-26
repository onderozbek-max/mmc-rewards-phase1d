// Phase 1D — MMC Community Pass state model types.
// Single source of truth: lifetime points are DERIVED from completed activity
// logs (historical seed log + the three "Ways to make progress" activities),
// never hand-set — this keeps Home / Community Pass / Profile mathematically
// consistent by construction (see AGENTS notes in useMMCStore.ts).

export interface ActivityDef {
  id: string;
  title: string;
  description: string;
  points: number;
  endDateLabel: string;
}

export interface HistoricalCompletion {
  id: string;
  title: string;
  points: number;
  dateLabel: string;
}

export interface WaysToProgressCompletion {
  activityId: string;
  dateLabel: string;
}

/** First-class benefit milestones for the broader (multi-phase) Community Pass journey. */
export interface MilestoneDef {
  points: number;
  benefitId: string | null; // null = future milestone, not yet operationally defined
  benefitLabel: string;
  operational: boolean; // true only for the 250 milestone in this vertical slice
}

export type BenefitFulfillmentStatus = 'available' | 'pending' | 'failed';

/** One concrete item inside an unlocked benefit module (What's New / Member Favorites). */
export interface BenefitContentItem {
  title: string;
  description: string;
}

export interface MMCState {
  memberName: string;
  memberSinceLabel: string;
  historicalLog: HistoricalCompletion[];
  waysToProgressCompletions: WaysToProgressCompletion[];
  benefitsUnlocked: string[]; // e.g. ['250']
  milestonesReached: number[]; // e.g. [250]
  achievementRecognitionShown: boolean;
  /** Prototype-only hook for a future pending/failed fulfillment demo. Not exposed in UI. */
  benefitFulfillmentStatus: BenefitFulfillmentStatus;
}

export interface PendingAchievement {
  milestone: number;
  pointsEarned: number;
  totalAfter: number;
  activityTitle: string;
  benefitLabel: string;
}

export interface PendingOrdinary {
  pointsEarned: number;
  totalAfter: number;
  activityTitle: string;
}

export type Route = 'home' | 'profile' | 'community-pass';
