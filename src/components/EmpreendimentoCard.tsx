'use client';

import { useCallback, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { ContentImage } from './ContentImage';
import { Badge, LinkButton } from '@/components/ui';
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getSuitesLabel(min?: number, max?: number): string | null {
  if (min === undefined || max === undefined) return null;
  if (min === 0 && max === 0) return null;
  if (min === max) return `${min} suíte${min !== 1 ? 's' : ''}`;
  return `${min} a ${max} suítes`;
}

function getAreaLabel(min?: number, max?: number): string | null {
  if (!min) return null;
  const fmt = (value: number) => value.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  if (!max || min === max) return `${fmt(min)} m²`;
  return `${fmt(min)} - ${fmt(max)} m²`;
}

function getDescricao(text?: string): string | null {
  if (!text || text.trim() === '') return null;
  return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

interface EmpreendimentoCardProps {
  empreendimento: VistaImovelItem;
}

export function EmpreendimentoCard({ empreendimento: emp }: EmpreendimentoCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const { isFavorited: favorited, toggle: toggleFavorite } = useFavorites(`empreendimento:${emp.Codigo}`);

  const slug = buildEmpreendimentoSlug(emp);
  const href = `/empreendimento/${slug}`;
  const title = getDisplayTitle(emp);
  const status = getStatusLabel(emp);

  const price = emp.AggMinPreco && emp.AggMinPreco > 0 ? formatBRL(emp.AggMinPreco) : null;
  const suitesLabel = getSuitesLabel(emp.AggMinSuites, emp.AggMaxSuites);
  const areaLabel = getAreaLabel(emp.AggMinArea, emp.AggMaxArea);
  const dataEntrega = emp.AggDataEntrega ?? null;
  const descricao = getDescricao(emp.DescricaoEmpreendimento);

  const slides: string[] = emp.FotosSlider?.length
    ? emp.FotosSlider
    : emp.FotoDestaque
      ? [emp.FotoDestaque]
      : [];
  const total = slides.length;
  const activeImage = slides[slideIndex] || emp.FotoDestaque || '';

  const prev = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (total <= 1) return;
    setSlideIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const next = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (total <= 1) return;
    setSlideIndex((index) => (index + 1) % total);
  }, [total]);

  const waHref = whatsappEmpreendimentoLead({
    name: title,
    bairro: emp.Bairro,
    cidade: emp.Cidade,
    codigo: emp.Codigo,
    pathOrUrl: `/empreendimento/${slug}`,
  });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[var(--neutral-300)] bg-white shadow-[0_8px_28px_rgba(21,20,16,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_38px_rgba(21,20,16,0.12)]">
      <div className="relative aspect-[16/10] min-h-[250px] overflow-hidden bg-[var(--neutral-900)]">
        <ContentImage
          src={activeImage}
          alt={`${title} - foto ${slideIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
          protectedContent
        />

        <Link href={href} className="absolute inset-0 z-10" aria-label={`Ver ${title}`} />

        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
          <Badge variant="gold">{status}</Badge>
          {total > 1 && (
            <span className="border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-white/85 backdrop-blur-sm">
              {slideIndex + 1} / {total}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite();
          }}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center border border-white/15 bg-black/35 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-105"
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorited}
        >
          <Heart
            className={`h-4 w-4 transition-all ${favorited ? 'fill-white text-white scale-110' : 'text-white/85'}`}
            strokeWidth={1.8}
          />
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100"
              aria-label="Próxima foto"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="mb-4 flex items-center gap-2 text-[var(--neutral-600)]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--gold-dark)]" strokeWidth={1.5} />
          <span className="truncate text-[12px] font-medium uppercase tracking-[0.14em]">
            {[emp.Bairro, emp.Cidade].filter(Boolean).join(', ') || 'Santa Catarina'}
          </span>
        </div>

        <Link href={href} className="block">
          <h3 className="min-h-[64px] text-[27px] leading-[1.12] text-[var(--color-heading)] line-clamp-2 transition-colors duration-200 group-hover:text-[var(--primary-500)]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
            {title}
          </h3>
        </Link>

        {price && (
          <div className="mt-5 border-l-2 border-[var(--gold)] pl-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
              A partir de
            </p>
            <p className="text-[25px] font-semibold leading-none text-[var(--neutral-900)]">
              {price}
            </p>
          </div>
        )}

        {(suitesLabel || areaLabel || dataEntrega) && (
          <div className="mt-6 grid grid-cols-1 gap-3 border-y border-[var(--neutral-200)] py-4 sm:grid-cols-3">
            {suitesLabel && (
              <div className="flex items-center gap-2.5 text-[14px] text-[var(--neutral-700)]">
                <BedDouble className="h-4 w-4 shrink-0 text-[var(--gold-dark)]" strokeWidth={1.5} />
                <span>{suitesLabel}</span>
              </div>
            )}
            {areaLabel && (
              <div className="flex items-center gap-2.5 text-[14px] text-[var(--neutral-700)]">
                <Maximize2 className="h-4 w-4 shrink-0 text-[var(--gold-dark)]" strokeWidth={1.5} />
                <span>{areaLabel}</span>
              </div>
            )}
            {dataEntrega && (
              <div className="flex items-center gap-2.5 text-[14px] text-[var(--neutral-700)]">
                <Calendar className="h-4 w-4 shrink-0 text-[var(--gold-dark)]" strokeWidth={1.5} />
                <span>{dataEntrega}</span>
              </div>
            )}
          </div>
        )}

        {descricao && (
          <p className="mt-5 text-[14px] leading-[1.75] text-[var(--color-body)] line-clamp-2">
            {descricao}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center justify-between gap-3 border border-[var(--neutral-900)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--neutral-900)] transition-colors hover:bg-[var(--neutral-900)] hover:text-white"
          >
            Conheça o empreendimento
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.8} />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <LinkButton href={waHref} variant="whatsapp" size="sm" external className="min-h-11">
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.7} />
              WhatsApp
            </LinkButton>
            <LinkButton href={PHONE_HREF} variant="outline" size="sm" className="min-h-11">
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} />
              Ligar
            </LinkButton>
          </div>
        </div>
      </div>
    </article>
  );
}
