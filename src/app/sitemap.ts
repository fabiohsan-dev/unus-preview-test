import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getListarImoveisServer } from '@/lib/server/vistaService';
import { slugFromImovel } from '@/lib/vistaApi';
import type { VistaImovelItem } from '@/types/vista';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();

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
    { url: `${base}/parceiros-unus`,      lastModified: now, changeFrequency: 'monthly',priority: 0.6  },
    { url: `${base}/anuncie`,             lastModified: now, changeFrequency: 'monthly',priority: 0.65 },
    { url: `${base}/contato`,             lastModified: now, changeFrequency: 'monthly',priority: 0.6  },
  ];

  /* ── Imóveis — slug completo (tipo-bairro-codigo) ── */
  const imoveisRoutes: MetadataRoute.Sitemap = imoveisData.items.map(
    (imovel: VistaImovelItem) => ({
      url: `${base}/imovel/${slugFromImovel(imovel)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  );

  /* ── Empreendimentos ── */
  const empreendimentosRoutes: MetadataRoute.Sitemap = empreendimentosData.items.map(
    (emp: VistaImovelItem) => {
      const bairro = (emp.Bairro || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const cidade = (emp.Cidade || 'sc').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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
