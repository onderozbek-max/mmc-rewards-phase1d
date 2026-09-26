import { ActivityDef, HistoricalCompletion, MilestoneDef } from './types';

// ─────────────────────────────────────────────────────────────────────────
// The three actionable "Ways to make progress" activities.
// These are the same activities established in the 1C prototype (identical
// title/description/points/end-date language is preserved).
// ─────────────────────────────────────────────────────────────────────────
export const WAYS_TO_PROGRESS: ActivityDef[] = [
  {
    id: 'shape-products',
    title: "See how members help shape products",
    description: 'Follow feedback from idea to club.',
    points: 30,
    endDateLabel: 'Ends November 1, 2026',
  },
  {
    id: 'tell-us',
    title: 'Tell us what you think',
    description: 'Quick feedback on your recent Community experience.',
    points: 10,
    endDateLabel: 'Ends October 15, 2026',
  },
  {
    id: 'todays-visit',
    title: "How was today's visit?",
    description: "Share a quick reaction to today's shopping trip.",
    points: 0,
    endDateLabel: 'Ends today',
  },
];

export function findActivity(id: string): ActivityDef | undefined {
  return WAYS_TO_PROGRESS.find((a) => a.id === id);
}

// ─────────────────────────────────────────────────────────────────────────
// Community Pass benefit architecture. Only 250 is operational in this
// vertical slice — 1,000 / 3,000 exist to represent the broader journey and
// intentionally carry no operational benefit copy (see Phase 1D spec §13).
// ─────────────────────────────────────────────────────────────────────────
export const FIRST_BENEFIT_LABEL = "Early access to select Member's Mark opportunities";

export const MILESTONES: MilestoneDef[] = [
  { points: 250, benefitId: '250', benefitLabel: FIRST_BENEFIT_LABEL, operational: true },
  { points: 1000, benefitId: null, benefitLabel: 'Additional Community benefits', operational: false },
  { points: 3000, benefitId: null, benefitLabel: 'Additional Community benefits', operational: false },
];

export const FIRST_MILESTONE_POINTS = 250;

// ─────────────────────────────────────────────────────────────────────────
// Chronological historical activity pool. Cumulative point totals hit 180,
// 220, and 240 exactly at defined prefix lengths, so each demo scenario's
// historical log + completed "ways to make progress" sum EXACTLY to that
// scenario's target lifetime-point baseline (Profile's displayed total is
// always the true sum of everything in the log — never a hand-set number).
// ─────────────────────────────────────────────────────────────────────────
export const HISTORICAL_POOL: HistoricalCompletion[] = [
  { id: 'h1', title: 'Welcome bonus: joined the Community', points: 20, dateLabel: 'June 14, 2026' },
  { id: 'h2', title: 'Rate your last Sam’s Club visit', points: 10, dateLabel: 'June 28, 2026' },
  { id: 'h3', title: 'Share a photo of your Member’s Mark find', points: 20, dateLabel: 'July 10, 2026' },
  { id: 'h4', title: 'Community check-in: July edition', points: 20, dateLabel: 'July 22, 2026' },
  { id: 'h5', title: 'Tell us about your household', points: 10, dateLabel: 'July 30, 2026' },
  { id: 'h6', title: 'Quick poll: back-to-school shopping', points: 10, dateLabel: 'August 5, 2026' },
  { id: 'h7', title: 'Rate a recent Member’s Mark product', points: 20, dateLabel: 'August 12, 2026' },
  { id: 'h8', title: 'Community check-in: summer edition', points: 20, dateLabel: 'August 21, 2026' },
  { id: 'h9', title: 'Community check-in: Labor Day', points: 10, dateLabel: 'September 1, 2026' },
  { id: 'h10', title: 'Help shape our next Member’s Mark launch', points: 30, dateLabel: 'September 6, 2026' },
  { id: 'h11', title: 'Quick poll: weeknight dinners', points: 10, dateLabel: 'September 12, 2026' }, // cum 180
  { id: 'h12', title: 'Quick poll: weekend shopping habits', points: 10, dateLabel: 'September 19, 2026' }, // cum 190
  { id: 'h13', title: 'Community recipe swap', points: 20, dateLabel: 'September 21, 2026' }, // cum 210
  { id: 'h14', title: 'Rate this week’s Sam’s Club run', points: 10, dateLabel: 'September 23, 2026' }, // cum 220
  { id: 'h15', title: 'Quick poll: home essentials', points: 20, dateLabel: 'September 24, 2026' }, // cum 240
];

export function historicalPrefixSummingTo(target: 180 | 220 | 240): HistoricalCompletion[] {
  const cutoffIndex = { 180: 11, 220: 14, 240: 15 }[target];
  return HISTORICAL_POOL.slice(0, cutoffIndex);
}
