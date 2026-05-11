'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { PHONE_HREF } from '@/lib/constants';
import { whatsappPropertyLead } from '@/lib/whatsapp';

export function ImovelContact({
  title,
  bairro,
  propertyRef,
  transactionLabel,
  price,
  condoPrice,
  agentName,
  agentPhoto,
  corretorCelular,
}: {
  title: string;
  bairro?: string;
  propertyRef: string;
  transactionLabel: string;
  price: string;
  condoPrice: string | null;
  agentName: string;
  agentPhoto?: string;
  corretorCelular?: string;
}) {
  const [visitName, setVisitName] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitPhone, setVisitPhone] = useState('');

  const leadUrl = () => whatsappPropertyLead({
    title,
    bairro,
    codigo: propertyRef,
    pathOrUrl: typeof window !== 'undefined' ? window.location.href : undefined,
  });

  const submitVisit = (event: FormEvent) => {
    event.preventDefault();
    window.open(
      whatsappPropertyLead({
        title,
        bairro,
        codigo: propertyRef,
        pathOrUrl: window.location.href,
        name: visitName,
        email: visitEmail,
        phone: visitPhone,
      }),
      '_blank',
      'noopener,noreferrer',
    );
  };

  const phoneHref = corretorCelular ? `tel:+55${corretorCelular.replace(/\D/g, '')}` : PHONE_HREF;

  return (
    <div className="w-full lg:w-[37%]">
      <div className="sticky top-32 bg-white border border-[var(--color-border)] shadow-[var(--shadow-elevated)]">
        <div className="p-7 border-b border-[var(--color-border)]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)] mb-2" style={{ fontWeight: 600 }}>{transactionLabel}</p>
          <p className="text-[var(--color-heading)] text-[40px] leading-none mb-4" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{price}</p>
          {condoPrice && (
            <div className="flex items-center justify-between bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3">
              <span className="text-[var(--color-body)] text-[13px]">Condominio</span>
              <span className="text-[var(--color-heading)] text-[14px]" style={{ fontWeight: 600 }}>{condoPrice}</span>
            </div>
          )}
        </div>

        <div className="p-7 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-4 mb-5">
            {agentPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={agentPhoto} alt={agentName} className="w-14 h-14 object-cover border border-[var(--color-border)]" />
            ) : (
              <div className="w-14 h-14 border border-[var(--color-border)] bg-[var(--neutral-50)] flex items-center justify-center text-[11px] uppercase tracking-[0.2em] text-[var(--color-caption)]">
                UNUS
              </div>
            )}
            <div>
              <p className="text-[var(--color-heading)] text-[14px]" style={{ fontWeight: 600 }}>{agentName}</p>
              <p className="text-[var(--color-caption)] text-[11px] uppercase tracking-[0.08em] mt-0.5" style={{ fontWeight: 500 }}>Corretor especialista - UNUS</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <a href={phoneHref} className="min-h-11 flex-1 border border-[var(--color-border)] text-[var(--color-heading)] py-3 text-[11px] uppercase tracking-[0.12em] hover:bg-[var(--neutral-50)] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 600 }}>
              <Phone className="w-4 h-4" /> Ligar
            </a>
            <a href={leadUrl()} target="_blank" rel="noopener noreferrer" className="min-h-11 flex-1 bg-[var(--color-action-whatsapp)] text-white py-3 text-[11px] uppercase tracking-[0.12em] hover:bg-[var(--success-dark)] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 600 }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="p-7">
          <h4 className="text-[var(--color-heading)] text-[18px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Agendar uma visita</h4>
          <form className="flex flex-col gap-3" onSubmit={submitVisit}>
            <input type="text" required value={visitName} onChange={(event) => setVisitName(event.target.value)} placeholder="Seu nome completo" className="w-full bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[13px] text-[var(--color-heading)] outline-none focus:border-[var(--secondary-900)] transition-colors" />
            <div className="flex gap-3">
              <input type="email" value={visitEmail} onChange={(event) => setVisitEmail(event.target.value)} placeholder="E-mail" className="w-full bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[13px] text-[var(--color-heading)] outline-none focus:border-[var(--secondary-900)] transition-colors" />
              <input type="tel" required value={visitPhone} onChange={(event) => setVisitPhone(event.target.value)} placeholder="Telefone" className="w-full bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[13px] text-[var(--color-heading)] outline-none focus:border-[var(--secondary-900)] transition-colors" />
            </div>
            <button type="submit" className="min-h-11 w-full bg-[var(--secondary-900)] text-white py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--secondary-800)] transition-colors flex items-center justify-center gap-2 mt-1" style={{ fontWeight: 600 }}>
              Solicitar agendamento <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
