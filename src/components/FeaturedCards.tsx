'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, MapPin, BedDouble, Maximize, TrendingUp, Bath } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Property {
  id: string | number;
  slug?: string;
  title: string;
  image: string;
  bedrooms: number | string;
  suites: number | string;
  bathrooms: number | string;
  area: string;
  location: string;
  price: string;
  tags: string[];
}

interface FeaturedCardsProps {
  properties?: Property[];
}

const tagIcon: Record<string, boolean> = { Oportunidade: true, Lançamento: true };

export function FeaturedCards({ properties: initialProperties }: FeaturedCardsProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displayProperties = initialProperties ?? [];

  const goNext = useCallback(() => {
    setCurrent((p) => (p + 1) % displayProperties.length);
  }, [displayProperties.length]);

  const goPrev = useCallback(() => {
    setCurrent((p) => (p - 1 + displayProperties.length) % displayProperties.length);
  }, [displayProperties.length]);

  useEffect(() => {
    if (isPaused || displayProperties.length <= 1) return;

    const timer = setInterval(() => {
      goNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [goNext, isPaused, displayProperties.length]);

  const property = displayProperties[current];
  if (!property) return null;
  const href = `/imovel/${property.slug || property.id}`;

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[var(--component-featured-meta-bg)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span className="text-[var(--champagne-readable)] text-micro uppercase tracking-[var(--tracking-eyebrow)] font-semibold">
                Vitrine UNUS
              </span>
            </div>
            <h2 className="text-[var(--component-featured-title)] text-title-section leading-none font-light font-serif">
              Seleção <span className="font-semibold">exclusiva</span>
            </h2>
            <p className="text-[var(--color-body)] text-text-body mt-4 leading-relaxed max-w-[420px] font-light">
              Propriedades singulares, selecionadas pela nossa curadoria de inteligência imobiliária.
            </p>
          </div>

          {/* Nav Arrows + Ver todos */}
          <div className="flex items-center gap-3">
            <Link
              href="/venda"
              className="hidden sm:inline-flex items-center gap-2 text-text-xs uppercase tracking-[var(--tracking-link)] text-[var(--component-featured-title)] hover:text-[var(--deep-blue)] transition-colors mr-4 font-medium"
            >
              Ver todos
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
            <span className="text-[var(--secondary-400)] text-[var(--text-sm)] mr-2" style={{ fontWeight: 'var(--weight-normal)' }}>
              {String(current + 1).padStart(2, '0')} / {String(displayProperties.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => { goPrev(); setIsPaused(true); }}
              className="w-[44px] h-[44px] flex items-center justify-center border border-[var(--neutral-300)] hover:bg-[var(--primary-500)] hover:text-white hover:border-[var(--primary-500)] transition-all"
              aria-label="Imóvel anterior"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => { goNext(); setIsPaused(true); }}
              className="w-[44px] h-[44px] flex items-center justify-center border border-[var(--neutral-300)] hover:bg-[var(--primary-500)] hover:text-white hover:border-[var(--primary-500)] transition-all"
              aria-label="Próximo imóvel"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {/* Main Showcase */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-0 overflow-hidden bg-white shadow-[var(--shadow-soft)] lg:h-[580px]">
          {/* Image */}
          <div className="relative aspect-[4/3.2] lg:aspect-auto lg:h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div
                  className="w-full h-full"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                  />
                  <span className="pointer-events-none absolute bottom-3 right-3 z-10 border border-white/25 bg-black/20 px-2.5 py-1 text-micro uppercase tracking-[var(--tracking-micro)] text-white/70 backdrop-blur-sm">
                    UNUS
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Smart Tags */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
              {property.tags.map((tag, idx) => (
                <span
                  key={`${property.id}-${idx}`}
                  className="px-3 py-1 text-micro uppercase flex items-center gap-1.5 bg-[var(--champagne)]/95 text-[var(--primary-500)] border border-[var(--primary-500)]/20 font-extrabold tracking-[0.11em]"
                >
                  {tagIcon[tag] && (
                    <TrendingUp className="w-3 h-3" style={{ color: 'var(--primary-500)' }} />
                  )}
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="p-8 lg:p-9 flex flex-col justify-between bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-3.5 h-3.5 text-[var(--primary-500)]" strokeWidth={1.5} />
                    <span className="text-[var(--secondary-400)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-link)]" style={{ fontWeight: 'var(--weight-medium)' }}>
                      {property.location}
                    </span>
                  </div>

                  <h3 className="text-[var(--color-heading)] text-title-card leading-tight mb-6 line-clamp-3 min-h-[84px] font-normal">
                    {property.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-7 pb-7 border-b border-[var(--champagne)]/30">
                    <div>
                      <BedDouble className="w-[18px] h-[18px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 'var(--weight-medium)' }}>{property.bedrooms}</p>
                      <p className="text-[var(--secondary-400)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-micro)]" style={{ fontWeight: 'var(--weight-medium)' }}>QUARTOS</p>
                    </div>
                    <div>
                      <BedDouble className="w-[18px] h-[18px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 'var(--weight-medium)' }}>{property.suites}</p>
                      <p className="text-[var(--secondary-400)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-micro)]" style={{ fontWeight: 'var(--weight-medium)' }}>SUÍTES</p>
                    </div>
                    <div>
                      <Bath className="w-[18px] h-[18px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 'var(--weight-medium)' }}>{property.bathrooms}</p>
                      <p className="text-[var(--secondary-400)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-micro)]" style={{ fontWeight: 'var(--weight-medium)' }}>BANHEIROS</p>
                    </div>
                    <div>
                      <Maximize className="w-[18px] h-[18px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 'var(--weight-medium)' }}>{property.area}</p>
                      <p className="text-[var(--secondary-400)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-micro)]" style={{ fontWeight: 'var(--weight-medium)' }}>ÁREA</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[var(--champagne-readable)] text-[var(--price-card-size)] mb-5 font-serif font-medium tracking-[var(--tracking-value)]">
                    {property.price}
                  </p>
                  <Link
                    href={href}
                    className="w-full text-white py-4 text-[var(--text-sm)] uppercase tracking-[var(--tracking-button)] hover:bg-[var(--deep-blue-700)] transition-colors flex items-center justify-center gap-2 min-h-[52px]"
                    style={{ fontWeight: 'var(--weight-medium)', background: 'var(--primary-500)' }}
                  >
                    Ver detalhes do imóvel
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
