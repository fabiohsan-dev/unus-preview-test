/**
 * UNUS — Divider primitive
 *
 * The gold gradient separator lines used throughout the design.
 *
 * Variants:
 *   gold-left   (default) — gold → transparent, left-anchored
 *   gold-right             — transparent → gold, right-anchored
 *   gold-center            — transparent → gold → transparent
 *   subtle                 — neutral-300 solid line
 *
 * Usage:
 *   <Divider />
 *   <Divider variant="gold-center" className="my-6" />
 *   <Divider variant="subtle" />
 */

export type DividerVariant = 'gold-left' | 'gold-right' | 'gold-center' | 'subtle';

interface DividerProps {
  variant?: DividerVariant;
  className?: string;
}

const gradients: Record<DividerVariant, string> = {
  'gold-left':   'linear-gradient(to right, rgba(196,154,46,0.55) 0%, transparent 70%)',
  'gold-right':  'linear-gradient(to left,  rgba(196,154,46,0.55) 0%, transparent 70%)',
  'gold-center': 'linear-gradient(to right, transparent 0%, rgba(196,154,46,0.55) 50%, transparent 100%)',
  'subtle':      'var(--neutral-300)',
};

export function Divider({ variant = 'gold-left', className }: DividerProps) {
  const isSubtle = variant === 'subtle';

  return (
    <div
      className={['h-[1px] w-full', className].filter(Boolean).join(' ')}
      style={
        isSubtle
          ? { background: 'var(--neutral-300)' }
          : { background: gradients[variant] }
      }
      role="separator"
      aria-hidden="true"
    />
  );
}
