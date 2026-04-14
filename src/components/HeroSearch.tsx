import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import type { ApiMetadataResponse } from '@/types/vista';

const quickTags = [
  { label: 'Alto padrão', href: '/venda?precoMin=2000000' },
  { label: 'Lançamentos', href: '/venda' },
  { label: 'Vista mar', href: '/venda?tipo=Cobertura' },
  { label: 'Campinas', href: '/venda?bairro=Campinas' },
  { label: 'Kobrasol', href: '/venda?bairro=Kobrasol' },
  { label: 'Pedra Branca', href: '/venda?bairro=Pedra%20Branca' },
  { label: 'Oportunidades', href: '/venda?precoMax=1000000' },
];

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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-white" />
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-white"
              style={{ fontWeight: 500 }}
            >
              São José · Campinas · Florianópolis
            </span>
          </div>

          <h1
            className="text-white text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontWeight: 300 }}
          >
            Onde inteligência
            <br />
            encontra <span style={{ fontWeight: 600, fontStyle: 'italic' }}>patrimônio.</span>
          </h1>

          <p
            className="text-white/60 text-[16px] sm:text-[18px] leading-relaxed max-w-[520px]"
            style={{ fontWeight: 300 }}
          >
            Consultoria imobiliária de alto padrão para quem entende que uma propriedade é,
            antes de tudo, uma decisão estratégica.
          </p>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="max-w-[800px]">
          <div className="relative z-20">
            <SearchBar variant="hero" glass metadata={metadata} />
          </div>

          <div className="relative z-10 flex flex-wrap gap-2 mt-4">
            {quickTags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="px-4 py-2 rounded-full text-[12px] tracking-[0.02em] bg-white/10 text-white/80 hover:bg-white/20 border border-white/10 transition-colors"
                style={{ fontWeight: 500, backdropFilter: 'blur(12px)' }}
              >
                {tag.label}
              </Link>
            ))}
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
