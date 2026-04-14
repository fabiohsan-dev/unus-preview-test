/**
 * src/lib/server/sync-engine.ts
 *
 * Motor de sincronização: Vista API → Supabase imoveis_index.
 *
 * Usado por:
 *  - scripts/sync-imoveis.ts (CLI manual)
 *  - /api/cron/sync-imoveis   (cron Vercel cada 6h)
 *
 * NÃO usa `import 'server-only'` para permitir execução via `tsx` CLI.
 * Segurança garantida pelo uso de SUPABASE_SERVICE_ROLE_KEY (nunca no client).
 */

import { createClient } from '@supabase/supabase-js';
import type { ImovelIndex } from '@/types/imovel';

// ---------------------------------------------------------------------------
// Configuração
// ---------------------------------------------------------------------------

interface SyncConfig {
  vistaBaseUrl: string;
  vistaKey: string;
  supabaseUrl: string;
  supabaseKey: string;
}

function getSyncConfig():
  | { ok: true; config: SyncConfig }
  | { ok: false; error: string } {
  const vistaBaseUrl = process.env.VISTA_BASE_URL?.trim();
  const vistaKey = process.env.VISTA_KEY?.trim();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!vistaBaseUrl || !vistaKey) {
    return { ok: false, error: 'VISTA_BASE_URL ou VISTA_KEY não configurados' };
  }

  if (!supabaseUrl || !supabaseKey) {
    return {
      ok: false,
      error:
        'NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados',
    };
  }

  return { ok: true, config: { vistaBaseUrl, vistaKey, supabaseUrl, supabaseKey } };
}

// ---------------------------------------------------------------------------
// Tipos da Vista API
// ---------------------------------------------------------------------------

