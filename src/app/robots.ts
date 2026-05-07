import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * robots.ts dinâmico — substitui public/robots.txt.
 * Usa NEXT_PUBLIC_SITE_URL para apontar o sitemap para o domínio correto.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
