import Link from 'next/link';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { ContentImage } from './ContentImage';
import type { VistaImovelItem } from '@/types/vista';

const WHATSAPP_BASE = 'https://wa.me/554830666767?text=';
const PHONE_HREF = 'tel:+554830666767';

function getSlug(emp: VistaImovelItem) {
  const bairro = (emp.Bairro || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const cidade = (emp.Cidade || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${bairro}-${cidade}-${emp.Codigo}`;
}

function getDisplayTitle(emp: VistaImovelItem): string {
  if (emp.TituloSite) return emp.TituloSite;
  return `Empreendimento em ${emp.Bairro}`;
}

function getStatusLabel(emp: VistaImovelItem): string {
  if (!emp.Status || emp.Status === 'Venda') return 'Empreendimento';
  return emp.Status;
}

function formatPrice(value?: string): string | null {
  if (!value) return null;
  const num = parseFloat(value.replace(/\D/g, ''));
  if (isNaN(num) || num === 0) return null;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

interface EmpreendimentoCardProps {
  empreendimento: VistaImovelItem;
}

export function EmpreendimentoCard({ empreendimento: emp }: EmpreendimentoCardProps) {
  const slug   = getSlug(emp);
  const href   = `/empreendimento/${slug}`;
  const title  = getDisplayTitle(emp);
  const status = getStatusLabel(emp);
  const price  = formatPrice(emp.ValorVenda);
  const waText = encodeURIComponent(
    `Olá! Tenho interesse no empreendimento ${title} em ${emp.Bairro}, ${emp.Cidade}. Gostaria de mais informações.`
  );

  return (
    <article
      className="group relative flex flex-col sm:flex-row w-full overflow-hidden"
      style={{ minHeight: '360px', boxShadow: 'var(--shadow-soft)' }}
    >
      {/* ── Left: Imagem ─────────────────────────────── */}
      <Link
        href={href}
        className="relative block w-full sm:w-[58%] shrink-0 overflow-hidden"
        style={{ minHeight: '280px' }}
        aria-label={`Ver ${title}`}
      >
        <ContentImage
          src={emp.FotoDestaque || ''}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 60vw"
        />

        {/* subtle dark overlay para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20 pointer-events-none" />
      </Link>

      {/* ── Right: Painel escuro ──────────────────────── */}
      <div className="flex flex-col flex-1 bg-[var(--secondary-900)] px-8 py-8 sm:px-10 sm:py-10 justify-between">

        {/* Topo */}
        <div>
          {/* Badge de status */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-block px-3.5 py-1.5 border border-[var(--gold)] text-[var(--gold)] text-[9px] uppercase tracking-[0.25em]"
              style={{ fontWeight: 700 }}
            >
              {status}
            </span>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[var(--primary-500)] shrink-0" strokeWidth={1.5} />
            <span
              className="text-[var(--primary-500)] text-[11px] uppercase tracking-[0.18em]"
              style={{ fontWeight: 600 }}
            >
              {emp.Bairro}{emp.Cidade ? `, ${emp.Cidade}` : ''}
            </span>
          </div>

          {/* Título */}
          <Link href={href} className="block group/title">
            <h3
              className="text-white leading-[1.1] tracking-[-0.01em] mb-5 group-hover/title:text-[var(--gold)] transition-colors duration-300"
              style={{
                fontWeight: 400,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 3vw, 36px)',
              }}
            >
              {title}
            </h3>
          </Link>

          {/* Preço — se disponível */}
          {price && (
            <div className="mb-5">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1" style={{ fontWeight: 500 }}>
                A partir de
              </p>
              <p
                className="text-white text-[18px] leading-none"
                style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
              >
                {price}
              </p>
            </div>
          )}

          {/* Divisor dourado */}
          <div className="w-10 h-[1px] bg-[var(--gold)] mb-6 opacity-50" />
        </div>

        {/* Rodapé: CTA + ações */}
        <div className="flex flex-col gap-4">
          {/* CTA principal */}
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.22em] hover:text-[var(--gold)] transition-colors duration-200"
            style={{ fontWeight: 600 }}
          >
            Conheça o empreendimento
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1"
              strokeWidth={2}
            />
          </Link>

          {/* Botões de contato */}
          <div className="flex items-center gap-2 pt-1">
            {/* WhatsApp */}
            <a
              href={`${WHATSAPP_BASE}${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-action-whatsapp)]/90 hover:bg-[var(--color-action-whatsapp)] text-white text-[10px] uppercase tracking-[0.14em] transition-colors"
              style={{ fontWeight: 600 }}
              aria-label="Conversar no WhatsApp"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            {/* Telefone */}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 px-4 py-2.5 border border-white/20 text-white/70 hover:border-white/50 hover:text-white text-[10px] uppercase tracking-[0.14em] transition-colors"
              style={{ fontWeight: 500 }}
              aria-label="Ligar para a UNUS"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              Ligar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
