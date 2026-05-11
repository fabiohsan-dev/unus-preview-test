import { NextResponse } from 'next/server';
import { syncVistaToSupabase } from '@/lib/server/syncService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Proteção simples por token (definir no .env como SYNC_TOKEN)
  if (!token || token !== process.env.SYNC_TOKEN) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const result = await syncVistaToSupabase();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
