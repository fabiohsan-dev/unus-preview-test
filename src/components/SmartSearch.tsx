'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { Search, Sparkles, Lock, CheckCircle } from 'lucide-react';
import { PropertyCard, type PropertyCardData } from '@/components/PropertyCard';
import type { ImovelCard, SearchFilters } from '@/types/imovel';

function mapToPropertyCardData(imovel: ImovelCard): PropertyCardData {
  return {
    id: imovel.id,
    image: imovel.foto_capa || '',
    badge: imovel.destaque ? 'Destaque' : undefined,
    type: imovel.tipo,
    code: imovel.url.split('-').pop() || imovel.id,
    title: imovel.titulo,
    location: `${imovel.bairro || ''}${imovel.bairro && imovel.cidade ? ', ' : ''}${imovel.cidade || ''}`,
    transactionType: imovel.finalidade === 'venda' ? 'Venda' : 'Locação',
    price: imovel.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    bedrooms: imovel.quartos,
    suites: 0, // Not available in index table currently
    parkingSpots: imovel.vagas,
    bathrooms: imovel.banheiros,
    area: imovel.area_m2 > 0 ? `${imovel.area_m2} m²` : undefined,
  };
}

// ---------------------------------------------------------------------------
// Sugestões de busca
// ---------------------------------------------------------------------------

const SUGESTOES = [
  'Apartamento 2 quartos com vista mar',
  'Casa em condomínio fechado até R$ 1.5M',
  'Cobertura alto padrão com piscina privativa',
  'Imóvel para investimento no centro',
];

// ---------------------------------------------------------------------------
// Tags dos filtros
// ---------------------------------------------------------------------------

