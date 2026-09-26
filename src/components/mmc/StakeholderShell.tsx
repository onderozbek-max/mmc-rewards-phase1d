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
          Milestone Achievement &amp; Unlocks
        </Heading>
        <Body size="medium" color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 24 }}>
          Completes the first 250-point vertical slice
        </Body>

        <Section title="Foundation">
          <Body size="medium" as="p">1A establishes the functional Community Pass journey.</Body>
        </Section>

        <Section title="Assumption">
          <Body size="medium" as="p">
            This forward-looking prototype assumes the 1B Progress Motivation experiment produced a positive result
            and its treatment was adopted. 1C makes earning and resulting progress explicit after participation.
          </Body>
        </Section>

        <Section title="What 1D adds">
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
            When participation carries a member across the first 250-point milestone, Community Pass now turns that
            state change into a complete member experience:
          </Body>
          <Caption color="subtle" isMonospace as="p">
            Milestone reached → Benefit unlocked → Value explained → Achievement recognized → Journey continues
          </Caption>
        </Section>

        <Section title="What to evaluate">
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><Body size="medium">Does reaching the milestone feel meaningfully different from ordinary progress?</Body></li>
            <li><Body size="medium">Does the member clearly understand what they unlocked and why?</Body></li>
            <li><Body size="medium">Does recognition feel valuable without creating status, tiers, or excessive gamification?</Body></li>
            <li><Body size="medium">Does the resulting unlocked state remain clear after the moment ends?</Body></li>
          </ul>
        </Section>

        <Section title="Scope">
          <Body size="medium" as="p">
            This prototype completes the first operational vertical slice through the 250-point benefit. The 1,000-
            and 3,000-point milestones represent the broader Community Pass journey; their benefit fulfillment is
            not part of this initial vertical slice.
          </Body>
        </Section>

        <div style={{ margin: '24px 0' }}><Divider /></div>

        <Section title="What changed from 1C">
          <Caption color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 8 }}>PREVIOUS — 1C</Caption>
          <Body size="medium" as="p" UNSAFE_style={{ marginBottom: 12 }}>
            Successful participation explicitly shows: participate → earn points → see updated progress.
          </Body>
          <Caption color="subtle" as="p" weight="alt" UNSAFE_style={{ marginBottom: 8 }}>THIS PROTOTYPE — 1D</Caption>
          <Body size="medium" as="p">
            When that progress crosses 250, the member now experiences: milestone reached → benefit unlocked →
            recognition → durable unlocked state.
          </Body>
        </Section>

        <div style={{ margin: '24px 0' }}><Divider /></div>

        <Section title="Phase progression">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PhaseRow label="1A · Rewards Journey" status="Foundation ✓" />
            <PhaseRow label="1B · Progress Motivation" status="Assumed adopted ✓*" />
            <PhaseRow label="1C · Earn &amp; Progress Feedback" status="Complete ✓" />
            <PhaseRow label="1D · Milestone Achievement &amp; Unlocks" status="Current" isCurrent />
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
