import 'server-only';
import { getVistaServerConfig, buildVistaGetUrl } from './vistaConfig';
import type {
  ApiListResponse,
  ApiMetadataResponse,
  ApiDetalheResponse,
  FiltrosImoveis,
  VistaImovelItem,
  VistaImovelDetalhe,
  VistaFoto,
  VistaEmpreendimento
} from '@/types/vista';

const META_KEYS = new Set(['total', 'paginas', 'pagina', 'quantidade']);

function extractItems(raw: Record<string, unknown>): VistaImovelItem[] {
  return Object.entries(raw)
    .filter(([key]) => !META_KEYS.has(key))
    .map(([, value]) => value) as VistaImovelItem[];
}

const LABEL_OVERRIDES: Record<string, string> = {
  Deposito: 'Depósito',
  GasCentral: 'Gás Central',
  Portaria24Hrs: 'Portaria 24 Hrs',
  PorteiroEletronico: 'Porteiro Eletrônico',
  SalaFitness: 'Sala Fitness',
  SalaoFestas: 'Salão Festas',
  SalaoJogos: 'Salão Jogos',
  SegurancaPatrimonial: 'Segurança Patrimonial',
  AguaQuente: 'Água Quente',
  AreaServico: 'Área Serviço',
  CopaCozinha: 'Copa Cozinha',
  SacadaComChurrasqueira: 'Sacada Com Churrasqueira',
  SalaJantar: 'Sala Jantar',
  SuiteMaster: 'Suíte Master',
};

