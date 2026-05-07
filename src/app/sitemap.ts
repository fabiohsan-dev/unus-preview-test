import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getListarImoveisServer } from '@/lib/server/vistaService';
import type { VistaImovelItem } from '@/types/vista';

export const revalidate = 3600; // Sitemap revalida a cada 1 hora

/**
 * Sitemap dinâmico — inclui rotas estáticas + cada imóvel + cada empreendimento
 * publicados na Vista CRM, com lastModified real e priority calibrada por tipo.
 *
 * Páginas ComingSoon (/blog, /contato, /anuncie, /favoritos, /o-nucleo) ficam de
 * fora — elas têm metadata `robots: { index: false }` na própria rota.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();

  // Busca em paralelo — falha em uma não derruba o sitemap
  const [imoveisData, empreendimentosData] = await Promise.all([
    getListarImoveisServer({ limit: 200 }).catch((err) => {
      console.error('[sitemap] falha ao buscar imóveis:', err);
      return { items: [] as VistaImovelItem[] };
    }),
    getListarImoveisServer({ tipo: 'Empreendimento', limit: 50 }).catch((err) => {
      console.error('[sitemap] falha ao buscar empreendimentos:', err);
      return { items: [] as VistaImovelItem[] };
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/venda`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${base}/empreendimentos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  const imoveisRoutes: MetadataRoute.Sitemap = imoveisData.items.map(
    (imovel: VistaImovelItem) => ({
      url: `${base}/imovel/${imovel.Codigo}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  );

  const empreendimentosRoutes: MetadataRoute.Sitemap = empreendimentosData.items.map(
    (emp: VistaImovelItem) => {
      const bairro = (emp.Bairro || 'sc')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      const cidade = (emp.Cidade || 'sc')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return {
        url: `${base}/empreendimento/${bairro}-${cidade}-${emp.Codigo}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      };
    },
  );

  return [...staticRoutes, ...imoveisRoutes, ...empreendimentosRoutes];
}
