/**
 * vistaApi.ts
 *
 * Cliente frontend para os proxies Vercel em /api/imoveis/*.
 * Nunca chama a Vista API diretamente — toda chamada passa pelo
 * servidor, mantendo a VISTA_KEY fora do bundle do browser.
 *
 * Para desenvolvimento local:
 *   - Com Vercel CLI:  `vercel dev`  (proxy funciona em /api)
 *   - Sem Vercel CLI:  `next dev`    (retorna listas vazias em caso de falha)
 */

import type {
  ApiListResponse,
  ApiMetadataResponse,
  ApiDetalheResponse,
  ApiEmpreendimentoDetalheResponse,
  FiltrosImoveis,
  VistaImovelItem,
  VistaImovelDetalhe,
  VistaFoto,
  VistaEmpreendimento,
} from '@/types/vista';
import { buildPropertySlug } from '@/lib/slug';

/* ─── Re-exports para conveniência ─── */
export type { VistaImovelItem, VistaImovelDetalhe, VistaFoto, FiltrosImoveis, VistaEmpreendimento };

/* ─────────────────────────────────────
   Helpers de formatação
   ───────────────────────────────────── */

export function formatarPreco(valor: string | number | undefined): string {
  const n = Number(valor ?? 0);
  if (!Number.isFinite(n) || n <= 0) return 'Consulte valores';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function formatarArea(privativa?: string, total?: string): string {
  const area = Number(privativa || total || 0);
  if (!Number.isFinite(area) || area <= 0) return 'Metragem sob consulta';
  const fmt = area.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return privativa && Number(privativa) > 0 ? `${fmt} m² privativos` : `${fmt} m² totais`;
}

export function slugFromImovel(item: VistaImovelItem): string {
  return buildPropertySlug(item);
}

const MOCK_METADATA: ApiMetadataResponse = {
  bairros: ['Centro', 'Campinas', 'Kobrasol', 'Pedra Branca', 'Jurerê Internacional'],
  cidades: ['Florianópolis', 'São José', 'Palhoça'],
  categorias: ['Apartamento', 'Casa', 'Cobertura', 'Sala Comercial', 'Terreno'],
  valorVenda: { min: 300000, max: 20000000 },
  valorLocacao: { min: 1500, max: 50000 },
};

/* ─────────────────────────────────────
   API calls
   ───────────────────────────────────── */

/**
 * Busca metadados para filtros (bairros, cidades, categorias, faixas de preço).
 */
export async function obterMetadata(): Promise<ApiMetadataResponse> {
  try {
    const res = await fetch('/api/imoveis/metadata', {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ApiMetadataResponse;
  } catch {
    console.warn('[vistaApi] Erro ao buscar metadados — usando dados mock.');
    return MOCK_METADATA;
  }
}

/**
 * Lista imóveis com filtros e paginação.
 * Em caso de falha, retorna vazio para não exibir imóveis fictícios.
 */
export async function listarImoveis(filtros: FiltrosImoveis = {}): Promise<ApiListResponse> {
  const params = new URLSearchParams();

  (Object.entries(filtros) as [string, unknown][]).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '' && v !== 0) {
      params.set(k, String(v));
    }
  });

  try {
    const res = await fetch(`/api/imoveis/listar?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ApiListResponse;
  } catch {
    console.warn('[vistaApi] /api indisponível — nenhum imóvel será exibido.');
    return { items: [], total: 0, paginas: 1, pagina: Number(filtros.page ?? 1) };
  }
}

/**
 * Busca detalhes completos + fotos de um imóvel pelo código.
 * Retorna null se não encontrado ou em caso de erro.
 */
export async function obterImovel(codigo: string): Promise<ApiDetalheResponse | null> {
  try {
    const res = await fetch(`/api/imoveis/${encodeURIComponent(codigo)}`, {
      headers: { Accept: 'application/json' },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ApiDetalheResponse;
  } catch {
    console.warn(`[vistaApi] Erro ao buscar imóvel ${codigo}.`);
    return null;
  }
}

export async function obterEmpreendimento(codigo: string): Promise<ApiEmpreendimentoDetalheResponse | null> {
  try {
    const res = await fetch(`/api/empreendimentos/${encodeURIComponent(codigo)}`, {
      headers: { Accept: 'application/json' },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ApiEmpreendimentoDetalheResponse;
  } catch {
    console.warn(`[vistaApi] Erro ao buscar empreendimento ${codigo}.`);
    return null;
  }
}
