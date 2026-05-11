'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { whatsappUrl } from '@/lib/constants';

const TIPOS = [
  'Apartamento',
  'Casa',
  'Cobertura',
  'Terreno',
  'Sala Comercial',
  'Outro',
];

const QUARTOS = ['Studio', '1 quarto', '2 quartos', '3 quartos', '4+ quartos'];

export function AnuncieForm() {
  const [name, setName]     = useState('');
  const [phone, setPhone]   = useState('');
  const [email, setEmail]   = useState('');
  const [tipo, setTipo]     = useState('');
  const [quartos, setQuartos] = useState('');
  const [lgpd, setLgpd]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      'Olá! Quero anunciar meu imóvel pela UNUS.',
      '',
      `Nome: ${name}`,
      tipo    ? `Tipo de imóvel: ${tipo}`       : '',
      quartos ? `Número de quartos: ${quartos}` : '',
      `Telefone: ${phone}`,
      email   ? `E-mail: ${email}`              : '',
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

      {/* Tipo + Quartos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className={labelBase} htmlFor="anuncie-tipo">Tipo de imóvel</label>
          <div className="relative">
            <select
              id="anuncie-tipo"
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={`${inputBase} cursor-pointer appearance-none pr-8 ${
                tipo === '' ? 'text-[var(--neutral-400)]' : 'text-[var(--secondary-900)]'
              }`}
              style={{ fontWeight: 300 }}
            >
              <option value="" disabled>Selecione</option>
              {TIPOS.map((t) => (
                <option key={t} value={t} className="text-[var(--secondary-900)]">{t}</option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-0 bottom-3.5 w-4 h-4 text-[var(--neutral-400)] pointer-events-none"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div>
          <label className={labelBase} htmlFor="anuncie-quartos">Nº de quartos</label>
          <div className="relative">
            <select
              id="anuncie-quartos"
              value={quartos}
              onChange={(e) => setQuartos(e.target.value)}
              className={`${inputBase} cursor-pointer appearance-none pr-8 ${
                quartos === '' ? 'text-[var(--neutral-400)]' : 'text-[var(--secondary-900)]'
              }`}
              style={{ fontWeight: 300 }}
            >
              <option value="">Selecione</option>
              {QUARTOS.map((q) => (
                <option key={q} value={q} className="text-[var(--secondary-900)]">{q}</option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-0 bottom-3.5 w-4 h-4 text-[var(--neutral-400)] pointer-events-none"
              strokeWidth={1.5}
            />
          </div>
        </div>
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
