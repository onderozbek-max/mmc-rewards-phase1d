import * as React from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icons';
import { Heading, Body, Caption } from '../../components/Text';
import { Divider } from '../../components/Divider';
import { PendingAchievement } from '../../mmc/types';

interface AchievementModalProps {
  achievement: PendingAchievement | null;
  onViewBenefit: () => void;
}

/**
 * The Phase 1D milestone achievement moment. Deliberately more emphatic than
 * the ordinary completion sheet (centered Modal vs. a bottom sheet) — that
 * contrast IS the "meaningfully different" signal called for in the spec —
 * but recognition stays restrained: one subtle check-mark glyph, concise
 * copy, no confetti/trophies/tier language. It also stays connected to the
 * activity that caused it (the +points / new total recap up top), so this
 * reads as one continuous moment rather than a bolted-on second dialog.
 */
export function AchievementModal({ achievement, onViewBenefit }: AchievementModalProps) {
  if (!achievement) return null;

  return (
    <Modal
      isOpen={!!achievement}
      title="Milestone reached"
      onClose={onViewBenefit}
      size="medium"
      actions={
        <Button variant="primary" isFullWidth onClick={onViewBenefit}>
          View Community Pass
        </Button>
      }
    >
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Caption color="subtle" as="p">
          {achievement.activityTitle} • +{achievement.pointsEarned} points • {achievement.totalAfter} lifetime points
        </Caption>
      </div>

      <div style={{ margin: '20px 0' }}><Divider /></div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
        <Icon name="CheckCircleFill" decorative size="large" style={{ color: 'var(--ld-semantic-color-progress-fill-positive, #2a8703)' }} />
        <Caption color="subtle" weight="alt">{achievement.milestone}-point milestone</Caption>
        <Heading as="h2" size="medium">Benefit unlocked</Heading>
        <Body size="medium" as="p" color="subtle">
          Your participation in the Community unlocked {achievement.benefitLabel.charAt(0).toLowerCase() + achievement.benefitLabel.slice(1)}.
        </Body>
      </div>
    </Modal>
  );
}
