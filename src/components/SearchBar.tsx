'use client';

import {
  Bath,
  BedDouble,
  Building,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Hash,
  MapPin,
  Maximize,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiMetadataResponse } from '@/types/vista';

export const FEATURES = [
  'Piscina',
  'Churrasqueira',
  'Vista mar',
  'Varanda gourmet',
  'Home office',
  'Academia',
  'Pet friendly',
  'Mobiliado',
];

function FilterField({
  icon: Icon,
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  compact,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  compact?: boolean;
}) {
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex-1 relative">
      <button
        ref={triggerRef}
        type="button"
        className={`w-full flex items-center gap-3 group cursor-pointer hover:bg-[var(--neutral-50)] rounded-lg transition-colors relative border-none text-left bg-transparent ${
          compact ? 'px-3 py-2.5' : 'p-3.5 py-4 md:py-3.5'
        }`}
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`${label}: ${value}`}
      >
        <Icon className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          {!compact && (
            <p
              className="text-[10px] text-[var(--color-caption)] uppercase tracking-[0.12em]"
              style={{ fontWeight: 600 }}
            >
              {label}
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-[var(--color-heading)] truncate ${compact ? 'text-[13px]' : 'text-[14px]'}`}
              style={{ fontWeight: 500 }}
            >
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

      {isOpen && (
        <div
          id={listboxId}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] py-2 z-[100] max-h-[240px] overflow-y-auto"
          role="listbox"
          aria-label={label}
          onClick={(event) => event.stopPropagation()}
        >
          {options.map((option) => {
            const isSelected = value === option;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`w-full text-left px-4 py-3 md:py-2.5 text-[14px] md:text-[13px] hover:bg-[var(--primary-500)]/5 transition-colors cursor-pointer border-none bg-transparent ${
                  isSelected
                    ? 'text-[var(--color-accent-text)] bg-[var(--primary-500)]/5'
                    : 'text-[var(--color-heading)]'
                }`}
                style={{ fontWeight: isSelected ? 600 : 400 }}
                onClick={() => {
                  onSelect(option);
                  requestAnimationFrame(() => triggerRef.current?.focus());
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdvancedPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white rounded-[10px] mt-1.5 p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
          <span
            className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-caption)]"
            style={{ fontWeight: 600 }}
          >
            Busca Avançada
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full hover:bg-[var(--neutral-100)] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar filtros avançados"
        >
          <X className="w-3.5 h-3.5 text-[var(--color-caption)]" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { icon: BedDouble, label: 'Quartos', options: ['Qualquer', '1+', '2+', '3+', '4+'] },
          { icon: Bath, label: 'Suítes', options: ['Qualquer', '1+', '2+', '3+', '4+'] },
          { icon: Car, label: 'Vagas', options: ['Qualquer', '1+', '2+', '3+'] },
          { icon: Maximize, label: 'Área (m²)', options: ['Qualquer', '50+ m²', '100+ m²', '150+ m²', '200+ m²', '300+ m²'] },
        ].map((field) => (
          <div key={field.label} className="space-y-1.5">
            <label
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
              style={{ fontWeight: 600 }}
            >
              <field.icon className="w-3.5 h-3.5" /> {field.label}
            </label>
            <select
              className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="space-y-1.5">
          <label
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
            style={{ fontWeight: 600 }}
          >
            <Hash className="w-3.5 h-3.5" /> Código
          </label>
          <input
            type="text"
            placeholder="Ex: UNUS-1234"
            className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none placeholder:text-[var(--secondary-300)]"
            style={{ fontWeight: 500 }}
          />
        </div>
        <div className="space-y-1.5">
          <label
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
            style={{ fontWeight: 600 }}
          >
            <Building2 className="w-3.5 h-3.5" /> Empreendimento
          </label>
          <input
            type="text"
            placeholder="Nome do empreendimento"
            className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none placeholder:text-[var(--secondary-300)]"
            style={{ fontWeight: 500 }}
          />
        </div>
        <div className="space-y-1.5">
          <label
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
            style={{ fontWeight: 600 }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Status
          </label>
          <select
            className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer"
            style={{ fontWeight: 500 }}
          >
            <option>Todos</option>
            <option>Pronto</option>
            <option>Em construção</option>
            <option>Na planta</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
          style={{ fontWeight: 600 }}
        >
          <Sparkles className="w-3.5 h-3.5" /> Características Especiais
        </label>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((feature) => (
            <button
              key={feature}
              type="button"
              className="px-3 py-1.5 rounded-full bg-[var(--neutral-100)] text-[12px] text-[var(--color-body)] hover:bg-[var(--primary-500)]/10 hover:text-[var(--color-accent-text)] transition-colors cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface SearchBarProps {
  variant?: 'hero' | 'compact';
  glass?: boolean;
  metadata?: ApiMetadataResponse;
  onSearch?: (filters: { location: string; type: string; value: string }) => void;
  className?: string;
}

export function SearchBar({
  variant = 'hero',
  glass = false,
  metadata,
  onSearch,
  className = '',
}: SearchBarProps) {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const locations = useMemo(() => ['Todas as regiões', ...(metadata?.bairros || [])], [metadata]);
  const types = useMemo(() => ['Todos os tipos', ...(metadata?.categorias || [])], [metadata]);
  const priceOptions = useMemo(
    () => [
      { label: 'Qualquer valor', precoMax: '' },
      { label: 'Até R$ 500 mil', precoMax: '500000' },
      { label: 'Até R$ 1M', precoMax: '1000000' },
      { label: 'Até R$ 2M', precoMax: '2000000' },
      { label: 'Até R$ 5M', precoMax: '5000000' },
      { label: 'Acima de R$ 5M', precoMax: '10000000' },
    ],
    []
  );
  const values = useMemo(() => priceOptions.map((option) => option.label), [priceOptions]);
  const [selectedLocation, setSelectedLocation] = useState('Todas as regiões');
  const [selectedType, setSelectedType] = useState('Todos os tipos');
  const [selectedValue, setSelectedValue] = useState('Qualquer valor');
  const containerRef = useRef<HTMLDivElement>(null);
  const advancedPanelId = useId();
  const compact = variant === 'compact';

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

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedLocation !== 'Todas as regiões') {
      params.set('bairro', selectedLocation);
    }

    if (selectedType !== 'Todos os tipos') {
      params.set('tipo', selectedType);
    }

    const priceMax = priceOptions.find((option) => option.label === selectedValue)?.precoMax;
    if (priceMax) {
      params.set('precoMax', priceMax);
    }

    onSearch?.({
      location: selectedLocation,
      type: selectedType,
      value: selectedValue,
    });

    router.push(params.toString() ? `/venda?${params.toString()}` : '/venda');
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const outerClass = glass
    ? 'bg-white/8 backdrop-blur-2xl border border-white/15 p-2 rounded-[14px]'
    : 'bg-[var(--neutral-100)] p-2 rounded-[14px]';

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={outerClass}>
        <div
          className={`bg-white rounded-[10px] p-1.5 flex flex-col md:flex-row items-stretch relative ${
            compact ? 'gap-0' : ''
          }`}
        >
          <FilterField
            icon={MapPin}
            label="Localização"
            value={selectedLocation}
            options={locations}
            isOpen={activeDropdown === 'location'}
            onToggle={() => toggleDropdown('location')}
            onSelect={(value) => {
              setSelectedLocation(value);
              setActiveDropdown(null);
            }}
            compact={compact}
          />

          <div
            className={
              compact
                ? 'mx-3 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-2'
                : 'mx-3.5 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-3'
            }
          />

          <FilterField
            icon={Building}
            label="Tipo"
            value={selectedType}
            options={types}
            isOpen={activeDropdown === 'type'}
            onToggle={() => toggleDropdown('type')}
            onSelect={(value) => {
              setSelectedType(value);
              setActiveDropdown(null);
            }}
            compact={compact}
          />

          <div
            className={
              compact
                ? 'mx-3 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-2'
                : 'mx-3.5 md:mx-0 h-[1px] md:h-auto md:w-[1px] bg-[var(--neutral-200)] md:my-3'
            }
          />

          <FilterField
            icon={DollarSign}
            label="Valor"
            value={selectedValue}
            options={values}
            isOpen={activeDropdown === 'value'}
            onToggle={() => toggleDropdown('value')}
            onSelect={(value) => {
              setSelectedValue(value);
              setActiveDropdown(null);
            }}
            compact={compact}
          />

          <div
            className={`flex items-center gap-2 ${
              compact
                ? 'p-1 pl-0 md:pl-1'
                : 'p-1.5 pt-2 md:pt-1.5 border-t md:border-t-0 border-[var(--neutral-200)] mt-1 md:mt-0'
            }`}
          >
            <button
              type="button"
              className={`flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                compact ? 'w-9 h-9' : 'w-11 h-11'
              } ${
                showAdvanced
                  ? 'bg-[var(--primary-500)]/10 text-[var(--color-accent-text)]'
                  : 'hover:bg-[var(--neutral-100)] text-[var(--color-body)]'
              }`}
              onClick={() => setShowAdvanced((current) => !current)}
              aria-label={showAdvanced ? 'Fechar filtros avançados' : 'Abrir filtros avançados'}
              aria-expanded={showAdvanced}
              aria-controls={advancedPanelId}
            >
              <SlidersHorizontal
                className={compact ? 'w-4 h-4' : 'w-[18px] h-[18px]'}
                strokeWidth={1.5}
              />
            </button>
            <button
              type="button"
              onClick={handleSearch}
              aria-label="Buscar"
              className={`bg-[var(--secondary-900)] text-white rounded-lg flex items-center justify-center gap-2.5 hover:bg-[var(--secondary-800)] transition-colors cursor-pointer ${
                compact
                  ? 'px-5 py-2.5 flex-1 md:flex-none'
                  : 'px-8 py-3.5 md:py-3 flex-1 md:flex-none'
              }`}
            >
              <Search className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} strokeWidth={1.5} />
              <span
                className={`tracking-[0.02em] ${compact ? 'text-[12px]' : 'text-[13px]'}`}
                style={{ fontWeight: 500 }}
              >
                Buscar
              </span>
            </button>
          </div>
        </div>

        {showAdvanced && (
          <div id={advancedPanelId}>
            <AdvancedPanel onClose={() => setShowAdvanced(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
