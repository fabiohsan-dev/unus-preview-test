/**
 * UNUS — SectionHeader primitive
 *
 * Combines Eyebrow + heading (h1 or h2) in the standard UNUS format:
 *   ─── EYEBROW ───
 *   Título leve em <span>destaque bold</span>
 *
 * Props:
 *   eyebrow   — label above the heading (optional)
 *   title     — full heading text
 *   highlight — substring of `title` to bold (wraps in <span fontWeight:600>)
 *   subtitle  — body paragraph below heading (optional)
 *   as        — 'h1' | 'h2' (default: 'h2')
 *   surface   — 'light' | 'dark' (default: 'light')
 *   align     — 'left' (default) | 'center'
 *
 * Usage:
 *   <SectionHeader
 *     eyebrow="Curadoria UNUS"
 *     title="Empreendimentos"
 *     highlight="dimentos"
 *     subtitle="Projetos selecionados pela nossa curadoria imobiliária."
 *     as="h1"
 *     surface="dark"
 *   />
 */

import { Eyebrow } from './Eyebrow';
import type { EyebrowAlign, EyebrowVariant } from './Eyebrow';

export type SectionHeaderSurface = 'light' | 'dark';
export type SectionHeaderAlign   = 'left' | 'center';
export type SectionHeaderTag     = 'h1' | 'h2' | 'h3';

interface SectionHeaderProps {
  eyebrow?:   string;
  title:      string;
  /** Exact substring of title that will be rendered bold */
  highlight?: string;
  subtitle?:  string;
  as?:        SectionHeaderTag;
  surface?:   SectionHeaderSurface;
  align?:     SectionHeaderAlign;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  as: Tag = 'h2',
  surface = 'light',
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isDark = surface === 'dark';

  /* Split title around highlight */
  let titleContent: React.ReactNode = title;
  if (highlight && title.includes(highlight)) {
    const idx    = title.indexOf(highlight);
    const before = title.slice(0, idx);
    const after  = title.slice(idx + highlight.length);
    titleContent = (
      <>
        {before}
        <span style={{ fontWeight: 600 }}>{highlight}</span>
        {after}
      </>
    );
  }

  const eyebrowVariant: EyebrowVariant = 'gold';
  const eyebrowAlign: EyebrowAlign     = align;

  const headingColor = isDark ? '#ffffff' : 'var(--color-heading)';
  const subtitleColor = isDark ? 'rgba(255,255,255,0.55)' : 'var(--color-body)';

  return (
    <div
      className={[
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <div className="mb-5">
          <Eyebrow variant={eyebrowVariant} align={eyebrowAlign}>
            {eyebrow}
          </Eyebrow>
        </div>
      )}

      <Tag
        style={{
          fontWeight: 300,
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 4vw, 56px)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          color: headingColor,
        }}
      >
        {titleContent}
      </Tag>

      {subtitle && (
        <p
          className="mt-5 text-[17px] leading-[1.75] max-w-[520px]"
          style={{ color: subtitleColor, fontWeight: 300 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
