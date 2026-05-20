'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { ArrowRight } from 'lucide-react';
import { whatsappContactLead } from '@/lib/whatsapp';
import { PRIVACY_URL } from '@/lib/constants';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContatoForm() {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [lgpd, setLgpd]       = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (TURNSTILE_SITE_KEY && !turnstileToken) return;

    setVerifying(true);
    try {
      if (TURNSTILE_SITE_KEY && turnstileToken) {
        const res = await fetch('/api/verify-turnstile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: turnstileToken }),
        });
        if (!res.ok) { setVerifying(false); return; }
      }
      window.open(whatsappContactLead({ name, phone, email, message, origin: 'formulário Contato' }), '_blank', 'noopener,noreferrer');
    } finally {
      setVerifying(false);
    }
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

      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          id="contato-lgpd"
          required
          checked={lgpd}
          onChange={(e) => setLgpd(e.target.checked)}
          className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--secondary-900)] cursor-pointer"
        />
        <label
          htmlFor="contato-lgpd"
          className="text-[13px] text-[var(--color-body)] leading-[1.7] cursor-pointer"
          style={{ fontWeight: 300 }}
        >
          Ao continuar, você concorda em ser contatado pela UNUS para atendimento imobiliário.
          Seus dados serão usados apenas para responder à sua solicitação, conforme nossa{' '}
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[var(--color-heading)]"
          >
            Política de Privacidade
          </a>
          .
        </label>
      </div>

      {TURNSTILE_SITE_KEY && (
        <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={setTurnstileToken} />
      )}

      <button
        type="submit"
        disabled={verifying || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
        className="inline-flex items-center gap-3 bg-[var(--secondary-900)] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4 hover:bg-[var(--secondary-800)] transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {verifying ? 'Verificando...' : 'Iniciar conversa pelo WhatsApp'}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
      </button>
    </form>
  );
}
