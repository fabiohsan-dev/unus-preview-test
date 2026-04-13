import { VistaImovelItem } from '@/types/vista';
import { formatarPreco } from '../vistaApi';

/**
 * Utilitário para calcular a área de forma segura, 
 * priorizando AreaTotal (comum em terrenos) sobre AreaPrivativa.
 */
function getAreaValue(item: VistaImovelItem): string {
  const total = Number(item.AreaTotal);
  const privativa = Number(item.AreaPrivativa);
  const valor = total > 0 ? item.AreaTotal : (privativa > 0 ? item.AreaPrivativa : '0');
  return `${valor}m²`;
}

/**
 * Transforma um imóvel da Vista API para o formato do FeaturedCards (Seleção Exclusiva)
 */
export function mapToFeaturedProperty(item: VistaImovelItem, index: number) {
  return {
    id: item.Codigo || `featured-${index}`,
    title: item.TituloSite || `${item.Categoria} em ${item.Bairro}`,
    image: item.FotoDestaque || '',
    bedrooms: Number(item.Dormitorios) || 0,
    suites: Number(item.Suites) || 0,
    bathrooms: Number(item.BanheiroSocialQtd) || 0,
    area: getAreaValue(item),
    location: `${item.Bairro}, ${item.Cidade}`,
    price: formatarPreco(item.ValorVenda),
    tags: [item.Categoria || '', item.Status || ''].filter(Boolean),
  };
}

/**
 * Transforma um imóvel da Vista API para o formato do SalesOpportunities (Investidores)
 */
export function mapToOpportunity(item: VistaImovelItem, index: number) {
  return {
    id: item.Codigo || `opp-${index}`,
    image: item.FotoDestaque || '',
    type: item.Categoria || '',
    title: item.TituloSite || `${item.Categoria} em ${item.Bairro}`,
    location: `${item.Bairro}, ${item.Cidade}`,
    bedrooms: Number(item.Dormitorios) || 0,
    suites: Number(item.Suites) || 0,
    bathrooms: Number(item.BanheiroSocialQtd) || 0,
    area: getAreaValue(item),
    price: formatarPreco(item.ValorVenda),
    badge: 'Nova Oportunidade',
  };
}

/**
 * Transforma um imóvel da Vista API para o formato do PropertyCardGrid (Nosso Portfólio)
 */
export function mapToGridProperty(item: VistaImovelItem, index: number) {
  return {
    id: item.Codigo || `grid-${index}`,
    image: item.FotoDestaque || '',
    imagePequena: item.FotoDestaquePequena,
    type: item.Categoria || 'Imóvel',
    code: item.Codigo,
    title: item.TituloSite || `${item.Categoria} em ${item.Bairro}`,
    location: `${item.Bairro}, ${item.Cidade}`,
    transactionType: item.Finalidade || 'Venda',
    price: formatarPreco(item.ValorVenda),
    bedrooms: Number(item.Dormitorios) || 0,
    suites: Number(item.Suites) || 0,
    parkingSpots: Number(item.Vagas) || 0,
    bathrooms: Number(item.BanheiroSocialQtd) || 0,
    area: getAreaValue(item),
  };
}
