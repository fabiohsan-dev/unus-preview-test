'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContentImage } from '@/components/ContentImage';
import { WA_EMPREENDIMENTOS_PAGE, whatsappUrl } from '@/lib/constants';
import type { VistaImovelItem } from '@/types/vista';

type HomeDevelopmentsCTAProps = {
  developments?: VistaImovelItem[];
  developmentsCount?: number;
};

function getRandomImage(images: string[], current?: string | null) {
  if (images.length === 0) return '/Sala-UNUS-8.jpg';
  if (images.length === 1) return images[0];

  const candidates = images.filter((image) => image !== current);
  return candidates[Math.floor(Math.random() * candidates.length)] ?? images[0];
}

export function HomeDevelopmentsCTA({
  developments,
  developmentsCount,
}: HomeDevelopmentsCTAProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const developmentImages = useMemo(() => {
    const all: string[] = [];

    for (const item of developments ?? []) {
      if (item.FotosSlider && item.FotosSlider.length > 0) {
        all.push(...item.FotosSlider);
      }
      if (item.FotoDestaque) {
        all.push(item.FotoDestaque);
      }
      if (item.FotoDestaquePequena) {
        all.push(item.FotoDestaquePequena);
      }
    }

    return Array.from(new Set(all.filter(Boolean)));
  }, [developments]);

  useEffect(() => {
    setSelectedImage((current) => getRandomImage(developmentImages, current));

    if (developmentImages.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setSelectedImage((current) => getRandomImage(developmentImages, current));
    }, 6500);

    return () => window.clearInterval(interval);
  }, [developmentImages]);

  const count = developmentsCount ?? developments?.length ?? 0;
  const countLabel = String(count).padStart(2, '0');

  return (
    <section className="pb-20 lg:pb-28 px-6 sm:px-8 lg:px-12 bg-[var(--off-white)]">
      <div className="max-w-[1400px] mx-auto">
        <article
          className="overflow-hidden rounded-[8px] grid grid-cols-1 lg:grid-cols-[59.2fr_40.8fr] min-h-[607px] bg-[#080908]"
          style={{ boxShadow: '0 2px 24px rgba(21,20,16,0.10), 0 1px 4px rgba(21,20,16,0.06)' }}
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

            {/* Overlay base — igual ao EmpreendimentoCard */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(0deg, rgba(4,5,5,0.52), rgba(4,5,5,0.52))' }}
            />

            {/* Degradê horizontal para transição — desktop */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                background: `linear-gradient(
                  90deg,
                  rgba(0,0,0,0.02) 0%,
                  rgba(9,10,9,0) 40%,
                  rgba(9,10,9,0.18) 62%,
                  rgba(4,5,5,0.55) 80%,
                  rgba(4,5,5,0.92) 100%
                )`,
              }}
            />

            {/* Degradê vertical — tablet/mobile */}
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{
                background: `linear-gradient(
                  0deg,
                  rgba(4,5,5,0.72) 0%,
                  rgba(4,5,5,0.10) 58%,
                  rgba(4,5,5,0.03) 100%
                )`,
              }}
            />

            {/* Kicker + subtítulo — canto inferior esquerdo */}
            <div className="absolute bottom-7 left-7 max-w-[280px]">
              <p className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.24em] mb-2">
                Empreendimentos
              </p>
              <p className="text-[rgba(245,241,233,0.65)] text-[13px] font-light leading-[1.56]">
                Veja alguns empreendimentos disponíveis na UNUS.
              </p>
            </div>

            {/* Contador — canto superior direito */}
            {count > 0 && (
              <div
                className="absolute top-6 right-6 flex items-baseline gap-[7px] px-[13px] py-2 backdrop-blur-md"
                style={{
                  background: 'rgba(0,0,0,0.30)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.22)',
                }}
              >
                <span
                  className="font-serif leading-none"
                  style={{ fontSize: '18px', fontWeight: 500, color: 'var(--gold)' }}
                >
                  {countLabel}
                </span>
                <span className="text-[rgba(245,241,233,0.86)] text-[10px] font-medium uppercase tracking-[0.14em]">
                  / empreendimentos
                </span>
              </div>
            )}
          </div>

          {/* ── Painel CTA ── */}
          <div
            className="flex h-full min-h-[390px] flex-col justify-between border-l border-white/[0.02] px-[22px] py-7 sm:px-7 sm:py-8 lg:min-h-0 lg:px-[52px] lg:py-[42px] lg:pb-10"
            style={{ background: '#090a09' }}
          >
            <div className="flex h-full max-w-[520px] flex-col">

              {/* Badge de status — igual ao EmpreendimentoCard */}
              <span
                className="inline-flex h-[25px] w-fit items-center justify-center px-[13px] text-[9px] font-semibold uppercase leading-none tracking-[0.34em] text-[var(--gold)] mb-[18px]"
                style={{ border: '1px solid rgba(199,154,32,0.38)' }}
              >
                Empreendimentos
              </span>

              {/* Eyebrow */}
              <p className="text-[12px] font-medium uppercase leading-[1.25] tracking-[0.28em] text-[rgba(184,186,198,0.92)] mb-[22px]">
                Curadoria UNUS
              </p>

              {/* Título */}
              <h2
                className="font-serif font-semibold text-white leading-[0.98] line-clamp-2"
                style={{
                  fontSize: 'clamp(34px, 3.2vw, 46px)',
                  letterSpacing: '-0.015em',
                  textShadow: '0 10px 28px rgba(0,0,0,0.38)',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                Empreendimentos UNUS
              </h2>

              {/* Divider — igual ao CardDivider */}
              <div
                className="my-7 h-px w-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(199,154,32,0.34) 0%, rgba(199,154,32,0.18) 42%, rgba(199,154,32,0.07) 72%, rgba(9,10,9,0) 100%)',
                }}
              />

              {/* Descrição */}
              <p
                className="font-normal leading-[1.82] tracking-[-0.01em]"
                style={{ fontSize: '14.5px', color: 'rgba(245,241,233,0.82)', maxWidth: 460 }}
              >
                Veja opções para morar ou investir, com detalhes sobre localização,
                metragem, entrega e diferenciais.
              </p>

              {/* Divider */}
              <div
                className="mb-7 mt-auto h-px w-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(199,154,32,0.34) 0%, rgba(199,154,32,0.18) 42%, rgba(199,154,32,0.07) 72%, rgba(9,10,9,0) 100%)',
                }}
              />

              {/* CTA link — igual ao "Conheça o empreendimento" */}
              <Link
                href="/empreendimentos"
                className="group/cta inline-flex w-fit items-center gap-[9px] text-[11.5px] font-medium uppercase leading-[1.2] tracking-[0.24em] text-[var(--gold)] transition-all duration-200 hover:gap-[15px] hover:opacity-80 mb-7"
              >
                Ver empreendimentos
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              </Link>

              {/* Botões — igual ao EmpreendimentoCard */}
              <div className="flex flex-col items-start gap-[18px] sm:flex-row sm:items-center sm:gap-[38px]">
                <a
                  href={whatsappUrl(WA_EMPREENDIMENTOS_PAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[46px] w-full min-w-[152px] items-center justify-center gap-2.5 px-[22px] text-[11.5px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-200 hover:-translate-y-px hover:brightness-110 sm:w-auto"
                  style={{ background: 'var(--color-action-whatsapp)' }}
                >
                  <svg className="h-[17px] w-[17px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>

                <Link
                  href="/empreendimentos"
                  className="inline-flex items-center gap-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-200 hover:text-[rgba(245,241,233,0.9)]"
                  style={{ color: '#777a77' }}
                >
                  <ArrowRight className="h-[15px] w-[15px] shrink-0" strokeWidth={1.7} />
                  Ver todos
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
