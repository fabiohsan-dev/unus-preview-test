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

  // Preço: quando só um limite é informado vai direto no filter (como os outros campos).
  // Quando ambos são informados o campo só pode aparecer uma vez — montamos a string combinada.
  if (precoMin && precoMax) {
    filter.ValorVenda = `>= ${precoMin} and <= ${precoMax}`;
  } else if (precoMin) {
    filter.ValorVenda = `>= ${precoMin}`;
  } else if (precoMax) {
    filter.ValorVenda = `<= ${precoMax}`;
  }

  const fields = [
    'Codigo', 'Referencia', 'TituloSite', 'Categoria', 'Finalidade', 'Status',
    'Cidade', 'Bairro', 'ValorVenda', 'ValorLocacao', 'Dormitorios', 'Suites',
    'Vagas', 'BanheiroSocialQtd', 'AreaPrivativa', 'AreaTotal', 'FotoDestaque',
    'FotoDestaquePequena'
  ];

  const pesquisa: Record<string, unknown> = {
    fields,
    filter,
    paginacao: { pagina: page, quantidade: Math.min(limit, 50) },
  };

  const orderConfig = ORDER_MAP[ordem];
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

  const items = Object.entries(raw)
    .filter(([key]) => !META_KEYS.has(key))
    .map(([, value]) => value) as VistaImovelItem[];

  return {
    items,
    total: Number(raw.total ?? 0),
    paginas: Number(raw.paginas ?? 1),
    pagina: Number(raw.pagina ?? page),
  };
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
