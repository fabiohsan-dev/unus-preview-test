'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { src: '/office/sala-unus-1.webp',      alt: 'Área de convivência UNUS — lounge e conferência' },
  { src: '/office/sala-unus-5.webp',      alt: 'Sala de reunião com vista para o oceano' },
  { src: '/office/sala-unus-11.webp',     alt: 'Recepção UNUS Núcleo Imobiliário' },
  { src: '/office/sala-unus-6.webp',      alt: 'Sala privativa com identidade UNUS' },
  { src: '/office/sala-unus-7.webp',      alt: 'Visão geral do escritório UNUS' },
  { src: '/office/sala-unus-9.webp',      alt: 'Sala de conferência com vista para a cidade' },
  { src: '/office/sala-unus-8.webp',      alt: 'Ambiente de trabalho colaborativo' },
  { src: '/office/sala-unus-34-v2.webp',  alt: 'Equipe UNUS Núcleo Imobiliário em atendimento' },
];

export function OfficeSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  /* Sincroniza índice ativo */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  /* Autoplay 5s */
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div className="relative group">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-1 lg:gap-2">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="flex-[0_0_100%] lg:flex-[0_0_calc(50%-4px)] min-w-0 relative shrink-0"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Overlay sutil para dar profundidade */}
              <div className="absolute inset-0 bg-[var(--secondary-900)]/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Setas — aparecem no hover */}
      <button
        onClick={scrollPrev}
        aria-label="Imagem anterior"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10
          w-11 h-11 bg-white/90 hover:bg-white
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5 text-[var(--secondary-900)]" strokeWidth={1.5} />
      </button>

      <button
        onClick={scrollNext}
        aria-label="Próxima imagem"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10
          w-11 h-11 bg-white/90 hover:bg-white
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5 text-[var(--secondary-900)]" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para imagem ${i + 1}`}
            className={`h-[3px] rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? 'w-8 bg-white'
                : 'w-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Contador discreto */}
      <div className="absolute bottom-5 right-6 z-10">
        <span
          className="text-[11px] text-white/60 tabular-nums"
          style={{ fontWeight: 500, letterSpacing: '0.1em' }}
        >
          {String(selectedIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
