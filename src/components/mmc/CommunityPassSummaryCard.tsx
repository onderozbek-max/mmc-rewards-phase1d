import * as React from 'react';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { Tag } from '../../components/Tag';
import { Icon } from '../../components/Icons';
import { Heading, Body, Caption } from '../../components/Text';
import { FIRST_BENEFIT_LABEL, FIRST_MILESTONE_POINTS } from '../../mmc/data';

interface CommunityPassSummaryCardProps {
  lifetimePoints: number;
  isFirstBenefitUnlocked: boolean;
  onNavigate: () => void;
}

/**
 * Home's Community Pass summary card. Has two truthful states:
 *  - Before 250: the established 1B/1C progress-toward-next-benefit view.
 *  - After 250: an unlocked-benefit view. Per Phase 1D spec §25/§26, this
 *    is where the motivational progress bar is intentionally RETIRED — with
 *    no operationally-defined 1,000-point benefit, showing a bar/countdown
 *    toward it would be a promise this prototype cannot fulfill.
 */
export function CommunityPassSummaryCard({ lifetimePoints, isFirstBenefitUnlocked, onNavigate }: CommunityPassSummaryCardProps) {
  const pointsRemaining = Math.max(FIRST_MILESTONE_POINTS - lifetimePoints, 0);

  return (
    <Card>
      <CardContent>
        <Button
          variant="ghost"
          isFullWidth
          onClick={onNavigate}
          trailing={<Icon name="ChevronRight" decorative size="small" />}
          UNSAFE_style={{ justifyContent: 'space-between', padding: 0, marginBottom: 16 }}
        >
          <Body size="small" weight="alt" color="brand" UNSAFE_style={{ letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Community Pass
          </Body>
        </Button>

        {isFirstBenefitUnlocked ? (
          <>
            <div style={{ marginBottom: 12 }}>
              <Tag color="positive" variant="secondary" leading={<Icon name="CheckCircle" decorative size="small" />}>
                Benefit unlocked
              </Tag>
            </div>
            <Heading as="div" size="small" UNSAFE_style={{ marginBottom: 4 }}>{FIRST_BENEFIT_LABEL}</Heading>
            <Caption color="subtle" as="p">Unlocked at 250 lifetime points • {lifetimePoints} lifetime points</Caption>
          </>
        ) : (
          <>
            <ProgressIndicator
              value={lifetimePoints}
              min={0}
              max={FIRST_MILESTONE_POINTS}
              label="toward the next benefit"
              valueLabel={`${lifetimePoints} of ${FIRST_MILESTONE_POINTS} points`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, marginBottom: 12 }}>
              <Caption color="subtle">0</Caption>
              <Caption color="subtle">{FIRST_MILESTONE_POINTS}</Caption>
            </div>
            <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
              {pointsRemaining} points to your next benefit
            </Body>
            <Heading as="div" size="small" UNSAFE_style={{ marginBottom: 4 }}>{FIRST_BENEFIT_LABEL}</Heading>
            <Caption color="subtle" as="p">{lifetimePoints} lifetime points</Caption>
          </>
        )}
      </CardContent>
    </Card>
  );
}
