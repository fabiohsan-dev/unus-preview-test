'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Heart, Loader2, MapPin } from 'lucide-react';
import { getAllFavorites } from '@/hooks/useFavorites';
import { normalizeFavoriteToken } from '@/lib/favoriteIds';
import { obterEmpreendimento, obterImovel } from '@/lib/vistaApi';
import { mapToGridProperty } from '@/lib/mappers/propertyMapper';
import { buildEmpreendimentoSlug } from '@/lib/slug';
import { ContentImage } from '@/components/ContentImage';
import { PropertyCard, type PropertyCardData } from '@/components/PropertyCard';
import type { VistaEmpreendimento } from '@/types/vista';

const STORAGE_KEY = 'unus:favorites';

function CardSkeleton() {
  return (
    <div className="bg-white border border-[var(--neutral-200)] animate-pulse">
      <div className="w-full aspect-[4/3] bg-[var(--neutral-100)]" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-[var(--neutral-100)] rounded" />
        <div className="h-5 w-4/5 bg-[var(--neutral-100)] rounded" />
        <div className="h-3 w-1/2 bg-[var(--neutral-100)] rounded" />
        <div className="h-px bg-[var(--neutral-100)]" />
        <div className="h-8 w-full bg-[var(--neutral-100)] rounded" />
      </div>
    </div>
  );
}

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
        Navegue pela curadoria da UNUS e marque imóveis ou empreendimentos para voltar a eles com facilidade.
      </p>
      <Link
        href="/venda"
        className="inline-flex items-center gap-3 bg-[var(--secondary-900)] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4 hover:bg-[var(--secondary-800)] transition-colors group"
      >
        Ver imóveis disponíveis
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
      </Link>
    </div>
  );
}

function EmpreendimentoFavoriteCard({ item }: { item: VistaEmpreendimento }) {
  const title = item.Empreendimento || item.TituloSite || `Empreendimento em ${item.Bairro}`;
  const href = `/empreendimento/${buildEmpreendimentoSlug(item)}`;

  return (
    <Link href={href} className="group bg-white border border-[var(--neutral-200)] overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--secondary-900)]">
        <ContentImage
          src={item.FotoDestaque}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          protectedContent
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-[var(--color-accent-text)]">
          <Building2 className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[12px] uppercase tracking-[0.2em]" style={{ fontWeight: 600 }}>
            Empreendimento
          </span>
        </div>
        <h3 className="text-[var(--color-heading)] text-[22px] leading-[1.25] mb-4" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
          {title}
        </h3>
        <div className="flex items-center gap-1.5 mt-auto text-[var(--color-body)]">
          <MapPin className="w-3.5 h-3.5 text-[var(--color-caption)]" strokeWidth={1.5} />
          <span className="text-[14px]" style={{ fontWeight: 300 }}>
            {[item.Bairro, item.Cidade].filter(Boolean).join(', ') || 'Santa Catarina'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FavoritosClient() {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('loading');
  const [cards, setCards] = useState<PropertyCardData[]>([]);
  const [empreendimentos, setEmpreendimentos] = useState<VistaEmpreendimento[]>([]);
  const [skeletonCount, setSkeletonCount] = useState(3);

  const loadFavorites = useCallback(() => {
    const tokens = getAllFavorites()
      .map((token) => normalizeFavoriteToken(token))
      .filter((token): token is NonNullable<ReturnType<typeof normalizeFavoriteToken>> => Boolean(token));

    if (tokens.length === 0) {
      setCards([]);
      setEmpreendimentos([]);
      setStatus('empty');
      return;
    }

    setStatus('loading');
    setSkeletonCount(Math.min(tokens.length, 12));

    Promise.all(
      tokens.map(async (token, index) => {
        if (token.kind === 'empreendimento') {
          const res = await obterEmpreendimento(token.code);
          return res?.empreendimento ? { kind: token.kind, item: res.empreendimento } : null;
        }

        const res = await obterImovel(token.code);
        return res ? { kind: token.kind, item: mapToGridProperty(res.imovel, index) } : null;
      }),
    ).then((results) => {
      const nextCards: PropertyCardData[] = [];
      const nextEmpreendimentos: VistaEmpreendimento[] = [];

      results.forEach((result) => {
        if (!result) return;
        if (result.kind === 'imovel') {
          nextCards.push(result.item);
        } else {
          nextEmpreendimentos.push(result.item);
        }
      });

      setCards(nextCards);
      setEmpreendimentos(nextEmpreendimentos);
      setStatus(nextCards.length || nextEmpreendimentos.length ? 'ready' : 'empty');
    });
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadFavorites();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [loadFavorites]);

  if (status === 'loading') {
    return (
      <div className="px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-4 h-4 text-[var(--color-caption)] animate-spin" strokeWidth={1.5} />
            <span className="text-[12px] uppercase tracking-[0.25em] text-[var(--color-caption)]" style={{ fontWeight: 500 }}>
              A carregar favoritos...
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

  if (status === 'empty') {
    return (
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--neutral-100)]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]" style={{ fontWeight: 600 }}>
              {cards.length + empreendimentos.length} favoritos salvos
            </span>
          </div>
          <Link href="/venda" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-caption)] hover:text-[var(--color-heading)] transition-colors group" style={{ fontWeight: 500 }}>
            Ver todos os imóveis
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((property) => (
            <PropertyCard key={`imovel-${property.code}`} property={property} variant="grid" />
          ))}
          {empreendimentos.map((item) => (
            <EmpreendimentoFavoriteCard key={`empreendimento-${item.Codigo}`} item={item} />
          ))}
        </div>

        <p className="mt-12 text-center text-[12px] text-[var(--color-caption)] leading-[1.7]" style={{ fontWeight: 300 }}>
          Seus favoritos são salvos neste navegador. Limpar os dados do browser apaga esta lista.
        </p>
      </div>
    </div>
  );
}
