import * as React from 'react';
import { Page } from '../components/Page';
import { TopBar } from '../components/mmc/TopBar';
import { BottomNavBar, NavTab } from '../components/mmc/BottomNavBar';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Tag } from '../components/Tag';
import { Icon } from '../components/Icons';
import { Button } from '../components/Button';
import { Heading, Body, Caption } from '../components/Text';
import { useMMC } from '../mmc/useMMCStore';
import { MILESTONES, FIRST_MILESTONE_POINTS, FIRST_BENEFIT_LABEL } from '../mmc/data';
import { Route } from '../mmc/types';

interface CommunityPassPageProps {
  onNavigate: (route: Route) => void;
  onExploreBenefits: () => void;
}

export function CommunityPassPage({ onNavigate, onExploreBenefits }: CommunityPassPageProps) {
  const { lifetimePoints, isFirstBenefitUnlocked } = useMMC();
  const pointsRemaining = Math.max(FIRST_MILESTONE_POINTS - lifetimePoints, 0);

  const handleTab = (tab: NavTab) => {
    if (tab === 'home') onNavigate('home');
    if (tab === 'account') onNavigate('profile');
  };

  return (
    <Page title="Community Pass" titleVisuallyHidden>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', inset: 0 }}>
        <TopBar label="Community Pass" onBack={() => onNavigate('home')} />

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px' }}>
          <Heading as="h2" size="large" UNSAFE_style={{ marginBottom: 8 }}>Community Pass</Heading>
          <Body size="medium" color="subtle" as="p" UNSAFE_style={{ marginBottom: 20 }}>
            Take part in Community activities and earn points. Your lifetime points move you toward benefit milestones.
          </Body>

          <div style={{ background: 'var(--ld-semantic-color-surface-subtle, #f4f4f5)', borderRadius: 16, padding: 20, marginBottom: 32 }}>
            <Heading as="div" size="large" UNSAFE_style={{ marginBottom: 2 }}>{lifetimePoints}</Heading>
            <Caption color="subtle" as="p" UNSAFE_style={{ marginBottom: 16 }}>lifetime points</Caption>

            {isFirstBenefitUnlocked ? (
              <>
                <div style={{ marginBottom: 12 }}>
                  <Tag color="positive" variant="secondary" leading={<Icon name="CheckCircle" decorative size="small" />}>
                    First milestone: {FIRST_MILESTONE_POINTS} points — completed
                  </Tag>
                </div>
                <ProgressIndicator
                  value={FIRST_MILESTONE_POINTS}
                  min={0}
                  max={FIRST_MILESTONE_POINTS}
                  variant="success"
                  label={`${FIRST_MILESTONE_POINTS}-point milestone`}
                  valueLabel="Completed"
                />
                <Body size="medium" as="p" UNSAFE_style={{ margin: '12px 0 4px' }}>
                  {FIRST_BENEFIT_LABEL}
                </Body>
                <Caption color="subtle" as="p" UNSAFE_style={{ marginBottom: 12 }}>Already unlocked</Caption>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Body size="small" as="p">
                    <Icon name="CheckCircle" decorative size="small" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    What's New — accessible
                  </Body>
                  <Body size="small" as="p">
                    <Icon name="CheckCircle" decorative size="small" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    Member Favorites — accessible
                  </Body>
                </div>
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
                <Body size="medium" as="p" UNSAFE_style={{ margin: '12px 0' }}>
                  {pointsRemaining} points to your next benefit
                </Body>
                <Body size="medium" weight="alt" as="p">
                  Next benefit: {FIRST_BENEFIT_LABEL}
                </Body>
              </>
            )}

            <div style={{ marginTop: 20 }}>
              <Button
                variant="primary"
                isFullWidth
                onClick={isFirstBenefitUnlocked ? onExploreBenefits : () => onNavigate('home')}
              >
                {isFirstBenefitUnlocked ? 'Explore your benefits' : 'Explore activities'}
              </Button>
            </div>
          </div>

          <Heading as="h2" size="medium" UNSAFE_style={{ marginBottom: 8 }}>Your benefit journey</Heading>
          <Body size="medium" color="subtle" as="p" UNSAFE_style={{ marginBottom: 20 }}>
            As your lifetime points grow, more benefits become available. Points never reset.
          </Body>

          <div>
            {MILESTONES.map((milestone, index) => {
              const isUnlocked = milestone.benefitId != null && isFirstBenefitUnlocked && milestone.benefitId === '250';
              const isNext = !isUnlocked && !isFirstBenefitUnlocked && milestone.points === FIRST_MILESTONE_POINTS;
              const isLast = index === MILESTONES.length - 1;

              return (
                <div key={milestone.points} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon
                      name={isUnlocked ? 'CheckCircleFill' : 'CheckCircle'}
                      decorative
                      size="medium"
                      style={{ color: isUnlocked ? 'var(--ld-semantic-color-progress-fill-positive, #2a8703)' : 'var(--ld-semantic-color-progress-fill-subtle, #e3e4e5)' }}
                    />
                    {!isLast && <div style={{ width: 2, flex: 1, minHeight: 40, background: 'var(--ld-semantic-color-border-subtle, #e3e4e5)', margin: '4px 0' }} />}
                  </div>
                  <div style={{ paddingBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Heading as="div" size="small">{milestone.points.toLocaleString()} points</Heading>
                      {isUnlocked && <Tag color="positive" size="small">✓ Benefit unlocked</Tag>}
                      {isNext && <Tag color="info" variant="tertiary" size="small">Next benefit</Tag>}
                      {!milestone.operational && <Tag color="neutral" size="small">Future milestone</Tag>}
                    </div>
                    <Body size="medium" color="subtle">{milestone.benefitLabel}</Body>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <BottomNavBar active="home" onChange={handleTab} />
      </div>
    </Page>
  );
}
