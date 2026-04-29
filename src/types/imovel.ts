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
