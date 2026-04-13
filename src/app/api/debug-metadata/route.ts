import { NextResponse } from 'next/server';
import { getVistaServerConfig, buildVistaGetUrl } from '@/lib/server/vistaConfig';

export async function GET() {
  const config = getVistaServerConfig();
  if (!config.ok) {
    return NextResponse.json({ error: config.error }, { status: 500 });
  }

  try {
    const url = buildVistaGetUrl('/imoveis/listarConteudo', {
      fields: ['Bairro', 'Cidade', 'Categoria'],
    });

    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const text = await res.text();
    let parsed: unknown;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      raw: parsed,
      summary: typeof parsed === 'object' && parsed !== null ? {
        keys: Object.keys(parsed as object),
        bairroCount: Object.keys((parsed as Record<string, unknown>).Bairro as object ?? {}).length,
        cidadeCount: Object.keys((parsed as Record<string, unknown>).Cidade as object ?? {}).length,
        categoriaCount: Object.keys((parsed as Record<string, unknown>).Categoria as object ?? {}).length,
      } : null,
    });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
    }, { status: 502 });
  }
}
