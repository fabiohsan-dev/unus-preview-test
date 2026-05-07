import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * Sitemap dinâmico — lê NEXT_PUBLIC_SITE_URL para usar o domínio correto.
 * Inclui apenas páginas com conteúdo real (ComingSoon excluídas).
 * lastModified usa datas fixas por seção para não enganar crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  return [
    {
      url: base,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/venda`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${base}/empreendimentos`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];
}
