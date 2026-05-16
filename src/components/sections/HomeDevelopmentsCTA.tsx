'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContentImage } from '@/components/ContentImage';
import { type OpportunityCardData } from '@/components/cards/OpportunityCard';
import { WHATSAPP_BASE } from '@/lib/constants';

type HomeDevelopmentsCTAProps = {
  developments?: OpportunityCardData[];
};

export function HomeDevelopmentsCTA({ developments }: HomeDevelopmentsCTAProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const validImages = (developments ?? [])
      .map((item) => item.image)
      .filter((img): img is string => Boolean(img));

    const uniqueImages = Array.from(new Set(validImages));

    if (uniqueImages.length > 0) {
      const index = Math.floor(Math.random() * uniqueImages.length);
      setSelectedImage(uniqueImages[index]);
    } else {
      setSelectedImage('/Sala-UNUS-8.jpg');
    }
  }, [developments]);

  const count = developments?.length ?? 0;
  const countLabel = String(count).padStart(2, '0');

  return (
    <section className="pb-20 lg:pb-28 px-6 sm:px-8 lg:px-12 bg-[var(--off-white)]">
      <div className="max-w-[1320px] mx-auto">
        <article
          className="overflow-hidden rounded-[8px] grid grid-cols-1 lg:grid-cols-[59.2fr_40.8fr] min-h-[607px]"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {/* ── Área da imagem ── */}
          <div className="relative min-h-[310px] lg:min-h-0">
            <ContentImage
              src={selectedImage || '/Sala-UNUS-8.jpg'}
              alt="Empreendimentos UNUS"
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={80}
            />

            {/* Degradê horizontal — desktop */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    rgba(0,43,69,0.02) 0%,
                    rgba(0,43,69,0.10) 42%,
                    rgba(0,43,69,0.22) 58%,
                    rgba(0,31,51,0.50) 78%,
                    rgba(0,24,39,0.92) 100%
                  ),
                  linear-gradient(
                    0deg,
                    rgba(0,24,39,0.16) 0%,
                    rgba(0,43,69,0) 48%
                  )
                `,
              }}
            />

            {/* Degradê vertical — tablet/mobile */}
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{
                background: `linear-gradient(
                  0deg,
                  rgba(0,24,39,0.72) 0%,
                  rgba(0,43,69,0.10) 58%,
                  rgba(0,43,69,0.03) 100%
                )`,
              }}
            />

            {/* Kicker + subtítulo — canto inferior esquerdo */}
            <div className="absolute bottom-7 left-7 max-w-[280px]">
              <p className="text-[var(--champagne)] text-[10px] font-semibold uppercase tracking-[0.24em] mb-2">
                Empreendimentos
              </p>
              <p className="text-white/65 text-[13px] font-light leading-[1.56]">
                Veja alguns empreendimentos disponíveis na UNUS.
              </p>
            </div>

            {/* Contador — canto superior direito */}
            {count > 0 && (
              <div
                className="absolute top-6 right-6 flex items-baseline gap-1.5 px-4 py-2"
                style={{
                  background: 'rgba(0,24,39,0.52)',
                  border: '1px solid rgba(249,247,243,0.12)',
                }}
              >
                <span
                  className="font-serif text-[var(--champagne)] leading-none"
                  style={{ fontSize: '18px', fontWeight: 500 }}
                >
                  {countLabel}
                </span>
                <span className="text-white/60 text-[10px] font-medium uppercase tracking-[0.16em]">
                  / empreendimentos
                </span>
              </div>
            )}
          </div>

          {/* ── Painel CTA ── */}
          <div
            className="flex flex-col justify-center px-6 py-[34px] sm:px-8 sm:py-[38px] lg:px-[60px] lg:py-[56px]"
            style={{
              background: `linear-gradient(
                135deg,
                var(--deep-blue) 0%,
                var(--deep-blue-700) 52%,
                var(--deep-blue-800) 100%
              )`,
            }}
          >
            <div style={{ maxWidth: 480 }}>

              {/* Badge */}
              <span
                className="inline-block mb-8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--champagne-soft)]"
                style={{ border: '1px solid rgba(194,168,120,0.28)' }}
              >
                UNUS
              </span>

              {/* Eyebrow */}
              <p className="text-[var(--champagne-soft)] text-[10px] font-semibold uppercase tracking-[0.24em] mb-4">
                Empreendimentos
              </p>

              {/* Título */}
              <h2
                className="font-serif font-semibold text-[var(--off-white)] leading-[0.98]"
                style={{
                  fontSize: 'clamp(44px, 4vw, 64px)',
                  letterSpacing: '-0.025em',
                }}
              >
                Empreendimentos UNUS
              </h2>

              {/* Descrição */}
              <p
                className="text-white/70 font-light leading-[1.82] mt-[22px]"
                style={{ fontSize: '15px', maxWidth: 460 }}
              >
                Veja opções para morar ou investir, com detalhes sobre localização,
                metragem, entrega e diferenciais.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-[30px] mt-8">
                <Link
                  href="/venda?ordem=mais-novo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[var(--champagne)] text-[var(--deep-blue-800)] px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] min-h-[46px] hover:-translate-y-px transition-transform duration-300 shrink-0"
                >
                  Ver opções
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>

                <a
                  href={WHATSAPP_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--champagne-soft)] text-[12px] font-medium uppercase tracking-[0.15em] pb-px border-b border-[var(--champagne)]/30 hover:gap-3 transition-all duration-300 group"
                >
                  Falar com a UNUS
                  <ArrowRight
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
