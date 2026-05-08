/**
 * UNUS — Ícone SVG (símbolo "U")
 *
 * SVG original: UNUS - U.svg
 * Usa `currentColor` — controle via className/style text-color.
 *
 * Uso:
 *   <UnusIcon className="h-12 w-auto text-white" />
 *   <UnusIcon className="h-10 w-auto text-[var(--gold)]" />
 */

import type { SVGProps } from 'react';

interface UnusIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function UnusIcon({ className, ...props }: UnusIconProps) {
  return (
    <svg
      viewBox="0 0 106 106"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M78.9,7.31l17.63-.09-.24,67.66c-.05,12.85-12.07,23.26-24.7,23.59-13.46.36-25.79.56-39.04-.24-11.84-.72-22.83-10.5-22.87-22.34l-.23-68.65h17.59s.11,68.47.11,68.47c0,4.28,5.56,7.43,9.17,7.43h33.22c4.87.01,8.82-3.45,9.38-8.2l-.03-67.62Z" />
    </svg>
  );
}
