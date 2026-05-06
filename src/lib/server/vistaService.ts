import 'server-only';
import { getVistaServerConfig, buildVistaGetUrl } from './vistaConfig';
import type {
  ApiListResponse,
  ApiMetadataResponse,
  ApiDetalheResponse,
  FiltrosImoveis,
  VistaImovelItem,
  VistaImovelDetalhe,
  VistaFoto
} from '@/types/vista';

const META_KEYS = new Set(['total', 'paginas', 'pagina', 'quantidade']);

const LIST_FIELDS = [
  'Codigo', 'Referencia', 'TituloSite', 'Categoria', 'Finalidade', 'Status',
  'Cidade', 'Bairro', 'ValorVenda', 'ValorLocacao', 'Dormitorios', 'Suites',
  'Vagas', 'BanheiroSocialQtd', 'AreaPrivativa', 'AreaTotal', 'FotoDestaque',
  'FotoDestaquePequena'
];

function extractItems(raw: Record<string, unknown>): VistaImovelItem[] {
  return Object.entries(raw)
    .filter(([key]) => !META_KEYS.has(key))
    .map(([, value]) => value) as VistaImovelItem[];
}

/**
 * Busca TODOS os imóveis da Vista para filtragem client-side de preço.
 * A Vista CRM API não suporta filtro ValorVenda para imóveis regulares —
 * apenas para Empreendimentos. Por isso, buscamos tudo e filtramos aqui.
 * Cada URL de página é cacheada individualmente pelo Next.js (revalidate 600s).
 */
async function getAllListingsFromVista(baseFilter: Record<string, unknown>, orderConfig?: Record<string, string>): Promise<VistaImovelItem[]> {
  const PAGE_SIZE = 50;

  const buildPesquisa = (pagina: number) => {
    const p: Record<string, unknown> = {
      fields: LIST_FIELDS,
      filter: baseFilter,
      paginacao: { pagina, quantidade: PAGE_SIZE },
    };
    if (orderConfig) p.order = orderConfig;
    return p;
  };

  const firstUrl = buildVistaGetUrl('/imoveis/listar', buildPesquisa(1), { showtotal: '1' });
  const firstRes = await fetch(firstUrl.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 600 },
  });
  if (!firstRes.ok) throw new Error(`Vista API error: ${firstRes.status}`);

  const firstRaw = await firstRes.json();
  const totalPages = Math.min(Number(firstRaw.paginas ?? 1), 14); // max 700 imóveis
  const firstItems = extractItems(firstRaw as Record<string, unknown>);

  if (totalPages <= 1) return firstItems;

  const remaining = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
  const otherItems = await Promise.all(
    remaining.map(async (pagina) => {
      const pageUrl = buildVistaGetUrl('/imoveis/listar', buildPesquisa(pagina), { showtotal: '1' });
      const res = await fetch(pageUrl.toString(), {
        headers: { Accept: 'application/json' },
        next: { revalidate: 600 },
      });
      if (!res.ok) return [];
      const raw = await res.json();
      return extractItems(raw as Record<string, unknown>);
    })
  );

  return [firstItems, ...otherItems].flat();
}

const ORDER_MAP: Record<string, Record<string, string>> = {
  'menor-preco': { ValorVenda: 'asc' },
  'maior-preco': { ValorVenda: 'desc' },
  'maior-area': { AreaTotal: 'desc' },
  'mais-novo': { DataCadastro: 'desc' },
};

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

/**
 * Busca metadados diretamente no servidor.
 */
