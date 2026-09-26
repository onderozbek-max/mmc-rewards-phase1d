import * as React from 'react';
import { Panel } from '../../components/Panel';
import { IconButton } from '../../components/IconButton';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icons';
import { Heading, Body, Caption } from '../../components/Text';
import { Divider } from '../../components/Divider';
import { SCENARIOS, ScenarioId } from '../../mmc/scenarios';

interface DemoControlsPanelProps {
  currentScenarioId: ScenarioId;
  onSelectScenario: (id: ScenarioId) => void;
}

/**
 * Prototype-only scenario switcher (Phase 1D spec §18/§31–§33). Lets
 * Product/Design intentionally replay the milestone-crossing moment instead
 * of it firing automatically on every reset/refresh — the achievement
 * itself is state-transition-driven (see useMMCStore.completeActivity) and
 * only these explicit resets change the underlying scenario.
 *
 * This is stakeholder/demo tooling, not member-facing MMC UI.
 */
export function DemoControlsPanel({ currentScenarioId, onSelectScenario }: DemoControlsPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 5 }}>
        <IconButton a11yLabel="Demo controls" variant="ghost" size="small" onClick={() => setIsOpen(true)}>
          <Icon name="Gear" decorative size="small" />
        </IconButton>
      </div>

      <Panel isOpen={isOpen} title="Demo controls" onClose={() => setIsOpen(false)} position="right" size="small">
        <Caption color="subtle" as="p" UNSAFE_style={{ marginBottom: 16 }}>
          Prototype-only — replay any Phase 1D scenario. Not part of the member experience.
        </Caption>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SCENARIOS.map((scenario) => {
            const isActive = scenario.id === currentScenarioId;
            return (
              <div
                key={scenario.id}
                style={{
                  border: isActive ? '2px solid var(--ld-semantic-color-border-brand, #0062ad)' : '1px solid var(--ld-semantic-color-border-subtle, #e3e4e5)',
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <Heading as="h3" size="small" UNSAFE_style={{ marginBottom: 4 }}>{scenario.label}</Heading>
                <Body size="small" color="subtle" as="p" UNSAFE_style={{ marginBottom: 8 }}>{scenario.description}</Body>
                <Button
                  variant={isActive ? 'secondary' : 'primary'}
                  size="small"
                  isFullWidth
                  onClick={() => {
                    onSelectScenario(scenario.id);
                    setIsOpen(false);
                  }}
                >
                  {isActive ? 'Reset this scenario' : 'Load scenario'}
                </Button>
              </div>
            );
          })}
        </div>

        <div style={{ margin: '20px 0' }}><Divider /></div>
        <Caption color="subtle" as="p">
          These controls exist only to demonstrate Phase 1D for stakeholders — they do not appear in the real MMC app.
        </Caption>
      </Panel>
    </>
  );
}
