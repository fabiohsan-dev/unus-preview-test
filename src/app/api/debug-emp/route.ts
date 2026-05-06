import { NextResponse } from 'next/server';
import { buildVistaGetUrl, getVistaServerConfig } from '@/lib/server/vistaConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getVistaServerConfig();
  if (!config.ok) {
    return NextResponse.json({ error: config.error }, { status: 500 });
  }

  // 1) Testa com filter Categoria=Empreendimento
  const pesquisaEmp = {
    fields: ['Codigo', 'TituloSite', 'Categoria', 'Bairro', 'Cidade', 'Status'],
    filter: { Categoria: 'Empreendimento' },
    paginacao: { pagina: 1, quantidade: 10 },
  };

  // 2) Testa sem filtro de categoria (busca geral)
  const pesquisaGeral = {
    fields: ['Codigo', 'TituloSite', 'Categoria', 'Bairro', 'Cidade'],
    paginacao: { pagina: 1, quantidade: 5 },
  };

  // 3) Busca categorias disponíveis
  const pesquisaCateg = {
    fields: ['Categoria'],
  };

  const [resEmp, resGeral, resCateg] = await Promise.all([
    fetch(buildVistaGetUrl('/imoveis/listar', pesquisaEmp, { showtotal: '1' }).toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    }),
    fetch(buildVistaGetUrl('/imoveis/listar', pesquisaGeral, { showtotal: '1' }).toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    }),
    fetch(buildVistaGetUrl('/imoveis/listarConteudo', pesquisaCateg).toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    }),
  ]);

  const [dataEmp, dataGeral, dataCateg] = await Promise.all([
    resEmp.json().catch(() => ({ error: resEmp.status })),
    resGeral.json().catch(() => ({ error: resGeral.status })),
    resCateg.json().catch(() => ({ error: resCateg.status })),
  ]);

  return NextResponse.json({
    filtroEmpreendimento: {
      status: resEmp.status,
      total: dataEmp.total,
      paginas: dataEmp.paginas,
      primeiros: Object.values(dataEmp).filter((v) => typeof v === 'object' && (v as Record<string, unknown>)?.Codigo),
    },
    geralSemFiltro: {
      status: resGeral.status,
      total: dataGeral.total,
      categoriasEncontradas: [...new Set(
        Object.values(dataGeral)
          .filter((v) => typeof v === 'object' && (v as Record<string, unknown>)?.Categoria)
          .map((v) => (v as Record<string, unknown>).Categoria)
      )],
    },
    categoriasDisponiveis: dataCateg,
  });
}
