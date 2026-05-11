import type { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FavoritosClient } from './FavoritosClient';

export const metadata: Metadata = {
  title: 'Favoritos | UNUS Núcleo Imobiliário',
  description: 'Os imóveis que você salvou na UNUS Núcleo Imobiliário.',
  alternates: { canonical: `${SITE_URL}/favoritos` },
  robots: { index: false, follow: true },
};

export default function FavoritosPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[var(--secondary-900)] pt-48 pb-20 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-[1px] bg-[var(--gold)]" />
            <Heart
              className="w-3.5 h-3.5 text-[var(--gold)]/75"
              strokeWidth={1.5}
            />
            <span
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]/75"
              style={{ fontWeight: 600 }}
            >
              Coleção pessoal
            </span>
          </div>

          <h1
            className="text-[52px] sm:text-[68px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] text-white max-w-[640px]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Seus{' '}
            <span style={{ fontWeight: 600 }} className="italic text-[var(--gold)]">
              favoritos.
            </span>
          </h1>
        </div>
      </section>

      {/* ── Conteúdo dinâmico (client) ── */}
      <section className="bg-[var(--color-background)] min-h-[400px]">
        <FavoritosClient />
      </section>

    </div>
  );
}
