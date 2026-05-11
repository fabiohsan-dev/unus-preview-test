import { getListarImoveisServer } from './vistaService';
import { getSupabaseAdmin } from '../supabase';

export async function syncVistaToSupabase() {
  const admin = getSupabaseAdmin();
  let page = 1;
  let hasMore = true;
  let syncedCount = 0;

  console.log('[Sync] Iniciando sincronização Vista -> Supabase...');

  while (hasMore) {
    try {
      const data = await getListarImoveisServer({
        page,
        limit: 50,
        finalidade: 'Venda' // Sincroniza apenas vendas inicialmente
      });

      if (data.items.length === 0) {
        hasMore = false;
        break;
      }

      const imoveisMapeados = data.items.map(item => ({
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

      if (page >= data.paginas) {
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
