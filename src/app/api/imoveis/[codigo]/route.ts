import { NextRequest, NextResponse } from 'next/server';
import { getDetalheImovelServer } from '@/lib/server/vistaService';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ codigo: string }> },
) {
  const { codigo } = await params;
  if (!codigo) return NextResponse.json({ error: 'Código não informado.' }, { status: 400 });

  try {
    const data = await getDetalheImovelServer(codigo);
    
    if (!data) {
      return NextResponse.json({ error: 'Imóvel não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120' }
    });
  } catch (err) {
    console.error('Final API Error:', err);
    return NextResponse.json({ error: 'Erro ao processar dados da API' }, { status: 502 });
  }
}
