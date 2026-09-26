import * as React from 'react';
import { Page } from '../components/Page';
import { Heading, Body } from '../components/Text';
import { WelcomeCard } from '../components/mmc/WelcomeCard';
import { CommunityPassSummaryCard } from '../components/mmc/CommunityPassSummaryCard';
import { ActivityCard } from '../components/mmc/ActivityCard';
import { BottomNavBar, NavTab } from '../components/mmc/BottomNavBar';
import { useMMC } from '../mmc/useMMCStore';
import { WAYS_TO_PROGRESS } from '../mmc/data';
import { Route } from '../mmc/types';

interface HomePageProps {
  onNavigate: (route: Route) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { state, lifetimePoints, isFirstBenefitUnlocked, completedWaysToProgressIds, completeActivity } = useMMC();

  const totalCompletedCount = state.historicalLog.length + state.waysToProgressCompletions.length;

  const handleTab = (tab: NavTab) => {
    if (tab === 'home') onNavigate('home');
    if (tab === 'account') onNavigate('profile');
    // scan / reorder / services are out of scope for this prototype — inert by design.
  };

  return (
    <Page title="Member's Mark Community" titleVisuallyHidden>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', inset: 0 }}>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '32px 20px 24px' }}>
          <Heading as="h2" size="large" UNSAFE_style={{ textAlign: 'center', marginBottom: 24 }}>
            Member's Mark Community
          </Heading>

          <div style={{ marginBottom: 20 }}>
            <WelcomeCard
              memberName={state.memberName}
              memberSinceLabel={state.memberSinceLabel}
              completedActivitiesCount={totalCompletedCount}
              onViewActivities={() => onNavigate('profile')}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <CommunityPassSummaryCard
              lifetimePoints={lifetimePoints}
              isFirstBenefitUnlocked={isFirstBenefitUnlocked}
              onNavigate={() => onNavigate('community-pass')}
            />
          </div>

          <Heading as="h2" size="medium" UNSAFE_style={{ marginBottom: 16 }}>
            {isFirstBenefitUnlocked ? 'Open activities' : 'Ways to make progress'} ({WAYS_TO_PROGRESS.length})
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {WAYS_TO_PROGRESS.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isCompleted={completedWaysToProgressIds.has(activity.id)}
                onComplete={completeActivity}
              />
            ))}
          </div>
        </div>

        <BottomNavBar active="home" onChange={handleTab} />
      </div>
    </Page>
  );
}
