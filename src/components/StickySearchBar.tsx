'use client';

import { Search, MapPin, Building, ChevronDown, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiMetadataResponse } from '@/types/vista';

const BUSINESS_TYPES = ['Venda', 'Locação', 'Temporada'];

export function StickySearchBar({ metadata }: { metadata?: ApiMetadataResponse }) {
  const [visible, setVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const locations = useMemo(() => {
    const list = metadata?.bairros || [];
    return ['Localidade', ...list];
  }, [metadata]);

  const types = useMemo(() => {
    const list = metadata?.categorias || [];
    return ['Tipo do Imóvel', ...list];
  }, [metadata]);

  const router = useRouter();
  const [businessType, setBusinessType] = useState('Venda');
  const [propertyType, setPropertyType] = useState('Tipo do Imóvel');
  const [location, setLocation] = useState('Localidade');
  const [code, setCode] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location !== 'Localidade') params.set('bairro', location);
    if (propertyType && propertyType !== 'Tipo do Imóvel') params.set('tipo', propertyType);
    if (code.trim()) params.set('codigo', code.trim());
    router.push(`/venda?${params.toString()}`);
  };

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 lg:top-24 left-0 right-0 z-40 bg-white border-b border-[var(--neutral-200)] shadow-[var(--shadow-soft)]"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div ref={containerRef} className="flex items-center h-[52px] gap-0">

              {/* Tipo de Negócio */}
              <DropdownField
                value={businessType}
                options={BUSINESS_TYPES}
                isOpen={activeDropdown === 'business'}
                onToggle={() => { setActiveDropdown(activeDropdown === 'business' ? null : 'business'); }}
                onSelect={(v) => { setBusinessType(v); setActiveDropdown(null); }}
                placeholder="Tipo de Negócio"
              />

              <div className="w-[1px] h-7 bg-[var(--neutral-300)]" />

              {/* Tipo do Imóvel */}
              <DropdownField
                value={propertyType}
                options={types}
                isOpen={activeDropdown === 'property'}
                onToggle={() => { setActiveDropdown(activeDropdown === 'property' ? null : 'property'); }}
                onSelect={(v) => { setPropertyType(v); setActiveDropdown(null); }}
                placeholder="Tipo do Imóvel"
              />

              <div className="w-[1px] h-7 bg-[var(--neutral-300)]" />

              {/* Localidade */}
              <DropdownField
                value={location}
                options={locations}
                isOpen={activeDropdown === 'location'}
                onToggle={() => { setActiveDropdown(activeDropdown === 'location' ? null : 'location'); }}
                onSelect={(v) => { setLocation(v); setActiveDropdown(null); }}
                placeholder="Localidade"
              />

              <div className="w-[1px] h-7 bg-gray-200 hidden sm:block" />

              {/* Código */}
              <div className="hidden sm:flex items-center flex-1 max-w-[140px]">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Código"
                  className="w-full h-full px-4 text-[13px] text-[var(--color-heading)] bg-transparent border-0 outline-none placeholder:text-[var(--secondary-400)]"
                  style={{ fontWeight: 400 }}
                />
              </div>

              {/* Pesquisar */}
              <button onClick={handleSearch} className="ml-auto bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white px-6 lg:px-8 h-9 rounded-md flex items-center gap-2 transition-colors cursor-pointer shrink-0">
                <Search className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="text-[12px] uppercase tracking-[0.08em] hidden sm:inline" style={{ fontWeight: 600 }}>
                  Pesquisar
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Inline Dropdown ── */
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
  onSelect: (v: string) => void;
  placeholder: string;
}) {
  const isDefault = value === placeholder || value === options[0];

  return (
    <div
      className="relative flex-1 min-w-0 h-full flex items-center cursor-pointer hover:bg-[var(--neutral-50)]/80 transition-colors"
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      <div className="flex items-center justify-between w-full px-4 gap-2">
        <span
          className={`text-[13px] truncate ${isDefault ? 'text-[var(--secondary-400)]' : 'text-[var(--color-heading)]'}`}
          style={{ fontWeight: isDefault ? 400 : 500 }}
        >
          {value}
        </span>
        <ChevronDown className={`w-3 h-3 text-[var(--secondary-400)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-xl shadow-2xl border border-t-0 border-[var(--neutral-200)] py-1.5 z-[100] max-h-[240px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((opt) => (
              <button
                key={opt}
                className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--primary-500)]/5 transition-colors cursor-pointer ${
                  value === opt ? 'text-[var(--primary-500)] bg-[var(--primary-500)]/5' : 'text-[var(--color-heading)]'
                }`}
                style={{ fontWeight: value === opt ? 600 : 400 }}
                onClick={() => onSelect(opt)}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
