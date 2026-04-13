const VISTA_BASE_URL = 'https://luizhenr-rest.vistahost.com.br';
const VISTA_KEY = 'ced97a1526d0338e62818ada0b2def88';

async function run() {
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
