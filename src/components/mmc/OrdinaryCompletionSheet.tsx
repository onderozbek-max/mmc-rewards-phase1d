import * as React from 'react';
import { BottomSheet } from '../../components/BottomSheet';
import { Button } from '../../components/Button';
import { Heading, Body } from '../../components/Text';
import { PendingOrdinary } from '../../mmc/types';
import { FIRST_MILESTONE_POINTS } from '../../mmc/data';

interface OrdinaryCompletionSheetProps {
  completion: PendingOrdinary | null;
  isFirstBenefitUnlocked: boolean;
  onClose: () => void;
}

/**
 * Ordinary (non-milestone) 1C completion feedback. Deliberately lighter
 * weight than AchievementModal — a quick bottom sheet, no unlock language,
 * no milestone graphic — so the contrast between "normal progress" and
 * "milestone achievement" (Phase 1D spec §4/§35) is felt, not just described.
 */
export function OrdinaryCompletionSheet({ completion, isFirstBenefitUnlocked, onClose }: OrdinaryCompletionSheetProps) {
  if (!completion) return null;
  const pointsRemaining = Math.max(FIRST_MILESTONE_POINTS - completion.totalAfter, 0);

  return (
    <BottomSheet
      isOpen={!!completion}
      title="Activity completed"
      onClose={onClose}
      actions={
        <Button variant="primary" isFullWidth onClick={onClose}>
          Done
        </Button>
      }
    >
      <Heading as="div" size="medium" UNSAFE_style={{ marginBottom: 8 }}>
        {completion.pointsEarned > 0 ? `+${completion.pointsEarned} points` : 'Activity completed'}
      </Heading>
      <Body size="medium" as="p" color="subtle">
        {completion.totalAfter} lifetime points
        {!isFirstBenefitUnlocked && ` • ${pointsRemaining} points to your next benefit`}
      </Body>
    </BottomSheet>
  );
}
