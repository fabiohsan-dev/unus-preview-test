'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiMetadataResponse } from '@/types/vista';

const BUSINESS_TYPES = ['Venda', 'Locação', 'Temporada'];

type IdleCallbackHandle = number;
type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleCallback, options?: { timeout: number }) => IdleCallbackHandle;
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
};

function DropdownField({
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  placeholder,
}: {
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  placeholder: string;
}) {
  const isDefault = value === placeholder || value === options[0];
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative flex-1 min-w-0 h-full flex items-center">
      <button
        ref={triggerRef}
        type="button"
        className="flex items-center justify-between w-full h-full px-4 gap-2 cursor-pointer hover:bg-[var(--neutral-50)]/80 transition-colors text-left"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`${placeholder}: ${value}`}
      >
        <span
          className={`text-[13px] truncate ${isDefault ? 'text-[var(--color-caption)]' : 'text-[var(--color-heading)]'}`}
          style={{ fontWeight: isDefault ? 400 : 500 }}
        >
          {value}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[var(--color-caption)] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-xl shadow-2xl border border-t-0 border-[var(--neutral-200)] py-1.5 z-[100] max-h-[240px] overflow-y-auto"
          role="listbox"
          aria-label={placeholder}
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
                className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--primary-500)]/5 transition-colors cursor-pointer ${
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

export function StickySearchBar() {
  const [visible, setVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ApiMetadataResponse>();
  const [metadataRequested, setMetadataRequested] = useState(false);
  const [businessType, setBusinessType] = useState('Venda');
  const [propertyType, setPropertyType] = useState('Tipo do Imóvel');
  const [location, setLocation] = useState('Localidade');
  const [code, setCode] = useState('');
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const locations = useMemo(() => ['Localidade', ...(metadata?.bairros || [])], [metadata]);
  const types = useMemo(() => ['Tipo do Imóvel', ...(metadata?.categorias || [])], [metadata]);

  const loadMetadata = useCallback(async () => {
    if (metadataRequested) {
      return;
    }

    setMetadataRequested(true);

    try {
      const response = await fetch('/api/imoveis/metadata', {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Metadata API error: ${response.status}`);
      }

      const payload = (await response.json()) as ApiMetadataResponse;
      setMetadata(payload);
    } catch {
      setMetadata(undefined);
    }
  }, [metadataRequested]);

  useEffect(() => {
    const windowWithIdle = window as IdleWindow;
    let idleHandle: IdleCallbackHandle | undefined;
    const timeoutHandle = window.setTimeout(() => {
      void loadMetadata();
    }, 1400);

    if (windowWithIdle.requestIdleCallback) {
      idleHandle = windowWithIdle.requestIdleCallback(() => {
        void loadMetadata();
      }, { timeout: 1600 });
    }

    return () => {
      window.clearTimeout(timeoutHandle);
      if (idleHandle !== undefined && windowWithIdle.cancelIdleCallback) {
        windowWithIdle.cancelIdleCallback(idleHandle);
      }
    };
  }, [loadMetadata]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.85;
      setVisible(shouldShow);

      if (window.scrollY > window.innerHeight * 0.45) {
        void loadMetadata();
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMetadata]);

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
    if (!activeDropdown) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location !== 'Localidade') {
      params.set('bairro', location);
    }

    if (propertyType !== 'Tipo do Imóvel') {
      params.set('tipo', propertyType);
    }

    if (code.trim()) {
      params.set('codigo', code.trim());
    }

    if (businessType !== 'Venda') {
      params.set('negocio', businessType.toLowerCase());
    }

    router.push(params.toString() ? `/venda?${params.toString()}` : '/venda');
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-20 lg:top-24 left-0 right-0 z-40 bg-white border-b border-[var(--neutral-200)] shadow-[var(--shadow-soft)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div ref={containerRef} className="flex items-center h-[52px] gap-0">
          <DropdownField
            value={businessType}
            options={BUSINESS_TYPES}
            isOpen={activeDropdown === 'business'}
            onToggle={() => {
              setActiveDropdown((current) => (current === 'business' ? null : 'business'));
            }}
            onSelect={(value) => {
              setBusinessType(value);
              setActiveDropdown(null);
            }}
            placeholder="Tipo de negócio"
          />

          <div className="w-[1px] h-7 bg-[var(--neutral-300)]" />

          <DropdownField
            value={propertyType}
            options={types}
            isOpen={activeDropdown === 'property'}
            onToggle={() => {
              setActiveDropdown((current) => (current === 'property' ? null : 'property'));
            }}
            onSelect={(value) => {
              setPropertyType(value);
              setActiveDropdown(null);
            }}
            placeholder="Tipo do imóvel"
          />

          <div className="w-[1px] h-7 bg-[var(--neutral-300)]" />

          <DropdownField
            value={location}
            options={locations}
            isOpen={activeDropdown === 'location'}
            onToggle={() => {
              setActiveDropdown((current) => (current === 'location' ? null : 'location'));
            }}
            onSelect={(value) => {
              setLocation(value);
              setActiveDropdown(null);
            }}
            placeholder="Localidade"
          />

          <div className="w-[1px] h-7 bg-[var(--neutral-300)] hidden sm:block" />

          <div className="hidden sm:flex items-center flex-1 max-w-[140px]">
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onFocus={() => void loadMetadata()}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Código"
              className="w-full h-full px-4 text-[13px] text-[var(--color-heading)] bg-transparent border-0 outline-none placeholder:text-[var(--color-caption)]"
              style={{ fontWeight: 400 }}
              aria-label="Código do imóvel"
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="ml-auto bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white px-6 lg:px-8 h-9 rounded-md flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            aria-label="Pesquisar imóveis"
          >
            <Search className="w-3.5 h-3.5" strokeWidth={2} />
            <span
              className="text-[12px] uppercase tracking-[0.08em] hidden sm:inline"
              style={{ fontWeight: 600 }}
            >
              Pesquisar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
