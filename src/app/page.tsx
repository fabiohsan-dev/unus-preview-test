import dynamic from 'next/dynamic';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryStrip } from '@/components/CategoryStrip';
import { PropertyCardGrid } from '@/components/PropertyCard';
import { SalesOpportunities } from '@/components/SalesOpportunities';
import { VisitUs } from '@/components/VisitUs';
import { NeighborhoodOpps } from '@/components/NeighborhoodOpps';
import { BlogSection } from '@/components/BlogSection';
import { getMetadataServer, getListarImoveisServer } from '@/lib/server/vistaService';
import { 
  mapToFeaturedProperty, 
  mapToOpportunity, 
  mapToGridProperty 
} from '@/lib/mappers/propertyMapper';

const FeaturedCards = dynamic(
  () => import('@/components/FeaturedCards').then((module) => module.FeaturedCards),
  {
    loading: () => <div className="min-h-[640px] bg-[var(--neutral-100)]" aria-hidden="true" />,
  }
);

const AboutUs = dynamic(
  () => import('@/components/AboutUs').then((module) => module.AboutUs),
  {
    loading: () => <div className="min-h-[620px] bg-[var(--neutral-50)]" aria-hidden="true" />,
  }
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
