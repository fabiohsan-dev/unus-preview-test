import { getVistaServerConfig, buildVistaGetUrl } from './vistaConfig';
import { getSupabaseAdmin } from '../supabase';
import type { VistaImovelItem } from '@/types/vista';

const META_KEYS = new Set(['total', 'paginas', 'pagina', 'quantidade']);

function extractVistaItems(raw: Record<string, unknown>): VistaImovelItem[] {
  return Object.entries(raw)
    .filter(([key]) => !META_KEYS.has(key))
    .map(([, value]) => value) as VistaImovelItem[];
}

async function fetchVistaPage(page: number, limit: number): Promise<{ items: VistaImovelItem[]; paginas: number }> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

  const pesquisa = {
    fields: [
      'Codigo', 'TituloSite', 'Empreendimento', 'Categoria', 'Finalidade', 'Status',
      'Cidade', 'Bairro', 'ValorVenda', 'ValorLocacao', 'Dormitorios', 'Suites',
      'Vagas', 'BanheiroSocialQtd', 'AreaPrivativa', 'AreaTotal', 'DataEntrega',
      'DataCadastro', 'DataAtualizacao', 'FotoDestaque', 'SuperDestaqueWeb',
      'DescricaoEmpreendimento', 'DescricaoWeb', 'Descricao',
    ],
    paginacao: { pagina: page, quantidade: limit },
  };

  const url = buildVistaGetUrl('/imoveis/listar', pesquisa, { showtotal: '1' });
  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error(`Vista API error: ${res.status}`);

  const raw = await res.json() as Record<string, unknown>;
  const items = extractVistaItems(raw);
  const paginas = Number(raw.paginas ?? 1);
  return { items, paginas };
}

export async function syncVistaToSupabase() {
  const admin = getSupabaseAdmin();
  let page = 1;
  let hasMore = true;
  let syncedCount = 0;

  console.log('[Sync] Iniciando sincronização Vista -> Supabase...');

  while (hasMore) {
    try {
      const { items, paginas } = await fetchVistaPage(page, 50);

      if (items.length === 0) {
        hasMore = false;
        break;
      }

      const imoveisMapeados = items.map(item => ({
        codigo: item.Codigo,
        titulo_site: item.TituloSite || '',
        empreendimento: item.Empreendimento || '',
        categoria: item.Categoria || '',
        finalidade: item.Finalidade || 'Venda',
        status: item.Status || 'Disponível',
        cidade: item.Cidade || '',
        bairro: item.Bairro || '',
        valor_venda: parseFloat(item.ValorVenda || '0'),
        valor_locacao: parseFloat(item.ValorLocacao || '0'),
        dormitorios: parseInt(item.Dormitorios || '0'),
        suites: parseInt(item.Suites || '0'),
        vagas: parseInt(item.Vagas || '0'),
        banheiros: parseInt(item.BanheiroSocialQtd || '0'),
        area_privativa: parseFloat(item.AreaPrivativa || '0'),
        area_total: parseFloat(item.AreaTotal || '0'),
        data_entrega: item.DataEntrega || '',
        data_cadastro: item.DataCadastro ? new Date(item.DataCadastro).toISOString() : null,
        data_atualizacao: item.DataAtualizacao ? new Date(item.DataAtualizacao).toISOString() : null,
        foto_destaque: item.FotoDestaque || '',
        raw_data: item
      }));

      const { error } = await admin
        .from('imoveis')
        .upsert(imoveisMapeados, { onConflict: 'codigo' });

      if (error) {
        console.error(`[Sync] Erro no upsert da página ${page}:`, error);
        throw error;
      }

      syncedCount += imoveisMapeados.length;
      console.log(`[Sync] Página ${page} sincronizada. Total: ${syncedCount}`);

      if (page >= paginas) {
        hasMore = false;
      } else {
        page++;
      }
    } catch (err) {
      console.error('[Sync] Falha crítica na sincronização:', err);
      hasMore = false;
      throw err;
    }
  }

  console.log(`[Sync] Sincronização concluída. ${syncedCount} imóveis processados.`);
  return { success: true, count: syncedCount };
}
