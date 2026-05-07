import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDetalheEmpreendimentoServer, getListarImoveisServer } from '@/lib/server/vistaService';
import type { VistaImovelItem } from '@/types/vista';
import EmpreendimentoClientView from './EmpreendimentoClientView';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

function extractCodigo(slug: string): string {
  return slug.split('-').pop() ?? '';
}

export async function generateStaticParams() {
  try {
    const data = await getListarImoveisServer({ tipo: 'Empreendimento', limit: 50, page: 1 });
    return data.items.map((emp: VistaImovelItem) => {
      const bairro = (emp.Bairro || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const cidade = (emp.Cidade || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return { slug: `${bairro}-${cidade}-${emp.Codigo}` };
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

    return {
      title: `${title} | UNUS Núcleo Imobiliário`,
      description,
      openGraph: {
        title: `${title} | UNUS`,
        description,
        images: emp.FotoDestaque ? [{ url: emp.FotoDestaque }] : [],
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EmpreendimentoClientView empreendimento={empreendimento} />
    </>
  );
}
