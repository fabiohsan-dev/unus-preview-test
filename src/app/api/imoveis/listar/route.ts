import { NextRequest, NextResponse } from 'next/server';
import { getListarImoveisServer } from '@/lib/server/vistaService';
import type { FiltrosImoveis } from '@/types/vista';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const filtros: FiltrosImoveis = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 12),
    tipo: searchParams.get('tipo') || searchParams.get('categoria') || undefined,
    cidade: searchParams.get('cidade') || undefined,
    bairro: searchParams.get('bairro') || undefined,
    finalidade: searchParams.get('finalidade') || searchParams.get('negocio') || 'Venda',
    precoMin: searchParams.get('precoMin') || undefined,
    precoMax: searchParams.get('precoMax') || undefined,
    areaMin: searchParams.get('areaMin') || undefined,
    areaMax: searchParams.get('areaMax') || undefined,
    quartos: searchParams.get('quartos') ? Number(searchParams.get('quartos')) : undefined,
    suites: searchParams.get('suites') ? Number(searchParams.get('suites')) : undefined,
    vagas: searchParams.get('vagas') ? Number(searchParams.get('vagas')) : undefined,
    banheiros: searchParams.get('banheiros') ? Number(searchParams.get('banheiros')) : undefined,
    ordem: searchParams.get('ordem') || 'relevancia',
    destaque: searchParams.get('destaque') === 'true',
  };

  try {
    const data = await getListarImoveisServer(filtros);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    console.error('[Listar API] Error:', err);
    return NextResponse.json({ error: 'Erro ao buscar imóveis' }, { status: 502 });
  }
}
