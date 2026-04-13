import { NextResponse } from 'next/server';
import { getVistaServerConfig } from '@/lib/server/vistaConfig';

export async function GET() {
  const config = getVistaServerConfig();
  if (!config.ok) return NextResponse.json({ error: config.error }, { status: 500 });

  const url = new URL('/imoveis/listarcampos', config.baseUrl);
  url.searchParams.set('key', config.apiKey);

  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
