'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone, Calendar, Maximize2, Heart, BedDouble } from 'lucide-react';
import { ContentImage } from './ContentImage';
import { Badge, Divider, LinkButton } from '@/components/ui';
import { whatsappUrl, WA_EMPREENDIMENTO, PHONE_HREF } from '@/lib/constants';
import { useFavorites } from '@/hooks/useFavorites';
import type { VistaImovelItem } from '@/types/vista';

function getSlug(emp: VistaImovelItem) {
  const bairro = (emp.Bairro || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const cidade = (emp.Cidade || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${bairro}-${cidade}-${emp.Codigo}`;
}

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

export function EmpreendimentoCard({ empreendimento: emp }: EmpreendimentoCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const { isFavorited: favorited, toggle: toggleFavorite } = useFavorites(`emp-${emp.Codigo}`);

  const slug   = getSlug(emp);
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

  const waHref = whatsappUrl(WA_EMPREENDIMENTO(title, emp.Bairro ?? '', emp.Cidade ?? ''));

  return (
    <article
      className="group relative flex flex-col lg:flex-row w-full overflow-hidden"
      style={{
        borderLeft: '4px solid var(--gold)',
        boxShadow: '0 2px 24px rgba(21,20,16,0.10), 0 1px 4px rgba(21,20,16,0.06)',
        background: 'var(--neutral-900)',
      }}
    >
      {/* ── Esquerda: Slider ──────────────────────────────── */}
      <div
        className="relative w-full lg:w-[52%] shrink-0 overflow-hidden"
        style={{ minHeight: '360px' }}
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
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>
        ))}

        {/* Gradiente de transição para o painel */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, transparent 60%, rgba(21,20,16,0.5) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, rgba(21,20,16,0.5), transparent)' }}
        />

        {/* Link cobre a imagem */}
        <Link href={href} className="absolute inset-0 z-20" aria-label={`Ver ${title}`} />

        {/* Favorito */}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(); }}
          className="absolute top-4 left-4 z-30 w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
          style={{
            background: favorited ? 'rgba(224,82,82,0.85)' : 'color-mix(in srgb, var(--neutral-900) 45%, transparent)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className="w-4 h-4 transition-all duration-200"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white backdrop-blur-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white backdrop-blur-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white"
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
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
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
              className="absolute top-4 right-4 z-30 px-2.5 py-1 text-[10px] tracking-[0.08em] backdrop-blur-sm"
              style={{
                color: 'rgba(255,255,255,0.80)',
                background: 'color-mix(in srgb, var(--neutral-900) 50%, transparent)',
                border: '1px solid rgba(255,255,255,0.10)',
                fontWeight: 500,
              }}
            >
              {slideIndex + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* ── Direita: Painel de conteúdo ───────────────────── */}
      <div
        className="flex flex-col flex-1 px-10 py-10 lg:px-12 lg:py-12 justify-between gap-8"
        style={{ background: 'var(--neutral-900)' }}
      >
        <div className="flex flex-col gap-5">

          {/* Status badge */}
          <div>
            <Badge variant="gold">{status}</Badge>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--primary-400)' }} strokeWidth={1.5} />
            <span
              className="text-[14px] uppercase tracking-[0.15em]"
              style={{ color: 'var(--primary-400)', fontWeight: 600 }}
            >
              {emp.Bairro}{emp.Cidade ? `, ${emp.Cidade}` : ''}
            </span>
          </div>

          {/* Título */}
          <Link href={href} className="block group/title">
            <h3
              className="text-white leading-[1.05] tracking-[-0.02em] transition-colors duration-300 group-hover/title:opacity-80"
              style={{
                fontWeight: 400,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(36px, 4vw, 58px)',
              }}
            >
              {title}
            </h3>
          </Link>

          {/* Preço — destaque visual forte */}
          {price && (
            <div
              className="pl-4 border-l-2"
              style={{ borderColor: 'var(--gold)' }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.2em] mb-1.5"
                style={{ color: 'var(--gold)', fontWeight: 600 }}
              >
                A partir de
              </p>
              <p
                className="text-white text-[28px] leading-none"
                style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
              >
                {price}
              </p>
            </div>
          )}

          {/* Separador */}
          <Divider variant="gold-left" />

          {/* Metadados */}
          {(suitesLabel || areaLabel || dataEntrega) && (
            <div className="flex flex-col gap-3.5">
              {suitesLabel && (
                <div className="flex items-center gap-3">
                  <BedDouble className="w-4 h-4 shrink-0" style={{ color: 'var(--gold-dark)' }} strokeWidth={1.5} />
                  <span className="text-[15px] text-white/80" style={{ fontWeight: 400 }}>
                    {suitesLabel}
                  </span>
                </div>
              )}
              {areaLabel && (
                <div className="flex items-center gap-3">
                  <Maximize2 className="w-4 h-4 shrink-0" style={{ color: 'var(--gold-dark)' }} strokeWidth={1.5} />
                  <span className="text-[15px] text-white/80" style={{ fontWeight: 400 }}>
                    {areaLabel}
                  </span>
                </div>
              )}
              {dataEntrega && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: 'var(--gold-dark)' }} strokeWidth={1.5} />
                  <span className="text-[15px] text-white/80" style={{ fontWeight: 400 }}>
                    Data de entrega: {dataEntrega}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Descrição */}
          {descricao && (
            <p
              className="text-[15px] leading-[1.85]"
              style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
            >
              {descricao}
            </p>
          )}
        </div>

        {/* Rodapé: CTA + botões */}
        <div
          className="flex flex-col gap-5 pt-6 border-t"
          style={{ borderColor: 'color-mix(in srgb, var(--gold) 25%, transparent)' }}
        >
          {/* Link CTA */}
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-2.5 text-[13px] uppercase tracking-[0.22em] transition-all duration-200"
            style={{ color: 'var(--gold)', fontWeight: 600 }}
          >
            Conheça o empreendimento
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1.5"
              strokeWidth={2}
            />
          </Link>

          {/* Botões */}
          <div className="flex items-center gap-3">
            <LinkButton
              href={waHref}
              variant="whatsapp"
              size="md"
              external
              aria-label="Conversar no WhatsApp"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </LinkButton>

            <LinkButton
              href={PHONE_HREF}
              variant="phone"
              size="md"
              aria-label="Ligar para a UNUS"
            >
              <Phone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              Ligar
            </LinkButton>
          </div>
        </div>
      </div>
    </article>
  );
}
