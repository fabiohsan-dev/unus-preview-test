import { NextResponse } from 'next/server';
import { getMetadataServer } from '@/lib/server/vistaService';

export async function GET() {
  try {
    const response = await getMetadataServer();
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (err) {
    console.error('[Metadata API] Error:', err);
    return NextResponse.json({ error: 'Erro ao buscar metadados' }, { status: 502 });
  }
}
