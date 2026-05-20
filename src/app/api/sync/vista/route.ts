import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { syncVistaToSupabase } from '@/lib/server/syncService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const expected = process.env.SYNC_TOKEN ?? '';

  const isValid =
    token !== null &&
    token.length === expected.length &&
    timingSafeEqual(Buffer.from(token), Buffer.from(expected));

  if (!isValid) {
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
