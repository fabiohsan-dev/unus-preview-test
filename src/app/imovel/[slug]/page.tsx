import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDetalheImovelServer } from '@/lib/server/vistaService';
import ImovelClientView from './ImovelClientView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const codigo = slug.split('-').pop() ?? '';
  
  if (!codigo) return { title: 'Imóvel não encontrado' };

  try {
    const data = await getDetalheImovelServer(codigo);
    if (!data) return { title: 'Imóvel não encontrado' };

    const { imovel } = data;
    const title = imovel.TituloSite || `${imovel.Categoria} em ${imovel.Bairro || imovel.Cidade}`;
    const description = imovel.DescricaoSite || imovel.Descricao || '';
    const imageUrl = imovel.FotoDestaque || '';

    return {
      title: `${title} | UNUS Núcleo Imobiliário`,
      description: description.slice(0, 160),
      openGraph: {
        title,
        description: description.slice(0, 160),
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: 'website',
      },
    };
  } catch {
    return { title: 'Imóvel | UNUS Núcleo Imobiliário' };
  }
}

export default async function ImovelPage({ params }: Props) {
  const { slug } = await params;
  const codigo = slug.split('-').pop() ?? '';

  if (!codigo) notFound();

  const data = await getDetalheImovelServer(codigo);
  if (!data) notFound();

  const { imovel, fotos } = data;

  // JSON-LD Dinâmico para SEO 10/10
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: imovel.TituloSite || `${imovel.Categoria} em ${imovel.Bairro}`,
    description: (imovel.DescricaoSite || imovel.Descricao || '').slice(0, 200),
    url: `https://unus-preview-test.vercel.app/imovel/${slug}`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImovelClientView imovel={imovel} fotos={fotos} />
    </>
  );
}
