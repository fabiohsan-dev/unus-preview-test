import { NextRequest, NextResponse } from 'next/server';
import { getVistaServerConfig, buildVistaGetUrl } from '@/lib/server/vistaConfig';

export async function GET(req: NextRequest) {
  const config = getVistaServerConfig();
  if (!config.ok) return NextResponse.json({ error: config.error }, { status: 500 });

  const { searchParams } = req.nextUrl;
  const precoMin = searchParams.get('precoMin') || '';
  const precoMax = searchParams.get('precoMax') || '';

  const fields = [
    'Codigo', 'Referencia', 'TituloSite', 'Categoria', 'Finalidade',
    'ValorVenda', 'ValorLocacao', 'Dormitorios', 'Bairro', 'Status'
  ];

  // Query 1: sem filtro de preço (pega os primeiros 5)
  const pesquisaSemFiltro = {
    fields,
    filter: { Finalidade: 'Venda' },
    paginacao: { pagina: 1, quantidade: 5 },
  };

  // Query 2: com filtro de preço
  const filterComPreco: Record<string, string> = { Finalidade: 'Venda' };
  if (precoMin && precoMax) {
    filterComPreco.ValorVenda = `>= ${precoMin} and <= ${precoMax}`;
  } else if (precoMin) {
    filterComPreco.ValorVenda = `>= ${precoMin}`;
  } else if (precoMax) {
    filterComPreco.ValorVenda = `<= ${precoMax}`;
  }

  const pesquisaComFiltro = {
    fields,
    filter: filterComPreco,
    paginacao: { pagina: 1, quantidade: 10 },
  };

  const url1 = buildVistaGetUrl('/imoveis/listar', pesquisaSemFiltro, { showtotal: '1' });
  const url2 = buildVistaGetUrl('/imoveis/listar', pesquisaComFiltro, { showtotal: '1' });

  const [res1, res2] = await Promise.all([
    fetch(url1.toString(), { headers: { Accept: 'application/json' }, cache: 'no-store' }),
    fetch(url2.toString(), { headers: { Accept: 'application/json' }, cache: 'no-store' }),
  ]);

  const raw1 = await res1.json().catch(() => ({}));
  const raw2 = await res2.json().catch(() => ({}));

  const META_KEYS = new Set(['total', 'paginas', 'pagina', 'quantidade']);

  const extractItems = (raw: Record<string, unknown>) =>
    Object.entries(raw)
      .filter(([key]) => !META_KEYS.has(key))
      .map(([, v]) => v);

  const items1 = extractItems(raw1 as Record<string, unknown>);
  const items2 = extractItems(raw2 as Record<string, unknown>);

  return NextResponse.json({
    filtroAplicado: { precoMin, precoMax, filterComPreco },
    semFiltroPreco: {
      total: raw1.total,
      items: items1,
    },
    comFiltroPreco: {
      total: raw2.total,
      items: items2,
    },
  }, { headers: { 'Cache-Control': 'no-store' } });
}
