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

    const inputStyle: React.CSSProperties = isDark
      ? {
          background: 'rgba(21,20,16,0.55)',
          border: `1px solid ${error ? 'var(--error)' : 'rgba(196,154,46,0.30)'}`,
          color: 'rgba(255,255,255,0.90)',
          caretColor: 'var(--gold)',
        }
      : {
          background: 'var(--input-background)',
          border: `1px solid ${error ? 'var(--error)' : 'var(--neutral-300)'}`,
          color: 'var(--color-heading)',
          caretColor: 'var(--primary-500)',
        };

    return (
      <div className={['flex flex-col gap-1.5 w-full', wrapperClassName].filter(Boolean).join(' ')}>
        {label && (
          <label
            htmlFor={id}
            className="text-[10px] uppercase tracking-[0.18em]"
            style={{
              fontWeight: 600,
              color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--neutral-600)',
            }}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {Icon && (
            <Icon
              className="absolute left-3.5 w-3.5 h-3.5 shrink-0 pointer-events-none"
              strokeWidth={1.5}
              style={{ color: isDark ? 'rgba(255,255,255,0.40)' : 'var(--neutral-400)' }}
            />
          )}

          <input
            ref={ref}
            id={id}
            className={[
              'w-full h-11 text-[14px] transition-all duration-200',
              'placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none',
              'focus:ring-1',
              isDark
                ? 'focus:ring-[rgba(196,154,46,0.60)] placeholder:text-[rgba(255,255,255,0.30)]'
                : 'focus:ring-[var(--primary-500)]',
              Icon ? 'pl-9 pr-4' : 'px-4',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            style={inputStyle}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...rest}
          />
        </div>

        {error && (
          <p
            id={`${id}-error`}
            className="text-[11px]"
            style={{ color: 'var(--error)', fontWeight: 500 }}
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helper && (
          <p
            id={`${id}-helper`}
            className="text-[11px]"
            style={{ color: isDark ? 'rgba(255,255,255,0.40)' : 'var(--neutral-500)', fontWeight: 400 }}
          >
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
