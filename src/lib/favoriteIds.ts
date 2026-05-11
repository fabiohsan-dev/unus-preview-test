export type FavoriteKind = 'imovel' | 'empreendimento';

export interface FavoriteToken {
  kind: FavoriteKind;
  code: string;
  token: string;
}

function cleanCode(value: string) {
  return value.trim().replace(/^:+|:+$/g, '');
}

export function normalizeFavoriteToken(value?: string | null, defaultKind: FavoriteKind = 'imovel'): FavoriteToken | null {
  if (!value) return null;
  const raw = value.trim();
  if (!raw || raw === '__no-id__') return null;

  if (raw.startsWith('empreendimento:')) {
    const code = cleanCode(raw.slice('empreendimento:'.length));
    return code ? { kind: 'empreendimento', code, token: `empreendimento:${code}` } : null;
  }

  if (raw.startsWith('imovel:')) {
    const code = cleanCode(raw.slice('imovel:'.length));
    return code ? { kind: 'imovel', code, token: `imovel:${code}` } : null;
  }

  if (raw.startsWith('emp-')) {
    const code = cleanCode(raw.slice('emp-'.length));
    return code ? { kind: 'empreendimento', code, token: `empreendimento:${code}` } : null;
  }

  if (raw.startsWith('imovel-')) {
    const code = cleanCode(raw.slice('imovel-'.length));
    return code ? { kind: 'imovel', code, token: `imovel:${code}` } : null;
  }

  const code = cleanCode(raw);
  return code ? { kind: defaultKind, code, token: `${defaultKind}:${code}` } : null;
}

export function favoriteToken(kind: FavoriteKind, code?: string | null) {
  const normalized = normalizeFavoriteToken(code ? `${kind}:${code}` : null, kind);
  return normalized?.token ?? '__no-id__';
}

