import dynamic from 'next/dynamic';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryStrip } from '@/components/CategoryStrip';
import { getMetadataServer, getListarImoveisServer } from '@/lib/server/vistaService';
import { SITE_URL, SITE_NAME, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_BASE, CRECI } from '@/lib/constants';
import {
  mapToFeaturedProperty,
  mapToOpportunity,
} from '@/lib/mappers/propertyMapper';

// Carregamento dinâmico para componentes abaixo da dobra (performance)
const FeaturedCards = dynamic(
  () => import('@/components/FeaturedCards').then((module) => module.FeaturedCards),
  {
    loading: () => <div className="min-h-[640px] bg-[var(--neutral-100)] animate-pulse" />,
  }
);

const HomeOpportunitySlider = dynamic(
  () => import('@/components/sections/HomeOpportunitySlider').then((mod) => mod.HomeOpportunitySlider),
  { loading: () => <div className="min-h-[520px] bg-[var(--off-white)] animate-pulse" /> }
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

const RetentionCTA = dynamic(
  () => import('@/components/RetentionCTA').then((mod) => mod.RetentionCTA),
  { loading: () => <div className="min-h-[120px] bg-[var(--neutral-100)] animate-pulse" /> }
);

const AnuncieStrip = dynamic(
  () => import('@/components/AnuncieStrip').then((mod) => mod.AnuncieStrip),
  { loading: () => <div className="min-h-[240px] bg-[var(--secondary-900)] animate-pulse" /> }
);


export const revalidate = 3600; // Revalida a cada 1 hora

export default async function HomePage() {
  const [metadata, featuredData, opportunitiesData] = await Promise.all([
    getMetadataServer().catch(() => undefined),
    getListarImoveisServer({ destaque: true, limit: 12 }).catch(() => ({ items: [] })),
    getListarImoveisServer({ limit: 3, ordem: 'mais-novo' }).catch(() => ({ items: [] })),
  ]);

  const rawFeatured = featuredData?.items || [];
  const rawOpps = opportunitiesData?.items || [];

  // Transforma os dados brutos usando mappers centralizados
  const featuredProperties = rawFeatured.map(mapToFeaturedProperty);
  const opportunities = rawOpps.map(mapToOpportunity);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    image: `${SITE_URL}/og-image.jpg`,
    description: 'Consultoria imobiliária de alto padrão em Florianópolis e Grande Florianópolis.',
    telephone: PHONE_DISPLAY,
    sameAs: [
      'https://www.instagram.com/unusnucleoimobiliario/',
      WHATSAPP_BASE,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São José',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Florianópolis' },
      { '@type': 'City', name: 'São José' },
      { '@type': 'City', name: 'Palhoça' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_HREF,
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    identifier: CRECI,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSearch metadata={metadata} />
      <CategoryStrip />
      <FeaturedCards properties={featuredProperties} />
      <RetentionCTA />
      <HomeOpportunitySlider opportunities={opportunities} />
      <SalesOpportunities opportunities={opportunities} />
      <AboutUs />
      <AnuncieStrip />
      <VisitUs />
      <NeighborhoodOpps />
      <BlogSection />
    </>
  );
}
