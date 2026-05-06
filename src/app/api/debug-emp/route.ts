import { NextResponse } from 'next/server';
import { buildVistaGetUrl, getVistaServerConfig } from '@/lib/server/vistaConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getVistaServerConfig();
  if (!config.ok) {
    return NextResponse.json({ error: config.error, step: 'config' }, { status: 500 });
  }

  try {
    // Test 1: filtro Categoria=Empreendimento (mesmo da página)
    const pesquisa = {
      fields: ['Codigo', 'TituloSite', 'Categoria', 'Bairro', 'Cidade', 'Status'],
      filter: { Categoria: 'Empreendimento' },
      paginacao: { pagina: 1, quantidade: 50 },
    };
    const url = buildVistaGetUrl('/imoveis/listar', pesquisa, { showtotal: '1' });

    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const raw = await res.json();
    const META_KEYS = new Set(['total', 'paginas', 'pagina', 'quantidade']);
    const items = Object.entries(raw)
      .filter(([k]) => !META_KEYS.has(k))
      .map(([, v]) => v);

    // Test 2: listarConteudo — categorias disponíveis
    const urlCateg = buildVistaGetUrl('/imoveis/listarConteudo', { fields: ['Categoria'] });
    const resCateg = await fetch(urlCateg.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    const rawCateg = await resCateg.json();

    return NextResponse.json({
      apiStatus: res.status,
      total: raw.total,
      paginas: raw.paginas,
      itemsExtracted: items.length,
      primeiros3: items.slice(0, 3),
      categoriasDisponiveis: rawCateg?.Categoria ?? rawCateg,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err), step: 'fetch' }, { status: 500 });
  }
}
