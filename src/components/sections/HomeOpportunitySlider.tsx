'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OpportunityCard, type OpportunityCardData } from '@/components/cards/OpportunityCard';

type HomeOpportunitySliderProps = {
  opportunities?: OpportunityCardData[];
};

export function HomeOpportunitySlider({ opportunities }: HomeOpportunitySliderProps) {
  const items = opportunities ?? [];
  const trackRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (dir: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    // Avança/recua ~85% da largura visível do container
    const amount = track.clientWidth * 0.85;
    track.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-[var(--off-white)] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header + botões de navegação */}
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span className="text-[var(--champagne-readable)] text-[11px] font-semibold uppercase tracking-[0.22em]">
                Curadoria UNUS
              </span>
            </div>
            <h2 className="text-[var(--deep-blue)] text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-[-0.02em] font-light">
              Imóveis
              <br />
              <span className="font-semibold">à venda</span>
            </h2>
          </div>

          {/* Setas de navegação */}
          <div className="flex items-center gap-3 pb-1">
            <button
              type="button"
              onClick={() => scroll('prev')}
              aria-label="Imóvel anterior"
              className="group w-11 h-11 rounded-full border border-[var(--deep-blue)]/20 flex items-center justify-center hover:bg-[var(--deep-blue)] hover:border-[var(--deep-blue)] transition-all duration-300"
            >
              <ChevronLeft
                className="w-4 h-4 text-[var(--deep-blue)] group-hover:text-white transition-colors duration-300"
                strokeWidth={1.8}
              />
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              aria-label="Próximo imóvel"
              className="group w-11 h-11 rounded-full border border-[var(--deep-blue)]/20 flex items-center justify-center hover:bg-[var(--deep-blue)] hover:border-[var(--deep-blue)] transition-all duration-300"
            >
              <ChevronRight
                className="w-4 h-4 text-[var(--deep-blue)] group-hover:text-white transition-colors duration-300"
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

      </div>

      {/* Track do slider — estende além do container, scrollbar oculta */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="snap-start flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[440px]"
            >
              <OpportunityCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
