'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import {
  Bath,
  BedDouble,
  Building,
  Car,
  ChevronDown,
  DollarSign,
  Hash,
  LayoutGrid,
  List,
  MapPin,
  Maximize,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import type { ApiMetadataResponse } from '@/types/vista';
import { vendaUrl } from '@/lib/vendaSearch';

const PRICE_MIN = 0;
const PRICE_MAX = 50_000_000;
const PRICE_STEP = 50_000;

function fmtPrice(value: number) {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)} mil`;
  return `R$ ${value}`;
}

function SelectField({
  icon: Icon,
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  useEffect(() => {
    if (!isOpen) setFocusedIdx(-1);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || focusedIdx < 0 || !listboxRef.current) return;
    listboxRef.current
      .querySelector<HTMLElement>(`[id="${listboxId}-opt-${focusedIdx}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [focusedIdx, isOpen, listboxId]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        onToggle();
        setFocusedIdx(event.key === 'ArrowDown' ? 0 : options.length - 1);
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        setFocusedIdx((index) => (index + 1) % options.length);
        event.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIdx((index) => (index - 1 + options.length) % options.length);
        event.preventDefault();
        break;
      case 'Home':
        setFocusedIdx(0);
        event.preventDefault();
        break;
      case 'End':
        setFocusedIdx(options.length - 1);
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        if (focusedIdx >= 0) {
          onSelect(options[focusedIdx]);
          requestAnimationFrame(() => triggerRef.current?.focus());
        }
        event.preventDefault();
        break;
      case 'Tab':
        if (isOpen) onToggle();
        break;
      default:
        break;
    }
  }, [focusedIdx, isOpen, onSelect, onToggle, options]);

  const activeDescendant = isOpen && focusedIdx >= 0
    ? `${listboxId}-opt-${focusedIdx}`
    : undefined;

  return (
    <div className="relative flex-1">
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props -- mirrors the SearchBar listbox trigger pattern for keyboard navigation */}
      <button
        ref={triggerRef}
        type="button"
        className="w-full flex items-center gap-3 cursor-pointer hover:bg-[var(--neutral-50)] rounded-lg transition-colors text-left p-3.5 py-4 md:py-3.5"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`${label}: ${value}`}
        aria-activedescendant={activeDescendant}
      >
        <Icon className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-[var(--color-caption)] uppercase tracking-[0.12em]" style={{ fontWeight: 600 }}>
            {label}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[var(--color-heading)] truncate text-[14px]" style={{ fontWeight: 500 }}>
              {value}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[var(--neutral-300)] shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listboxRef}
            id={listboxId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] py-2 z-[100] max-h-[240px] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
            role="listbox"
            aria-label={label}
          >
            {options.map((option, index) => {
              const isSelected =
                value === option || (!value && (option.includes('Todos') || option.includes('Todas')));
              const isFocused = focusedIdx === index;

              return (
                <button
                  key={option}
                  id={`${listboxId}-opt-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  className={`w-full text-left px-4 py-3 md:py-2.5 text-[14px] md:text-[13px] hover:bg-[var(--primary-500)]/5 transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[var(--color-accent-text)] bg-[var(--primary-500)]/5'
                      : isFocused
                      ? 'bg-[var(--primary-500)]/10 text-[var(--color-accent-text)] outline-none'
                      : 'text-[var(--color-heading)]'
                  }`}
                  style={{ fontWeight: isSelected || isFocused ? 600 : 400 }}
                  onClick={() => {
                    onSelect(option);
                    requestAnimationFrame(() => triggerRef.current?.focus());
                  }}
                >
                  {option}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PriceRangeField({
  precoMin,
  precoMax,
  isOpen,
  onToggle,
  onApply,
}: {
  precoMin: string;
  precoMax: string;
  isOpen: boolean;
  onToggle: () => void;
  onApply: (min: string, max: string) => void;
}) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const toNumber = (value: string, fallback: number) => (value ? Number(value) : fallback);
  const [range, setRange] = useState([toNumber(precoMin, PRICE_MIN), toNumber(precoMax, PRICE_MAX)]);
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
    <div className="relative flex-1">
      <button
        ref={triggerRef}
        type="button"
        className="w-full flex items-center gap-3 cursor-pointer hover:bg-[var(--neutral-50)] rounded-lg transition-colors text-left p-3.5 py-4 md:py-3.5"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={`Preço: ${displayLabel()}`}
      >
        <DollarSign className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-[var(--color-caption)] uppercase tracking-[0.12em]" style={{ fontWeight: 600 }}>
            Preço
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[var(--color-heading)] truncate text-[14px]" style={{ fontWeight: 500 }}>
              {displayLabel()}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[var(--neutral-300)] shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
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
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] p-5 z-[100] w-[300px]"
            onClick={(event) => event.stopPropagation()}
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
                onChange={(event) => setInputMin(event.target.value.replace(/\D/g, ''))}
                onBlur={commitMin}
                className="flex-1 min-w-0 bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border border-[var(--neutral-200)] outline-none focus:border-[var(--primary-500)] transition-colors"
                aria-label="Preço mínimo"
              />
              <span className="text-[var(--color-caption)] text-sm shrink-0">–</span>
              <input
                type="text"
                inputMode="numeric"
                value={Number(inputMax).toLocaleString('pt-BR')}
                onChange={(event) => setInputMax(event.target.value.replace(/\D/g, ''))}
                onBlur={commitMax}
                className="flex-1 min-w-0 bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border border-[var(--neutral-200)] outline-none focus:border-[var(--primary-500)] transition-colors"
                aria-label="Preço máximo"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={reset}
                className="min-h-11 px-5 py-2 text-[13px] text-[var(--color-body)] bg-[var(--neutral-100)] rounded-full hover:bg-[var(--neutral-200)] transition-colors cursor-pointer"
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
                className="min-h-11 px-5 py-2 text-[13px] text-white bg-[var(--secondary-900)] rounded-full hover:bg-[var(--secondary-800)] transition-colors cursor-pointer"
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

interface PropertyFiltersProps {
  metadata?: ApiMetadataResponse;
}

export function PropertyFilters({ metadata }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    bairro: searchParams.get('bairro') || '',
    tipo: searchParams.get('tipo') || '',
    precoMin: searchParams.get('precoMin') || '',
    precoMax: searchParams.get('precoMax') || '',
    quartos: searchParams.get('quartos') || '',
    suites: searchParams.get('suites') || '',
    vagas: searchParams.get('vagas') || '',
    areaMin: searchParams.get('areaMin') || '',
    codigo: searchParams.get('codigo') || '',
  });
  const view = (searchParams.get('view') as 'grid' | 'list') || 'grid';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const advancedPanelId = useId();
  const bairros = useMemo(() => ['Todos os bairros', ...(metadata?.bairros || [])], [metadata]);
  const tipos = useMemo(() => ['Todos os tipos', ...(metadata?.categorias || [])], [metadata]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!activeDropdown && !showAdvanced) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setShowAdvanced(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown, showAdvanced]);

  const updateURL = (nextFilters: typeof filters, nextView?: string) => {
    const params = new URLSearchParams();

    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set('view', nextView || view);
    router.push(vendaUrl(Object.fromEntries(params.entries())));
  };

  const handleSelect = (key: keyof typeof filters, value: string) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);
    setActiveDropdown(null);
    updateURL(nextFilters);
  };

  const clearFilters = () => {
    const nextFilters = {
      bairro: '',
      tipo: '',
      precoMin: '',
      precoMax: '',
      quartos: '',
      suites: '',
      vagas: '',
      areaMin: '',
      codigo: '',
    };

    setFilters(nextFilters);
    updateURL(nextFilters);
    setShowAdvanced(false);
  };

  const displayBairro = filters.bairro || 'Todas as regiões';
  const displayTipo = filters.tipo || 'Todos os tipos';

  return (
    <div className="bg-white border-b border-[var(--neutral-200)] sticky top-20 z-40 px-6 py-4 shadow-sm">
      <div className="max-w-[1400px] mx-auto" ref={containerRef}>
        <div
          className="bg-white rounded-[10px] p-1.5 flex flex-col md:flex-row items-stretch relative shadow-[var(--shadow-glass)] border border-[var(--neutral-200)]"
          onClick={(event) => event.stopPropagation()}
        >
          <SelectField
            icon={MapPin}
            label="Localização"
            value={displayBairro}
            options={bairros}
            isOpen={activeDropdown === 'location'}
            onToggle={() => setActiveDropdown((current) => (current === 'location' ? null : 'location'))}
            onSelect={(value) => handleSelect('bairro', value === 'Todos os bairros' ? '' : value)}
          />

          <div className="mx-3.5 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-3" />

          <SelectField
            icon={Building}
            label="Tipo"
            value={displayTipo}
            options={tipos}
            isOpen={activeDropdown === 'type'}
            onToggle={() => setActiveDropdown((current) => (current === 'type' ? null : 'type'))}
            onSelect={(value) => handleSelect('tipo', value === 'Todos os tipos' ? '' : value)}
          />

          <div className="mx-3.5 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-3" />

          <PriceRangeField
            precoMin={filters.precoMin}
            precoMax={filters.precoMax}
            isOpen={activeDropdown === 'price'}
            onToggle={() => setActiveDropdown((current) => (current === 'price' ? null : 'price'))}
            onApply={(min, max) => {
              const nextFilters = { ...filters, precoMin: min, precoMax: max };
              setFilters(nextFilters);
              setActiveDropdown(null);
              updateURL(nextFilters);
            }}
          />

          <div className="p-1.5 pt-2 md:pt-1.5 border-t md:border-t-0 border-[var(--neutral-200)] mt-1 md:mt-0 flex items-center justify-between md:justify-end gap-2 md:gap-3">
            <div className="flex bg-[var(--neutral-100)] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => updateURL(filters, 'grid')}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                  view === 'grid'
                    ? 'bg-white shadow-sm text-[var(--color-accent-text)]'
                    : 'text-[var(--neutral-400)] hover:text-[var(--color-heading)]'
                }`}
                aria-label="Ver imóveis em grade"
                aria-pressed={view === 'grid'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => updateURL(filters, 'list')}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                  view === 'list'
                    ? 'bg-white shadow-sm text-[var(--color-accent-text)]'
                    : 'text-[var(--neutral-400)] hover:text-[var(--color-heading)]'
                }`}
                aria-label="Ver imóveis em lista"
                aria-pressed={view === 'list'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`flex items-center justify-center rounded-lg transition-colors cursor-pointer w-11 h-11 ${
                  showAdvanced
                    ? 'bg-[var(--primary-500)]/10 text-[var(--color-accent-text)]'
                    : 'hover:bg-[var(--neutral-100)] text-[var(--color-body)]'
                }`}
                onClick={() => setShowAdvanced((current) => !current)}
                aria-label={showAdvanced ? 'Fechar mais filtros' : 'Abrir mais filtros'}
                aria-expanded={showAdvanced}
                aria-controls={advancedPanelId}
              >
                <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => {
                  updateURL(filters);
                  setShowAdvanced(false);
                }}
                className="bg-[var(--secondary-900)] text-white rounded-lg flex items-center justify-center gap-2.5 hover:bg-[var(--secondary-800)] transition-colors cursor-pointer px-8 py-3.5 md:py-3"
                aria-label="Buscar imóveis"
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
                <span className="tracking-[0.02em] text-[13px]" style={{ fontWeight: 500 }}>
                  Buscar
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              id={advancedPanelId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="bg-white rounded-[10px] mt-2 p-5 md:p-6 shadow-[var(--shadow-glass)] border border-[var(--neutral-200)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
                      Mais Filtros
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(false)}
                    className="w-11 h-11 rounded-full hover:bg-[var(--neutral-100)] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Fechar mais filtros"
                  >
                    <X className="w-3.5 h-3.5 text-[var(--color-caption)]" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                  {[
                    {
                      key: 'quartos',
                      label: 'Quartos',
                      icon: BedDouble,
                      options: ['', '1', '2', '3', '4'],
                    },
                    {
                      key: 'suites',
                      label: 'Suítes',
                      icon: Bath,
                      options: ['', '1', '2', '3', '4'],
                    },
                    {
                      key: 'vagas',
                      label: 'Vagas',
                      icon: Car,
                      options: ['', '1', '2', '3', '4'],
                    },
                    {
                      key: 'areaMin',
                      label: 'Área (m²)',
                      icon: Maximize,
                      options: ['', '50', '100', '150', '200', '300'],
                    },
                  ].map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
                        <field.icon className="w-3.5 h-3.5" /> {field.label}
                      </label>
                      <select
                        value={filters[field.key as keyof typeof filters]}
                        onChange={(event) =>
                          setFilters({
                            ...filters,
                            [field.key]: event.target.value,
                          })
                        }
                        className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer"
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option ? `${option}+` : 'Qualquer'}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
                      <Hash className="w-3.5 h-3.5" /> Código
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 1234"
                      value={filters.codigo}
                      onChange={(event) => setFilters({ ...filters, codigo: event.target.value })}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          updateURL(filters);
                          setShowAdvanced(false);
                        }
                      }}
                      className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none placeholder:text-[var(--secondary-300)] uppercase"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[var(--neutral-100)]">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[12px] text-[var(--color-body)] hover:text-[var(--color-accent-text)] underline font-medium cursor-pointer"
                  >
                    Limpar filtros
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateURL(filters);
                      setShowAdvanced(false);
                    }}
                    className="min-h-11 bg-[var(--secondary-900)] text-white px-8 py-2.5 rounded-lg text-[13px] font-bold tracking-widest uppercase hover:bg-[var(--secondary-800)] transition-colors cursor-pointer"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
