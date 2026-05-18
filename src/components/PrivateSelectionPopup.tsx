'use client';

import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { ContentImage } from '@/components/ContentImage';
import { whatsappUrl } from '@/lib/constants';

type Interest = 'planta' | 'pronto' | null;

type PrivateSelectionPopupProps = {
  open: boolean;
  onClose: () => void;
};

export function PrivateSelectionPopup({ open, onClose }: PrivateSelectionPopupProps) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<Interest>(null);

  /* Body overflow lock + Escape key */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  const handleSubmit = useCallback(() => {
    const interestLabel =
      interest === 'planta'
        ? 'Imóvel na planta'
        : interest === 'pronto'
        ? 'Imóvel pronto'
        : 'Não informado';

    const msg = [
      'Olá! Gostaria de atendimento privado.',
      '',
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `E-mail: ${email}`,
      `Interesse: ${interestLabel}`,
    ].join('\n');

    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
    onClose();
  }, [nome, telefone, email, interest, onClose]);

  if (!open) return null;

  const canSubmit = nome.trim().length > 0 && telefone.trim().length > 0;

  return (
    /* Overlay — click fora fecha */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      aria-label="Fechar"
    >
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Atendimento privado UNUS"
        className="relative w-full max-w-[918px] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl"
        style={{ minHeight: 'clamp(520px, 80vh, 640px)' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Painel esquerdo — imagem editorial ── */}
        <div className="relative min-h-[240px] md:min-h-0">
          <ContentImage
            src="/Sala-UNUS-13.jpg"
            alt="Atendimento privado UNUS"
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 459px"
            quality={80}
          />

          {/* Overlay deep-blue */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(160deg, rgba(0,43,69,0.86) 0%, rgba(0,43,69,0.62) 48%, rgba(0,43,69,0.78) 100%)',
            }}
          />

          {/* Champagne glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 28% 85%, rgba(199,154,32,0.20) 0%, transparent 58%)',
            }}
          />

          {/* Conteúdo editorial */}
          <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
            {/* Badge topo */}
            <span
              className="self-start inline-flex h-[24px] items-center px-[13px] text-[9px] font-semibold uppercase tracking-[0.34em]"
              style={{
                color: 'var(--gold)',
                border: '1px solid rgba(199,154,32,0.38)',
              }}
            >
              Atendimento privado
            </span>

            {/* Headline rodapé */}
            <div>
              <p className="text-[rgba(245,241,233,0.52)] text-[10px] font-semibold uppercase tracking-[0.28em] mb-3">
                Curadoria UNUS
              </p>
              <h2 className="text-white text-3xl font-serif font-light leading-none tracking-[-0.02em]">
                Não encontrou o que{' '}
                <em
                  className="not-italic font-semibold"
                  style={{ color: 'var(--gold)' }}
                >
                  procurava?
                </em>
              </h2>
              <p className="text-[rgba(245,241,233,0.62)] text-[13px] font-light leading-[1.62] mt-3 max-w-[270px]">
                Nossos consultores encontram o imóvel certo para o seu perfil e
                estilo de vida.
              </p>
            </div>
          </div>
        </div>

        {/* ── Painel direito — formulário ── */}
        <div className="relative flex flex-col bg-white px-7 pt-8 pb-7 sm:px-9 sm:pt-9 sm:pb-8">
          {/* Botão fechar */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-colors duration-200"
            style={{ color: 'rgba(0,43,69,0.35)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = 'var(--deep-blue)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,43,69,0.35)')
            }
          >
            <X className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>

          {/* Cabeçalho do formulário */}
          <div className="mb-5 pr-8">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-5 h-[1px] bg-[var(--champagne)]" />
              <span className="text-[var(--champagne-readable)] text-[10px] font-semibold uppercase tracking-[0.22em]">
                Fale com um consultor
              </span>
            </div>
            <p className="text-[var(--champagne-readable)] text-lg font-serif">
              Descreva o que procura — entraremos em contato pelo WhatsApp.
            </p>
          </div>

          {/* Campos */}
          <div className="flex flex-col gap-3.5 flex-1">

            {/* Nome */}
            <div>
              <label className="block text-[9.5px] font-semibold uppercase tracking-[0.18em] mb-1.5"
                style={{ color: 'rgba(0,43,69,0.50)' }}>
                Nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full h-[44px] px-4 text-[13.5px] transition-colors duration-200 focus:outline-none"
                style={{
                  border: '1px solid rgba(0,43,69,0.14)',
                  color: 'var(--deep-blue)',
                  background: '#FAFAF9',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(0,43,69,0.38)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(0,43,69,0.14)')
                }
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-[9.5px] font-semibold uppercase tracking-[0.18em] mb-1.5"
                style={{ color: 'rgba(0,43,69,0.50)' }}>
                WhatsApp
              </label>
              <div className="flex">
                <span
                  className="flex items-center px-3 h-[44px] text-[12.5px] select-none shrink-0"
                  style={{
                    border: '1px solid rgba(0,43,69,0.14)',
                    borderRight: 'none',
                    color: 'rgba(0,43,69,0.45)',
                    background: '#F3F3F1',
                  }}
                >
                  🇧🇷 +55
                </span>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(48) 9 0000-0000"
                  className="flex-1 h-[44px] px-4 text-[13.5px] transition-colors duration-200 focus:outline-none min-w-0"
                  style={{
                    border: '1px solid rgba(0,43,69,0.14)',
                    color: 'var(--deep-blue)',
                    background: '#FAFAF9',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(0,43,69,0.38)')
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(0,43,69,0.14)')
                  }
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-[9.5px] font-semibold uppercase tracking-[0.18em] mb-1.5"
                style={{ color: 'rgba(0,43,69,0.50)' }}>
                E-mail <span style={{ color: 'rgba(0,43,69,0.30)' }}>(opcional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full h-[44px] px-4 text-[13.5px] transition-colors duration-200 focus:outline-none"
                style={{
                  border: '1px solid rgba(0,43,69,0.14)',
                  color: 'var(--deep-blue)',
                  background: '#FAFAF9',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(0,43,69,0.38)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(0,43,69,0.14)')
                }
              />
            </div>

            {/* Tipo de imóvel */}
            <div>
              <label className="block text-[9.5px] font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: 'rgba(0,43,69,0.50)' }}>
                Tipo de imóvel
              </label>
              <div className="flex gap-2">
                {(['planta', 'pronto'] as const).map((opt) => {
                  const label = opt === 'planta' ? 'Na planta' : 'Pronto para morar';
                  const active = interest === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setInterest(active ? null : opt)}
                      className="flex-1 h-[40px] text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-200"
                      style={{
                        background: active ? 'var(--deep-blue)' : 'transparent',
                        color: active ? 'white' : 'var(--deep-blue)',
                        border: active
                          ? '1px solid var(--deep-blue)'
                          : '1px solid rgba(0,43,69,0.18)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full h-[50px] flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-200 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--color-action-whatsapp)' }}
            >
              <svg
                className="h-[16px] w-[16px] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com um consultor
            </button>
            <p
              className="text-center text-[10px] mt-2.5 leading-[1.5]"
              style={{ color: 'rgba(0,43,69,0.30)' }}
            >
              Você será redirecionado ao WhatsApp. Sem compromisso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
