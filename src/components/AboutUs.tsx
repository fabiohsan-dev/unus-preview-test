'use client';

import { useState, useCallback } from 'react';
import { Play, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function AboutUs() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = useCallback(() => setIsVideoOpen(true), []);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  return (
    <>
      <section
        id="quem-somos"
        className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
        style={{ background: 'var(--neutral-50)' }}
      >
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT — Video Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden group cursor-pointer" onClick={openVideo}>
                {/* Thumbnail — Real UNUS office photo */}
                <Image
                  src="https://img.youtube.com/vi/a3dpAyPaltg/hqdefault.jpg"
                  alt="UNUS Núcleo Imobiliário — Vídeo Institucional"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />

                {/* Play Button — centered, elegant */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Outer ring pulse */}
                    <div className="absolute inset-0 w-[88px] h-[88px] rounded-full border border-white/20 group-hover:scale-[1.2] group-hover:opacity-0 transition-all duration-700" />
                    {/* Main play circle */}
                    <div
                      className="w-[88px] h-[88px] rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <Play className="w-7 h-7 text-white ml-1" fill="white" strokeWidth={0} />
                    </div>
                  </div>
                </div>

                {/* Bottom-left label — glassmorphism */}
                <div
                  className="absolute bottom-5 left-5 px-4 py-2.5"
                  style={{
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p className="text-white/90 text-[11px] uppercase tracking-[0.18em]" style={{ fontWeight: 500 }}>
                    Assistir apresentação · 2:40
                  </p>
                </div>
              </div>

              {/* Secondary photo — small accent */}

            </motion.div>

            {/* RIGHT — Copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:pl-4"
            >
              {/* Overline */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[var(--primary-500)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.3em] text-[var(--primary-500)]"
                  style={{ fontWeight: 600 }}
                >
                  Quem Somos
                </span>
              </div>

              {/* H2 */}
              <h2
                className="text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.1] tracking-[-0.015em] text-[var(--color-heading)] mb-8"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                UNUS{' '}
                <span className="italic" style={{ fontWeight: 500 }}>
                  Núcleo
                </span>{' '}
                Imobiliário<br />
                <span style={{ fontWeight: 600 }}>Conectamos pessoas aos melhores negócios.</span>
              </h2>

              {/* Body — 2 paragraphs */}
              <div className="space-y-5 mb-10">
                <p
                  className="text-[var(--secondary-500)] text-[15px] sm:text-[16px] leading-[1.75]"
                  style={{ fontWeight: 300 }}
                >
                  Conectamos pessoas aos melhores negócios, seja em investimentos
                  ou ao seu lar! A UNUS é uma empresa moderna de inteligência
                  imobiliária que atua com os melhores imóveis prontos, na planta
                  ou em construção, sejam novos ou usados!
                </p>
                <p
                  className="text-[var(--secondary-500)] text-[15px] sm:text-[16px] leading-[1.75]"
                  style={{ fontWeight: 300 }}
                >
                  Se você busca comprometimento, seriedade e consultoria completa
                  na hora de COMPRAR ou VENDER um imóvel em São José e região da
                  Grande Florianópolis, pode contar com a nossa equipe de consultores
                  imobiliários especializados.
                </p>
              </div>

              {/* Signature Stats — inline */}
              <div className="flex items-center gap-8 mb-10 pb-10 border-b border-[var(--secondary-900)]/[0.08]">
                {[
                  { num: '9+', label: 'Anos de História' },
                  { num: '464', label: 'Famílias Realizadas' },
                  { num: '56.016', label: 'm² Comercializados' },
                ].map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <p
                      className="text-[24px] sm:text-[28px] text-[var(--color-heading)] leading-none mb-1"
                      style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}
                    >
                      {stat.num}
                    </p>
                    <p
                      className="text-[var(--color-caption)] text-[10px] uppercase tracking-[0.14em]"
                      style={{ fontWeight: 500 }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#nucleo"
                className="inline-flex items-center gap-3 group"
              >
                <span
                  className="text-[var(--color-heading)] text-[12px] uppercase tracking-[0.16em] pb-1 border-b border-[var(--secondary-900)]/20 group-hover:border-[#D4AF37] transition-colors duration-500"
                  style={{ fontWeight: 600 }}
                >
                  Conheça o Ecossistema UNUS
                </span>
                <div className="w-8 h-8 rounded-full border border-[var(--secondary-900)]/15 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-heading)] group-hover:text-white transition-colors duration-500" />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal / Lightbox */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            onClick={closeVideo}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative w-full max-w-[1100px] aspect-video z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/a3dpAyPaltg?autoplay=1&rel=0&modestbranding=1"
                title="UNUS Núcleo Imobiliário — Apresentação"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Bottom label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.2em]" style={{ fontWeight: 400 }}>
                UNUS Núcleo Imobiliário · Apresentação Institucional
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
