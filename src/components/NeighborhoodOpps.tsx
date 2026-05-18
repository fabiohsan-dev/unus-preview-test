import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { ContentImage } from './ContentImage';
import { WHATSAPP_BASE } from '@/lib/constants';

export function NeighborhoodOpps() {
  return (
    <section id="contato" className="relative py-32 lg:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[var(--off-white)]">

      {/* ── Fundo ── */}
      <div className="absolute inset-0 z-0">
        <ContentImage
          src="https://sdr-w.agenciaalea.com.br/Sala-UNUS-8.jpg"
          alt="Vista aérea"
          className="w-full h-full object-cover saturate-[0.88] contrast-[1.04]"
          sizes="100vw"
          quality={60}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 42%, rgba(194,168,120,0.10), transparent 32%),
              linear-gradient(135deg, rgba(0,43,69,0.90) 0%, rgba(0,31,51,0.88) 48%, rgba(0,24,39,0.92) 100%),
              rgba(5,5,5,0.38)
            `,
          }}
        />
      </div>

      {/* ── Conteúdo ── */}
      <div className="max-w-[840px] mx-auto relative z-10 text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-[var(--champagne)]/80" />
          <span className="text-text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--champagne-readable)]">
            Para quem busca o imóvel certo
          </span>
          <div className="w-8 h-px bg-[var(--champagne)]/80" />
        </div>

        {/* Título */}
        <h2 className="text-white font-serif font-light leading-[1.08] tracking-[-0.02em] text-title-section mb-6">
          Encontre o imóvel certo
          <br />
          <span className="font-semibold">com inteligência de mercado.</span>
        </h2>

        {/* Subtítulo */}
        <p
          className="text-white/65 text-[16px] sm:text-[17px] leading-[1.68] max-w-[620px] mx-auto mb-12 font-light"
        >
          Conte com uma curadoria especializada para encontrar imóveis prontos, em construção ou em lançamento, com análise de localização, potencial de valorização e aderência ao seu momento de vida.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/venda"
            className="bg-[var(--champagne)] text-[var(--deep-blue)] px-10 py-4 text-text-xs uppercase tracking-[var(--tracking-button)] hover:bg-[var(--champagne-soft)] transition-colors flex items-center gap-3 font-semibold"
          >
            Encontrar meu imóvel ideal
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--champagne)]/40 text-white px-8 py-4 text-text-xs uppercase tracking-[var(--tracking-button)] hover:bg-[var(--champagne)]/10 hover:border-[var(--champagne)]/70 transition-colors flex items-center gap-3 font-medium"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            Falar com especialista
          </a>
        </div>

        {/* Nota */}
        <p className="text-white/45 text-[11px] mt-10 tracking-wide font-medium">
          Atendimento consultivo para comprar com mais segurança, clareza e estratégia.
        </p>

      </div>
    </section>
  );
}
