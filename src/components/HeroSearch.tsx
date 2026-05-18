import Image from 'next/image';
import { SearchBar } from './SearchBar';
import type { ApiMetadataResponse } from '@/types/vista';
import { whatsappUrl, WA_CONSULTIVO } from '@/lib/constants';

export function HeroSearch({ metadata }: { metadata?: ApiMetadataResponse }) {
  return (
    <section className="relative w-full h-screen min-h-[780px] lg:min-h-[820px] overflow-hidden">

      {/* ── Imagem de fundo ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Sala-UNUS-6.jpg"
          alt="Ambiente UNUS em Santa Catarina"
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          className="object-cover scale-[1.045]"
          style={{ filter: 'saturate(0.92) contrast(1.04)' }}
        />

        {/* Overlay principal — gradiente composto */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.34) 38%, rgba(0,0,0,0.82) 100%),
              linear-gradient(90deg,  rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.24) 44%, rgba(0,0,0,0.18) 100%)
            `,
          }}
        />

        {/* Glow champagne sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 22% 52%, rgba(216,180,106,0.14), transparent 34%)',
          }}
        />
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-[116px] pb-[76px] flex flex-col justify-center">

        {/* Bloco textual */}
        <div className="max-w-[1040px] mt-[clamp(40px,6vh,60px)]">

          {/* Título */}
          <h1
            className="font-serif font-light text-white leading-[1.02] tracking-[-0.025em] sm:leading-[0.98] sm:tracking-[-0.03em] text-title-hero"
          >
            <span className="block sm:whitespace-nowrap">
              <span className="font-bold">Onde</span> você mora
            </span>
            <span className="block sm:whitespace-nowrap">
              define como <span className="font-bold">você vive!</span>
            </span>
          </h1>
        </div>

        {/* SearchBar + CTA consultivo */}
        <div className="relative z-20 w-full max-w-[1040px] mt-[clamp(180px,24vh,260px)]">
          <SearchBar variant="hero" glass metadata={metadata} />
          <div className="mt-[18px]">
            <a
              href={whatsappUrl(WA_CONSULTIVO)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white/90 text-[11px] sm:text-[12px] font-medium uppercase tracking-[var(--tracking-button)] transition-colors duration-300 max-w-[320px] sm:max-w-none"
            >
              Prefere atendimento consultivo? Fale com um corretor
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hidden md:flex absolute bottom-14 right-8 sm:right-12 flex-col items-center gap-2">
        <span
          className="text-white/60 text-[10px] uppercase tracking-[0.18em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