export async function getMetadataServer(): Promise<ApiMetadataResponse> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

  const url = buildVistaGetUrl('/imoveis/listarConteudo', {
    fields: ['Bairro', 'Cidade', 'Categoria'],
  });

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[getMetadataServer] Vista API error ${res.status}:`, body);
    throw new Error(`Vista API error: ${res.status}`);
  }

  const data = await res.json();

  const toSortedArray = (val: unknown): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return [...val as string[]].sort();
    if (typeof val === 'object') return (Object.values(val) as string[]).sort();
    return [];
  };

  return {
    bairros: toSortedArray(data.Bairro),
    cidades: toSortedArray(data.Cidade),
    categorias: toSortedArray(data.Categoria),
    valorVenda: { min: 0, max: 50000000 },
    valorLocacao: { min: 0, max: 500000 },
  };
}

/**
 * Lista imóveis diretamente no servidor.
 */
export async function getListarImoveisServer(filtros: FiltrosImoveis = {}): Promise<ApiListResponse> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

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

  const filter: Record<string, unknown> = {};

  if (codigo) filter.Referencia = codigo;
  if (destaque) filter.SuperDestaqueWeb = 'Sim';
  if (tipo) filter.Categoria = tipo;
  if (finalidade) filter.Finalidade = finalidade;
  if (cidade) filter.Cidade = cidade;
  if (bairro) filter.Bairro = bairro;
  if (quartos && quartos > 0) filter.Dormitorios = `>= ${quartos}`;
  if (suites && suites > 0) filter.Suites = `>= ${suites}`;
  if (vagas && vagas > 0) filter.Vagas = `>= ${vagas}`;
  if (banheiros && banheiros > 0) filter.BanheiroSocialQtd = `>= ${banheiros}`;
  if (areaMin && areaMax) {
    filter.AreaTotal = `>= ${areaMin} and <= ${areaMax}`;
  } else if (areaMin) {
    filter.AreaTotal = `>= ${areaMin}`;
  } else if (areaMax) {
    filter.AreaTotal = `<= ${areaMax}`;
  }

  // NOTA: A API Vista CRM não suporta filtro ValorVenda para imóveis regulares
  // (Apartamento, Casa, etc.) — funciona apenas para Empreendimentos via sub-unidades.
  // Quando há filtro de preço, buscamos todos e filtramos aqui no servidor.

  const orderConfig = ORDER_MAP[ordem];
  const hasPrecoFilter = Boolean(precoMin || precoMax);

  if (hasPrecoFilter) {
    // Busca todos os imóveis sem filtro de preço, filtra client-side
    const allItems = await getAllListingsFromVista(filter, orderConfig);

    const minVal = precoMin ? Number(precoMin) : 0;
    const maxVal = precoMax ? Number(precoMax) : Infinity;

    const filtered = allItems.filter((item) => {
      const valor = Number(item.ValorVenda) || 0;
      // Exclui imóveis sem preço (Empreendimentos com ValorVenda=0)
      if (valor === 0) return false;
      return valor >= minVal && valor <= maxVal;
    });

    const total = filtered.length;
    const offset = (page - 1) * Math.min(limit, 50);
    const paginatedItems = filtered.slice(offset, offset + Math.min(limit, 50));

    return {
      items: paginatedItems,
      total,
      paginas: Math.ceil(total / Math.min(limit, 50)) || 1,
      pagina: page,
    };
  }

  // Caminho normal: sem filtro de preço — usa paginação nativa da Vista
  const pesquisa: Record<string, unknown> = {
    fields: LIST_FIELDS,
    filter,
    paginacao: { pagina: page, quantidade: Math.min(limit, 50) },
  };

  if (orderConfig) {
    pesquisa.order = orderConfig;
  }

  const vistaUrl = buildVistaGetUrl('/imoveis/listar', pesquisa, { showtotal: '1' });

  const res = await fetch(vistaUrl.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Vista API error: ${res.status}`);

  const raw = await res.json();

  return {
    items: extractItems(raw as Record<string, unknown>),
    total: Number(raw.total ?? 0),
    paginas: Number(raw.paginas ?? 1),
    pagina: Number(raw.pagina ?? page),
  };
}

export interface VistaEmpreendimento {
  Codigo: string;
  TituloSite: string;
  Categoria: string;
  Status: string;
  Cidade: string;
  Bairro: string;
  UF: string;
  Endereco: string;
  Numero: string;
  ValorVenda: string;
  DescricaoEmpreendimento: string;
  DescricaoWeb: string;
  Descricao: string;
  DataEntrega: string;
  FotoDestaque: string;
  FotoDestaquePequena: string;
  Latitude: string;
  Longitude: string;
  SuperDestaqueWeb: string;
  InfraEstrutura: Record<string, string>;
  Caracteristicas: Record<string, string>;
  Foto: Record<string, { Foto: string; FotoPequena: string; Ordem: string; Destaque: string; Descricao: string }>;
}

/**
 * Busca todos os empreendimentos com seus dados completos (fotos, infra, etc.).
 * Revalida a cada hora pois empreendimentos mudam pouco.
 */
export async function getEmpreendimentosServer(): Promise<VistaEmpreendimento[]> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

  const pesquisa = {
    fields: [
      'Codigo', 'TituloSite', 'Categoria', 'Status', 'Cidade', 'Bairro', 'UF',
      'Endereco', 'Numero', 'ValorVenda', 'DescricaoEmpreendimento', 'DescricaoWeb',
      'DataEntrega', 'FotoDestaque', 'FotoDestaquePequena', 'Latitude', 'Longitude',
      'SuperDestaqueWeb', 'InfraEstrutura',
      { Foto: ['Foto', 'FotoPequena', 'Ordem', 'Destaque', 'Descricao'] },
    ],
    filter: { Categoria: 'Empreendimento' },
    paginacao: { pagina: 1, quantidade: 50 },
  };

  const url = buildVistaGetUrl('/imoveis/listar', pesquisa, { showtotal: '1' });
  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Vista API error: ${res.status}`);

  const raw = await res.json() as Record<string, unknown>;
  const items = extractItems(raw) as unknown as VistaEmpreendimento[];
  console.log(`[getEmpreendimentosServer] total=${raw.total} paginas=${raw.paginas} items=${items.length}`);
  return items;
}

/**
 * Obtém detalhes completos de um empreendimento pelo código.
 */
export async function getDetalheEmpreendimentoServer(codigo: string): Promise<VistaEmpreendimento | null> {
  const config = getVistaServerConfig();
  if (!config.ok) throw new Error(config.error);

  const pesquisa = {
    fields: [
      'Codigo', 'TituloSite', 'Categoria', 'Status', 'Cidade', 'Bairro', 'UF',
      'Endereco', 'Numero', 'ValorVenda', 'DescricaoEmpreendimento', 'DescricaoWeb',
      'Descricao', 'DataEntrega', 'FotoDestaque', 'FotoDestaquePequena',
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
    'AreaTotal', 'FotoDestaque', 'Descricao', 'DescricaoWeb', 'Empreendimento',
    'InfraEstrutura', 'Caracteristicas', 'Latitude', 'Longitude',
    { Foto: ['Foto', 'FotoPequena', 'Destaque', 'Descricao', 'Ordem'] },
    { Corretor: ['Nome', 'Foto', 'Celular', 'Tipo'] },
  ];

  const url = buildVistaGetUrl('/imoveis/detalhes', { fields }, { imovel: codigo });

  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
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
