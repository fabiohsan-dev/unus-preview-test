'use client';

import {
  Bath,
  BedDouble,
  Building,
  Car,
  ChevronDown,
  Hash,
  MapPin,
  Maximize,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiMetadataResponse } from '@/types/vista';
import { PriceRangeField } from './PriceRangeField';
import { vendaUrl } from '@/lib/vendaSearch';

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
  const triggerRef  = useRef<HTMLButtonElement>(null);
  const listboxRef  = useRef<HTMLDivElement>(null);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  /* Reseta índice ao fechar */
  useEffect(() => {
    if (!isOpen) setFocusedIdx(-1);
  }, [isOpen]);

  /* Auto-scroll da opção ativa dentro da lista */
  useEffect(() => {
    if (!isOpen || focusedIdx < 0 || !listboxRef.current) return;
    const el = listboxRef.current.querySelector<HTMLElement>(
      `[id="${listboxId}-opt-${focusedIdx}"]`
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [focusedIdx, isOpen, listboxId]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        onToggle();
        setFocusedIdx(e.key === 'ArrowDown' ? 0 : options.length - 1);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        setFocusedIdx((i) => (i + 1) % options.length);
        e.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIdx((i) => (i - 1 + options.length) % options.length);
        e.preventDefault();
        break;
      case 'Home':
        setFocusedIdx(0);
        e.preventDefault();
        break;
      case 'End':
        setFocusedIdx(options.length - 1);
        e.preventDefault();
        break;
      case 'Enter':
      case ' ':
        if (focusedIdx >= 0) {
          onSelect(options[focusedIdx]);
          requestAnimationFrame(() => triggerRef.current?.focus());
        }
        e.preventDefault();
        break;
      case 'Tab':
        /* Fecha ao sair com Tab — foco segue normalmente */
        if (isOpen) onToggle();
        break;
      default:
        break;
    }
  }, [isOpen, focusedIdx, options, onToggle, onSelect]);

  const activeDescendant = isOpen && focusedIdx >= 0
    ? `${listboxId}-opt-${focusedIdx}`
    : undefined;

  return (
    <div className="flex-1 relative min-w-0">
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props -- aria-activedescendant is functionally correct for this listbox trigger pattern; all major screen readers support it */}
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
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`${label}: ${value}`}
        aria-activedescendant={activeDescendant}
      >
        <Icon className="text-[var(--primary-500)] w-[18px] h-[18px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
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
              className={`text-[var(--color-heading)] truncate ${compact ? 'text-[var(--text-sm)]' : 'text-[var(--text-sm)]'}`}
              style={{ fontWeight: 'var(--weight-medium)' }}
            >
              {value}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[var(--neutral-300)] shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          ref={listboxRef}
          id={listboxId}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--neutral-200)] py-2 z-[200] max-h-[240px] overflow-y-auto"
          role="listbox"
          aria-label={label}
          onClick={(event) => event.stopPropagation()}
        >
          {options.map((option, index) => {
            const isSelected  = value === option;
            const isFocused   = index === focusedIdx;

            return (
              <button
                key={option}
                id={`${listboxId}-opt-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                className={`w-full text-left px-4 py-3 md:py-2.5 text-[var(--text-sm)] transition-colors cursor-pointer border-none bg-transparent ${
                  isSelected
                    ? 'text-[var(--color-accent-text)] bg-[var(--primary-500)]/5'
                    : isFocused
                    ? 'bg-[var(--primary-500)]/10 text-[var(--color-accent-text)] outline-none'
                    : 'text-[var(--color-heading)] hover:bg-[var(--primary-500)]/5'
                }`}
                style={{ fontWeight: isSelected || isFocused ? 'var(--weight-semi)' : 'var(--weight-normal)' }}
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

interface AdvancedFiltersState {
  quartos: string;
  suites: string;
  vagas: string;
  areaMin: string;
  codigo: string;
}

function AdvancedPanel({
  values,
  onChange,
  onClose,
}: {
  values: AdvancedFiltersState;
  onChange: (key: keyof AdvancedFiltersState, value: string) => void;
  onClose: () => void;
}) {
  /* IDs únicos para associar label ↔ input/select (WCAG 3.3.2) */
  const idQuartos       = useId();
  const idSuites        = useId();
  const idVagas         = useId();
  const idArea          = useId();
  const idCodigo        = useId();

  const gridFields = [
    { id: idQuartos, icon: BedDouble, label: 'Quartos', key: 'quartos' as const, options: ['', '1', '2', '3', '4'] },
    { id: idSuites,  icon: Bath,      label: 'Suítes',  key: 'suites' as const, options: ['', '1', '2', '3', '4'] },
    { id: idVagas,   icon: Car,       label: 'Vagas',   key: 'vagas' as const, options: ['', '1', '2', '3'] },
    { id: idArea,    icon: Maximize,  label: 'Área (m²)', key: 'areaMin' as const, options: ['', '50', '100', '150', '200', '300'] },
  ];

  return (
    <div className="bg-white rounded-[10px] mt-1.5 p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} aria-hidden="true" />
          <span
            className="text-[var(--text-xs)] uppercase tracking-[var(--tracking-link)] text-[var(--color-caption)]"
            style={{ fontWeight: 'var(--weight-semi)' }}
          >
            Busca Avançada
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-11 h-11 rounded-full hover:bg-[var(--neutral-100)] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar filtros avançados"
        >
          <X className="w-3.5 h-3.5 text-[var(--color-caption)]" aria-hidden="true" />
        </button>
      </div>

      {/* Grid: Quartos, Suítes, Vagas, Área */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {gridFields.map((field) => (
          <div key={field.label} className="space-y-1.5">
            <label
              htmlFor={field.id}
              className="flex items-center gap-1.5 text-[var(--text-xs)] uppercase tracking-[var(--tracking-button)] text-[var(--color-caption)]"
              style={{ fontWeight: 'var(--weight-semi)' }}
            >
              <field.icon className="w-3.5 h-3.5" aria-hidden="true" /> {field.label}
            </label>
            <select
              id={field.id}
              value={values[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[var(--text-sm)] text-[var(--color-heading)] border-0 outline-none appearance-none cursor-pointer"
              style={{ fontWeight: 'var(--weight-medium)' }}
            >
              {field.options.map((option) => (
                <option key={option} value={option}>{option ? `${option}+` : 'Qualquer'}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Código */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="space-y-1.5">
          <label
            htmlFor={idCodigo}
            className="flex items-center gap-1.5 text-[var(--text-xs)] uppercase tracking-[var(--tracking-button)] text-[var(--color-caption)]"
            style={{ fontWeight: 'var(--weight-semi)' }}
          >
            <Hash className="w-3.5 h-3.5" aria-hidden="true" /> Código
          </label>
          <input
            id={idCodigo}
            type="text"
            placeholder="Ex: UNUS-1234"
            value={values.codigo}
            onChange={(event) => onChange('codigo', event.target.value)}
            className="w-full bg-[var(--neutral-100)] rounded-lg px-3 py-2.5 text-[var(--text-sm)] text-[var(--color-heading)] border-0 outline-none placeholder:text-[var(--secondary-300)]"
            style={{ fontWeight: 'var(--weight-medium)' }}
          />
        </div>
      </div>

      {/* Características Especiais */}
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
  const [selectedLocation, setSelectedLocation] = useState('Todas as regiões');
  const [selectedType, setSelectedType]         = useState('Todos os tipos');
  const [precoMin, setPrecoMin]                 = useState('');
  const [precoMax, setPrecoMax]                 = useState('');
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    quartos: '',
    suites: '',
    vagas: '',
    areaMin: '',
    codigo: '',
  });
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

    if (selectedLocation !== 'Todas as regiões') params.set('bairro', selectedLocation);
    if (selectedType !== 'Todos os tipos') params.set('tipo', selectedType);
    if (precoMin) params.set('precoMin', precoMin);
    if (precoMax) params.set('precoMax', precoMax);
    Object.entries(advancedFilters).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim());
    });

    onSearch?.({
      location: selectedLocation,
      type: selectedType,
      value: precoMax || precoMin || '',
    });

    router.push(vendaUrl(Object.fromEntries(params.entries())));
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const outerClass = glass
    ? 'p-0'
    : 'bg-[var(--neutral-100)] p-2 rounded-[28px]';

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={outerClass}>
        <div
          className={`bg-white rounded-[22px] p-2 flex flex-col items-stretch relative ${
            glass ? 'shadow-[0_8px_32px_rgba(0,0,0,0.18)]' : 'shadow-none'
          } ${
            compact
              ? 'gap-0 md:flex-row'
              : 'md:grid md:grid-cols-[minmax(150px,1fr)_1px_minmax(180px,1.1fr)_1px_minmax(145px,0.9fr)_auto]'
          }`}
        >
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

          <PriceRangeField
            precoMin={precoMin}
            precoMax={precoMax}
            isOpen={activeDropdown === 'value'}
            onToggle={() => toggleDropdown('value')}
            onApply={(min, max) => {
              setPrecoMin(min);
              setPrecoMax(max);
              setActiveDropdown(null);
            }}
            compact={compact}
          />

          <div
            className={`flex items-center gap-2 ${
              compact
                ? 'p-1 pl-0 md:pl-1'
                : 'p-1.5 pt-2 md:pt-1.5 border-t md:border-t-0 border-[var(--neutral-200)] mt-1 md:mt-0 md:justify-end md:pl-3'
            }`}
          >
            <button
              type="button"
              className={`flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                'w-11 h-11'
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
              aria-label="Buscar imóvel"
              className={`bg-[var(--deep-blue)] text-white rounded-lg flex items-center justify-center gap-2.5 hover:bg-[var(--deep-blue-light)] transition-colors cursor-pointer ${
                compact
                  ? 'px-5 py-2.5 min-h-11 flex-1 md:flex-none'
                  : 'px-8 py-3.5 md:py-3 min-h-11 flex-1 md:flex-none'
              }`}
            >
              <Search className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} strokeWidth={1.5} />
              <span
                className={`tracking-[0.02em] uppercase whitespace-nowrap ${compact ? 'text-[var(--text-xs)]' : 'text-[var(--text-sm)]'}`}
                style={{ fontWeight: 'var(--weight-medium)' }}
              >
                Buscar imóvel
              </span>
            </button>
          </div>
        </div>

        {showAdvanced && (
          <div id={advancedPanelId}>
            <AdvancedPanel
              values={advancedFilters}
              onChange={(key, value) => setAdvancedFilters((current) => ({ ...current, [key]: value }))}
              onClose={() => setShowAdvanced(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
