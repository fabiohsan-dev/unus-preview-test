import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getDetalheImovelServer } from '@/lib/server/vistaService';
import { SITE_URL } from '@/lib/constants';
import { buildPropertySlug, extractCodigoFromSlug } from '@/lib/slug';
import ImovelClientView from './ImovelClientView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const codigo = extractCodigoFromSlug(slug);
  
  if (!codigo) return { title: 'Imóvel não encontrado' };

  try {
    const data = await getDetalheImovelServer(codigo);
    if (!data) return { title: 'Imóvel não encontrado' };

    const { imovel } = data;
    const title = imovel.TituloSite || `${imovel.Categoria} em ${imovel.Bairro || imovel.Cidade}`;
    const description = imovel.DescricaoSite || imovel.Descricao || '';
    const imageUrl = imovel.FotoDestaque || '';
    const canonicalSlug = buildPropertySlug(imovel);

    return {
      title: `${title} | UNUS Núcleo Imobiliário`,
      description: description.slice(0, 160),
      alternates: { canonical: `${SITE_URL}/imovel/${canonicalSlug || slug}` },
      openGraph: {
        title,
        description: description.slice(0, 160),
        url: `${SITE_URL}/imovel/${canonicalSlug || slug}`,
        images: imageUrl ? [{ url: imageUrl }] : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
        type: 'website',
      },
    };
  } catch {
    return { title: 'Imóvel | UNUS Núcleo Imobiliário' };
  }
}

export default async function ImovelPage({ params }: Props) {
  const { slug } = await params;
  const codigo = extractCodigoFromSlug(slug);

  if (!codigo) notFound();

  const data = await getDetalheImovelServer(codigo);
  if (!data) notFound();

  const { imovel, fotos } = data;
  const canonicalSlug = buildPropertySlug(imovel);
  if (canonicalSlug && slug !== canonicalSlug) {
    redirect(`/imovel/${canonicalSlug}`);
  }

  // JSON-LD Dinâmico para SEO 10/10
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: imovel.TituloSite || `${imovel.Categoria} em ${imovel.Bairro}`,
    description: (imovel.DescricaoSite || imovel.Descricao || '').slice(0, 200),
    url: `${SITE_URL}/imovel/${slug}`,
    image: fotos.map(f => f.URLArquivo || f.URL).filter(Boolean),
    price: imovel.ValorVenda && imovel.ValorVenda !== '0' ? Number(imovel.ValorVenda) : undefined,
    priceCurrency: 'BRL',
    address: {
      '@type': 'PostalAddress',
      addressLocality: imovel.Cidade || '',
      addressRegion: imovel.UF || 'SC',
      neighborhood: imovel.Bairro || '',
    },
    numberOfRooms: imovel.Dormitorios ? Number(imovel.Dormitorios) : undefined,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: imovel.AreaPrivativa ? Number(imovel.AreaPrivativa) : undefined,
      unitCode: 'MTK',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Imóveis à venda', item: `${SITE_URL}/venda` },
      {
        '@type': 'ListItem',
        position: 3,
        name: imovel.TituloSite || `${imovel.Categoria} em ${imovel.Bairro}`,
        item: `${SITE_URL}/imovel/${canonicalSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ImovelClientView imovel={imovel} fotos={fotos} />
    </>
  );
}
