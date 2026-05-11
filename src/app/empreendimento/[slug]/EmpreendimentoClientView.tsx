'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import type { VistaEmpreendimento } from '@/types/vista';

import { PHONE_HREF } from '@/lib/constants';
import { whatsappEmpreendimentoLead } from '@/lib/whatsapp';

/* ── Helpers ── */
function formatDataEntrega(date?: string): string {
  if (!date || date === '0000-00-00') return '';
  const [year, month] = date.split('-');
  if (!year || !month || year === '0000') return '';
  return `${month}/${year}`;
}

function getDisplayTitle(emp: VistaEmpreendimento): string {
  if (emp.TituloSite) return emp.TituloSite;
  if (emp.Empreendimento) return emp.Empreendimento;
  return `Empreendimento em ${emp.Bairro}`;
}

function getDescription(emp: VistaEmpreendimento): string {
  return (emp.DescricaoEmpreendimento || emp.DescricaoWeb || emp.Descricao || '').trim();
}

function getAmenities(infra?: Record<string, string>): string[] {
  return Object.entries(infra || {})
    .filter(([, v]) => v === 'Sim')
    .map(([k]) => k);
}

function toParagraphs(text: string): string[] {
  if (!text) return [];
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split(/\n+/)
    .map(s => s.trim())
    .filter(Boolean);
}

type FotoItem = { Foto: string; FotoPequena: string; Ordem: string; Destaque: string; Descricao: string };

function normalizeFotos(foto: VistaEmpreendimento['Foto'], destaque?: string): string[] {
  if (!foto || typeof foto !== 'object') return destaque ? [destaque] : [];
  const sorted = (Object.values(foto) as FotoItem[])
    .filter(f => Boolean(f?.Foto))
    .sort((a, b) => Number(a.Ordem || 99) - Number(b.Ordem || 99))
    .map(f => f.Foto);
  const all = destaque && !sorted.includes(destaque) ? [destaque, ...sorted] : sorted;
  return all.length > 0 ? all : destaque ? [destaque] : [];
}

