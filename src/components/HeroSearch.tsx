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
      <div className="relative z-10 h-full max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 pt-[116px] pb-[76px] flex flex-col justify-between">

        {/* Bloco textual */}
        <div className="max-w-[720px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-7 h-px bg-[var(--champagne)]" />
            <span
              className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              Imóveis selecionados em Santa Catarina
            </span>
          </div>

          {/* Título */}
          <h1
            className="font-serif font-light text-white leading-[1.02] tracking-[-0.035em] sm:leading-[0.98] sm:tracking-[-0.045em]"
            style={{ fontSize: 'clamp(44px, 13vw, 66px)' }}
          >
            <span style={{ fontSize: 'clamp(52px, 7vw, 104px)' }} className="block sm:inline">
              Onde você mora
            </span>
            <br className="hidden sm:block" />
            <span style={{ fontSize: 'clamp(52px, 7vw, 104px)' }} className="block sm:inline">
              define como você vive!
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            className="text-white/70 font-light leading-[1.6] sm:leading-[1.65] mt-5 sm:mt-6 max-w-[520px]"
            style={{ fontSize: 'clamp(14px, 1.15vw, 16px)' }}
          >
            Uma curadoria imobiliária para encontrar endereços que combinam
            localização, arquitetura e momento de vida.
          </p>
        </div>

        {/* SearchBar + CTA consultivo */}
        <div className="relative z-20 w-full max-w-[1040px]">
          <SearchBar variant="hero" glass metadata={metadata} />
          <div className="mt-[18px]">
            <a
              href={whatsappUrl(WA_CONSULTIVO)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white/90 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.11em] sm:tracking-[0.14em] transition-colors duration-300 max-w-[320px] sm:max-w-none"
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
          className="text-white/40 text-[10px] uppercase tracking-[0.18em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
