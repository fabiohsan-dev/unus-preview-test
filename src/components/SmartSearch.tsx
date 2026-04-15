'use client';

import { useState, useCallback, useRef, type FormEvent } from 'react';
import { Search, Sparkles, Lock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
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
    suites: 0,
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
          className="border border-[var(--neutral-300)] bg-[var(--neutral-50)] px-4 py-1.5 text-[12px] text-[var(--color-accent-text)]"
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
  const [isVerifying, setIsVerifying] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

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
    setIsVerifying(true);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'teste', password: password.trim() }),
      });

      if (res.status === 403 || res.status === 401) {
        setPasswordError('Senha incorreta. Tente novamente.');
        passwordInputRef.current?.select();
        setIsVerifying(false);
        return;
      }

      // Password accepted
      sessionStorage.setItem('preview_auth', 'true');
      sessionStorage.setItem('preview_pw', password.trim());
      setSavedPassword(password.trim());
      setIsAuthenticated(true);
    } catch {
      setPasswordError('Erro de conexão. Tente novamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  // ─── PASSWORD GATE ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '340px' }}>
        <div className="w-full max-w-[440px]">
          {/* Accent top line */}
          <div
            className="mx-auto mb-10"
            style={{
              width: '48px',
              height: '1px',
              background: 'var(--primary-500)',
            }}
          />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              style={{
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--neutral-300)',
                background: 'var(--neutral-50)',
              }}
            >
              <Lock
                className="text-[var(--secondary-700)]"
                size={20}
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="text-center mb-8">
            <h3
              className="text-[var(--color-heading)] mb-2"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
              }}
            >
              Acesso Restrito
            </h3>
            <p
              className="text-[var(--color-body)]"
              style={{
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Insira a senha para utilizar a busca inteligente.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password-input"
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em',
                  color: 'var(--secondary-600)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Senha de acesso
              </label>
              <input
                ref={passwordInputRef}
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                }}
                placeholder="••••••••••"
                autoComplete="off"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--secondary-900)',
                  background: 'var(--input-background)',
                  border: passwordError
                    ? '1px solid var(--error)'
                    : '1px solid var(--neutral-300)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  letterSpacing: '0.12em',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = passwordError
                    ? 'var(--error)'
                    : 'var(--primary-500)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = passwordError
                    ? 'var(--error)'
                    : 'var(--neutral-300)';
                }}
              />
              {/* Error */}
              <div
                style={{
                  minHeight: '24px',
                  paddingTop: '6px',
                }}
              >
                {passwordError && (
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--error)',
                      fontFamily: 'var(--font-sans)',
                      margin: 0,
                    }}
                  >
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!password.trim() || isVerifying}
              style={{
                width: '100%',
                padding: '14px 0',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.16em',
                color: '#FFFFFF',
                background: !password.trim() || isVerifying
                  ? 'var(--neutral-400)'
                  : 'var(--secondary-900)',
                border: 'none',
                cursor: !password.trim() || isVerifying ? 'default' : 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: !password.trim() ? 0.4 : 1,
              }}
              onMouseEnter={(e) => {
                if (password.trim() && !isVerifying) {
                  e.currentTarget.style.background = 'var(--secondary-800)';
                }
              }}
              onMouseLeave={(e) => {
                if (password.trim() && !isVerifying) {
                  e.currentTarget.style.background = 'var(--secondary-900)';
                }
              }}
            >
              {isVerifying ? (
                <>
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity={0.25}
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      opacity={0.75}
                    />
                  </svg>
                  Verificando
                </>
              ) : (
                <>
                  Acessar
                  <ArrowRight size={14} strokeWidth={1.5} />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div
            className="flex items-center justify-center gap-2 mt-8"
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--neutral-500)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <ShieldCheck size={13} strokeWidth={1.5} />
            <span>Ambiente de pré-visualização</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED VIEW ────────────────────────────────────────
  return (
    <div className="w-full space-y-10">
      {/* Status badge */}
      <div
        className="flex items-center gap-2"
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--success)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <CheckCircle size={14} strokeWidth={1.5} />
        <span>Acesso liberado</span>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="search-input"
            className="flex items-center gap-2 mb-3"
            style={{
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.14em',
              color: 'var(--secondary-600)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Sparkles size={13} strokeWidth={1.5} />
            Descreva o que você procura
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: apartamento 3 quartos com vista mar em Florianópolis..."
              disabled={loading}
              autoComplete="off"
              style={{
                width: '100%',
                padding: '16px 60px 16px 20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 300,
                color: 'var(--secondary-900)',
                background: 'var(--input-background)',
                border: '1px solid var(--neutral-300)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-500)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--neutral-300)';
              }}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              aria-label="Buscar imóveis"
              style={{
                position: 'absolute',
                right: '6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: loading || !query.trim()
                  ? 'var(--neutral-300)'
                  : 'var(--secondary-900)',
                color: '#FFFFFF',
                border: 'none',
                cursor: loading || !query.trim() ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: !query.trim() ? 0.4 : 1,
              }}
              onMouseEnter={(e) => {
                if (query.trim() && !loading) {
                  e.currentTarget.style.background = 'var(--secondary-800)';
                }
              }}
              onMouseLeave={(e) => {
                if (query.trim() && !loading) {
                  e.currentTarget.style.background = 'var(--secondary-900)';
                }
              }}
            >
              {loading ? (
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity={0.25}
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    opacity={0.75}
                  />
                </svg>
              ) : (
                <Search size={16} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions (when empty and no search yet) */}
      {!query.trim() && !hasSearched && (
        <div className="space-y-3">
          <p
            className="flex items-center gap-2"
            style={{
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.14em',
              color: 'var(--secondary-600)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Sparkles size={13} strokeWidth={1.5} />
            Sugestões de busca
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGESTOES.map((sugestao) => (
              <button
                key={sugestao}
                type="button"
                onClick={() => handleSuggestionClick(sugestao)}
                aria-label={`Buscar por: ${sugestao}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--secondary-600)',
                  background: 'var(--neutral-100)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-50)';
                  e.currentTarget.style.borderColor = 'var(--primary-200)';
                  e.currentTarget.style.color = 'var(--primary-800)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--neutral-100)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'var(--secondary-600)';
                }}
              >
                {sugestao}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extracted filters */}
      {filters && <FilterTags filters={filters} />}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16" role="status">
          <div
            className="flex items-center gap-3"
            style={{
              color: 'var(--secondary-500)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <svg
              className="animate-spin"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: 'var(--primary-500)' }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                opacity={0.25}
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                opacity={0.75}
              />
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 300 }}>
              Analisando sua busca com inteligência artificial…
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          style={{
            padding: '14px 18px',
            fontSize: '13px',
            fontWeight: 400,
            fontFamily: 'var(--font-sans)',
            color: 'var(--error-dark)',
            background: 'var(--error-light)',
            borderLeft: '3px solid var(--error)',
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && hasSearched && results.length > 0 && (
        <div className="space-y-8">
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.16em',
              color: 'var(--secondary-500)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {results.length}{' '}
            <span style={{ color: 'var(--secondary-900)' }}>
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

      {/* No results */}
      {!loading && hasSearched && results.length === 0 && !error && (
        <div className="py-20 text-center">
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--secondary-500)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Nenhum imóvel encontrado para esta busca.
          </p>
          <p
            style={{
              marginTop: '4px',
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--secondary-400)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Tente usar termos diferentes ou menos específicos.
          </p>
        </div>
      )}
    </div>
  );
}
