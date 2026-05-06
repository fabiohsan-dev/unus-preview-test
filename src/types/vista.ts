export interface VistaImovelItem {
  Codigo: string;
  Referencia?: string;
  TituloSite?: string;
  Empreendimento?: string;
  Categoria?: string;
  Finalidade?: string;
  Status?: string;
  Cidade?: string;
  Bairro?: string;
  UF?: string;
  ValorVenda?: string;
  ValorLocacao?: string;
  Dormitorios?: string;
  Suites?: string;
  Vagas?: string;
  BanheiroSocialQtd?: string;
  AreaPrivativa?: string;
  AreaTotal?: string;
  DataEntrega?: string;
  DescricaoEmpreendimento?: string;
  FotoDestaque?: string;
  FotoDestaquePequena?: string;
}

export interface VistaFoto {
  URLArquivo?: string;
  URL?: string;
  Foto?: string;
  FotoPequena?: string;
  Descricao?: string;
  Destaque?: string;
  Ordem?: number | string;
  TipoFoto?: string;
}

export type VistaFeatureMap = Record<string, string>;

export interface VistaImovelDetalhe extends VistaImovelItem {
  Caracteristicas?: VistaFeatureMap;
  CaracteristicasLista?: string[];
  Descricao?: string;
  DescricaoLocalizacao?: string;
  DescricaoSite?: string;
  DescricaoWeb?: string;
  Empreendimento?: string;
  FinalidadeStatus?: Record<string, boolean>;
  Foto?: VistaFoto[] | Record<string, VistaFoto>;
  Fotos?: VistaFoto[];
  InfraEstrutura?: VistaFeatureMap;
  InfraestruturaLista?: string[];
  Latitude?: string;
  Longitude?: string;
  MapaEmbedUrl?: string | null;
  ValorCondominio?: string;
  Corretor?:
    | {
        NomeCorretor?: string;
        Nome?: string;
        Foto?: string;
        Celular?: string;
        Tipo?: string;
      }
    | unknown[];
}

export interface ApiListResponse {
  items: VistaImovelItem[];
  total: number;
  paginas: number;
  pagina: number;
}

export interface ApiMetadataResponse {
  bairros: string[];
  cidades: string[];
  categorias: string[];
  valorVenda: {
    min: number;
    max: number;
  };
  valorLocacao: {
    min: number;
    max: number;
  };
}

export interface ApiDetalheResponse {
  imovel: VistaImovelDetalhe;
  fotos: VistaFoto[];
}

export interface FiltrosImoveis {
  page?: number;
  limit?: number;
  tipo?: string;
  finalidade?: string;
  cidade?: string;
  bairro?: string;
  precoMin?: string;
  precoMax?: string;
  areaMin?: string;
  areaMax?: string;
  quartos?: number;
  suites?: number;
  vagas?: number;
  banheiros?: number;
  ordem?: string;
  destaque?: boolean;
  codigo?: string;
}
