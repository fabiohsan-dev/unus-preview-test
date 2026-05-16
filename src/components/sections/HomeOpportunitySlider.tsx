'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { OpportunityCard, type OpportunityCardData } from '@/components/cards/OpportunityCard';

type HomeOpportunitySliderProps = {
  opportunities?: OpportunityCardData[];
};

export function HomeOpportunitySlider({ opportunities }: HomeOpportunitySliderProps) {
  const items = opportunities ?? [];
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Avança ou recua exatamente uma "página":
   * a largura visível do track == 3 cards + 2 gaps no desktop,
   * 2 cards + 1 gap no tablet, 1 card no mobile.
   * scrollBy(clientWidth) salta para o próximo grupo.
   */
  const scroll = useCallback((dir: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: dir === 'next' ? track.clientWidth : -track.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-[var(--off-white)]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-10 lg:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span className="text-[var(--champagne-readable)] text-[11px] font-semibold uppercase tracking-[0.22em]">
                Curadoria UNUS
              </span>
            </div>
            <h2
              className="text-[var(--deep-blue)] leading-[1.08] tracking-[-0.02em] font-light"
              style={{ fontSize: 'clamp(32px,3.8vw,52px)' }}
            >
              Imóveis{' '}
              <span className="font-semibold">à venda</span>
            </h2>
          </div>

          {/* Setas de navegação */}
          <div className="flex items-center gap-2.5 shrink-0 pb-1">
            <button
              type="button"
              onClick={() => scroll('prev')}
              aria-label="Grupo anterior"
              className="group w-11 h-11 rounded-full border border-[var(--deep-blue)]/18
                flex items-center justify-center
                hover:bg-[var(--deep-blue)] hover:border-[var(--deep-blue)]
                transition-all duration-300"
            >
              <ChevronLeft
                className="w-[17px] h-[17px] text-[var(--deep-blue)] group-hover:text-white transition-colors duration-300"
                strokeWidth={1.7}
              />
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              aria-label="Próximo grupo"
              className="group w-11 h-11 rounded-full border border-[var(--deep-blue)]/18
                flex items-center justify-center
                hover:bg-[var(--deep-blue)] hover:border-[var(--deep-blue)]
                transition-all duration-300"
            >
              <ChevronRight
                className="w-[17px] h-[17px] text-[var(--deep-blue)] group-hover:text-white transition-colors duration-300"
                strokeWidth={1.7}
              />
            </button>
          </div>
        </div>

        {/* ── Track do slider ── */}
        {/*
          Larguras calculadas para que o scroll de exatamente clientWidth
          salte para o próximo grupo completo:
            mobile  → 1 card  (w-full)
            sm      → 2 cards (calc(50% - 10px))       gap 20px: 2×card + 1×gap = 100%
            lg      → 3 cards (calc(33.333% - 13.5px)) gap 20px: 3×card + 2×gap = 100%
        */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="snap-start flex-shrink-0
                w-full
                sm:w-[calc(50%-10px)]
                lg:w-[calc(33.333%-13.5px)]"
            >
              <OpportunityCard item={item} />
            </div>
          ))}
        </div>

        {/* ── Rodapé do slider ── */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/venda"
            className="inline-flex items-center gap-3 border border-[var(--deep-blue)]/30
              text-[var(--deep-blue)] px-9 py-4
              text-[11px] font-medium uppercase tracking-[0.15em]
              hover:bg-[var(--deep-blue)] hover:text-white hover:border-[var(--deep-blue)]
              transition-all duration-300"
          >
            Ver todos os imóveis
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}
