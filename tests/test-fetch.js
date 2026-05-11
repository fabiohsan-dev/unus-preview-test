require('dotenv/config');

const VISTA_BASE_URL = process.env.VISTA_BASE_URL;
const VISTA_KEY = process.env.VISTA_KEY;

function requireVistaEnv() {
  if (!VISTA_BASE_URL || !VISTA_KEY) {
    throw new Error('Defina VISTA_BASE_URL e VISTA_KEY para rodar este diagnóstico.');
  }
}

async function run() {
  requireVistaEnv();
  const pesquisa = {
    filter: { DestaqueWeb: 'Sim' },
    fields: ["DestaqueWeb", "SuperDestaqueWeb", "TiqueImoveisEmDestaque", "ExibirNoSite", "FotoDestaque", "TituloSite", "DescricaoWeb"]
  };
  const url = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa=${encodeURIComponent(JSON.stringify(pesquisa))}&paginacao={"itens":5}`;
  
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

run();
