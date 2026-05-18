import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/ui';
import { whatsappUrl } from '@/lib/constants';

const WA_ANUNCIE = whatsappUrl('Olá! Gostaria de anunciar meu imóvel com a UNUS.');

export function AnuncieStrip() {
  return (
    <section
      className="py-24 lg:py-28 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 18% 46%, rgba(216,180,106,0.13), transparent 34%),
          linear-gradient(135deg, var(--deep-blue) 0%, #001f33 48%, #001827 100%)
        `,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">

          {/* Bloco textual */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[var(--champagne)]" />
              <span className="text-[var(--champagne-readable)] text-text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)]">
                Para proprietários
              </span>
            </div>

            {/* Título */}
            <h2 className="text-white font-serif font-light leading-[1.08] tracking-[-0.028em] max-w-[760px] mb-0 text-title-section">
              {'Venda seu imóvel com a curadoria que ele merece.'}
            </h2>

            {/* Subtítulo */}
            <p
              className="text-white/[0.74] leading-[1.72] max-w-[500px] font-light mt-6"
              style={{ fontSize: 'clamp(14px, 1vw, 16px)' }}
            >
              O seu imóvel à venda em uma Boutique Imobiliária. Curadoria exclusiva, exposição máxima e negociação de alto padrão.
            </p>
          </div>

          {/* CTA */}
          <div className="flex lg:shrink-0">
            <LinkButton
              href={WA_ANUNCIE}
              variant="gold"
              size="lg"
              external
              aria-label="Anunciar meu imóvel com a UNUS"
              className="normal-case tracking-[0.04em] font-semibold"
            >
              Quero anunciar meu imóvel
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </LinkButton>
          </div>

        </div>
      </div>
    </section>
  );
}