function FilterTags({ filters }: { filters: SearchFilters }) {
  const tags: string[] = [];

  if (filters.tipo) tags.push(filters.tipo);
  if (filters.finalidade) tags.push(filters.finalidade === 'locacao' ? 'Locação' : 'Venda');
  if (filters.quartos) tags.push(`${filters.quartos}+ quartos`);
  if (filters.banheiros) tags.push(`${filters.banheiros}+ banheiros`);
  if (filters.vagas) tags.push(`${filters.vagas}+ vagas`);
  if (filters.preco_max) {
    tags.push(
      `Até ${filters.preco_max.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      })}`
    );
  }
  if (filters.preco_min) {
    tags.push(
      `A partir de ${filters.preco_min.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      })}`
    );
  }
  if (filters.area_min) tags.push(`${filters.area_min}+ m²`);
  if (filters.bairro) tags.push(filters.bairro);
  if (filters.cidade) tags.push(filters.cidade);
  if (filters.caracteristicas && filters.caracteristicas.length > 0) {
    tags.push(...filters.caracteristicas);
  }

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" role="status" aria-label="Filtros aplicados">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-[var(--primary-500)]/5 px-4 py-1.5 text-[12px] text-[var(--color-accent-text)] transition-colors"
          style={{ fontWeight: 500 }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SmartSearch component
// ---------------------------------------------------------------------------

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ImovelCard[]>([]);
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Password gate
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('preview_auth') === 'true';
    }
    return false;
  });
  const [savedPassword, setSavedPassword] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('preview_pw') ?? '';
    }
    return '';
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: searchQuery.trim(),
            password: savedPassword,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            (errorData as { error?: string }).error ?? `Erro ${res.status}`
          );
        }

        const data = (await res.json()) as {
          results: ImovelCard[];
          filters: SearchFilters;
        };

        setResults(data.results);
        setFilters(data.filters);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao realizar a busca';
        setError(message);
        setResults([]);
        setFilters(null);
      } finally {
        setLoading(false);
      }
    },
    [savedPassword]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (sugestao: string) => {
    setQuery(sugestao);
    handleSearch(sugestao);
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) return;

    setPasswordError(null);

    // Test the password with a lightweight search request
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'teste', password: password.trim() }),
      });

      if (res.status === 403 || res.status === 401) {
        setPasswordError('Senha incorreta');
        return;
      }

      // Password accepted
      sessionStorage.setItem('preview_auth', 'true');
      sessionStorage.setItem('preview_pw', password.trim());
      setSavedPassword(password.trim());
      setIsAuthenticated(true);
    } catch {
      setPasswordError('Erro ao verificar senha');
    }
  };

  return (
    <div className="w-full space-y-10">
      {/* Password gate */}
      {!isAuthenticated ? (
        <div className="mx-auto max-w-md space-y-6">
          <div className="rounded-xl border border-[var(--neutral-300)] bg-[var(--card-background)] p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-500)]/10">
              <Lock className="h-5 w-5 text-[var(--primary-500)]" />
            </div>
            <h3
              className="text-[18px] text-[var(--color-heading)]"
              style={{ fontWeight: 600 }}
            >
              Acesso restrito
            </h3>
            <p
              className="mt-1 text-[13px] text-[var(--color-caption)]"
              style={{ fontWeight: 300 }}
            >
              Digite a senha para acessar a busca inteligente.
            </p>

            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-3">
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full rounded-lg border border-[var(--neutral-300)] bg-[var(--input-background)] px-4 py-3 text-center font-sans text-[15px] text-[var(--color-heading)] placeholder:text-[var(--neutral-400)] transition-colors duration-200 focus:border-[var(--primary-500)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-500)]"
                autoComplete="off"
              />
              {passwordError && (
                <p className="text-[12px] text-[var(--error)]" style={{ fontWeight: 500 }}>
                  {passwordError}
                </p>
              )}
              <button
                type="submit"
                disabled={!password.trim()}
                className="w-full rounded-lg bg-[var(--secondary-900)] py-3 text-[13px] text-white transition-all duration-200 hover:bg-[var(--secondary-800)] disabled:pointer-events-none disabled:opacity-30"
                style={{ fontWeight: 600, letterSpacing: '0.05em' }}
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Authenticated badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-caption)]">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            <span style={{ fontWeight: 400 }}>Acesso liberado</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="search-input"
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
                style={{ fontWeight: 600 }}
              >
                <Sparkles className="w-3.5 h-3.5" /> Descreva o que você procura
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: apartamento 3 quartos com vista mar no Leblon..."
                  className="w-full rounded-lg border border-[var(--neutral-300)] bg-[var(--input-background)] px-5 py-4 pr-14 font-sans text-[15px] text-[var(--color-heading)] placeholder:text-[var(--neutral-400)] transition-colors duration-200 focus:border-[var(--primary-500)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-500)]"
                  autoComplete="off"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  aria-label="Buscar imóveis"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--secondary-900)] rounded-lg p-3 text-white transition-all duration-200 hover:bg-[var(--secondary-800)] disabled:pointer-events-none disabled:opacity-30"
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        className="opacity-75"
                      />
                    </svg>
                  ) : (
                    <Search className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </form>

      {/* Sugestões (quando vazio e sem resultados) */}
      {!query.trim() && !hasSearched && (
        <div className="space-y-3">
          <p
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-caption)]"
            style={{ fontWeight: 600 }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Sugestões de busca
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGESTOES.map((sugestao) => (
              <button
                key={sugestao}
                type="button"
                onClick={() => handleSuggestionClick(sugestao)}
                aria-label={`Buscar por: ${sugestao}`}
                className="rounded-full bg-[var(--neutral-100)] px-4 py-2 font-sans text-[12px] text-[var(--color-body)] transition-colors hover:bg-[var(--primary-500)]/10 hover:text-[var(--color-accent-text)] cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                {sugestao}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtros extraídos */}
      {filters && <FilterTags filters={filters} />}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16" role="status">
          <div className="flex items-center gap-3 text-[var(--color-caption)]">
            <svg
              aria-hidden="true"
              className="h-5 w-5 animate-spin text-[var(--primary-500)]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                className="opacity-75"
              />
            </svg>
            <span className="text-[13px]" style={{ fontWeight: 300 }}>
              Analisando sua busca com inteligência artificial...
            </span>
          </div>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-[var(--error)] bg-[var(--error-light)] p-4 text-[13px] text-[var(--error-dark)]"
        >
          {error}
        </div>
      )}

      {/* Resultados */}
      {!loading && hasSearched && results.length > 0 && (
        <div className="space-y-8">
          <p
            className="text-[14px] uppercase tracking-[0.2em] text-[var(--color-caption)]"
            style={{ fontWeight: 600 }}
          >
            {results.length}{' '}
            <span className="text-[var(--color-heading)]">
              {results.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </span>
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((imovel) => (
              <PropertyCard key={imovel.id} property={mapToPropertyCardData(imovel)} variant="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Sem resultados */}
      {!loading && hasSearched && results.length === 0 && !error && (
        <div className="py-20 text-center">
          <p
            className="text-[14px] text-[var(--color-body)]"
            style={{ fontWeight: 300 }}
          >
            Nenhum imóvel encontrado para esta busca.
          </p>
          <p
            className="mt-1 text-[12px] text-[var(--color-caption)]"
            style={{ fontWeight: 400 }}
          >
            Tente usar termos diferentes ou menos específicos.
          </p>
        </div>
      )}
        </>
      )}
    </div>
  );
}
