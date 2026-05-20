import type { Metadata } from 'next';
import { PropertyFilters } from '@/components/PropertyFilters';
import { PropertyCard } from '@/components/PropertyCard';
import { getMetadataServer, getListarImoveisServer } from '@/lib/server/vistaService';
import { mapToGridProperty } from '@/lib/mappers/propertyMapper';
import { SITE_URL } from '@/lib/constants';
import { normalizeVendaSearchParams, vendaFiltersFromParams, vendaUrl } from '@/lib/vendaSearch';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface VendaPageProps {
  searchParams: Promise<{
    cidade?: string;
    bairro?: string;
    tipo?: string;
    categoria?: string;
    finalidade?: string;
    negocio?: string;
    precoMin?: string;
    precoMax?: string;
    quartos?: string;
    suites?: string;
    vagas?: string;
    areaMin?: string;
    areaMax?: string;
    banheiros?: string;
    codigo?: string;
    ordem?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: VendaPageProps): Promise<Metadata> {
  const normalized = normalizeVendaSearchParams(await searchParams);
  const hasFilters = Boolean(normalized.query);

  return {
    title: 'Imóveis à Venda — Alto Padrão em Florianópolis e São José',
    description: 'Encontre imóveis de alto padrão na Grande Florianópolis. Apartamentos, casas e coberturas selecionadas pela UNUS.',
    alternates: { canonical: `${SITE_URL}/venda` },
    robots: hasFilters ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: 'Imóveis à Venda | UNUS Núcleo Imobiliário',
      description: 'Imóveis de alto padrão na Grande Florianópolis com curadoria UNUS.',
      type: 'website',
      url: `${SITE_URL}/venda`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'UNUS — Imóveis à Venda' }],
    },
  };
}

export default async function VendaPage({ searchParams }: VendaPageProps) {
  const rawParams = await searchParams;
  const normalized = normalizeVendaSearchParams(rawParams);
  if (normalized.changed) {
    redirect(normalized.query ? `/venda?${normalized.query}` : '/venda');
  }

  const params = normalized.params;
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 24;
  
  const [metadata, propertiesData] = await Promise.all([
    getMetadataServer().catch((e: unknown) => {
      console.error('[VendaPage] Falha ao carregar metadata:', e);
      return undefined;
    }),
    getListarImoveisServer({
      ...vendaFiltersFromParams(params),
      limit: itemsPerPage,
      page: currentPage,
    }).catch(() => ({ items: [], total: 0, paginas: 1 }))
  ]);

  const properties = (propertiesData?.items || []).map(mapToGridProperty);
  const totalPages = Math.ceil((propertiesData?.total || 0) / itemsPerPage);

  // Gerador de URL de paginação preservando filtros
  const getPageUrl = (page: number) => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if(v) p.set(k, v); });
    p.set('page', page.toString());
    return vendaUrl(Object.fromEntries(p.entries()));
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Imóveis à venda', item: `${SITE_URL}/venda` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PropertyFilters metadata={metadata} />

      <main className="min-h-screen">

        {/* Listagem de Imóveis */}
        <div className="flex-1 px-6 py-8 sm:px-8 lg:px-10 bg-[var(--neutral-50)]/30">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[14px] uppercase tracking-[0.2em] text-[var(--color-caption)] font-semibold">
                {propertiesData?.total || 0} <span className="text-[var(--color-heading)]">Imóveis encontrados</span>
              </h1>
            </div>

            {properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((prop) => (
                    <PropertyCard 
                      key={prop.id} 
                      property={prop} 
                      variant="grid" // Sempre vertical no grid de 3 colunas ou split
                    />
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-16 mb-20">
                    {currentPage > 1 && (
                      <Link href={getPageUrl(currentPage - 1)} className="p-3 bg-white border border-[var(--neutral-200)] rounded-lg hover:border-[var(--primary-500)] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-[var(--color-heading)]">Página {currentPage}</span>
                      <span className="text-[14px] text-[var(--color-caption)]">de {totalPages}</span>
                    </div>

                    {currentPage < totalPages && (
                      <Link href={getPageUrl(currentPage + 1)} className="p-3 bg-white border border-[var(--neutral-200)] rounded-lg hover:border-[var(--primary-500)] transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="text-[var(--color-caption)]">Nenhum imóvel encontrado com estes filtros.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
