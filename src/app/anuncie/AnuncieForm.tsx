'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import { whatsappUrl } from '@/lib/constants';

/* ─────────────────────────────────────────
   Dropdown customizado (substitui <select>)
───────────────────────────────────────── */
interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  required,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Fecha com Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    },
    []
  );

  const labelBase =
    'block text-[11px] uppercase tracking-[0.18em] text-[var(--neutral-500)] font-medium mb-1.5';

  return (
    <div ref={wrapRef} className="relative" onKeyDown={handleKeyDown}>
      <label
        htmlFor={id}
        className={labelBase}
      >
        {label}
        {required && <span className="sr-only"> (obrigatório)</span>}
      </label>

      {/* Trigger */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between border-b py-3 outline-none transition-colors text-[15px] cursor-pointer
          ${open
            ? 'border-[var(--secondary-900)]'
            : 'border-[var(--neutral-300)] hover:border-[var(--neutral-400)]'
          }`}
      >
        <span
          className={value ? 'text-[var(--secondary-900)]' : 'text-[var(--neutral-400)]'}
          style={{ fontWeight: value ? 300 : 300 }}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--neutral-400)] transition-transform duration-200 shrink-0 ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={1.5}
        />
      </button>

      {/* Lista */}
      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute top-[calc(100%+4px)] left-0 right-0 z-50
            bg-white border border-[var(--neutral-200)] shadow-[0_8px_32px_rgba(0,0,0,0.10)]
            py-1 max-h-60 overflow-y-auto"
        >
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <li key={opt} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3
                    text-[14px] text-left transition-colors duration-150
                    ${selected
                      ? 'bg-[var(--neutral-50)] text-[var(--secondary-900)]'
                      : 'text-[var(--color-body)] hover:bg-[var(--neutral-50)] hover:text-[var(--secondary-900)]'
                    }`}
                  style={{ fontWeight: selected ? 500 : 300 }}
                >
                  {opt}
                  {selected && (
                    <Check className="w-3.5 h-3.5 text-[var(--secondary-900)] shrink-0" strokeWidth={2} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Opções
───────────────────────────────────────── */
const TIPOS = [
  'Apartamento',
  'Casa',
  'Cobertura',
  'Terreno',
  'Sala Comercial',
  'Outro',
];

const QUARTOS = ['Studio', '1 quarto', '2 quartos', '3 quartos', '4+ quartos'];

/* ─────────────────────────────────────────
   Formulário
───────────────────────────────────────── */
export function AnuncieForm() {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [tipo, setTipo]       = useState('');
  const [quartos, setQuartos] = useState('');
  const [lgpd, setLgpd]       = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipo) return; // required no custom select

    const text = [
      'Olá! Quero anunciar meu imóvel pela UNUS.',
      '',
      `Nome: ${name}`,
      `Tipo de imóvel: ${tipo}`,
      quartos ? `Número de quartos: ${quartos}` : '',
      `Telefone: ${phone}`,
      email ? `E-mail: ${email}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  };

  const inputBase =
    'w-full bg-transparent border-b border-[var(--neutral-300)] py-3 ' +
    'focus:border-[var(--secondary-900)] outline-none transition-colors ' +
    'text-[15px] text-[var(--secondary-900)] placeholder:text-[var(--neutral-400)]';

  const labelBase =
    'block text-[11px] uppercase tracking-[0.18em] text-[var(--neutral-500)] font-medium mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-[500px]">

      {/* Nome + Telefone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className={labelBase} htmlFor="anuncie-nome">Nome</label>
          <input
            id="anuncie-nome"
            type="text"
            required
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputBase}
            style={{ fontWeight: 300 }}
          />
        </div>
        <div>
          <label className={labelBase} htmlFor="anuncie-tel">Telefone</label>
          <input
            id="anuncie-tel"
            type="tel"
            required
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputBase}
            style={{ fontWeight: 300 }}
          />
        </div>
      </div>

      {/* E-mail */}
      <div>
        <label className={labelBase} htmlFor="anuncie-email">E-mail</label>
        <input
          id="anuncie-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
          style={{ fontWeight: 300 }}
        />
      </div>

      {/* Tipo + Quartos — dropdowns customizados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <SelectField
          id="anuncie-tipo"
          label="Tipo de imóvel"
          placeholder="Selecione"
          options={TIPOS}
          value={tipo}
          onChange={setTipo}
          required
        />
        <SelectField
          id="anuncie-quartos"
          label="Nº de quartos"
          placeholder="Selecione"
          options={QUARTOS}
          value={quartos}
          onChange={setQuartos}
        />
      </div>

      {/* LGPD */}
      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="anuncie-lgpd"
          required
          checked={lgpd}
          onChange={(e) => setLgpd(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[var(--secondary-900)] cursor-pointer shrink-0"
        />
        <label
          htmlFor="anuncie-lgpd"
          className="text-[13px] text-[var(--color-body)] leading-[1.7] cursor-pointer"
          style={{ fontWeight: 300 }}
        >
          Concordo com a{' '}
          <span className="underline underline-offset-2 text-[var(--color-heading)]">
            Política de Privacidade
          </span>{' '}
          e autorizo o uso dos meus dados para contato sobre meu imóvel.
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center gap-3 bg-[var(--secondary-900)] text-white
          text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
          hover:bg-[var(--secondary-800)] transition-colors group"
      >
        Quero anunciar meu imóvel
        <ArrowRight
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          strokeWidth={1.5}
        />
      </button>

    </form>
  );
}
