import * as React from 'react';
import { useInitializeTheming } from './utils/Theming';
import { A11yAnnouncementProvider } from './components/A11yAnnouncement';
import { A11yDevAssertions } from './components/A11yDevAssertions';

import { MMCProvider, useMMC } from './mmc/useMMCStore';
import { Route } from './mmc/types';
import { StakeholderShell } from './components/mmc/StakeholderShell';
import { DemoControlsPanel } from './components/mmc/DemoControlsPanel';
import { AchievementModal } from './components/mmc/AchievementModal';
import { OrdinaryCompletionSheet } from './components/mmc/OrdinaryCompletionSheet';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPassPage } from './pages/CommunityPassPage';

function MMCApp() {
  const [route, setRoute] = React.useState<Route>('home');
  const {
    pendingAchievement,
    pendingOrdinary,
    dismissAchievement,
    dismissOrdinary,
    isFirstBenefitUnlocked,
    currentScenarioId,
    resetToScenario,
  } = useMMC();

  const handleViewBenefit = () => {
    dismissAchievement();
    setRoute('community-pass');
  };

  let page: React.ReactNode;
  if (route === 'profile') {
    page = <ProfilePage onNavigate={setRoute} />;
  } else if (route === 'community-pass') {
    page = <CommunityPassPage onNavigate={setRoute} />;
  } else {
    page = <HomePage onNavigate={setRoute} />;
  }

  return (
    <StakeholderShell>
      <div style={{ position: 'relative', minHeight: '100%' }}>
        <DemoControlsPanel currentScenarioId={currentScenarioId} onSelectScenario={resetToScenario} />
        {page}
        <AchievementModal achievement={pendingAchievement} onViewBenefit={handleViewBenefit} />
        <OrdinaryCompletionSheet
          completion={pendingOrdinary}
          isFirstBenefitUnlocked={isFirstBenefitUnlocked}
          onClose={dismissOrdinary}
        />
      </div>
    </StakeholderShell>
  );
}

export default function App() {
  // ── Theme ─────────────────────────────────────────────────────
  // Member's Mark Community is a Sam's Club private-label experience.
  useInitializeTheming("Member's Mark", ["Member's Mark"] as const);

  return (
    <A11yAnnouncementProvider>
      <A11yDevAssertions />
      <MMCProvider>
        <MMCApp />
      </MMCProvider>
    </A11yAnnouncementProvider>
  );
}
