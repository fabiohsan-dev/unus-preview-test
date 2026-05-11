import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getListarImoveisServer } from '@/lib/server/vistaService';
import { buildEmpreendimentoSlug, buildPropertySlug } from '@/lib/slug';
import type { VistaImovelItem } from '@/types/vista';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();
  const lastModifiedFromVista = (item: VistaImovelItem) => {
    const raw = item.DataAtualizacao || item.AtualizadoEm || item.ModificadoEm || item.DataCadastro || item.DataEntrega;
    if (!raw) return now;
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? now : date;
  };

  const [imoveisData, empreendimentosData] = await Promise.all([
    getListarImoveisServer({ limit: 200 }).catch(() => ({ items: [] as VistaImovelItem[] })),
    getListarImoveisServer({ tipo: 'Empreendimento', limit: 50 }).catch(() => ({ items: [] as VistaImovelItem[] })),
  ]);

  /* ── Rotas estáticas ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                          lastModified: now, changeFrequency: 'daily',  priority: 1.0  },
    { url: `${base}/venda`,               lastModified: now, changeFrequency: 'daily',  priority: 0.9  },
    { url: `${base}/empreendimentos`,     lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/o-nucleo`,            lastModified: now, changeFrequency: 'monthly',priority: 0.7  },
    { url: `${base}/anuncie`,             lastModified: now, changeFrequency: 'monthly',priority: 0.65 },
    { url: `${base}/contato`,             lastModified: now, changeFrequency: 'monthly',priority: 0.6  },
  ];

  /* ── Imóveis — slug completo (tipo-bairro-codigo) ── */
  const imoveisRoutes: MetadataRoute.Sitemap = imoveisData.items.map(
    (imovel: VistaImovelItem) => ({
      url: `${base}/imovel/${buildPropertySlug(imovel)}`,
      lastModified: lastModifiedFromVista(imovel),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  );

  /* ── Empreendimentos ── */
  const empreendimentosRoutes: MetadataRoute.Sitemap = empreendimentosData.items.map(
    (emp: VistaImovelItem) => {
      return {
        url: `${base}/empreendimento/${buildEmpreendimentoSlug(emp)}`,
        lastModified: lastModifiedFromVista(emp),
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      };
    },
  );

  return [...staticRoutes, ...imoveisRoutes, ...empreendimentosRoutes];
}
