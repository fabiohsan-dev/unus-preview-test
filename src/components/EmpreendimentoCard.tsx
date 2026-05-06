import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { ContentImage } from './ContentImage';
import type { VistaImovelItem } from '@/types/vista';

const WHATSAPP_BASE = 'https://wa.me/554830666767?text=';

function getSlug(emp: VistaImovelItem) {
  const bairro = (emp.Bairro || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const cidade = (emp.Cidade || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${bairro}-${cidade}-${emp.Codigo}`;
}

function getDisplayTitle(emp: VistaImovelItem): string {
  if (emp.TituloSite) return emp.TituloSite;
  return `Empreendimento em ${emp.Bairro}`;
}

interface EmpreendimentoCardProps {
  empreendimento: VistaImovelItem;
}

export function EmpreendimentoCard({ empreendimento: emp }: EmpreendimentoCardProps) {
  const slug   = getSlug(emp);
  const href   = `/empreendimento/${slug}`;
  const title  = getDisplayTitle(emp);
  const waText = encodeURIComponent(
    `Olá! Tenho interesse no empreendimento ${title} em ${emp.Bairro}, ${emp.Cidade}. Gostaria de mais informações.`
  );

  return (
    <article className="group bg-white overflow-hidden flex flex-col h-full" style={{ boxShadow: 'var(--shadow-soft)' }}>

      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={href} className="block h-full">
          <ContentImage
            src={emp.FotoDestaque || ''}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <div
            className="px-3.5 py-1.5 bg-[var(--secondary-900)] text-white text-[10px] uppercase tracking-[0.15em]"
            style={{ fontWeight: 700 }}
          >
            Empreendimento
          </div>
          {emp.Status && emp.Status !== 'Venda' && (
            <div
              className="px-3.5 py-1.5 bg-[var(--gold)] text-white text-[10px] uppercase tracking-[0.15em]"
              style={{ fontWeight: 700 }}
            >
              {emp.Status}
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={href} className="block flex-1">

          {/* Localização */}
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-caption)] shrink-0" strokeWidth={1.5} />
            <span
              className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.12em]"
              style={{ fontWeight: 500 }}
            >
              {emp.Bairro}, {emp.Cidade}
            </span>
          </div>

          {/* Título */}
          <h3
            className="text-[var(--color-heading)] text-[20px] leading-[1.2] mb-3 line-clamp-2 min-h-[48px]"
            style={{ fontWeight: 400, fontFamily: 'var(--font-serif)' }}
          >
            {title}
          </h3>
        </Link>

        {/* CTA */}
        <div className="border-t border-[var(--color-border)] pt-4 flex items-center gap-3">
          <Link
            href={href}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--secondary-900)] text-white py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-[var(--secondary-800)] transition-colors"
            style={{ fontWeight: 500 }}
          >
            Ver detalhes
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
          <a
            href={`${WHATSAPP_BASE}${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center border border-[var(--neutral-300)] hover:border-[var(--color-action-whatsapp)] hover:bg-[var(--color-action-whatsapp)] hover:text-white text-[var(--color-body)] transition-all"
            aria-label="Consultar via WhatsApp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
