import 'server-only';

import { NextRequest, NextResponse } from 'next/server';
import { runSync } from '@/lib/server/sync-engine';

// ---------------------------------------------------------------------------
// GET /api/cron/sync-imoveis
//
// Chamado pelo Vercel Cron a cada 6h (vercel.json).
// Protegido por CRON_SECRET via Authorization header.
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    // Verificar autorização
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await runSync();

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('[cron] Sync error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
