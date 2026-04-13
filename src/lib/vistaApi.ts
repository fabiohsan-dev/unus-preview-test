/**
 * vistaApi.ts
 *
 * Cliente frontend para os proxies Vercel em /api/imoveis/*.
 * Nunca chama a Vista API diretamente — toda chamada passa pelo
 * servidor, mantendo a VISTA_KEY fora do bundle do browser.
 *
 * Para desenvolvimento local:
 *   - Com Vercel CLI:  `vercel dev`  (proxy funciona em /api)
 *   - Sem Vercel CLI:  `next dev`    (retorna MOCK_FALLBACK automaticamente)
 */

import type {
  ApiListResponse,
  ApiMetadataResponse,
  ApiDetalheResponse,
  FiltrosImoveis,
  VistaImovelItem,
  VistaImovelDetalhe,
  VistaFoto,
} from '@/types/vista';

/* ─── Re-exports para conveniência ─── */
export type { VistaImovelItem, VistaImovelDetalhe, VistaFoto, FiltrosImoveis };

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
  const tipo  = (item.Categoria ?? 'imovel').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const bairro = (item.Bairro ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return [tipo, bairro, item.Codigo].filter(Boolean).join('-');
}

/* ─────────────────────────────────────
   Mock data (fallback para `next dev`)
   ───────────────────────────────────── */

const MOCK_ITEMS: VistaImovelItem[] = [
  {
    Codigo: '74383', Referencia: '74383', TituloSite: 'Casa BRM — Projeto Singular',
    Categoria: 'Casa', Finalidade: 'Venda', Status: 'Disponivel',
    Cidade: 'Florianópolis', Bairro: 'Santo Inácio',
    ValorVenda: '17500000', Dormitorios: '4', Suites: '4', Vagas: '4',
    BanheiroSocialQtd: '5', AreaPrivativa: '887.9', AreaTotal: '887.9',
    FotoDestaque: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=640&q=80',
  },
  {
    Codigo: '82104', Referencia: '82104', TituloSite: 'Michelangelo — Cobertura Duplex',
    Categoria: 'Apartamento', Finalidade: 'Venda', Status: 'Disponivel',
    Cidade: 'Florianópolis', Bairro: 'Cabral',
    ValorVenda: '15000000', Dormitorios: '4', Suites: '4', Vagas: '3',
    BanheiroSocialQtd: '4', AreaPrivativa: '558.87', AreaTotal: '558.87',
    FotoDestaque: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=640&q=80',
  },
  {
    Codigo: '65421', Referencia: '65421', TituloSite: 'Casa Ponto Comercial — Cristo Rei',
    Categoria: 'Casa', Finalidade: 'Venda', Status: 'Disponivel',
    Cidade: 'Florianópolis', Bairro: 'Cristo Rei',
    ValorVenda: '14000000', Dormitorios: '7', Suites: '3', Vagas: '6',
    BanheiroSocialQtd: '3', AreaPrivativa: '520', AreaTotal: '520',
    FotoDestaque: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=640&q=80',
  },
  {
    Codigo: '91230', Referencia: '91230', TituloSite: 'Apto 3 Quartos — Kobrasol',
    Categoria: 'Apartamento', Finalidade: 'Venda', Status: 'Disponivel',
    Cidade: 'São José', Bairro: 'Kobrasol',
    ValorVenda: '680000', Dormitorios: '3', Suites: '1', Vagas: '2',
    BanheiroSocialQtd: '2', AreaPrivativa: '120', AreaTotal: '120',
    FotoDestaque: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=640&q=80',
  },
  {
    Codigo: '78321', Referencia: '78321', TituloSite: 'Loja Comercial — Cabral',
    Categoria: 'Loja Comercial', Finalidade: 'Venda', Status: 'Disponivel',
    Cidade: 'Florianópolis', Bairro: 'Cabral',
    ValorVenda: '9800000', Dormitorios: '0', Suites: '0', Vagas: '4',
    BanheiroSocialQtd: '2', AreaPrivativa: '366.69', AreaTotal: '366.69',
    FotoDestaque: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80',
  },
];

const MOCK_LIST_RESPONSE: ApiListResponse = {
  items: MOCK_ITEMS,
  total: 662,
  paginas: 67,
  pagina: 1,
};

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
 * Retorna mock data automaticamente se /api não estiver disponível.
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
    // Fallback para mock durante desenvolvimento sem Vercel CLI
    console.warn('[vistaApi] /api indisponível — usando dados mock.');
    return MOCK_LIST_RESPONSE;
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
