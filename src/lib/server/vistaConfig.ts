import 'server-only';

const VISTA_HOST_SUFFIX = '.vistahost.com.br';

function readRequiredEnv(name: 'VISTA_BASE_URL' | 'VISTA_KEY') {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getVistaServerConfig() {
  const rawBaseUrl = readRequiredEnv('VISTA_BASE_URL');
  const apiKey = readRequiredEnv('VISTA_KEY');

  if (!rawBaseUrl || !apiKey) {
    return { ok: false as const, error: 'Vista API não configurada no servidor.' };
  }

  let baseUrl: URL;

  try {
    baseUrl = new URL(rawBaseUrl);
  } catch {
    return { ok: false as const, error: 'VISTA_BASE_URL inválida.' };
  }

  if (baseUrl.protocol !== 'https:') {
    return { ok: false as const, error: 'VISTA_BASE_URL deve usar HTTPS.' };
  }

  if (!baseUrl.hostname.endsWith(VISTA_HOST_SUFFIX)) {
    return { ok: false as const, error: 'Host da Vista API não permitido.' };
  }

  baseUrl.pathname = '/';
  baseUrl.search = '';
  baseUrl.hash = '';

  return {
    ok: true as const,
    apiKey,
    baseUrl,
  };
}

export function buildVistaGetUrl(
  endpoint: `/imoveis/${string}`,
  pesquisa: unknown,
  extraParams?: Record<string, string>,
) {
  const config = getVistaServerConfig();

  if (!config.ok) {
    throw new Error(config.error);
  }

  const url = new URL(endpoint, config.baseUrl);
  url.searchParams.set('key', config.apiKey);
  url.searchParams.set('pesquisa', JSON.stringify(pesquisa));

  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      url.searchParams.set(key, value);
    }
  }

  return url;
}
