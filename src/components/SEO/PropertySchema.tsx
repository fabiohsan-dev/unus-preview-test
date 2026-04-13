import { VistaImovelDetalhe } from '@/types/vista';

interface PropertySchemaProps {
  property: VistaImovelDetalhe;
  url: string;
}

export function PropertySchema({ property, url }: PropertySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': property.TituloSite || property.Categoria,
    'description': property.DescricaoSite || property.Descricao,
    'url': url,
    'image': property.FotoDestaque,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': property.Cidade,
      'addressRegion': property.UF || 'SC',
      'addressCountry': 'BR',
      'streetAddress': property.Bairro
    },
    'offers': {
      '@type': 'Offer',
      'price': property.ValorVenda || 0,
      'priceCurrency': 'BRL',
      'availability': 'https://schema.org/InStock',
      'url': url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
