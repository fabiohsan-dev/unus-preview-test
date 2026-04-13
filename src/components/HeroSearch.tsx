'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import type { ApiMetadataResponse } from '@/types/vista';

const quickTags = [
  { label: 'Alto padrão', icon: '✦' },
  { label: 'Lançamentos', icon: '🏗' },
  { label: 'Vista mar', icon: '🌊' },
  { label: 'Campinas', icon: null },
  { label: 'Kobrasol', icon: null },
  { label: 'Pedra Branca', icon: null },
  { label: 'Oportunidades', icon: '📈' },
];

export function HeroSearch({ metadata }: { metadata?: ApiMetadataResponse }) {
  const [activeQuickTag, setActiveQuickTag] = useState<string | null>(null);

  return (
    <section className="relative w-full h-screen min-h-[750px] flex flex-col">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={(el) => {
            if (el) {
              const video = el;
              const handleTimeUpdate = () => {
                if (video.currentTime >= 5) {
                  video.pause();
                  video.removeEventListener('timeupdate', handleTimeUpdate);
                }
              };
              video.addEventListener('timeupdate', handleTimeUpdate);
              video.addEventListener('loadedmetadata', () => {
                video.currentTime = 0;
                video.play().catch(() => {});
              });
              if (video.readyState >= 2) {
                video.currentTime = 0;
                video.play().catch(() => {});
              }
            }
          }}
          src="https://sdr-w.agenciaalea.com.br/Unus.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      </div>

      {/* Hero Text — vertically centered */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-24">
        <div className="max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-white" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-white" style={{ fontWeight: 500 }}>
                São José · Campinas · Florianópolis
              </span>
            </div>

            <h1 className="text-white text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontWeight: 300 }}>
              Onde inteligência<br />
              encontra <span style={{ fontWeight: 600, fontStyle: 'italic' }}>patrimônio.</span>
            </h1>

            <p className="text-white/60 text-[16px] sm:text-[18px] leading-relaxed max-w-[520px]" style={{ fontWeight: 300 }}>
              Consultoria imobiliária de alto padrão para quem entende que uma propriedade é, antes de tudo, uma decisão estratégica.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar — anchored to bottom */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-20">
              <SearchBar variant="hero" glass metadata={metadata} />
            </div>

            {/* Quick Tags */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-4">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => setActiveQuickTag(activeQuickTag === tag.label ? null : tag.label)}
                  className={`px-4 py-2 rounded-full text-[12px] tracking-[0.02em] transition-all duration-300 cursor-pointer ${
                    activeQuickTag === tag.label
                      ? 'bg-white text-[var(--color-heading)]'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                  }`}
                  style={{ fontWeight: 500, backdropFilter: 'blur(12px)' }}
                >
                  {tag.icon && <span className="mr-1.5">{tag.icon}</span>}
                  {tag.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-16 right-8 sm:right-12 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[9px] uppercase tracking-[0.25em]" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}