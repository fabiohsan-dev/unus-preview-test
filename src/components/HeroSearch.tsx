import Image from 'next/image';
import { SearchBar } from './SearchBar';
import type { ApiMetadataResponse } from '@/types/vista';

export function HeroSearch({ metadata }: { metadata?: ApiMetadataResponse }) {
  return (
    <section className="relative w-full h-screen min-h-[750px] flex flex-col">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Sala-UNUS-6.jpg"
          alt="Ambiente UNUS em Santa Catarina"
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      </div>

      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-24">
        <div className="max-w-[800px]">
          <h1
            className="text-white text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-normal"
            style={{ fontWeight: 300 }}
          >
            Onde você mora
            <br />
            define como você vive!
          </h1>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-24 sm:pb-28">
        <div className="relative z-20 w-full max-w-[980px]">
          <SearchBar variant="hero" glass metadata={metadata} />
          <div className="mt-4">
            <a
              href="https://wa.me/554830666767?text=Olá!%20Gostaria%20de%20atendimento%20consultivo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ fontWeight: 400 }}
            >
              Prefere atendimento consultivo? Fale com um corretor
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 right-8 sm:right-12 flex flex-col items-center gap-2">
        <span
          className="text-white/40 text-[9px] uppercase tracking-[0.25em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
