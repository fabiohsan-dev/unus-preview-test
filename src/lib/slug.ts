import type { VistaImovelItem } from '@/types/vista';

export function slugSegment(value?: string | number | null, fallback = 'sc') {
  const normalized = String(value ?? fallback)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'e')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || fallback;
}

export function extractCodigoFromSlug(slug: string) {
  return slug.split('-').pop()?.trim() ?? '';
}

export function buildPropertySlug(item: Pick<VistaImovelItem, 'Categoria' | 'Bairro' | 'Codigo'>) {
  return [
    slugSegment(item.Categoria, 'imovel'),
    slugSegment(item.Bairro, 'sc'),
    item.Codigo,
  ].filter(Boolean).join('-');
}

export function buildEmpreendimentoSlug(item: Pick<VistaImovelItem, 'Bairro' | 'Cidade' | 'Codigo'>) {
  return [
    slugSegment(item.Bairro, 'sc'),
    slugSegment(item.Cidade, 'sc'),
    item.Codigo,
  ].filter(Boolean).join('-');
}