interface VistaImovel {
  Codigo: string;
  Referencia?: string;
  TituloSite?: string;
  Empreendimento?: string;
  Categoria?: string;
  Finalidade?: string;
  Status?: string;
  ValorVenda?: string;
  ValorLocacao?: string;
  AreaTotal?: string;
  AreaPrivativa?: string;
  Dormitorios?: string;
  Suites?: string;
  BanheiroSocialQtd?: string;
  Vagas?: string;
  Bairro?: string;
  Cidade?: string;
  FotoDestaque?: string;
  Destaque?: string;
  SuperDestaqueWeb?: string;
  Caracteristicas?: Record<string, string>;
  InfraEstrutura?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// ---------------------------------------------------------------------------
// Mapeamento Vista → ImovelIndex
// ---------------------------------------------------------------------------

const TIPO_MAP: Record<string, ImovelIndex['tipo']> = {
  Apartamento: 'apartamento',
  Casa: 'casa',
  Cobertura: 'cobertura',
  Terreno: 'terreno',
  Comercial: 'comercial',
  Sala: 'comercial',
  Loja: 'comercial',
  Sobrado: 'casa',
};

function extractFeatures(obj?: Record<string, string>): string[] {
  if (!obj || typeof obj !== 'object') return [];

  return Object.entries(obj)
    .filter(([, value]) => String(value).toLowerCase() === 'sim')
    .map(([key]) =>
      key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .trim()
    );
}

function buildSlug(titulo: string, codigo: string): string {
  const base = titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Garante que o código está no final — o page.tsx extrai com slug.split('-').pop()
  return `${base}-${codigo}`;
}

/**
 * Extrai área numérica de forma segura.
 * A Vista retorna "0" (string truthy!) quando o campo não se aplica,
 * então precisamos comparar o valor numérico — não usar `||` em strings.
 * Prioriza AreaTotal (mais confiável para terrenos), depois AreaPrivativa.
 */
function getArea(privativa?: string, total?: string): number {
  const t = Number(total);
  const p = Number(privativa);

  if (Number.isFinite(p) && p > 0) return p;
  if (Number.isFinite(t) && t > 0) return t;
  return 0;
}

export function mapVistaToIndex(v: VistaImovel): ImovelIndex {
  const tipo = TIPO_MAP[v.Categoria ?? ''] ?? 'apartamento';
  const precoVenda = parseFloat(v.ValorVenda ?? '0') || 0;
  const precoLocacao = parseFloat(v.ValorLocacao ?? '0') || 0;
  const finalidade: ImovelIndex['finalidade'] =
    precoVenda > 0 ? 'venda' : 'locacao';

  const titulo =
    v.TituloSite ||
    v.Empreendimento ||
    `Imóvel ${v.Referencia || v.Codigo}`;

  const slug = buildSlug(titulo, v.Codigo);

  const caracteristicas = [
    ...extractFeatures(v.Caracteristicas),
    ...extractFeatures(v.InfraEstrutura),
  ];

  return {
    id: v.Codigo,
    url: `/imovel/${slug}`,
    titulo,
    tipo,
    finalidade,
    preco: finalidade === 'venda' ? precoVenda : precoLocacao,
    area_m2: getArea(v.AreaPrivativa, v.AreaTotal),
    quartos: parseInt(v.Dormitorios ?? '0') || 0,
    banheiros: parseInt(v.BanheiroSocialQtd ?? '0') || 0,
    vagas: parseInt(v.Vagas ?? '0') || 0,
    bairro: v.Bairro ?? '',
    cidade: v.Cidade ?? '',
    caracteristicas,
    foto_capa: v.FotoDestaque || null,
    destaque: v.Destaque === 'Sim' || v.SuperDestaqueWeb === 'Sim' || false,
    updated_at: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Fetch paginado da Vista API (GET)
// ---------------------------------------------------------------------------

const FIELDS = [
  'Codigo',
  'Referencia',
  'TituloSite',
  'Empreendimento',
  'Categoria',
  'Finalidade',
  'Status',
  'ValorVenda',
  'ValorLocacao',
  'AreaTotal',
  'AreaPrivativa',
  'Dormitorios',
  'Suites',
  'BanheiroSocialQtd',
  'Vagas',
  'Bairro',
  'Cidade',
  'FotoDestaque',
  'Caracteristicas',
  'InfraEstrutura',
];

const MAX_PER_PAGE = 50;
const MAX_PAGES = 20; // safety: máximo 1000 imóveis

async function fetchVistaPage(
  baseUrl: string,
  apiKey: string,
  pagina: number
): Promise<{ imoveis: VistaImovel[]; totalPaginas: number }> {
  const pesquisa = {
    fields: FIELDS,
    filter: { Finalidade: 'Venda' },
    paginacao: { pagina, quantidade: MAX_PER_PAGE },
  };

  const url = new URL('/imoveis/listar', baseUrl);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('pesquisa', JSON.stringify(pesquisa));
  url.searchParams.set('showtotal', '1');

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Vista API error ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = await res.json();

  const totalPaginas = Number(data.paginas ?? 1);

  // A Vista retorna um objeto com chaves numéricas + meta-keys
  const META_KEYS = new Set(['total', 'paginas', 'pagina', 'quantidade']);
  const imoveis: VistaImovel[] = Object.entries(data)
    .filter(([key]) => !META_KEYS.has(key))
    .map(([, value]) => value as VistaImovel)
    .filter(
      (item): item is VistaImovel =>
        typeof item === 'object' && item !== null && 'Codigo' in item
    );

  return { imoveis, totalPaginas };
}

export async function fetchAllVistaImoveis(
  baseUrl: string,
  apiKey: string
): Promise<ImovelIndex[]> {
  const allImoveis: ImovelIndex[] = [];
  let pagina = 1;
  let totalPaginas = 1;

  do {
    console.log(`[sync] Buscando página ${pagina}/${totalPaginas}...`);

    const result = await fetchVistaPage(baseUrl, apiKey, pagina);
    totalPaginas = result.totalPaginas;

    const mapped = result.imoveis.map(mapVistaToIndex);
    allImoveis.push(...mapped);

    console.log(
      `[sync] Página ${pagina}: ${result.imoveis.length} imóveis (total acumulado: ${allImoveis.length})`
    );

    pagina++;
  } while (pagina <= totalPaginas && pagina <= MAX_PAGES);

  return allImoveis;
}

// ---------------------------------------------------------------------------
// Upsert + soft-delete no Supabase
// ---------------------------------------------------------------------------

const BATCH_SIZE = 100;

async function syncToSupabase(
  supabaseUrl: string,
  supabaseKey: string,
  imoveis: ImovelIndex[]
): Promise<{ synced: number; deleted: number }> {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1) Upsert em batches
  for (let i = 0; i < imoveis.length; i += BATCH_SIZE) {
    const batch = imoveis.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('imoveis_index')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      throw new Error(`Supabase upsert error (batch ${i}): ${error.message}`);
    }

    console.log(
      `[sync] Upsert batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} registros`
    );
  }

  // 2) Soft-delete: remover imóveis que não vieram da Vista (inativos)
  const activeIds = imoveis.map((im) => im.id);

  const { data: existing } = await supabase
    .from('imoveis_index')
    .select('id');

  const staleIds = (existing ?? [])
    .map((row) => (row as { id: string }).id)
    .filter((id) => !activeIds.includes(id));

  let deleted = 0;

  if (staleIds.length > 0) {
    const { error: deleteError } = await supabase
      .from('imoveis_index')
      .delete()
      .in('id', staleIds);

    if (deleteError) {
      console.warn(`[sync] Erro ao deletar inativos: ${deleteError.message}`);
    } else {
      deleted = staleIds.length;
      console.log(`[sync] Removidos ${deleted} imóveis inativos`);
    }
  }

  return { synced: imoveis.length, deleted };
}

// ---------------------------------------------------------------------------
// Orquestrador principal
// ---------------------------------------------------------------------------

export interface SyncResult {
  ok: true;
  synced: number;
  deleted: number;
  duration_ms: number;
  timestamp: string;
}

export interface SyncError {
  ok: false;
  error: string;
}

export async function runSync(): Promise<SyncResult | SyncError> {
  const start = Date.now();

  const configResult = getSyncConfig();
  if (!configResult.ok) {
    return { ok: false, error: configResult.error };
  }

  const { config } = configResult;

  try {
    console.log('[sync] Iniciando sincronização Vista → Supabase...');

    const imoveis = await fetchAllVistaImoveis(
      config.vistaBaseUrl,
      config.vistaKey
    );

    console.log(`[sync] Total: ${imoveis.length} imóveis ativos na Vista`);

    if (imoveis.length === 0) {
      console.warn('[sync] Nenhum imóvel retornado — abortando upsert');
      return { ok: false, error: 'Nenhum imóvel retornado pela Vista API' };
    }

    const { synced, deleted } = await syncToSupabase(
      config.supabaseUrl,
      config.supabaseKey,
      imoveis
    );

    const duration_ms = Date.now() - start;

    console.log(
      `[sync] Concluído em ${duration_ms}ms — ${synced} sincronizados, ${deleted} removidos`
    );

    return {
      ok: true,
      synced,
      deleted,
      duration_ms,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('[sync] Erro:', message);
    return { ok: false, error: message };
  }
}
