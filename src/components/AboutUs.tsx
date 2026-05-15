'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Play, X } from 'lucide-react';

export function AboutUs() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openVideo = useCallback(() => setIsVideoOpen(true), []);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  useEffect(() => {
    if (!isVideoOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideo();
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeVideo, isVideoOpen]);

  return (
    <>
      <section
        id="quem-somos"
        className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-[var(--bg-section)]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <button
                ref={triggerRef}
                type="button"
                className="w-full relative aspect-[16/10] overflow-hidden group cursor-pointer border-none p-0 text-left bg-transparent"
                onClick={openVideo}
                aria-haspopup="dialog"
                aria-expanded={isVideoOpen}
                aria-controls="about-video-dialog"
                aria-label="Assistir vídeo institucional da UNUS"
              >
                <Image
                  src="https://img.youtube.com/vi/a3dpAyPaltg/hqdefault.jpg"
                  alt="UNUS Núcleo Imobiliário — vídeo institucional"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 w-[88px] h-[88px] rounded-full border border-white/20 group-hover:scale-[1.2] group-hover:opacity-0 transition-all duration-700" />
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
                <div
                  className="absolute bottom-5 left-5 px-4 py-2.5"
                  style={{
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p
                    className="text-white/90 text-[11px] font-medium uppercase tracking-[0.18em]"
                  >
                    Assistir apresentação · 2:40
                  </p>
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:pl-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[var(--gold)]" />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--champagne-readable)]"
                >
                  Quem Somos
                </span>
              </div>

              <h2
                className="text-[length:var(--title-section)] leading-[1.1] tracking-[-0.015em] text-[var(--color-heading)] mb-8 font-serif font-light"
              >
                UNUS <span className="italic font-medium">Núcleo</span> Imobiliário
                <br />
                <span className="font-semibold">
                  Conectamos pessoas aos melhores negócios.
                </span>
              </h2>

              <div className="space-y-5 mb-10 pb-10 border-b border-[var(--secondary-900)]/[0.08]">
                <p
                  className="text-[var(--color-body)] text-[15px] sm:text-[16px] leading-[1.75] font-light"
                >
                  Conectamos pessoas aos melhores negócios, seja em investimentos ou ao
                  seu lar. A UNUS é uma empresa moderna de inteligência imobiliária que
                  atua com os melhores imóveis prontos, na planta ou em construção, sejam
                  novos ou usados.
                </p>
                <p
                  className="text-[var(--color-body)] text-[15px] sm:text-[16px] leading-[1.75] font-light"
                >
                  Se você busca comprometimento, seriedade e consultoria completa na hora de
                  comprar ou vender um imóvel em São José e região da Grande Florianópolis,
                  pode contar com a nossa equipe de consultores especializados.
                </p>
              </div>

              <Link href="/o-nucleo" className="inline-flex items-center gap-3 group">
                <span
                  className="text-[var(--color-heading)] text-[12px] font-semibold uppercase tracking-[0.16em] pb-1 border-b border-[var(--secondary-900)]/20 group-hover:border-[var(--champagne)] transition-colors duration-500"
                >
                  Conheça o Ecossistema UNUS
                </span>
                <div className="w-8 h-8 rounded-full border border-[var(--secondary-900)]/15 flex items-center justify-center group-hover:bg-[var(--champagne)] group-hover:border-[var(--champagne)] transition-all duration-500">
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-heading)] group-hover:text-white transition-colors duration-500" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            id="about-video-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            onClick={() => {
              closeVideo();
              requestAnimationFrame(() => triggerRef.current?.focus());
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-video-title"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                closeVideo();
                requestAnimationFrame(() => triggerRef.current?.focus());
              }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors z-10 cursor-pointer"
              aria-label="Fechar vídeo"
            >
              <X className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative w-full max-w-[1100px] aspect-video z-10"
              onClick={(event) => event.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/a3dpAyPaltg?autoplay=1&rel=0&modestbranding=1"
                title="UNUS Núcleo Imobiliário — apresentação"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <p
                id="about-video-title"
                className="text-white/40 text-[11px] font-normal uppercase tracking-[0.2em]"
              >
                UNUS Núcleo Imobiliário · Apresentação Institucional
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
