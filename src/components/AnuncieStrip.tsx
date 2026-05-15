import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/ui';
import { whatsappUrl } from '@/lib/constants';

const WA_ANUNCIE = whatsappUrl('Olá! Gostaria de anunciar meu imóvel com a UNUS.');

export function AnuncieStrip() {
  return (
    <section className="py-24 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[var(--secondary-900)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span
                className="text-[var(--champagne-readable)] text-[10px] font-semibold uppercase tracking-[0.3em]"
              >
                Anuncie
              </span>
            </div>
            <h2
              className="text-white text-[length:var(--title-section)] leading-[1.05] tracking-[-0.02em] mb-4 font-serif font-normal"
            >
              ANUNCIE SEU IMÓVEL
            </h2>
            <p
              className="text-white/65 text-[16px] leading-relaxed max-w-[480px] font-light"
            >
              O seu imóvel à venda em uma{' '}
              <span className="text-white/90 font-normal">
                Boutique Imobiliária
              </span>
              . Curadoria exclusiva, exposição máxima e negociação de alto padrão.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
            <LinkButton
              href={WA_ANUNCIE}
              variant="gold"
              size="lg"
              external
              aria-label="Falar com um consultor sobre anunciar seu imóvel"
            >
              Falar com um consultor
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </LinkButton>
            <LinkButton
              href="/anuncie"
              variant="phone"
              size="lg"
            >
              Saiba mais
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
