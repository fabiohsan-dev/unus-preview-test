'use client';

import { useEffect, useId, useRef, useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, DollarSign } from 'lucide-react';

export const PRICE_MIN  = 0;
export const PRICE_MAX  = 50_000_000;
export const PRICE_STEP = 50_000;

export function fmtPrice(value: number) {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(0)} mil`;
  return `R$ ${value}`;
}

function toNumber(value: string, fallback: number) {
  return value ? Number(value) : fallback;
}

interface PriceRangeFieldProps {
  precoMin: string;
  precoMax: string;
  isOpen: boolean;
  onToggle: () => void;
  onApply: (min: string, max: string) => void;
  compact?: boolean;
}

export function PriceRangeField({
  precoMin,
  precoMax,
  isOpen,
  onToggle,
  onApply,
  compact = false,
}: PriceRangeFieldProps) {
  const panelId    = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [range,    setRange]    = useState([toNumber(precoMin, PRICE_MIN), toNumber(precoMax, PRICE_MAX)]);
  const [inputMin, setInputMin] = useState(String(toNumber(precoMin, PRICE_MIN)));
  const [inputMax, setInputMax] = useState(String(toNumber(precoMax, PRICE_MAX)));

  useEffect(() => {
    const min = toNumber(precoMin, PRICE_MIN);
    const max = toNumber(precoMax, PRICE_MAX);
    setRange([min, max]);
    setInputMin(String(min));
    setInputMax(String(max));
  }, [precoMin, precoMax]);

  const displayLabel = () => {
    const hasMin = precoMin && Number(precoMin) > PRICE_MIN;
    const hasMax = precoMax && Number(precoMax) < PRICE_MAX;
    if (!hasMin && !hasMax) return 'Qualquer valor';
    if (!hasMin) return `Até ${fmtPrice(Number(precoMax))}`;
    if (!hasMax) return `A partir de ${fmtPrice(Number(precoMin))}`;
    return `${fmtPrice(Number(precoMin))} – ${fmtPrice(Number(precoMax))}`;
  };

  const commitMin = () => {
    const value = Math.max(PRICE_MIN, Math.min(Number(inputMin) || PRICE_MIN, range[1]));
    setRange([value, range[1]]);
    setInputMin(String(value));
  };

  const commitMax = () => {
    const value = Math.min(PRICE_MAX, Math.max(Number(inputMax) || PRICE_MAX, range[0]));
    setRange([range[0], value]);
    setInputMax(String(value));
  };

  const reset = () => {
    setRange([PRICE_MIN, PRICE_MAX]);
    setInputMin(String(PRICE_MIN));
    setInputMax(String(PRICE_MAX));
    onApply('', '');
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="relative flex-1 min-w-0">
      <button
        ref={triggerRef}
        type="button"
        className={`w-full flex items-center gap-3 cursor-pointer hover:bg-[var(--neutral-50)] rounded-lg transition-colors text-left ${
          compact ? 'px-3 py-2.5' : 'p-3.5 py-4 md:py-3.5'
        }`}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={`Preço: ${displayLabel()}`}
      >
        <DollarSign className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          {!compact && (
            <p className="text-[10px] text-[var(--color-caption)] uppercase tracking-[0.12em]" style={{ fontWeight: 600 }}>
              Preço
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[var(--color-heading)] truncate ${compact ? 'text-[13px]' : 'text-[14px]'}`} style={{ fontWeight: 500 }}>
              {displayLabel()}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[var(--neutral-300)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] p-5 z-[200] w-[300px]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Filtro de preço"
          >
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)] mb-5" style={{ fontWeight: 600 }}>
              Preço
            </p>

            <SliderPrimitive.Root
              className="relative flex items-center w-full h-5 mb-1 select-none touch-none"
              value={range}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              onValueChange={(values) => {
                setRange(values);
                setInputMin(String(values[0]));
                setInputMax(String(values[1]));
              }}
            >
              <SliderPrimitive.Track className="relative flex-1 h-[2px] rounded-full bg-[var(--neutral-200)]">
                <SliderPrimitive.Range className="absolute h-full rounded-full bg-[var(--secondary-900)]" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border-2 border-[var(--secondary-900)] rounded-full shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[var(--secondary-900)]/20" />
              <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border-2 border-[var(--secondary-900)] rounded-full shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[var(--secondary-900)]/20" />
            </SliderPrimitive.Root>

            <div className="flex justify-between mb-4 text-[11px] text-[var(--color-caption)]">
              <span>{fmtPrice(PRICE_MIN)}</span>
              <span>{fmtPrice(PRICE_MAX)}</span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <input
                type="text"
                inputMode="numeric"
                value={Number(inputMin).toLocaleString('pt-BR')}
                onChange={(e) => setInputMin(e.target.value.replace(/\D/g, ''))}
                onBlur={commitMin}
                className="flex-1 min-w-0 bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border border-[var(--neutral-200)] outline-none focus:border-[var(--primary-500)] transition-colors"
                aria-label="Preço mínimo"
              />
              <span className="text-[var(--color-caption)] text-sm shrink-0">–</span>
              <input
                type="text"
                inputMode="numeric"
                value={Number(inputMax).toLocaleString('pt-BR')}
                onChange={(e) => setInputMax(e.target.value.replace(/\D/g, ''))}
                onBlur={commitMax}
                className="flex-1 min-w-0 bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border border-[var(--neutral-200)] outline-none focus:border-[var(--primary-500)] transition-colors"
                aria-label="Preço máximo"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={reset}
                className="px-5 py-2 text-[13px] text-[var(--color-body)] bg-[var(--neutral-100)] rounded-full hover:bg-[var(--neutral-200)] transition-colors cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Resetar
              </button>
              <button
                type="button"
                onClick={() => {
                  const minValue = range[0] > PRICE_MIN ? String(range[0]) : '';
                  const maxValue = range[1] < PRICE_MAX ? String(range[1]) : '';
                  onApply(minValue, maxValue);
                  requestAnimationFrame(() => triggerRef.current?.focus());
                }}
                className="px-5 py-2 text-[13px] text-white bg-[var(--secondary-900)] rounded-full hover:bg-[var(--secondary-800)] transition-colors cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Aplicar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
