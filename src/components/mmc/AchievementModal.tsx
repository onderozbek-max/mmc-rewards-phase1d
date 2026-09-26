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
 * The Phase 1D milestone achievement moment — ONE coherent completion-to-
 * achievement experience, not a separate modal bolted onto the ordinary 1C
 * sheet (spec §7). It carries the full causal hierarchy in one dialog
 * (spec §8):
 *   ACTIVITY RESULT  → "+30 points"
 *   RESULTING TOTAL  → "260 lifetime points"
 *   MILESTONE        → "250-point milestone reached"
 *   VALUE            → "What's New + Member Favorites unlocked"
 *   ACTION           → "Explore your benefits"
 * Deliberately more emphatic than the ordinary completion sheet (centered
 * Modal vs. a bottom sheet) — that contrast IS the "meaningfully different"
 * signal — but recognition stays restrained: one subtle check-mark glyph,
 * concise copy, no confetti/trophies/tier language.
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
          Explore your benefits
        </Button>
      }
    >
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Caption color="subtle" as="p" UNSAFE_style={{ marginBottom: 4 }}>{achievement.activityTitle}</Caption>
        <Heading as="div" size="medium" UNSAFE_style={{ marginBottom: 2 }}>+{achievement.pointsEarned} points</Heading>
        <Body size="medium" as="p" color="subtle">{achievement.totalAfter} lifetime points</Body>
      </div>

      <div style={{ margin: '20px 0' }}><Divider /></div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
        <Icon name="CheckCircleFill" decorative size="large" style={{ color: 'var(--ld-semantic-color-progress-fill-positive, #2a8703)' }} />
        <Caption color="subtle" weight="alt">{achievement.milestone}-point milestone reached</Caption>
        <Heading as="h2" size="medium">{achievement.benefitLabel} unlocked</Heading>
        <Body size="medium" as="p" color="subtle">
          Your Community contribution unlocked these benefits — explore them now.
        </Body>
      </div>
    </Modal>
  );
}
