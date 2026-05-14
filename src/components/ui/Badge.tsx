/**
 * UNUS — Badge primitive
 *
 * Variants:
 *   gold      — solid gold fill + dark text → status/launch badges (primary)
 *   blue      — solid deep blue fill + white text → type labels
 *   outline   — transparent + neutral-900 border → subtle tags
 *   dark      — neutral-900 bg + white text → inverted contexts
 *   success   — success green
 *   error     — error red
 *   neutral   — neutral-200 bg + neutral-700 text → quiet metadata
 */

import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'gold'
  | 'blue'
  | 'cyan'  /* @deprecated — use 'blue' */
  | 'outline'
  | 'dark'
  | 'success'
  | 'error'
  | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  /** Extra Tailwind / inline-style className */
  className?: string;
  children: ReactNode;
}

const variantStyle: Record<BadgeVariant, React.CSSProperties> = {
  gold: {
    background: 'var(--gold)',
    color: 'var(--neutral-900)',
    fontWeight: 800,
  },
  blue: {
    background: 'var(--primary-500)',
    color: '#ffffff',
    fontWeight: 700,
  },
  cyan: {
    background: 'var(--primary-500)',
    color: '#ffffff',
    fontWeight: 700,
  },
  outline: {
    background: 'transparent',
    color: 'var(--secondary-900)',
    border: '1px solid var(--secondary-900)',
    fontWeight: 600,
  },
  dark: {
    background: 'var(--neutral-900)',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 700,
  },
  success: {
    background: 'var(--success)',
    color: '#ffffff',
    fontWeight: 700,
  },
  error: {
    background: 'var(--error)',
    color: '#ffffff',
    fontWeight: 700,
  },
  neutral: {
    background: 'var(--neutral-200)',
    color: 'var(--neutral-700)',
    fontWeight: 600,
  },
};

const BASE =
  'inline-block px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em]';

export function Badge({ variant = 'gold', className, children }: BadgeProps) {
  return (
    <span
      className={[BASE, className].filter(Boolean).join(' ')}
      style={variantStyle[variant]}
    >
      {children}
    </span>
  );
}