/* ── Lightbox ── */
function Lightbox({ fotos, initial, onClose }: { fotos: string[]; initial: number; onClose: () => void }) {
  const [active, setActive] = useState(initial);
  const prev = () => setActive(i => (i - 1 + fotos.length) % fotos.length);
  const next = () => setActive(i => (i + 1) % fotos.length);

  return (
    <div className="fixed inset-0 z-[100] bg-black/96 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <span className="text-white/40 text-[11px] tracking-[0.1em]" style={{ fontWeight: 400 }}>
          {active + 1} / {fotos.length}
        </span>
        <button
          onClick={onClose}
          className="min-h-11 min-w-11 p-3 text-white/50 hover:text-white transition-colors"
          aria-label="Fechar galeria"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 relative">
        <Image
          src={fotos[active]}
          alt={`Foto ${active + 1}`}
          fill
          className="object-contain select-none"
          sizes="100vw"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
        />
        <span className="pointer-events-none absolute bottom-5 right-5 z-10 text-white/35 text-[11px] uppercase tracking-[0.3em]">
          UNUS
        </span>
        {fotos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {fotos.length > 1 && (
        <div className="shrink-0 overflow-x-auto py-3 px-4 flex gap-1.5">
          {fotos.slice(0, 20).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-12 overflow-hidden transition-all ${
                i === active ? 'opacity-100 ring-1 ring-white' : 'opacity-35 hover:opacity-65'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Miniatura ${i + 1}`}
                fill
                className="object-cover select-none"
                sizes="64px"
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Photo Grid (editorial layout) ── */
function PhotoGrid({ fotos, title }: { fotos: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (fotos.length === 0) return null;

  const show = fotos.slice(0, 5);
  const extras = fotos.length - 5;

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox fotos={fotos} initial={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      {show.length === 1 ? (
        /* Single photo: wide */
        <div
          className="relative w-full h-[380px] sm:h-[480px] cursor-zoom-in overflow-hidden"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={show[0]}
            alt={`${title} — foto 1`}
            fill
            className="object-cover select-none hover:scale-[1.03] transition-transform duration-700 motion-reduce:transition-none motion-reduce:hover:scale-100"
            sizes="100vw"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
          />
          <span className="pointer-events-none absolute bottom-4 right-4 z-10 text-white/55 text-[10px] uppercase tracking-[0.3em]">
            UNUS
          </span>
        </div>
      ) : (
        /* 2+ photos: editorial grid */
        <div className="grid grid-cols-[1fr_1fr] grid-rows-[240px_240px] gap-1 sm:grid-rows-[260px_260px] lg:grid-rows-[280px_280px]">
          {/* Main photo — full height left */}
          <div
            className="relative row-span-2 cursor-zoom-in overflow-hidden"
            onClick={() => setLightboxIndex(0)}
          >
            <Image
              src={show[0]}
              alt={`${title} — foto 1`}
              fill
              className="object-cover select-none hover:scale-[1.03] transition-transform duration-700 motion-reduce:transition-none motion-reduce:hover:scale-100"
              sizes="50vw"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />
            <span className="pointer-events-none absolute bottom-4 right-4 z-10 text-white/55 text-[10px] uppercase tracking-[0.3em]">
              UNUS
            </span>
          </div>

          {/* Secondary photos — right column */}
          {show.slice(1).map((src, i) => {
            const idx = i + 1;
            const isLast = idx === show.length - 1 && extras > 0;
            return (
              <div
                key={i}
                className="relative cursor-zoom-in overflow-hidden"
                onClick={() => setLightboxIndex(idx)}
              >
                <Image
                  src={src}
                  alt={`${title} — foto ${idx + 1}`}
                  fill
                  className={`object-cover select-none transition-transform duration-700 motion-reduce:transition-none ${isLast ? '' : 'hover:scale-[1.03] motion-reduce:hover:scale-100'}`}
                  sizes="25vw"
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                />
                <span className="pointer-events-none absolute bottom-3 right-3 z-10 text-white/55 text-[9px] uppercase tracking-[0.25em]">
                  UNUS
                </span>
                {isLast && (
                  <div className="absolute inset-0 bg-[var(--secondary-900)]/70 flex flex-col items-center justify-center gap-1">
                    <span className="text-white text-[22px]" style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}>
                      +{extras}
                    </span>
                    <span className="text-white/60 text-[10px] uppercase tracking-[0.2em]" style={{ fontWeight: 500 }}>
                      fotos
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ── Main Component ── */
interface EmpreendimentoClientViewProps {
  empreendimento: VistaEmpreendimento;
}

export default function EmpreendimentoClientView({ empreendimento: emp }: EmpreendimentoClientViewProps) {
  const title     = getDisplayTitle(emp);
  const desc      = getDescription(emp);
  const paragraphs = toParagraphs(desc);
  const fotos     = normalizeFotos(emp.Foto, emp.FotoDestaque);
  const amenities = getAmenities(emp.InfraEstrutura);
  const entrega   = formatDataEntrega(emp.DataEntrega);
  const waHref = whatsappEmpreendimentoLead({
    name: title,
    bairro: emp.Bairro,
    cidade: emp.Cidade,
    codigo: emp.Codigo,
    pathOrUrl: typeof window !== 'undefined' ? window.location.href : undefined,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ── HERO ── */}
      <section className="relative h-[78vh] sm:h-[85vh] lg:h-screen bg-[var(--secondary-900)] overflow-hidden">

        {/* Background photo */}
        {fotos[0] && (
          <Image
            src={fotos[0]}
            alt={title}
            fill
            className="object-cover select-none"
            priority
            sizes="100vw"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
          />
        )}
        {fotos[0] && (
          <span className="pointer-events-none absolute bottom-8 right-8 z-[1] text-white/30 text-[11px] uppercase tracking-[0.3em]">
            UNUS
          </span>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Back navigation */}
        <Link
          href="/empreendimentos"
          className="absolute top-28 left-6 sm:left-8 lg:left-12 z-10 flex items-center gap-2 text-white/60 hover:text-white text-[11px] uppercase tracking-[0.15em] transition-colors"
          style={{ fontWeight: 500 }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          Empreendimentos
        </Link>

        {/* Photo count */}
        {fotos.length > 1 && (
          <div className="absolute top-28 right-6 sm:right-8 lg:right-12 z-10">
            <span className="text-white/40 text-[11px] tracking-[0.1em]" style={{ fontWeight: 400 }}>
              {fotos.length} fotos
            </span>
          </div>
        )}

        {/* Content — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-8 lg:px-12 pb-12 lg:pb-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-[680px]">

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-[1px] bg-[var(--gold)]" />
                <span
                  className="text-[var(--gold)] text-[10px] uppercase tracking-[0.35em]"
                  style={{ fontWeight: 600 }}
                >
                  Curadoria UNUS · Empreendimento
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-white text-[42px] sm:text-[58px] lg:text-[68px] leading-[1.0] tracking-[-0.025em] mb-7"
                style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
              >
                {title}
              </h1>

              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex items-center gap-2 text-white/65">
                  <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  <span className="text-[13px]" style={{ fontWeight: 300 }}>
                    {emp.Bairro}, {emp.Cidade} — {emp.UF}
                  </span>
                </div>

                {entrega && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" strokeWidth={1.5} />
                    <span className="text-[13px] text-white/65" style={{ fontWeight: 300 }}>
                      Entrega <span className="text-white">{entrega}</span>
                    </span>
                  </div>
                )}

                {emp.Status && (
                  <span
                    className="px-3 py-1 border border-white/25 text-white/80 text-[10px] uppercase tracking-[0.18em]"
                    style={{ fontWeight: 500 }}
                  >
                    {emp.Status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-14 lg:gap-20">

          {/* ── Main column ── */}
          <div>

            {/* Description — editorial */}
            {paragraphs.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-7 h-[1px] bg-[var(--gold)]" />
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-dark)]"
                    style={{ fontWeight: 600 }}
                  >
                    Sobre o empreendimento
                  </span>
                </div>

                {/* Lead paragraph — editorial display size */}
                <p
                  className="text-[var(--color-heading)] text-[20px] sm:text-[22px] leading-[1.6] tracking-[-0.01em] mb-7"
                  style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
                >
                  {paragraphs[0]}
                </p>

                {/* Remaining paragraphs */}
                {paragraphs.slice(1).map((p, i) => (
                  <p
                    key={i}
                    className="text-[var(--color-body)] text-[15px] leading-relaxed mb-4 last:mb-0"
                    style={{ fontWeight: 300 }}
                  >
                    {p}
                  </p>
                ))}
              </section>
            )}

            {/* Photo grid */}
            {fotos.length > 1 && (
              <section className="mb-16">
                <PhotoGrid fotos={fotos} title={title} />
              </section>
            )}

            {/* Infraestrutura — tag cloud */}
            {amenities.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-7 h-[1px] bg-[var(--gold)]" />
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-dark)]"
                    style={{ fontWeight: 600 }}
                  >
                    Infraestrutura
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {amenities.map(a => (
                    <span
                      key={a}
                      className="px-4 py-2 bg-white border border-[var(--neutral-200)] text-[var(--color-heading)] text-[12px] tracking-[0.04em] hover:border-[var(--neutral-400)] transition-colors"
                      style={{ fontWeight: 400 }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Localização */}
            {emp.Latitude && emp.Longitude && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-7 h-[1px] bg-[var(--gold)]" />
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-dark)]"
                    style={{ fontWeight: 600 }}
                  >
                    Localização
                  </span>
                </div>

                {(emp.Endereco || emp.Numero) && (
                  <p className="text-[var(--color-body)] text-[14px] mb-5" style={{ fontWeight: 300 }}>
                    {[emp.Endereco, emp.Numero, emp.Bairro, emp.Cidade, emp.UF].filter(Boolean).join(', ')}
                  </p>
                )}

                <div className="aspect-[16/8] overflow-hidden border border-[var(--neutral-200)]">
                  <iframe
                    src={`https://maps.google.com/maps?q=${emp.Latitude},${emp.Longitude}&z=15&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização do empreendimento"
                  />
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar CTA ── */}
          <div className="lg:sticky lg:top-28 h-fit">

            {/* Dark panel */}
            <div className="bg-[var(--secondary-900)]">

              {/* Gold top accent line */}
              <div className="h-[3px] bg-[var(--gold)]" />

              <div className="p-8">
                <p
                  className="text-[var(--gold)] text-[9px] uppercase tracking-[0.35em] mb-5"
                  style={{ fontWeight: 600 }}
                >
                  Cód. {emp.Codigo} · UNUS Curadoria
                </p>

                <h3
                  className="text-white text-[24px] leading-[1.2] mb-2"
                  style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
                >
                  {title}
                </h3>

                <p className="text-white/45 text-[12px] mb-8 flex items-center gap-1.5" style={{ fontWeight: 300 }}>
                  <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.5} />
                  {emp.Bairro}, {emp.Cidade}
                </p>

                {/* Delivery date — highlighted */}
                {entrega && (
                  <div className="border-l-2 border-[var(--gold)] pl-4 mb-7">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 mb-1.5" style={{ fontWeight: 600 }}>
                      Previsão de entrega
                    </p>
                    <p
                      className="text-white text-[22px] leading-none"
                      style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
                    >
                      {entrega}
                    </p>
                  </div>
                )}

                <p className="text-white/55 text-[13px] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                  Fale com um corretor UNUS para conhecer as unidades disponíveis, plantas e condições exclusivas de pagamento.
                </p>

                <div className="space-y-2.5">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-[var(--color-action-whatsapp)] text-white py-4 text-[11px] uppercase tracking-[0.18em] hover:opacity-90 transition-opacity"
                    style={{ fontWeight: 500 }}
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    Consultar via WhatsApp
                  </a>

                  <a
                    href={PHONE_HREF}
                    className="w-full flex items-center justify-center gap-2.5 border border-white/15 text-white/70 py-3.5 text-[11px] uppercase tracking-[0.15em] hover:bg-white/5 hover:text-white transition-colors"
                    style={{ fontWeight: 400 }}
                  >
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                    (48) 3066-6767
                  </a>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/empreendimentos"
              className="mt-px flex items-center justify-center gap-2 w-full bg-[var(--neutral-100)] border border-[var(--neutral-200)] text-[var(--color-body)] py-4 text-[11px] uppercase tracking-[0.15em] hover:bg-[var(--neutral-200)] transition-colors"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              Todos os empreendimentos
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE — Sticky bottom CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--secondary-900)] border-t border-white/10 px-4 py-3 flex gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.2)]">
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-2 flex-1 border border-white/20 text-white/80 py-3.5 text-[10px] uppercase tracking-[0.15em] hover:bg-white/10 transition-colors"
          style={{ fontWeight: 500 }}
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
          Ligar
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 flex-[2] bg-[var(--color-action-whatsapp)] text-white py-3.5 text-[10px] uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
          style={{ fontWeight: 500 }}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          Consultar via WhatsApp
        </a>
      </div>

      {/* Mobile bottom padding to avoid sticky CTA overlap */}
      <div className="lg:hidden h-20" />
    </div>
  );
}
