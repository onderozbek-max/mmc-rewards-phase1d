import * as React from 'react';
import { PhoneShell } from './PhoneShell';
import { Heading, Body, Caption } from '../../components/Text';
import { Tag } from '../../components/Tag';
import { Divider } from '../../components/Divider';

/**
 * Desktop-only stakeholder review chrome. This is metadata FOR reviewers,
 * not MMC member-facing UI — it must read as clearly separate from the
 * simulated phone. At mobile-sized browser widths this entire panel is
 * hidden via the media query below (Phase 1D spec §34), leaving just the
 * app filling the viewport as it would on a real device.
 */
export function StakeholderShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mmc-stakeholder-shell">
      <style>{`
        .mmc-stakeholder-shell {
          min-height: 100vh;
          background: #f2f2f3;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 56px;
          padding: 56px 32px;
        }
        .mmc-stakeholder-info {
          max-width: 460px;
          padding-top: 8px;
        }
        @media (max-width: 768px) {
          .mmc-stakeholder-shell {
            display: block;
            min-height: 100dvh;
            background: #fff;
            padding: 0;
            gap: 0;
          }
          .mmc-stakeholder-info {
            display: none;
          }
        }
      `}</style>

      <PhoneShell>{children}</PhoneShell>

      <div className="mmc-stakeholder-info">
        <div style={{ marginBottom: 16 }}>
          <Tag color="brand" variant="primary">Phase 1D</Tag>
        </div>
        <Heading as="h2" size="large" UNSAFE_style={{ marginBottom: 4 }}>
          Milestone Achievement Experience
        </Heading>
        <Body size="medium" color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 24 }}>
          Initiative type: Build + Measure
        </Body>

        <Section title="Why this increment exists">
          <Caption color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 8 }}>1C CLOSES THE EARNING LOOP</Caption>
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 16 }}>
            I participated → I earned points → my progress changed.
          </Body>
          <Caption color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 8 }}>1D CLOSES THE VALUE LOOP</Caption>
          <Body size="medium" as="p">
            My accumulated contribution reached the promised destination → a benefit became available → I recognize
            what happened → I understand what I earned → I can immediately access that value.
          </Body>
        </Section>

        <Section title="What 1D adds">
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
            When ordinary activity-driven progress crosses the 250-point milestone, Community Pass creates a
            distinct achievement experience:
          </Body>
          <Caption color="subtle" isMonospace as="p">
            Activity completed → Points earned → Milestone reached → What's New + Member Favorites unlocked →
            Direct access to the value
          </Caption>
        </Section>

        <Section title="Distinct member value">
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
            Without 1D, the benefit technically becomes available but the culmination of the progression journey can
            be easy to miss.
          </Body>
          <Body size="medium" as="p">
            With 1D, milestone achievement is explicitly recognized, the unlocked value is explained, and the member
            is taken directly into that value.
          </Body>
        </Section>

        <Section title="Population scope">
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
            1D completes the first operational 250-point experience for the initial new + &lt;250 rollout population.
          </Body>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><Body size="medium">1E operationalizes the higher 1,000 / 3,000 milestones.</Body></li>
            <li><Body size="medium">1F reconciles historical contribution and expands Community Pass to the full eligible MMC population.</Body></li>
          </ul>
        </Section>

        <Section title="What to evaluate">
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 8 }}>Does the member clearly understand:</Body>
          <ul style={{ margin: '0 0 12px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><Body size="medium">that this completion crossed the milestone?</Body></li>
            <li><Body size="medium">what became available?</Body></li>
            <li><Body size="medium">why it became available?</Body></li>
            <li><Body size="medium">how to use it?</Body></li>
          </ul>
          <Body size="medium" as="p">
            Does the moment feel meaningfully different from ordinary progress without becoming gamified?
          </Body>
        </Section>

        <div style={{ margin: '24px 0' }}><Divider /></div>

        <Section title="What changed from 1C">
          <Caption color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 8 }}>1C</Caption>
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
            Activity complete → +points → updated lifetime total/progress.
          </Body>
          <Caption color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 8 }}>1D</Caption>
          <Body size="medium" as="p">
            When that update crosses the milestone: achievement recognized → unlocked value explained → direct path
            to use the value.
          </Body>
        </Section>

        <div style={{ margin: '24px 0' }}><Divider /></div>

        <Section title="What is not built yet">
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><Body size="medium">1E: Full Milestone &amp; Benefit Expansion</Body></li>
            <li><Body size="medium">1F: Historical Reconciliation &amp; Full Population Rollout</Body></li>
          </ul>
        </Section>

        <div style={{ margin: '24px 0' }}><Divider /></div>

        <Section title="Phase progression">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PhaseRow label="1A · Progression Foundation" status="Complete ✓" />
            <PhaseRow label="1B · Progress Motivation" status="Assumed adopted ✓*" />
            <PhaseRow label="1C · Earn &amp; Progress Feedback" status="Complete ✓" />
            <PhaseRow label="1D · Milestone Achievement Experience" status="Current" isCurrent />
            <PhaseRow label="1E · Full Milestone &amp; Benefit Expansion" status="Not built" />
            <PhaseRow label="1F · Historical Reconciliation &amp; Rollout" status="Not built" />
          </div>
          <Caption color="subtle" as="p" UNSAFE_style={{ marginTop: 12 }}>
            *1B carries forward under the assumed positive experiment outcome.
          </Caption>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Heading as="h3" size="small" UNSAFE_style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
        {title}
      </Heading>
      {children}
    </div>
  );
}

function PhaseRow({ label, status, isCurrent }: { label: string; status: string; isCurrent?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: 8,
        background: isCurrent ? 'var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)' : 'transparent',
        border: isCurrent ? '1px solid var(--ld-semantic-color-border-brand, #0053e2)' : '1px solid transparent',
      }}
    >
      <Body size="medium" weight={isCurrent ? 'alt' : 'default'}>
        {label}
      </Body>
      <Caption color={isCurrent ? 'brand' : 'subtle'} weight="alt">{status}</Caption>
    </div>
  );
}
