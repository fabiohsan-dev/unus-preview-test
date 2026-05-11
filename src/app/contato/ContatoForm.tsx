'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { whatsappUrl } from '@/lib/constants';

export function ContatoForm() {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Olá! Me chamo ${name}.`,
      message ? message : '',
      `Telefone: ${phone}`,
      email ? `E-mail: ${email}` : '',
    ].filter(Boolean).join('\n');

    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  };

  const inputBase =
    'w-full bg-transparent border-b border-[var(--neutral-300)] py-3 focus:border-[var(--secondary-900)] outline-none transition-colors text-[15px] text-[var(--secondary-900)] placeholder:text-[var(--neutral-400)]';

  const labelBase =
    'block text-[11px] uppercase tracking-[0.18em] text-[var(--neutral-500)] font-medium mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-[500px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className={labelBase} htmlFor="contato-nome">Nome</label>
          <input
            id="contato-nome"
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
          <label className={labelBase} htmlFor="contato-tel">Telefone</label>
          <input
            id="contato-tel"
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

      <div>
        <label className={labelBase} htmlFor="contato-email">E-mail</label>
        <input
          id="contato-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
          style={{ fontWeight: 300 }}
        />
      </div>

      <div>
        <label className={labelBase} htmlFor="contato-msg">Como podemos ajudar?</label>
        <textarea
          id="contato-msg"
          rows={4}
          placeholder="Conte-nos brevemente sobre seu interesse"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputBase} resize-none`}
          style={{ fontWeight: 300 }}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-3 bg-[var(--secondary-900)] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4 hover:bg-[var(--secondary-800)] transition-colors group"
      >
        Iniciar conversa pelo WhatsApp
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
      </button>
    </form>
  );
}
