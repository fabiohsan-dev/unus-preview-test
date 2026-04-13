'use client';

import { Search, MapPin, Building, ChevronDown, SlidersHorizontal, DollarSign, X, BedDouble, Bath, Car, Maximize, LayoutGrid, List, Hash } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import type { ApiMetadataResponse } from '@/types/vista';

/* ── Preço ── */
const PRICE_MIN = 0;
const PRICE_MAX = 50_000_000;
const PRICE_STEP = 50_000;

function fmtPrice(v: number): string {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)} mil`;
  return `R$ ${v}`;
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
  const toNum = (s: string, fallback: number) => (s ? Number(s) : fallback);
  const [range, setRange] = useState([toNum(precoMin, PRICE_MIN), toNum(precoMax, PRICE_MAX)]);
  const [inputMin, setInputMin] = useState(String(toNum(precoMin, PRICE_MIN)));
  const [inputMax, setInputMax] = useState(String(toNum(precoMax, PRICE_MAX)));

  useEffect(() => {
    const min = toNum(precoMin, PRICE_MIN);
    const max = toNum(precoMax, PRICE_MAX);
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

  const handleSliderChange = (values: number[]) => {
    setRange(values);
    setInputMin(String(values[0]));
    setInputMax(String(values[1]));
  };

  const commitMin = () => {
    const v = Math.max(PRICE_MIN, Math.min(Number(inputMin) || PRICE_MIN, range[1]));
    setRange([v, range[1]]);
    setInputMin(String(v));
  };

  const commitMax = () => {
    const v = Math.min(PRICE_MAX, Math.max(Number(inputMax) || PRICE_MAX, range[0]));
    setRange([range[0], v]);
    setInputMax(String(v));
  };

  const handleApply = () => {
    const minVal = range[0] > PRICE_MIN ? String(range[0]) : '';
    const maxVal = range[1] < PRICE_MAX ? String(range[1]) : '';
    onApply(minVal, maxVal);
  };

  const handleReset = () => {
    setRange([PRICE_MIN, PRICE_MAX]);
    setInputMin(String(PRICE_MIN));
    setInputMax(String(PRICE_MAX));
    onApply('', '');
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer hover:bg-[var(--neutral-50)] rounded-lg transition-colors relative flex-1 p-3.5 py-4 md:py-3.5"
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      <DollarSign className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-[var(--secondary-400)] uppercase tracking-[0.12em]" style={{ fontWeight: 600 }}>Preço</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[var(--color-heading)] truncate text-[14px]" style={{ fontWeight: 500 }}>
            {displayLabel()}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-[var(--neutral-300)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] p-5 z-[100] w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--secondary-400)] mb-5" style={{ fontWeight: 600 }}>
              Preço
            </p>

            {/* Slider */}
            <SliderPrimitive.Root
              className="relative flex items-center w-full h-5 mb-1 select-none touch-none"
              value={range}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              onValueChange={handleSliderChange}
            >
              <SliderPrimitive.Track className="relative flex-1 h-[2px] rounded-full bg-[var(--neutral-200)]">
                <SliderPrimitive.Range className="absolute h-full rounded-full bg-[var(--secondary-900)]" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border-2 border-[var(--secondary-900)] rounded-full shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[var(--secondary-900)]/20" />
              <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border-2 border-[var(--secondary-900)] rounded-full shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[var(--secondary-900)]/20" />
            </SliderPrimitive.Root>

            {/* Labels extremos */}
            <div className="flex justify-between mb-4 text-[11px] text-[var(--secondary-400)]">
              <span>{fmtPrice(PRICE_MIN)}</span>
              <span>{fmtPrice(PRICE_MAX)}</span>
            </div>

            {/* Inputs */}
            <div className="flex items-center gap-2 mb-5">
              <input
                type="text"
                inputMode="numeric"
                value={Number(inputMin).toLocaleString('pt-BR')}
                onChange={(e) => setInputMin(e.target.value.replace(/\D/g, ''))}
                onBlur={commitMin}
                className="flex-1 min-w-0 bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border border-[var(--neutral-200)] outline-none focus:border-[var(--primary-500)] transition-colors"
              />
              <span className="text-[var(--secondary-400)] text-sm shrink-0">–</span>
              <input
                type="text"
                inputMode="numeric"
                value={Number(inputMax).toLocaleString('pt-BR')}
                onChange={(e) => setInputMax(e.target.value.replace(/\D/g, ''))}
                onBlur={commitMax}
                className="flex-1 min-w-0 bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border border-[var(--neutral-200)] outline-none focus:border-[var(--primary-500)] transition-colors"
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 text-[13px] text-[var(--color-body)] bg-[var(--neutral-100)] rounded-full hover:bg-[var(--neutral-200)] transition-colors cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Resetar
              </button>
              <button
                onClick={handleApply}
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

/* ── Dropdown Field ── */
function FilterField({
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
  onSelect: (v: string) => void;
}) {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer hover:bg-[var(--neutral-50)] rounded-lg transition-colors relative flex-1 p-3.5 py-4 md:py-3.5"
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      <Icon className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-[var(--secondary-400)] uppercase tracking-[0.12em]" style={{ fontWeight: 600 }}>{label}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[var(--color-heading)] truncate text-[14px]" style={{ fontWeight: 500 }}>{value}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-[var(--neutral-300)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] py-2 z-[100] max-h-[240px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((opt) => {
              const isSelected = value === opt || (!value && (opt.includes('Todos') || opt.includes('Todas')));
              return (
                <button
                  key={opt}
                  className={`w-full text-left px-4 py-3 md:py-2.5 text-[14px] md:text-[13px] hover:bg-[var(--primary-500)]/5 transition-colors cursor-pointer ${
                    isSelected ? 'text-[var(--primary-500)] bg-[var(--primary-500)]/5' : 'text-[var(--color-heading)]'
                  }`}
                  style={{ fontWeight: isSelected ? 600 : 400 }}
                  onClick={() => onSelect(opt)}
                >
                  {opt}
                </button>
              );
            })}
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
    bairro:   searchParams.get('bairro')   || '',
    tipo:     searchParams.get('tipo')     || '',
    precoMin: searchParams.get('precoMin') || '',
    precoMax: searchParams.get('precoMax') || '',
    quartos:  searchParams.get('quartos')  || '',
    suites:   searchParams.get('suites')   || '',
    vagas:    searchParams.get('vagas')    || '',
    areaMin:  searchParams.get('areaMin')  || '',
    codigo:   searchParams.get('codigo')   || '',
  });

  const view = (searchParams.get('view') as 'grid' | 'list') || 'grid';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const updateURL = (newFilters: typeof filters, newView?: string) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set('view', newView || view);
    router.push(`/venda?${params.toString()}`);
  };

  const handleSelect = (key: keyof typeof filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    setActiveDropdown(null);
    updateURL(updated);
  };

  const handlePriceApply = (min: string, max: string) => {
    const updated = { ...filters, precoMin: min, precoMax: max };
    setFilters(updated);
    setActiveDropdown(null);
    updateURL(updated);
  };

  const handleSearch = () => {
    updateURL(filters);
    setShowAdvanced(false);
  };

  const clearFilters = () => {
    const reset = { bairro: '', tipo: '', precoMin: '', precoMax: '', quartos: '', suites: '', vagas: '', areaMin: '', codigo: '' };
    setFilters(reset);
    updateURL(reset);
    setShowAdvanced(false);
  };

  const bairros = useMemo(() => ['Todos os bairros', ...(metadata?.bairros || [])], [metadata]);
  const tipos   = useMemo(() => ['Todos os tipos',   ...(metadata?.categorias || [])], [metadata]);

  const displayBairro = filters.bairro || 'Todas as regiões';
  const displayTipo   = filters.tipo   || 'Todos os tipos';

  return (
    <div className="bg-white border-b border-[var(--neutral-200)] sticky top-20 z-40 px-6 py-4 shadow-sm">
      <div className="max-w-[1400px] mx-auto" ref={containerRef}>

        {/* Pílula Principal */}
        <div className="bg-white rounded-[10px] p-1.5 flex flex-col md:flex-row items-stretch relative shadow-[var(--shadow-glass)] border border-[var(--neutral-200)]" onClick={(e) => e.stopPropagation()}>

          <FilterField
            icon={MapPin}
            label="Localização"
            value={displayBairro}
            options={bairros}
            isOpen={activeDropdown === 'location'}
            onToggle={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
            onSelect={(v) => handleSelect('bairro', v === 'Todos os bairros' ? '' : v)}
          />

          <div className="mx-3.5 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-3" />

          <FilterField
            icon={Building}
            label="Tipo"
            value={displayTipo}
            options={tipos}
            isOpen={activeDropdown === 'type'}
            onToggle={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
            onSelect={(v) => handleSelect('tipo', v === 'Todos os tipos' ? '' : v)}
          />

          <div className="mx-3.5 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-3" />

          <PriceRangeField
            precoMin={filters.precoMin}
            precoMax={filters.precoMax}
            isOpen={activeDropdown === 'price'}
            onToggle={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
            onApply={handlePriceApply}
          />

          {/* Actions */}
          <div className="p-1.5 pt-2 md:pt-1.5 border-t md:border-t-0 border-[var(--neutral-200)] mt-1 md:mt-0 flex items-center justify-between md:justify-end gap-2 md:gap-3">

            {/* Toggle Grid/Lista */}
            <div className="flex bg-[var(--neutral-100)] p-1 rounded-lg">
              <button
                onClick={() => updateURL(filters, 'grid')}
                className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-[var(--primary-500)]' : 'text-[var(--neutral-400)] hover:text-[var(--color-heading)]'}`}
                title="Ver Mapa e Grade"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateURL(filters, 'list')}
                className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-[var(--primary-500)]' : 'text-[var(--neutral-400)] hover:text-[var(--color-heading)]'}`}
                title="Ver Lista Completa"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`flex items-center justify-center rounded-lg transition-colors cursor-pointer w-11 h-11 ${showAdvanced ? 'bg-[var(--primary-500)]/10 text-[var(--primary-500)]' : 'hover:bg-[var(--neutral-100)] text-[var(--color-body)]'}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
                title="Busca Avançada"
              >
                <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleSearch}
                className="bg-[var(--secondary-900)] text-white rounded-lg flex items-center justify-center gap-2.5 hover:bg-[var(--secondary-800)] transition-colors cursor-pointer px-8 py-3.5 md:py-3"
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
                <span className="tracking-[0.02em] text-[13px]" style={{ fontWeight: 500 }}>Buscar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Painel Avançado */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-[10px] mt-2 p-5 md:p-6 shadow-[var(--shadow-glass)] border border-[var(--neutral-200)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--secondary-400)]" style={{ fontWeight: 600 }}>Mais Filtros</span>
                  </div>
                  <button onClick={() => setShowAdvanced(false)} className="w-7 h-7 rounded-full hover:bg-[var(--neutral-100)] flex items-center justify-center transition-colors cursor-pointer">
                    <X className="w-3.5 h-3.5 text-[var(--secondary-400)]" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                  {/* Quartos */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--secondary-400)]" style={{ fontWeight: 600 }}>
                      <BedDouble className="w-3.5 h-3.5" /> Quartos
                    </label>
                    <select value={filters.quartos} onChange={(e) => setFilters({ ...filters, quartos: e.target.value })}
                      className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer">
                      <option value="">Qualquer</option>
                      <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                    </select>
                  </div>

                  {/* Suítes */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--secondary-400)]" style={{ fontWeight: 600 }}>
                      <Bath className="w-3.5 h-3.5" /> Suítes
                    </label>
                    <select value={filters.suites} onChange={(e) => setFilters({ ...filters, suites: e.target.value })}
                      className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer">
                      <option value="">Qualquer</option>
                      <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                    </select>
                  </div>

                  {/* Vagas */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--secondary-400)]" style={{ fontWeight: 600 }}>
                      <Car className="w-3.5 h-3.5" /> Vagas
                    </label>
                    <select value={filters.vagas} onChange={(e) => setFilters({ ...filters, vagas: e.target.value })}
                      className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer">
                      <option value="">Qualquer</option>
                      <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                    </select>
                  </div>

                  {/* Área */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--secondary-400)]" style={{ fontWeight: 600 }}>
                      <Maximize className="w-3.5 h-3.5" /> Área (m²)
                    </label>
                    <select value={filters.areaMin} onChange={(e) => setFilters({ ...filters, areaMin: e.target.value })}
                      className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer">
                      <option value="">Qualquer</option>
                      <option value="50">50+ m²</option><option value="100">100+ m²</option><option value="150">150+ m²</option><option value="200">200+ m²</option><option value="300">300+ m²</option>
                    </select>
                  </div>

                  {/* Código */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--secondary-400)]" style={{ fontWeight: 600 }}>
                      <Hash className="w-3.5 h-3.5" /> Código
                    </label>
                    <input type="text" placeholder="Ex: 1234" value={filters.codigo}
                      onChange={(e) => setFilters({ ...filters, codigo: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none placeholder:text-[var(--secondary-300)] uppercase"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[var(--neutral-100)]">
                  <button onClick={clearFilters} className="text-[12px] text-[var(--color-body)] hover:text-[var(--primary-500)] underline font-medium cursor-pointer">
                    Limpar filtros
                  </button>
                  <button onClick={handleSearch} className="bg-[var(--secondary-900)] text-white px-8 py-2.5 rounded-lg text-[13px] font-bold tracking-widest uppercase hover:bg-[var(--secondary-800)] transition-colors cursor-pointer">
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
