/**
 * UNUS — UI Primitive Components
 *
 * Import from '@/components/ui' for all shared atoms.
 *
 * Available primitives:
 *   Button        — action buttons (primary / outline / gold / ghost / whatsapp / phone)
 *   LinkButton    — same as Button but renders an <a> or Next <Link>
 *   Badge         — inline labels (gold / cyan / outline / dark / success / error / neutral)
 *   Input         — text input with label, icon, error, helper (light & dark surface)
 *   Eyebrow       — section label with decorative lines
 *   Divider       — gold gradient or subtle horizontal rule
 *   SectionHeader — composed eyebrow + heading + subtitle
 */

export { Button, LinkButton } from './Button';
export type { ButtonVariant, ButtonSize, ButtonProps, LinkButtonProps } from './Button';

export { Badge } from './Badge';
export type { BadgeVariant } from './Badge';

export { Input } from './Input';
export type { InputSurface } from './Input';

export { Eyebrow } from './Eyebrow';
export type { EyebrowVariant, EyebrowAlign } from './Eyebrow';

export { Divider } from './Divider';
export type { DividerVariant } from './Divider';

export { SectionHeader } from './SectionHeader';
export type { SectionHeaderSurface, SectionHeaderAlign, SectionHeaderTag } from './SectionHeader';

export { UnusIcon } from './UnusIcon';
