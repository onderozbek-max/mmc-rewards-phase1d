import * as React from 'react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icons';
import { Display, Body } from '../../components/Text';

interface WelcomeCardProps {
  memberName: string;
  memberSinceLabel: string;
  completedActivitiesCount: number;
  onViewActivities: () => void;
}

export function WelcomeCard({ memberName, memberSinceLabel, completedActivitiesCount, onViewActivities }: WelcomeCardProps) {
  return (
    <div
      style={{
        background: 'var(--ld-semantic-color-fill-brand-bold)',
        borderRadius: 16,
        padding: 24,
      }}
    >
      <Display as="h2" size="small" color="inverse" UNSAFE_style={{ marginBottom: 4 }}>
        Welcome, {memberName}
      </Display>
      <Body size="medium" color="inverse" as="p" UNSAFE_style={{ marginBottom: 20, opacity: 0.85 }}>
        In the community since {memberSinceLabel}
      </Body>
      <Button
        variant="ghost"
        isFullWidth
        onClick={onViewActivities}
        trailing={<Icon name="ChevronRight" decorative size="small" style={{ color: '#fff' }} />}
        UNSAFE_style={{
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          justifyContent: 'space-between',
          borderRadius: 999,
        }}
      >
        {completedActivitiesCount} activities completed
      </Button>
    </div>
  );
}
