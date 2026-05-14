/**
 * UNUS — Eyebrow primitive
 *
 * The repeated section-header pattern throughout the site:
 *   ─── LABEL TEXT ───
 *
 * Variants:
 *   gold  (default) — used on dark backgrounds (hero, CTA sections)
 *   dark            — used on light backgrounds (cards on ivory)
 *   center          — centered layout with lines on both sides
 *
 * Usage:
 *   <Eyebrow>Curadoria UNUS</Eyebrow>
 *   <Eyebrow variant="dark" align="left">Imóveis em destaque</Eyebrow>
 *   <Eyebrow align="center">Atendimento personalizado</Eyebrow>
 */

import type { ReactNode } from 'react';

export type EyebrowVariant = 'gold' | 'dark';
export type EyebrowAlign  = 'left' | 'center';

interface EyebrowProps {
  variant?: EyebrowVariant;
  align?: EyebrowAlign;
  /** Extra className */
  className?: string;
  children: ReactNode;
}

export function Eyebrow({
  variant = 'gold',
  align = 'left',
  className,
  children,
}: EyebrowProps) {
  const color = variant === 'gold' ? 'var(--gold)' : 'var(--gold-dark)';
  const lineStyle: React.CSSProperties = {
    background: color,
    height: '1px',
    flexShrink: 0,
  };

  return (
    <div
      className={[
        'flex items-center gap-3',
        align === 'center' ? 'justify-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div style={{ ...lineStyle, width: align === 'center' ? '40px' : '32px' }} />

      <span
        className="text-[var(--text-xs)] uppercase tracking-[var(--tracking-eyebrow)] whitespace-nowrap"
        style={{ color, fontWeight: 'var(--weight-semi)' }}
      >
        {children}
      </span>

      {align === 'center' && (
        <div style={{ ...lineStyle, width: '40px' }} />
      )}
    </div>
  );
}
