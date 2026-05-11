import type { FiltrosImoveis } from '@/types/vista';

export const VENDA_PARAM_KEYS = [
  'tipo',
  'finalidade',
  'cidade',
  'bairro',
  'precoMin',
  'precoMax',
  'areaMin',
  'areaMax',
  'quartos',
  'suites',
  'vagas',
  'banheiros',
  'codigo',
  'ordem',
  'view',
  'page',
] as const;

type VendaParamKey = (typeof VENDA_PARAM_KEYS)[number];
type VendaParamMap = Partial<Record<VendaParamKey, string>>;

const KEY_ORDER = new Map<string, number>(VENDA_PARAM_KEYS.map((key, index) => [key, index]));
const LEGACY_KEYS: Record<string, VendaParamKey> = {
  categoria: 'tipo',
  negocio: 'finalidade',
};

function toSearchParams(input: URLSearchParams | Record<string, unknown>) {
  if (input instanceof URLSearchParams) return new URLSearchParams(input.toString());

  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw !== undefined && raw !== null && raw !== '') {
      params.set(key, String(raw));
    }
  });
  return params;
}

function normalizeFinalidade(value?: string) {
  const raw = value?.trim().toLowerCase();
  if (!raw || raw === 'venda') return '';
  if (raw === 'locacao' || raw === 'locação') return 'Locação';
  if (raw === 'temporada') return 'Temporada';
  return value?.trim() ?? '';
}

function normalizeNumber(value?: string) {
  if (!value) return '';
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return '';
  return String(Math.trunc(numeric));
}

function normalizeText(value?: string) {
  return value?.trim() ?? '';
}

export function normalizeVendaSearchParams(input: URLSearchParams | Record<string, unknown>) {
  const original = toSearchParams(input);
  const values: VendaParamMap = {};

  original.forEach((value, rawKey) => {
    const key = (LEGACY_KEYS[rawKey] ?? rawKey) as VendaParamKey;
    if (!KEY_ORDER.has(key) || values[key]) return;
    values[key] = value;
  });

  const normalized: VendaParamMap = {
    tipo: normalizeText(values.tipo),
    finalidade: normalizeFinalidade(values.finalidade),
    cidade: normalizeText(values.cidade),
    bairro: normalizeText(values.bairro),
    precoMin: normalizeNumber(values.precoMin),
    precoMax: normalizeNumber(values.precoMax),
    areaMin: normalizeNumber(values.areaMin),
    areaMax: normalizeNumber(values.areaMax),
    quartos: normalizeNumber(values.quartos),
    suites: normalizeNumber(values.suites),
    vagas: normalizeNumber(values.vagas),
    banheiros: normalizeNumber(values.banheiros),
    codigo: normalizeText(values.codigo).toUpperCase(),
    ordem: normalizeText(values.ordem) === 'relevancia' ? '' : normalizeText(values.ordem),
    view: values.view === 'list' ? 'list' : '',
    page: normalizeNumber(values.page) === '1' ? '' : normalizeNumber(values.page),
  };

  const canonical = new URLSearchParams();
  VENDA_PARAM_KEYS.forEach((key) => {
    const value = normalized[key];
    if (value) canonical.set(key, value);
  });

  return {
    params: normalized,
    query: canonical.toString(),
    changed: canonical.toString() !== original.toString(),
  };
}

export function vendaUrl(params: Record<string, unknown>) {
  const query = normalizeVendaSearchParams(params).query;
  return query ? `/venda?${query}` : '/venda';
}

export function vendaFiltersFromParams(params: VendaParamMap, defaults?: Partial<FiltrosImoveis>): FiltrosImoveis {
  return {
    ...defaults,
    codigo: params.codigo || undefined,
    cidade: params.cidade || undefined,
    bairro: params.bairro || undefined,
    tipo: params.tipo || undefined,
    finalidade: params.finalidade || 'Venda',
    precoMin: params.precoMin || undefined,
    precoMax: params.precoMax || undefined,
    areaMin: params.areaMin || undefined,
    areaMax: params.areaMax || undefined,
    quartos: params.quartos ? Number(params.quartos) : undefined,
    suites: params.suites ? Number(params.suites) : undefined,
    vagas: params.vagas ? Number(params.vagas) : undefined,
    banheiros: params.banheiros ? Number(params.banheiros) : undefined,
    ordem: params.ordem || 'relevancia',
    page: params.page ? Number(params.page) : 1,
  };
}

