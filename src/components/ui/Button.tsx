'use client';

/**
 * UNUS — Button primitive
 *
 * Variants:
 *   primary   — dark fill (neutral-900 bg, white text)  → page-level CTAs
 *   outline   — bordered (neutral-900 border on light bg, gold border on dark bg)
 *   gold      — solid gold fill → primary emphasis actions
 *   ghost     — no border/bg, text only → secondary links / inline actions
 *   whatsapp  — green WhatsApp fill
 *   phone     — gold-tinted outline for dark surfaces
 *
 * Sizes: sm | md | lg
 *
 * Also exports <LinkButton> — same styles but renders an <a> (or Next Link when `href` starts with /)
 */

import { forwardRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Types                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'gold'
  | 'ghost'
  | 'whatsapp'
  | 'phone';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Append a right-arrow icon (auto-animates on hover via group-hover/btn) */
  withArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

export type LinkButtonProps = ButtonBaseProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | 'href'>;

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Style maps                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-5 py-3   text-[12px] tracking-[0.16em]',
  md: 'px-6 py-3.5 text-[13px] tracking-[0.14em]',
  lg: 'px-10 py-4  text-[12px] tracking-[0.18em]',
};

/**
 * Variant base styles (no size, no layout).
 * hover/focus states are CSS inline-style controlled below for gold border tricks.
 */
const variantClass: Record<ButtonVariant, string> = {
  primary:   'bg-[var(--secondary-900)] text-white border border-[var(--secondary-900)] hover:bg-[var(--neutral-800)] hover:border-[var(--neutral-800)]',
  outline:   'bg-transparent text-[var(--color-heading)] border border-[var(--secondary-900)] hover:bg-[var(--secondary-900)] hover:text-white',
  gold:      'bg-[var(--gold)] text-[var(--neutral-900)] border border-[var(--gold)] hover:brightness-110',
  ghost:     'bg-transparent text-[var(--gold-dark)] border border-transparent hover:opacity-70',
  whatsapp:  'bg-[var(--color-action-whatsapp)] text-white border border-transparent hover:brightness-110',
  phone:     'bg-transparent border border-[var(--champagne)]/40 text-white/75 hover:border-[var(--gold)] hover:text-white',
};

const BASE =
  'group/btn inline-flex items-center justify-center gap-2.5 uppercase font-[600] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--deep-blue)] focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

function buildClass(variant: ButtonVariant, size: ButtonSize, extra = '') {
  return [BASE, sizeMap[size], variantClass[variant], extra].filter(Boolean).join(' ');
}

function Arrow() {
  return (
    <ArrowRight
      className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1.5"
      strokeWidth={2}
    />
  );
}



/* ─────────────────────────────────────────────────────────────────────────── */
/*  <Button>                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', withArrow, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={buildClass(variant, size, className)}
        {...rest}
      >
        {children}
        {withArrow && <Arrow />}
      </button>
    );
  }
);
Button.displayName = 'Button';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  <LinkButton>                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

export function LinkButton({
  href,
  external,
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const cls = buildClass(variant, size, className);

  if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={cls}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
        {...rest}
      >
        {children}
        {withArrow && <Arrow />}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...(rest as object)}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}
