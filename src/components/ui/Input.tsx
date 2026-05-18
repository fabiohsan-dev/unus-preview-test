'use client';

/**
 * UNUS — Input primitive
 *
 * Features:
 *   - label (optional, uppercase tracking style)
 *   - leading icon (optional)
 *   - error message (optional)
 *   - helper text (optional)
 *   - surface variants: light (default) | dark (for dark-bg sections)
 *   - full-width by default
 */

import { forwardRef, useId } from 'react';
import type { LucideIcon } from 'lucide-react';

export type InputSurface = 'light' | 'dark';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  helper?: string;
  surface?: InputSurface;
  /** Extra className for the outer wrapper div */
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon: Icon,
      error,
      helper,
      surface = 'light',
      className,
      wrapperClassName,
      ...rest
    },
    ref
  ) => {
    const id = useId();

    const isDark = surface === 'dark';

    const baseClasses = isDark
      ? 'bg-[#151410]/55 text-white/90 caret-[var(--champagne)]'
      : 'bg-[var(--input-background)] text-[var(--color-heading)] caret-[var(--primary-500)]';

    const borderClasses = error
      ? 'border-[var(--error)]'
      : isDark
        ? 'border-[var(--champagne)]/30'
        : 'border-[var(--neutral-300)]';

    return (
      <div className={['flex flex-col gap-1.5 w-full', wrapperClassName].filter(Boolean).join(' ')}>
        {label && (
          <label
            htmlFor={id}
            className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${
              isDark ? 'text-white/55' : 'text-[var(--neutral-600)]'
            }`}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {Icon && (
            <Icon
              className={`absolute left-3.5 w-3.5 h-3.5 shrink-0 pointer-events-none ${
                isDark ? 'text-white/60' : 'text-[var(--neutral-400)]'
              }`}
              strokeWidth={1.5}
            />
          )}

          <input
            ref={ref}
            id={id}
            className={[
              'w-full h-11 text-[14px] transition-all duration-200',
              'placeholder:text-[rgba(0,0,0,0.50)] focus:outline-none',
              'focus:ring-1',
              isDark
                ? 'focus:ring-[rgba(196,154,46,0.60)] placeholder:text-[rgba(255,255,255,0.45)]'
                : 'focus:ring-[var(--primary-500)]',
              Icon ? 'pl-9 pr-4' : 'px-4',
              'border',
              baseClasses,
              borderClasses,
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...rest}
          />
        </div>

        {error && (
          <p
            id={`${id}-error`}
            className="text-[11px] text-[var(--error)] font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helper && (
          <p
            id={`${id}-helper`}
            className={`text-[11px] font-normal ${
              isDark ? 'text-white/60' : 'text-[var(--neutral-500)]'
            }`}
          >
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
