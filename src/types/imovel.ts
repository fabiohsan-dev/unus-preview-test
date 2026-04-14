/**
 * Tipagem do imóvel indexado no Supabase.
 * Espelha a tabela `imoveis_index`.
 */
export interface ImovelIndex {
  id: string;
  url: string;
  titulo: string;
  tipo: 'apartamento' | 'casa' | 'cobertura' | 'terreno' | 'comercial';
  finalidade: 'venda' | 'locacao';
  preco: number;
  area_m2: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  bairro: string;
  cidade: string;
  caracteristicas: string[];
  foto_capa: string | null;
  destaque: boolean;
  updated_at: string;
}

/**
 * Campos retornados para o card de resultado de busca.
 */
export interface ImovelCard {
  id: string;
  titulo: string;
  url: string;
  preco: number;
  area_m2: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  tipo: string;
  finalidade: string;
  bairro: string;
  cidade: string;
  foto_capa: string | null;
  destaque: boolean;
}

/**
 * Filtros extraídos pela IA a partir da query em linguagem natural.
 */
export interface SearchFilters {
  tipo?: string;
  quartos?: number;
  banheiros?: number;
  vagas?: number;
  preco_min?: number;
  preco_max?: number;
  area_min?: number;
  bairro?: string;
  cidade?: string;
  finalidade?: string;
  caracteristicas?: string[];
}
