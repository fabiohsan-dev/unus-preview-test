'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, MapPin, BedDouble, Maximize, TrendingUp, Bath } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Property {
  id: string | number;
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
  
  const displayProperties = initialProperties && initialProperties.length > 0 
    ? initialProperties 
    : [
        {
          id: 1,
          title: 'Residência com assinatura arquitetônica em Jurerê Internacional',
          image: 'https://images.unsplash.com/photo-1667830501890-f18c74a8efac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwbWFuc2lvbiUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzc1MTU1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          bedrooms: 5,
          suites: 5,
          bathrooms: 6,
          area: '887m²',
          location: 'Jurerê Internacional, Florianópolis',
          price: 'R$ 18.500.000',
          tags: ['Frente Mar', 'Mobiliado', 'Exclusividade'],
        },
      ];

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

  return (
    <section 
      id="portfolio" 
      className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--neutral-100)]"
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
              <div className="w-6 h-[1px] bg-[var(--gold)]" />
              <span className="text-[var(--gold-dark)] text-[10px] uppercase tracking-[0.3em]" style={{ fontWeight: 600 }}>
                Vitrine UNUS
              </span>
            </div>
            <h2 className="text-[var(--color-heading)] text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.02em]" style={{ fontWeight: 300 }}>
              Seleção <span style={{ fontWeight: 600 }}>exclusiva</span>
            </h2>
            <p className="text-[var(--color-body)] text-[15px] mt-4 leading-relaxed max-w-[420px]" style={{ fontWeight: 300 }}>
              Propriedades singulares, selecionadas pela nossa curadoria de inteligência imobiliária.
            </p>
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center gap-3">
            <span className="text-[var(--secondary-400)] text-[13px] mr-4" style={{ fontWeight: 400 }}>
              {String(current + 1).padStart(2, '0')} / {String(displayProperties.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => { goPrev(); setIsPaused(true); }}
              className="w-12 h-12 flex items-center justify-center border border-[var(--neutral-300)] hover:bg-[var(--secondary-900)] hover:text-white hover:border-[var(--secondary-900)] transition-all"
              aria-label="Imóvel anterior"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => { goNext(); setIsPaused(true); }}
              className="w-12 h-12 flex items-center justify-center border border-[var(--neutral-300)] hover:bg-[var(--secondary-900)] hover:text-white hover:border-[var(--secondary-900)] transition-all"
              aria-label="Próximo imóvel"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {/* Main Showcase */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-0 overflow-hidden bg-white shadow-[var(--shadow-soft)]">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Smart Tags */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
              {property.tags.map((tag, idx) => (
                <span
                  key={`${property.id}-${idx}`}
                  className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[var(--color-heading)] text-[10px] uppercase tracking-[0.1em] flex items-center gap-1.5 shadow-sm"
                  style={{ fontWeight: 600 }}
                >
                  {tagIcon[tag] && <TrendingUp className="w-3 h-3 text-[var(--primary-500)]" />}
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="p-8 lg:p-10 flex flex-col justify-between bg-white">
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
                    <span className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.15em]" style={{ fontWeight: 500 }}>
                      {property.location}
                    </span>
                  </div>

                  <h3 className="text-[var(--color-heading)] text-[24px] sm:text-[28px] leading-[1.15] mb-8 line-clamp-3 min-h-[84px]" style={{ fontWeight: 400 }}>
                    {property.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8 pb-8 border-b border-[var(--gold)]/30">
                    <div>
                      <BedDouble className="w-5 h-5 text-[var(--secondary-400)] mb-2" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[16px]" style={{ fontWeight: 500 }}>{property.bedrooms}</p>
                      <p className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.1em]" style={{ fontWeight: 500 }}>QUARTOS</p>
                    </div>
                    <div>
                      <BedDouble className="w-5 h-5 text-[var(--secondary-400)] mb-2" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[16px]" style={{ fontWeight: 500 }}>{property.suites}</p>
                      <p className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.1em]" style={{ fontWeight: 500 }}>SUÍTES</p>
                    </div>
                    <div>
                      <Bath className="w-5 h-5 text-[var(--secondary-400)] mb-2" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[16px]" style={{ fontWeight: 500 }}>{property.bathrooms}</p>
                      <p className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.1em]" style={{ fontWeight: 500 }}>BANHEIROS</p>
                    </div>
                    <div>
                      <Maximize className="w-5 h-5 text-[var(--secondary-400)] mb-2" strokeWidth={1.2} />
                      <p className="text-[var(--color-heading)] text-[16px]" style={{ fontWeight: 500 }}>{property.area}</p>
                      <p className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.1em]" style={{ fontWeight: 500 }}>ÁREA</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[var(--secondary-400)] text-[11px] uppercase tracking-[0.1em] mb-1" style={{ fontWeight: 500 }}>A partir de</p>
                  <p className="text-[var(--gold-dark)] text-[28px] mb-6" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>
                    {property.price}
                  </p>
                  <Link 
                    href={`/imovel/${property.id}`}
                    className="w-full bg-[var(--secondary-900)] text-white py-4 text-[12px] uppercase tracking-[0.15em] hover:bg-[var(--secondary-800)] transition-colors flex items-center justify-center gap-2" 
                    style={{ fontWeight: 500 }}
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
