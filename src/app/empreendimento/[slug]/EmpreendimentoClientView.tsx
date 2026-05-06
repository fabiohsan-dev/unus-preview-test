'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { VistaEmpreendimento } from '@/lib/server/vistaService';

const WHATSAPP_BASE = 'https://wa.me/554830666767?text=';

/* ── Helpers ── */
function formatDataEntrega(date: string): string {
  if (!date || date === '0000-00-00') return '';
  const [year, month] = date.split('-');
  if (!year || !month || year === '0000') return '';
  return `${month}/${year}`;
}

function getDisplayTitle(emp: VistaEmpreendimento): string {
  if (emp.TituloSite) return emp.TituloSite;
  return `Empreendimento em ${emp.Bairro}`;
}

function getDescription(emp: VistaEmpreendimento): string {
  return (emp.DescricaoEmpreendimento || emp.DescricaoWeb || emp.Descricao || '').trim();
}

function getAmenities(infra: Record<string, string>): string[] {
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

function normalizeFotos(foto: VistaEmpreendimento['Foto'], destaque: string): string[] {
  if (!foto || typeof foto !== 'object') return destaque ? [destaque] : [];
  const sorted = (Object.values(foto) as FotoItem[])
    .filter(f => Boolean(f?.Foto))
    .sort((a, b) => Number(a.Ordem || 99) - Number(b.Ordem || 99))
    .map(f => f.Foto);
  const all = destaque && !sorted.includes(destaque) ? [destaque, ...sorted] : sorted;
  return all.length > 0 ? all : destaque ? [destaque] : [];
}

/* ── Gallery ── */
function Gallery({ fotos, title }: { fotos: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (fotos.length === 0) return null;

  const prev = () => setActive(i => (i - 1 + fotos.length) % fotos.length);
  const next = () => setActive(i => (i + 1) % fotos.length);

  return (
    <div className="relative bg-black">
      {/* Main image */}
      <div className="relative h-[55vh] sm:h-[65vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={fotos[active]}
          alt={`${title} — foto ${active + 1}`}
          fill
          className="object-cover"
          priority={active === 0}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Nav */}
      {fotos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-heading)]" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-heading)]" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {fotos.slice(0, 12).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Ir para foto ${i + 1}`}
              />
            ))}
            {fotos.length > 12 && (
              <span className="text-white/60 text-[10px] ml-1">{fotos.length}+</span>
            )}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5">
            <span className="text-white text-[11px]" style={{ fontWeight: 500 }}>
              {active + 1} / {fotos.length}
            </span>
          </div>
        </>
      )}

      {/* Thumbnails */}
      {fotos.length > 1 && (
        <div className="flex gap-1 overflow-x-auto bg-black px-4 py-2 scrollbar-hide">
          {fotos.slice(0, 20).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-12 overflow-hidden transition-opacity ${i === active ? 'opacity-100 ring-2 ring-[var(--primary-500)]' : 'opacity-50 hover:opacity-80'}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
interface EmpreendimentoClientViewProps {
  empreendimento: VistaEmpreendimento;
}

export default function EmpreendimentoClientView({ empreendimento: emp }: EmpreendimentoClientViewProps) {
  const title = getDisplayTitle(emp);
  const desc = getDescription(emp);
  const paragraphs = toParagraphs(desc);
  const fotos = normalizeFotos(emp.Foto, emp.FotoDestaque);
  const amenities = getAmenities(emp.InfraEstrutura);
  const entrega = formatDataEntrega(emp.DataEntrega);
  const waText = encodeURIComponent(
    `Olá! Tenho interesse no empreendimento ${title} em ${emp.Bairro}, ${emp.Cidade}. Gostaria de informações sobre preços e unidades disponíveis.`
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Galeria */}
      <Gallery fotos={fotos} title={title} />

      {/* Breadcrumb + back */}
      <div className="bg-white border-b border-[var(--neutral-200)] px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto py-4 flex items-center gap-3">
          <Link
            href="/empreendimentos"
            className="flex items-center gap-1.5 text-[var(--color-body)] text-[12px] hover:text-[var(--color-heading)] transition-colors"
            style={{ fontWeight: 400 }}
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Empreendimentos
          </Link>
          <span className="text-[var(--neutral-300)] text-[12px]">/</span>
          <span className="text-[var(--color-caption)] text-[12px] truncate">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">

          {/* ── Coluna principal ── */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[var(--primary-500)]" strokeWidth={1.5} />
                <span
                  className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.15em]"
                  style={{ fontWeight: 500 }}
                >
                  {emp.Bairro}, {emp.Cidade} — {emp.UF}
                </span>
              </div>

              <h1
                className="text-[var(--color-heading)] text-[32px] sm:text-[42px] leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontWeight: 400, fontFamily: 'var(--font-serif)' }}
              >
                {title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 bg-[var(--secondary-900)] text-white text-[10px] uppercase tracking-[0.15em]" style={{ fontWeight: 600 }}>
                  Empreendimento
                </span>
                {emp.Status && (
                  <span className="px-3.5 py-1.5 bg-[var(--neutral-100)] text-[var(--color-heading)] text-[10px] uppercase tracking-[0.15em]" style={{ fontWeight: 600 }}>
                    {emp.Status}
                  </span>
                )}
                {entrega && (
                  <span className="px-3.5 py-1.5 bg-[var(--gold-light)] text-[var(--gold-dark)] text-[10px] uppercase tracking-[0.15em] flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <Calendar className="w-3 h-3" strokeWidth={1.5} />
                    Entrega {entrega}
                  </span>
                )}
              </div>
            </div>

            {/* Descrição */}
            {paragraphs.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-[1px] bg-[var(--gold)]" />
                  <h2 className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
                    Sobre o empreendimento
                  </h2>
                </div>
                <div className="space-y-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-[var(--color-body)] text-[15px] leading-relaxed" style={{ fontWeight: 300 }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Endereço */}
            {(emp.Endereco || emp.Numero) && (
              <div className="mb-10 p-5 bg-[var(--neutral-50)] border border-[var(--neutral-200)]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-1" style={{ fontWeight: 600 }}>
                  Localização
                </p>
                <p className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 400 }}>
                  {[emp.Endereco, emp.Numero, emp.Bairro].filter(Boolean).join(', ')}
                </p>
                <p className="text-[var(--color-body)] text-[13px]" style={{ fontWeight: 300 }}>
                  {emp.Cidade}, {emp.UF}
                </p>
              </div>
            )}

            {/* Infraestrutura */}
            {amenities.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-[1px] bg-[var(--gold)]" />
                  <h2 className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
                    Infraestrutura
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                  {amenities.map(a => (
                    <div key={a} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary-500)] shrink-0" strokeWidth={1.5} />
                      <span className="text-[var(--color-body)] text-[13px]" style={{ fontWeight: 300 }}>
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mapa */}
            {emp.Latitude && emp.Longitude && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-[1px] bg-[var(--gold)]" />
                  <h2 className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
                    Localização no mapa
                  </h2>
                </div>
                <div className="aspect-[16/7] overflow-hidden border border-[var(--neutral-200)]">
                  <iframe
                    src={`https://maps.google.com/maps?q=${emp.Latitude},${emp.Longitude}&z=15&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização do empreendimento"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Coluna lateral: CTA ── */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-[var(--secondary-900)] p-8">
              <p
                className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-2"
                style={{ fontWeight: 600 }}
              >
                Empreendimento
              </p>
              <h3
                className="text-white text-[22px] leading-[1.2] mb-1"
                style={{ fontWeight: 400, fontFamily: 'var(--font-serif)' }}
              >
                {title}
              </h3>
              <p className="text-white/60 text-[12px] mb-6" style={{ fontWeight: 300 }}>
                {emp.Bairro}, {emp.Cidade}
              </p>

              {entrega && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-3 mb-6">
                  <Calendar className="w-4 h-4 text-[var(--gold)]" strokeWidth={1.5} />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-white/50" style={{ fontWeight: 600 }}>Previsão de entrega</p>
                    <p className="text-white text-[14px]" style={{ fontWeight: 500 }}>{entrega}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-8">
                <p className="text-white/70 text-[13px] leading-relaxed" style={{ fontWeight: 300 }}>
                  Consulte disponibilidade de unidades, plantas e condições de pagamento com um corretor UNUS.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`${WHATSAPP_BASE}${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[var(--color-action-whatsapp)] text-white py-4 text-[12px] uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                  style={{ fontWeight: 500 }}
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  Consultar via WhatsApp
                </a>

                <a
                  href="tel:+554830666767"
                  className="w-full flex items-center justify-center gap-2.5 border border-white/20 text-white py-4 text-[12px] uppercase tracking-[0.15em] hover:bg-white/10 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  (48) 3066-6767
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-[11px] text-center" style={{ fontWeight: 300 }}>
                  CÓD. {emp.Codigo} · UNUS Núcleo Imobiliário
                </p>
              </div>
            </div>

            {/* Botão ver todos */}
            <div className="mt-4">
              <Link
                href="/empreendimentos"
                className="flex items-center justify-center gap-2 w-full border border-[var(--neutral-300)] text-[var(--color-body)] py-3.5 text-[11px] uppercase tracking-[0.15em] hover:border-[var(--color-heading)] hover:text-[var(--color-heading)] transition-colors"
                style={{ fontWeight: 500 }}
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                Todos os empreendimentos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
