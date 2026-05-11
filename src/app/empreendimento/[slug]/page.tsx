import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getDetalheEmpreendimentoServer, getListarImoveisServer } from '@/lib/server/vistaService';
import { SITE_URL } from '@/lib/constants';
import type { VistaImovelItem } from '@/types/vista';
import { buildEmpreendimentoSlug, extractCodigoFromSlug } from '@/lib/slug';
import EmpreendimentoClientView from './EmpreendimentoClientView';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

function extractCodigo(slug: string): string {
  return extractCodigoFromSlug(slug);
}

export async function generateStaticParams() {
  try {
    const data = await getListarImoveisServer({ tipo: 'Empreendimento', limit: 50, page: 1 });
    return data.items.map((emp: VistaImovelItem) => {
      return { slug: buildEmpreendimentoSlug(emp) };
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const codigo = extractCodigo(slug);
  if (!codigo) return { title: 'Empreendimento não encontrado' };

  try {
    const emp = await getDetalheEmpreendimentoServer(codigo);
    if (!emp) return { title: 'Empreendimento não encontrado' };

    const title = emp.TituloSite || `Empreendimento em ${emp.Bairro}`;
    const description = (emp.DescricaoEmpreendimento || emp.DescricaoWeb || '').slice(0, 160);
    const canonicalSlug = buildEmpreendimentoSlug(emp);

    return {
      title: `${title} | UNUS Núcleo Imobiliário`,
      description,
      alternates: { canonical: `${SITE_URL}/empreendimento/${canonicalSlug || slug}` },
      openGraph: {
        title: `${title} | UNUS`,
        description,
        url: `${SITE_URL}/empreendimento/${canonicalSlug || slug}`,
        images: emp.FotoDestaque
          ? [{ url: emp.FotoDestaque }]
          : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
        type: 'website',
      },
    };
  } catch {
    return { title: 'Empreendimento | UNUS Núcleo Imobiliário' };
  }
}

export default async function EmpreendimentoPage({ params }: Props) {
  const { slug } = await params;
  const codigo = extractCodigo(slug);

  if (!codigo) notFound();

  const empreendimento = await getDetalheEmpreendimentoServer(codigo);
  if (!empreendimento) notFound();
  const canonicalSlug = buildEmpreendimentoSlug(empreendimento);
  if (canonicalSlug && slug !== canonicalSlug) {
    redirect(`/empreendimento/${canonicalSlug}`);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: empreendimento.TituloSite || `Empreendimento em ${empreendimento.Bairro}`,
    description: (empreendimento.DescricaoEmpreendimento || '').slice(0, 200),
    image: empreendimento.FotoDestaque ? [empreendimento.FotoDestaque] : [],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${empreendimento.Endereco || ''}, ${empreendimento.Numero || ''}`.trim(),
      addressLocality: empreendimento.Cidade || '',
      addressRegion: empreendimento.UF || 'SC',
      addressCountry: 'BR',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Empreendimentos', item: `${SITE_URL}/empreendimentos` },
      {
        '@type': 'ListItem',
        position: 3,
        name: empreendimento.TituloSite || `Empreendimento em ${empreendimento.Bairro}`,
        item: `${SITE_URL}/empreendimento/${canonicalSlug}`,
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
      <EmpreendimentoClientView empreendimento={empreendimento} />
    </>
  );
}
