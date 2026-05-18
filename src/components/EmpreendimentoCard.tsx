'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone, Calendar, Maximize2, Heart, BedDouble } from 'lucide-react';
import { ContentImage } from './ContentImage';
import { PHONE_HREF } from '@/lib/constants';
import { whatsappEmpreendimentoLead } from '@/lib/whatsapp';
import { useFavorites } from '@/hooks/useFavorites';
import type { VistaImovelItem } from '@/types/vista';
import { buildEmpreendimentoSlug } from '@/lib/slug';

function getDisplayTitle(emp: VistaImovelItem): string {
  if (emp.Empreendimento) return emp.Empreendimento;
  if (emp.TituloSite) return emp.TituloSite;
  return `Empreendimento em ${emp.Bairro}`;
}

function getStatusLabel(emp: VistaImovelItem): string {
  if (!emp.Status || emp.Status === 'Venda') return 'Venda';
  return emp.Status;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

function getSuitesLabel(min?: number, max?: number): string | null {
  if (min === undefined || max === undefined) return null;
  if (min === 0 && max === 0) return null; // studios: não exibir "0 suítes"
  if (min === max) return `${min} suíte${min !== 1 ? 's' : ''}`;
  return `${min} a ${max} suítes`;
}

function getAreaLabel(min?: number, max?: number): string | null {
  if (!min) return null;
  const fmt = (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  if (!max || min === max) return `${fmt(min)} m²`;
  return `${fmt(min)} – ${fmt(max)} m²`;
}

function getDescricao(text?: string): string | null {
  if (!text || text.trim() === '') return null;
  return text.replace(/<[^>]*>/g, '').trim();
}

interface EmpreendimentoCardProps {
  empreendimento: VistaImovelItem;
}

function CardDivider() {
  return (
    <div
      className="my-6 h-px w-full flex-none"
      style={{
        background:
          'linear-gradient(90deg, rgba(199,154,32,0.34) 0%, rgba(199,154,32,0.18) 42%, rgba(199,154,32,0.07) 72%, rgba(9,10,9,0) 100%)',
      }}
      role="separator"
      aria-hidden="true"
    />
  );
}

export function EmpreendimentoCard({ empreendimento: emp }: EmpreendimentoCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const { isFavorited: favorited, toggle: toggleFavorite } = useFavorites(`empreendimento:${emp.Codigo}`);

  const slug   = buildEmpreendimentoSlug(emp);
  const href   = `/empreendimento/${slug}`;
  const title  = getDisplayTitle(emp);
  const status = getStatusLabel(emp);

  const price       = emp.AggMinPreco && emp.AggMinPreco > 0 ? formatBRL(emp.AggMinPreco) : null;
  const suitesLabel = getSuitesLabel(emp.AggMinSuites, emp.AggMaxSuites);
  const areaLabel   = getAreaLabel(emp.AggMinArea, emp.AggMaxArea);
  const dataEntrega = emp.AggDataEntrega ?? null;
  const descricao   = getDescricao(emp.DescricaoEmpreendimento);

  const slides: string[] = (emp.FotosSlider && emp.FotosSlider.length > 0)
    ? emp.FotosSlider
    : emp.FotoDestaque ? [emp.FotoDestaque] : [];
  const total = slides.length;

  const prev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setSlideIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setSlideIndex((i) => (i + 1) % total);
  }, [total]);

  const waHref = whatsappEmpreendimentoLead({
    name: title,
    bairro: emp.Bairro,
    cidade: emp.Cidade,
    codigo: emp.Codigo,
    pathOrUrl: `/empreendimento/${slug}`,
  });

  return (
    <article
      className="group relative grid w-full overflow-hidden bg-[#080908] lg:min-h-[578px] lg:grid-cols-[54.8%_45.2%]"
      aria-label={`Empreendimento ${title}`}
      style={{
        boxShadow: '0 2px 24px rgba(21,20,16,0.10), 0 1px 4px rgba(21,20,16,0.06)',
      }}
    >
      {/* ── Esquerda: Slider ──────────────────────────────── */}
      <div
        className="relative min-h-[330px] w-full overflow-hidden bg-[var(--neutral-900)] sm:min-h-[430px] lg:min-h-[578px]"
        onMouseEnter={() => setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === slideIndex ? 1 : 0, zIndex: i === slideIndex ? 1 : 0 }}
          >
            <ContentImage
              src={src}
              alt={`${title} — foto ${i + 1}`}
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              protectedContent
              watermark={false}
            />
          </div>
        ))}

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(0deg, rgba(4,5,5,0.52), rgba(4,5,5,0.52))' }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.32) 100%)' }}
        />

        {/* Link cobre a imagem */}
        <Link href={href} className="absolute inset-0 z-20" aria-label={`Ver ${title}`} />

        {/* Favorito */}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(); }}
          className="absolute left-5 top-[17px] z-30 flex h-11 w-11 items-center justify-center text-white/90 transition-all duration-200 hover:scale-105 sm:left-6 lg:left-[22px]"
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className="h-[17px] w-[17px] transition-all duration-200"
            strokeWidth={1.8}
            style={{
              color: favorited ? 'white' : 'rgba(255,255,255,0.85)',
              fill: favorited ? 'white' : 'transparent',
            }}
          />
        </button>

        {/* Controles do slider */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center text-white backdrop-blur-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white"
              style={{
                background: 'color-mix(in srgb, var(--neutral-900) 55%, transparent)',
                border: '1px solid rgba(255,255,255,0.12)',
                opacity: isHoveringImage ? 1 : 0,
                transform: `translateY(-50%) translateX(${isHoveringImage ? '0' : '-8px'})`,
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center text-white backdrop-blur-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white"
              style={{
                background: 'color-mix(in srgb, var(--neutral-900) 55%, transparent)',
                border: '1px solid rgba(255,255,255,0.12)',
                opacity: isHoveringImage ? 1 : 0,
                transform: `translateY(-50%) translateX(${isHoveringImage ? '0' : '8px'})`,
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-[19px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setSlideIndex(i); }}
                  style={{
                    width: i === slideIndex ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === slideIndex ? 'var(--gold)' : 'rgba(255,255,255,0.35)',
                    transition: 'width 0.25s, background 0.25s',
                  }}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>

            {/* Contador */}
            <div
              className="absolute right-5 top-[22px] z-30 inline-flex h-[30px] min-w-[64px] items-center justify-center gap-[7px] border border-white/15 bg-black/30 px-[13px] text-[11px] font-medium leading-none tracking-[0.14em] text-white/85 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md lg:right-[52px]"
              style={{
                color: 'rgba(245,241,233,0.86)',
              }}
              aria-label={`Imagem ${slideIndex + 1} de ${total}`}
            >
              <span style={{ color: 'var(--gold)' }}>{slideIndex + 1}</span>
              <span className="text-white/35">/</span>
              <span>{total}</span>
            </div>
          </>
        )}

        <div className="pointer-events-none absolute bottom-3 right-5 z-30 border border-white/10 bg-black/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/60 lg:right-[53px]">
          Em Obras
        </div>
      </div>

      {/* ── Direita: Painel de conteúdo ───────────────────── */}
      <div
        className="flex flex-col justify-start border-l border-white/[0.02] bg-[#090a09] px-[22px] py-7 sm:px-7 sm:py-8 lg:px-[52px] lg:py-[42px] lg:pb-10"
      >
        <span className="inline-flex h-[25px] w-fit items-center justify-center border border-[rgba(199,154,32,0.38)] px-[13px] text-[9px] font-semibold uppercase leading-none tracking-[0.34em] text-[var(--gold)]">
          {status}
        </span>

        {/* Localização */}
        <div className="mt-[19px] flex items-center gap-[9px] text-[12px] font-medium uppercase leading-[1.25] tracking-[0.28em] text-[rgba(184,186,198,0.92)]">
          <MapPin className="h-[13px] w-[13px] shrink-0 text-[rgba(184,186,198,0.62)]" strokeWidth={1.45} />
          <span>
            {emp.Bairro}{emp.Cidade ? `, ${emp.Cidade}` : ''}
          </span>
        </div>

        {/* Título */}
        <Link href={href} className="group/title mt-[22px] block max-w-[520px]">
          <h3
            className="line-clamp-2 text-[34px] font-semibold leading-[0.98] tracking-[-0.015em] text-white transition-opacity duration-300 group-hover/title:opacity-75 lg:text-[clamp(34px,3.2vw,46px)]"
            style={{
              fontFamily: 'var(--font-serif)',
              textShadow: '0 10px 28px rgba(0,0,0,0.38)',
              textWrap: 'balance',
            }}
          >
            {title}
          </h3>
        </Link>

        {/* Preço */}
        {price && (
          <div className="mt-[26px] border-l-2 border-[var(--gold)] pl-[18px]">
            <span className="block text-[11px] font-medium uppercase leading-none tracking-[0.34em] text-[var(--gold)]">
              A partir de
            </span>
            <span
              className="mt-2.5 block text-[23px] font-medium leading-[1.05] tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {price}
            </span>
          </div>
        )}

        <CardDivider />

        {/* Metadados */}
        {(suitesLabel || areaLabel || dataEntrega) && (
          <div className="grid gap-5">
            {suitesLabel && (
              <div className="flex items-center gap-3 text-[14px] font-medium leading-[1.35] tracking-[-0.01em] text-[rgba(245,241,233,0.88)]">
                <BedDouble className="h-4 w-4 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                <span>{suitesLabel}</span>
              </div>
            )}
            {areaLabel && (
              <div className="flex items-center gap-3 text-[14px] font-medium leading-[1.35] tracking-[-0.01em] text-[rgba(245,241,233,0.88)]">
                <Maximize2 className="h-4 w-4 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                <span>{areaLabel}</span>
              </div>
            )}
            {dataEntrega && (
              <div className="flex items-center gap-3 text-[14px] font-medium leading-[1.35] tracking-[-0.01em] text-[rgba(245,241,233,0.88)]">
                <Calendar className="h-4 w-4 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                <span>Data de entrega: {dataEntrega}</span>
              </div>
            )}
          </div>
        )}

        {descricao && (
          <>
            <CardDivider />
            <p className="line-clamp-3 max-w-[500px] text-[14.5px] font-normal leading-[1.82] tracking-[-0.01em] text-[rgba(245,241,233,0.82)]">
              {descricao}
            </p>
          </>
        )}

        <CardDivider />

        <Link
          href={href}
          className="group/cta inline-flex w-fit items-center gap-[9px] text-[11.5px] font-medium uppercase leading-[1.2] tracking-[0.24em] text-[var(--gold)] transition-all duration-200 hover:gap-[15px] hover:opacity-80"
        >
          Conheça o empreendimento
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.8} />
        </Link>

        {/* Botões */}
        <div className="mt-7 flex flex-col items-start gap-[18px] sm:flex-row sm:items-center sm:gap-[38px]">
          <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[46px] w-full min-w-[152px] items-center justify-center gap-2.5 bg-[var(--color-action-whatsapp)] px-[22px] text-[11.5px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-200 hover:-translate-y-px hover:brightness-110 sm:w-auto"
              aria-label="Conversar no WhatsApp"
            >
              <svg className="h-[17px] w-[17px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.22em] text-[#777a77] transition-colors duration-200 hover:text-[rgba(245,241,233,0.9)]"
              aria-label="Ligar para a UNUS"
            >
              <Phone className="h-[15px] w-[15px] shrink-0" strokeWidth={1.7} />
              Ligar
            </a>
        </div>
      </div>
    </article>
  );
}
