/**
 * UNUS — Ícone SVG
 *
 * Símbolo "U" geométrico derivado da identidade visual da marca.
 * Usa `currentColor` — controle via className/style text-color.
 *
 * Uso:
 *   <UnusIcon className="w-10 h-12 text-white" />
 *   <UnusIcon className="w-8 h-10 text-[var(--gold)]" />
 */

import type { SVGProps } from 'react';

interface UnusIconProps extends SVGProps<SVGSVGElement> {
  /** Tailwind / CSS class (use text-* para controlar cor) */
  className?: string;
}

export function UnusIcon({ className, ...props }: UnusIconProps) {
  return (
    <svg
      viewBox="0 0 48 52"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/*
        Forma "U" geométrica:
        — Duas barras verticais (largura 10px cada)
        — Base arredondada externa (arco rx=24 ry=16)
        — Recorte interno arredondado (arco rx=14 ry=12)
        — Espessura uniforme ~10px em todos os lados
      */}
      <path d="M 0 0 L 0 36 A 24 16 0 0 1 48 36 L 48 0 L 38 0 L 38 32 A 14 12 0 0 0 10 32 L 10 0 Z" />
    </svg>
  );
}
