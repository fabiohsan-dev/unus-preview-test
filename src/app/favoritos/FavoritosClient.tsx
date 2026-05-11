'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { getAllFavorites } from '@/hooks/useFavorites';
import { obterImovel } from '@/lib/vistaApi';
import { mapToGridProperty } from '@/lib/mappers/propertyMapper';
import { PropertyCard, type PropertyCardData } from '@/components/PropertyCard';

const STORAGE_KEY = 'unus:favorites';

/* ── skeleton de card ── */
function CardSkeleton() {
  return (
    <div className="bg-white border border-[var(--neutral-200)] animate-pulse">
      <div className="w-full aspect-[4/3] bg-[var(--neutral-100)]" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-[var(--neutral-100)] rounded" />
        <div className="h-5 w-4/5 bg-[var(--neutral-100)] rounded" />
        <div className="h-3 w-1/2 bg-[var(--neutral-100)] rounded" />
        <div className="h-px bg-[var(--neutral-100)]" />
        <div className="flex gap-4">
          <div className="h-4 w-12 bg-[var(--neutral-100)] rounded" />
          <div className="h-4 w-12 bg-[var(--neutral-100)] rounded" />
          <div className="h-4 w-12 bg-[var(--neutral-100)] rounded" />
        </div>
        <div className="h-8 w-full bg-[var(--neutral-100)] rounded" />
      </div>
    </div>
  );
}

/* ── estado vazio ── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      <div className="w-16 h-16 border border-[var(--neutral-200)] flex items-center justify-center mb-8">
        <Heart className="w-7 h-7 text-[var(--neutral-300)]" strokeWidth={1.5} />
      </div>

      <h2
        className="text-[28px] sm:text-[36px] text-[var(--color-heading)] mb-4 leading-[1.2]"
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
      >
        Nenhum imóvel salvo ainda.
      </h2>

      <p
        className="text-[15px] text-[var(--color-body)] leading-[1.8] max-w-[420px] mb-10"
        style={{ fontWeight: 300 }}
      >
        Navegue pelos imóveis e clique no{' '}
        <Heart className="w-3.5 h-3.5 inline-block mx-0.5 text-[var(--color-body)]" strokeWidth={1.5} />{' '}
        para salvar os seus favoritos aqui.
      </p>

      <Link
        href="/venda"
        className="inline-flex items-center gap-3 bg-[var(--secondary-900)] text-white
          text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
          hover:bg-[var(--secondary-800)] transition-colors group"
      >
        Ver imóveis disponíveis
        <ArrowRight
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
}

/* ── componente principal ── */
export function FavoritosClient() {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('loading');
  const [cards, setCards] = useState<PropertyCardData[]>([]);
  const [skeletonCount, setSkeletonCount] = useState(3);

  /* Carrega favoritos ao montar */
  useEffect(() => {
    const codes = getAllFavorites();

    if (codes.length === 0) {
      setStatus('empty');
      return;
    }

    setSkeletonCount(Math.min(codes.length, 12));

    Promise.all(
      codes.map((code, i) =>
        obterImovel(code)
          .then((res) => (res ? mapToGridProperty(res.imovel, i) : null))
          .catch(() => null)
      )
    ).then((results) => {
      const valid = results.filter(Boolean) as PropertyCardData[];
      if (valid.length === 0) {
        setStatus('empty');
      } else {
        setCards(valid);
        setStatus('ready');
      }
    });
  }, []);

  /* Sincroniza remoções entre abas */
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const current = new Set(getAllFavorites());
      setCards((prev) => {
        const next = prev.filter((c) => current.has(String(c.code)));
        if (next.length === 0) setStatus('empty');
        return next;
      });
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  /* ── loading ── */
  if (status === 'loading') {
    return (
      <div className="px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-4 h-4 text-[var(--color-caption)] animate-spin" strokeWidth={1.5} />
            <span
              className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-caption)]"
              style={{ fontWeight: 500 }}
            >
              A carregar favoritos…
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── vazio ── */
  if (status === 'empty') {
    return (
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <EmptyState />
      </div>
    );
  }

  /* ── com resultados ── */
  return (
    <div className="px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto">

        {/* Cabeçalho da grid */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--neutral-100)]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
              style={{ fontWeight: 600 }}
            >
              {cards.length} {cards.length === 1 ? 'imóvel salvo' : 'imóveis salvos'}
            </span>
          </div>

          <Link
            href="/venda"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]
              text-[var(--color-caption)] hover:text-[var(--color-heading)]
              transition-colors group"
            style={{ fontWeight: 500 }}
          >
            Ver todos os imóveis
            <ArrowRight
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((property) => (
            <PropertyCard key={property.code} property={property} variant="grid" />
          ))}
        </div>

        {/* Nota sobre persistência */}
        <p
          className="mt-12 text-center text-[12px] text-[var(--color-caption)] leading-[1.7]"
          style={{ fontWeight: 300 }}
        >
          Seus favoritos são salvos neste navegador.
          Limpar os dados do browser apaga esta lista.
        </p>

      </div>
    </div>
  );
}
