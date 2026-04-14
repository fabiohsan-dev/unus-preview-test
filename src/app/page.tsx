import dynamic from 'next/dynamic';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryStrip } from '@/components/CategoryStrip';
import { getMetadataServer, getListarImoveisServer } from '@/lib/server/vistaService';
import { 
  mapToFeaturedProperty, 
  mapToOpportunity, 
  mapToGridProperty 
} from '@/lib/mappers/propertyMapper';

// Carregamento dinâmico para componentes abaixo da dobra (performance)
const FeaturedCards = dynamic(
  () => import('@/components/FeaturedCards').then((module) => module.FeaturedCards),
  {
    loading: () => <div className="min-h-[640px] bg-[var(--neutral-100)] animate-pulse" />,
  }
);

const PropertyCardGrid = dynamic(
  () => import('@/components/PropertyCard').then((mod) => mod.PropertyCardGrid),
  { loading: () => <div className="min-h-[800px] bg-[var(--color-background)] animate-pulse" /> }
);

const SalesOpportunities = dynamic(
  () => import('@/components/SalesOpportunities').then((mod) => mod.SalesOpportunities),
  { loading: () => <div className="min-h-[500px] bg-white animate-pulse" /> }
);

const AboutUs = dynamic(
  () => import('@/components/AboutUs').then((module) => module.AboutUs),
  {
    loading: () => <div className="min-h-[620px] bg-[var(--neutral-50)] animate-pulse" />,
  }
);

const VisitUs = dynamic(
  () => import('@/components/VisitUs').then((mod) => mod.VisitUs),
  { loading: () => <div className="min-h-[400px] bg-white animate-pulse" /> }
);

const NeighborhoodOpps = dynamic(
  () => import('@/components/NeighborhoodOpps').then((mod) => mod.NeighborhoodOpps),
  { loading: () => <div className="min-h-[500px] bg-[var(--neutral-50)] animate-pulse" /> }
);

const BlogSection = dynamic(
  () => import('@/components/BlogSection').then((mod) => mod.BlogSection),
  { loading: () => <div className="min-h-[600px] bg-white animate-pulse" /> }
);

export const revalidate = 3600; // Revalida a cada 1 hora

export default async function HomePage() {
  const [metadata, featuredData, opportunitiesData, gridData] = await Promise.all([
    getMetadataServer().catch(() => undefined),
    getListarImoveisServer({ destaque: true, limit: 12 }).catch(() => ({ items: [] })),
    getListarImoveisServer({ limit: 3, ordem: 'mais-novo' }).catch(() => ({ items: [] })),
    getListarImoveisServer({ limit: 12 }).catch(() => ({ items: [] }))
  ]);

  const rawFeatured = featuredData?.items || [];
  const rawOpps = opportunitiesData?.items || [];
  const rawGrid = gridData?.items || [];

  // Transforma os dados brutos usando mappers centralizados
  const featuredProperties = rawFeatured.map(mapToFeaturedProperty);
  const opportunities = rawOpps.map(mapToOpportunity);
  const gridProperties = rawGrid.map(mapToGridProperty);

  return (
    <>
      <HeroSearch metadata={metadata} />
      <CategoryStrip />
      <FeaturedCards properties={featuredProperties} />
      <PropertyCardGrid properties={gridProperties} />
      <SalesOpportunities opportunities={opportunities} />
      <AboutUs />
      <VisitUs />
      <NeighborhoodOpps />
      <BlogSection />
    </>
  );
}
