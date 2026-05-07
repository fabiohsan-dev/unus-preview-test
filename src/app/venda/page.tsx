import type { Metadata } from 'next';
import { PropertyFilters } from '@/components/PropertyFilters';
import { PropertyCard } from '@/components/PropertyCard';
import { getMetadataServer, getListarImoveisServer } from '@/lib/server/vistaService';
import { mapToGridProperty } from '@/lib/mappers/propertyMapper';
import { SITE_URL } from '@/lib/constants';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Imóveis à Venda — Alto Padrão em Florianópolis e São José',
  description: 'Encontre imóveis de alto padrão na Grande Florianópolis. Apartamentos, casas e coberturas selecionadas pela UNUS.',
  alternates: { canonical: `${SITE_URL}/venda` },
  openGraph: {
    title: 'Imóveis à Venda | UNUS Núcleo Imobiliário',
    description: 'Imóveis de alto padrão na Grande Florianópolis com curadoria UNUS.',
    type: 'website',
    url: `${SITE_URL}/venda`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'UNUS — Imóveis à Venda' }],
  },
};

interface VendaPageProps {
  searchParams: Promise<{
    cidade?: string;
    bairro?: string;
    tipo?: string;
    precoMin?: string;
    precoMax?: string;
    quartos?: string;
    suites?: string;
    vagas?: string;
    areaMin?: string;
    codigo?: string;
    page?: string;
    view?: string;
  }>;
}

export default async function VendaPage({ searchParams }: VendaPageProps) {
  const params = await searchParams;
  const viewMode = params.view || 'grid';
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = viewMode === 'list' ? 24 : 12;
  
  const [metadata, propertiesData] = await Promise.all([
    getMetadataServer().catch((e: unknown) => {
      console.error('[VendaPage] Falha ao carregar metadata:', e);
      return undefined;
    }),
    getListarImoveisServer({
      codigo: params.codigo,
      cidade: params.cidade,
      bairro: params.bairro,
      tipo: params.tipo,
      precoMin: params.precoMin,
      precoMax: params.precoMax,
      quartos: params.quartos ? Number(params.quartos) : undefined,
      suites: params.suites ? Number(params.suites) : undefined,
      vagas: params.vagas ? Number(params.vagas) : undefined,
      areaMin: params.areaMin,
      limit: itemsPerPage,
      page: currentPage
    }).catch(() => ({ items: [], total: 0, paginas: 1 }))
  ]);

  const properties = (propertiesData?.items || []).map(mapToGridProperty);
  const totalPages = Math.ceil((propertiesData?.total || 0) / itemsPerPage);

  // Gerador de URL de paginação preservando filtros
  const getPageUrl = (page: number) => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if(v) p.set(k, v); });
    p.set('page', page.toString());
    return `/venda?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <PropertyFilters metadata={metadata} />

      <main className={`flex flex-col lg:flex-row ${viewMode === 'grid' ? 'h-[calc(100vh-128px)] overflow-hidden' : 'min-h-screen'}`}>
        
        {/* Lado Esquerdo: Mapa (Apenas no modo Grid) */}
        {viewMode === 'grid' && (
          <div className="hidden lg:block w-[45%] xl:w-[50%] bg-[var(--neutral-100)] relative overflow-hidden border-r border-[var(--neutral-200)]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-caption)] p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <MapPin className="w-6 h-6 text-[var(--primary-500)]" />
              </div>
              <h3 className="text-[18px] mb-2 font-medium">Visualização em Mapa</h3>
              <p className="text-[14px] max-w-[280px] leading-relaxed">
                Integração com Google Maps em processamento.
              </p>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
        )}

        {/* Listagem de Imóveis */}
        <div className={`flex-1 ${viewMode === 'grid' ? 'overflow-y-auto no-scrollbar' : ''} px-6 py-8 sm:px-8 lg:px-10 bg-[var(--neutral-50)]/30`}>
          <div className={`${viewMode === 'list' ? 'max-w-[1400px]' : 'max-w-[1000px]'} mx-auto`}>
            
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[14px] uppercase tracking-[0.2em] text-[var(--color-caption)] font-semibold">
                {propertiesData?.total || 0} <span className="text-[var(--color-heading)]">Imóveis encontrados</span>
              </h1>
            </div>

            {properties.length > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                }>
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