function humanize(key: string) {
  if (LABEL_OVERRIDES[key]) return LABEL_OVERRIDES[key];
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

function getFeatureList(source: unknown): string[] {
  if (!source || typeof source !== 'object') return [];
  return Object.entries(source as Record<string, string>)
    .filter(([, value]) => String(value).toLowerCase() === 'sim')
    .map(([key]) => humanize(key));
}

function normalizeVistaFotos(source: unknown): VistaFoto[] {
  if (!source || typeof source !== 'object') return [];

  const fotosRaw = Array.isArray(source)
    ? source
    : Object.values(source as Record<string, VistaFoto>);

  const getOrdem = (foto: VistaFoto) => {
    const ordem = Number(foto.Ordem);
    return Number.isFinite(ordem) ? ordem : Number.MAX_SAFE_INTEGER;
  };

  return fotosRaw
    .filter((foto): foto is VistaFoto => Boolean(foto) && typeof foto === 'object')
    .map((foto) => ({
      URLArquivo: foto.URLArquivo || foto.Foto || foto.URL,
      Foto: foto.Foto,
      FotoPequena: foto.FotoPequena,
      URL: foto.URL,
      Destaque: foto.Destaque,
      Descricao: foto.Descricao,
      Ordem: foto.Ordem,
      TipoFoto: foto.TipoFoto
    }))
    .filter((foto) => Boolean(foto.URLArquivo || foto.URL || foto.Foto))
    .sort((a, b) => getOrdem(a) - getOrdem(b));
}

import { supabase } from '../supabase';

/**
 * Busca metadados diretamente no banco de dados Supabase (Sincronizado com Vista).
 */
export async function getMetadataServer(): Promise<ApiMetadataResponse> {
  try {
    // Busca dados distintos diretamente do banco (extremamente rápido e preciso)
    const [bairrosRes, cidadesRes, categoriasRes] = await Promise.all([
      supabase.from('imoveis').select('bairro'),
      supabase.from('imoveis').select('cidade'),
      supabase.from('imoveis').select('categoria'),
    ]);

    const extractUnique = (res: { data: Record<string, unknown>[] | null }, field: string) => {
      if (!res.data) return [];
      const values = res.data.map((item) => item[field]).filter(Boolean);
      return Array.from(new Set(values as string[])).sort();
    };

    return {
      bairros: extractUnique(bairrosRes, 'bairro'),
      cidades: extractUnique(cidadesRes, 'cidade'),
      categorias: extractUnique(categoriasRes, 'categoria'),
      valorVenda: { min: 0, max: 50000000 },
      valorLocacao: { min: 0, max: 500000 },
    };
  } catch (err) {
    console.error('[getMetadataServer] Erro ao buscar metadados no Supabase:', err);
    return {
      bairros: [],
      cidades: [],
      categorias: [],
      valorVenda: { min: 0, max: 50000000 },
      valorLocacao: { min: 0, max: 500000 },
    };
  }
}

/**
 * Lista imóveis consultando o banco de dados Supabase (Sincronizado com Vista).
 * Resolve o problema de performance permitindo filtros complexos (preço, área) via SQL.
 */
export async function getListarImoveisServer(filtros: FiltrosImoveis = {}): Promise<ApiListResponse> {
  const {
    page = 1,
    limit = 12,
    tipo,
    cidade,
    bairro,
    finalidade = 'Venda',
    precoMin,
    precoMax,
    areaMin,
    areaMax,
    quartos,
    suites,
    vagas,
    banheiros,
    ordem = 'relevancia',
    destaque = false,
    codigo
  } = filtros;

  try {
    let query = supabase
      .from('imoveis')
      .select('*', { count: 'exact' });

    // Filtros Básicos
    if (codigo) query = query.eq('codigo', codigo);
    if (tipo) query = query.eq('categoria', tipo);
    if (finalidade) query = query.eq('finalidade', finalidade);
    if (cidade) query = query.eq('cidade', cidade);
    if (bairro) query = query.eq('bairro', bairro);
    
    // Filtro de Destaque (Busca no JSON original)
    if (destaque) {
      query = query.filter('raw_data->>SuperDestaqueWeb', 'eq', 'Sim');
    }

    // Filtros de Faixa (Preço e Área)
    if (precoMin) query = query.gte('valor_venda', parseFloat(precoMin));
    if (precoMax) query = query.lte('valor_venda', parseFloat(precoMax));
    if (areaMin) query = query.gte('area_total', parseFloat(areaMin));
    if (areaMax) query = query.lte('area_total', parseFloat(areaMax));

    // Filtros de Quantidade (Minimos)
    if (quartos && quartos > 0) query = query.gte('dormitorios', quartos);
    if (suites && suites > 0) query = query.gte('suites', suites);
    if (vagas && vagas > 0) query = query.gte('vagas', vagas);
    if (banheiros && banheiros > 0) query = query.gte('banheiros', banheiros);

    // Ordenação
    if (ordem === 'menor-preco') query = query.order('valor_venda', { ascending: true });
    else if (ordem === 'maior-preco') query = query.order('valor_venda', { ascending: false });
    else if (ordem === 'maior-area') query = query.order('area_total', { ascending: false });
    else if (ordem === 'mais-novo') query = query.order('data_cadastro', { ascending: false });
    else query = query.order('updated_at', { ascending: false });

    // Paginação
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    // Remapeia para o formato VistaImovelItem esperado pelos componentes
    const items: VistaImovelItem[] = (data || []).map(row => ({
      Codigo: row.codigo,
      TituloSite: row.titulo_site,
      Empreendimento: row.empreendimento,
      Categoria: row.categoria,
      Finalidade: row.finalidade,
      Status: row.status,
      Cidade: row.cidade,
      Bairro: row.bairro,
      ValorVenda: row.valor_venda?.toString(),
      ValorLocacao: row.valor_locacao?.toString(),
      Dormitorios: row.dormitorios?.toString(),
      Suites: row.suites?.toString(),
      Vagas: row.vagas?.toString(),
      BanheiroSocialQtd: row.banheiros?.toString(),
      AreaPrivativa: row.area_privativa?.toString(),
      AreaTotal: row.area_total?.toString(),
      DataEntrega: row.data_entrega,
      FotoDestaque: row.foto_destaque,
    }));

    const total = count || 0;

    return {
      items,
      total,
      paginas: Math.ceil(total / limit) || 1,
      pagina: page,
    };
  } catch (err) {
    console.error('[getListarImoveisServer] Erro ao buscar no Supabase:', err);
    return { items: [], total: 0, paginas: 1, pagina: 1 };
  }
}

export interface EmpreendimentoStats {
  minPreco: number | null;
  minSuites: number | null;
  maxSuites: number | null;
  minArea: number | null;
  maxArea: number | null;
  dataEntrega: string | null; // "MM/YYYY" ou null
}

/**
 * Agrega informações das sub-unidades de um empreendimento pelo nome.
 * Ex: busca todos imóveis com Empreendimento='Arkki' que não sejam Categoria=Empreendimento.
 * Retorna: preço mínimo, faixa de suítes, faixa de área, data de entrega.
 * Cacheado 1h por nome de empreendimento.
 */
export async function getEmpreendimentoStatsServer(
  empName: string
): Promise<EmpreendimentoStats> {
  const config = getVistaServerConfig();
  if (!config.ok) return { minPreco: null, minSuites: null, maxSuites: null, minArea: null, maxArea: null, dataEntrega: null };

  const pesquisa = {
    fields: ['Codigo', 'Categoria', 'ValorVenda', 'Suites', 'DataEntrega', 'AreaPrivativa'],
    filter: { Empreendimento: empName },
    paginacao: { pagina: 1, quantidade: 50 },
  };

  try {
    const url = buildVistaGetUrl('/imoveis/listar', pesquisa, { showtotal: '1' });
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { minPreco: null, minSuites: null, maxSuites: null, minArea: null, maxArea: null, dataEntrega: null };

    const raw = await res.json() as Record<string, unknown>;
    const units = extractItems(raw).filter(
      (u) => u.Categoria !== 'Empreendimento'
    );

    if (units.length === 0) return { minPreco: null, minSuites: null, maxSuites: null, minArea: null, maxArea: null, dataEntrega: null };

    const precos = units.map((u) => parseFloat(u.ValorVenda ?? '0')).filter((v) => v > 0);
    const suitesList = units.map((u) => parseInt(u.Suites ?? '0')).filter((v) => v >= 0);
    const areas = units.map((u) => parseFloat(u.AreaPrivativa ?? '0')).filter((v) => v > 0);
    const datas = units
      .map((u) => u.DataEntrega ?? '')
      .filter((d) => d && d !== '0000-00-00')
      .sort();

    const dataEntregaRaw = datas[0] ?? null;
    let dataEntrega: string | null = null;
    if (dataEntregaRaw) {
      const parts = dataEntregaRaw.split('-');
      if (parts.length >= 2 && parts[0] !== '0000') {
        dataEntrega = `${parts[1]}/${parts[0]}`;
      }
    }

    return {
      minPreco: precos.length > 0 ? Math.min(...precos) : null,
      minSuites: suitesList.length > 0 ? Math.min(...suitesList) : null,
      maxSuites: suitesList.length > 0 ? Math.max(...suitesList) : null,
      minArea: areas.length > 0 ? Math.min(...areas) : null,
      maxArea: areas.length > 0 ? Math.max(...areas) : null,
      dataEntrega,
    };
  } catch {
    return { minPreco: null, minSuites: null, maxSuites: null, minArea: null, maxArea: null, dataEntrega: null };
  }
}

/**
 * Busca as primeiras N fotos de um empreendimento pelo código.
 * Usado para pré-popular o slider no listing. Cacheado 1h por código.
 */
export async function getEmpreendimentoFotosServer(
  codigo: string,
  max = 5
): Promise<string[]> {
  const config = getVistaServerConfig();
  if (!config.ok) return [];

  const pesquisa = {
    fields: ['Codigo', { Foto: ['Foto', 'Ordem', 'Destaque'] }],
  };

  try {
    const url = buildVistaGetUrl('/imoveis/detalhes', pesquisa, { imovel: codigo });
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const data = await res.json();
    const fotoMap = data?.Foto;
    if (!fotoMap || typeof fotoMap !== 'object') return [];

    const sorted = Object.values(fotoMap as Record<string, { Foto?: string; Ordem?: string | number }>)
      .filter((f) => f?.Foto)
      .sort((a, b) => Number(a.Ordem ?? 99) - Number(b.Ordem ?? 99))
      .slice(0, max)
      .map((f) => f.Foto as string);

    return sorted;
  } catch {
    return [];
  }
}



/**
 * Obtém detalhes completos de um empreendimento pelo código.
 */
export async function getDetalheEmpreendimentoServer(codigo: string): Promise<VistaEmpreendimento | null> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

  const pesquisa = {
    fields: [
    'Codigo', 'Empreendimento', 'TituloSite', 'Categoria', 'Status', 'Cidade', 'Bairro', 'UF',
    'Endereco', 'Numero', 'ValorVenda', 'DescricaoEmpreendimento', 'DescricaoWeb',
    'Descricao', 'DataEntrega', 'DataAtualizacao', 'DataCadastro', 'FotoDestaque', 'FotoDestaquePequena',
      'AreaPrivativa', 'AreaTotal', 'Suites', 'Dormitorios',
      'Latitude', 'Longitude', 'SuperDestaqueWeb', 'InfraEstrutura', 'Caracteristicas',
      { Foto: ['Foto', 'FotoPequena', 'Ordem', 'Destaque', 'Descricao'] },
      { Corretor: ['Nome', 'Foto', 'Celular', 'Tipo'] },
    ],
  };

  const url = buildVistaGetUrl('/imoveis/detalhes', pesquisa, { imovel: codigo });
  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Vista API error: ${res.status}`);

  const data = await res.json();
  if (!data?.Codigo) return null;
  return data as VistaEmpreendimento;
}

/**
 * Obtém detalhes de um imóvel diretamente no servidor.
 */
export async function getDetalheImovelServer(codigo: string): Promise<ApiDetalheResponse | null> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

  const fields = [
    'Codigo', 'Referencia', 'TituloSite', 'Categoria', 'Finalidade', 'Status',
    'Cidade', 'Bairro', 'UF', 'ValorVenda', 'ValorLocacao', 'ValorCondominio',
    'Dormitorios', 'Suites', 'Vagas', 'BanheiroSocialQtd', 'AreaPrivativa',
    'AreaTotal', 'DataAtualizacao', 'DataCadastro', 'FotoDestaque', 'Descricao', 'DescricaoWeb', 'Empreendimento',
    'InfraEstrutura', 'Caracteristicas', 'Latitude', 'Longitude',
    { Foto: ['Foto', 'FotoPequena', 'Destaque', 'Descricao', 'Ordem'] },
    { Corretor: ['Nome', 'Foto', 'Celular', 'Tipo'] },
  ];

  const url = buildVistaGetUrl('/imoveis/detalhes', { fields }, { imovel: codigo });

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Vista API error: ${res.status}`);

  const data = await res.json();
  const baseImovel = data.Codigo ? (data as VistaImovelDetalhe) : (Object.entries(data).find(([k]) => !META_KEYS.has(k))?.[1] as VistaImovelDetalhe);

  if (!baseImovel || typeof baseImovel !== 'object') return null;

  const fotos = normalizeVistaFotos(baseImovel.Fotos || baseImovel.Foto);

  const imovel: VistaImovelDetalhe = {
    ...baseImovel,
    Fotos: fotos,
    DescricaoSite: baseImovel.DescricaoWeb || baseImovel.Descricao || '',
    InfraestruturaLista: getFeatureList(baseImovel.InfraEstrutura),
    CaracteristicasLista: getFeatureList(baseImovel.Caracteristicas),
    MapaEmbedUrl: baseImovel.Latitude 
      ? `https://maps.google.com/maps?q=${baseImovel.Latitude},${baseImovel.Longitude}&z=15&output=embed`
      : null
  };

  return { imovel, fotos };
}
