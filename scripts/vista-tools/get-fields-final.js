function requireVistaEnv(baseUrl, key) {
  if (!baseUrl || !key) {
    throw new Error('Defina VISTA_BASE_URL e VISTA_KEY para rodar este diagnostico.');
  }
}

async function run() {
  try {
    await import('dotenv/config');
    const VISTA_BASE_URL = process.env.VISTA_BASE_URL;
    const VISTA_KEY = process.env.VISTA_KEY;
    requireVistaEnv(VISTA_BASE_URL, VISTA_KEY);

    const url = `${VISTA_BASE_URL}/imoveis/listarcampos?key=${VISTA_KEY}`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await response.json();

    const keywords = ['Destaque', 'Site', 'Web', 'Relevancia'];
    const candidates = [];

    for (const category in data) {
      const fields = data[category];
      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          if (keywords.some((kw) => field.toLowerCase().includes(kw.toLowerCase()))) {
            candidates.push({ category, field });
          }
        });
      }
    }

    const listUrl = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa={"fields":["*"]}&paginacao={"itens":1}`;
    const listRes = await fetch(listUrl, { headers: { Accept: 'application/json' } });
    const listData = await listRes.json();

    const firstId = Object.keys(listData).find((key) => !Number.isNaN(Number(key)));
    const propertyData = firstId ? listData[firstId] : {};

    const finalResults = candidates.map((candidate) => {
      const val = propertyData[candidate.field];
      let type = 'string';
      if (val === 'Sim' || val === 'Nao') {
        type = 'boolean (Sim/Nao)';
      } else if (typeof val === 'number') {
        type = 'number';
      } else if (val === null || val === undefined) {
        if (candidate.field.startsWith('Tique') || candidate.field.includes('Destaque') || candidate.field.startsWith('Exibir')) {
          type = 'boolean (Sim/Nao)';
        } else if (candidate.field.includes('Descricao') || candidate.field.includes('Titulo') || candidate.field.includes('Keywords') || candidate.field.includes('URL') || candidate.field.includes('Foto')) {
          type = 'string';
        }
      } else {
        type = typeof val;
      }
      return { field: candidate.field, type };
    });

    const uniqueResults = [];
    const seen = new Set();
    finalResults.forEach((result) => {
      if (!seen.has(result.field)) {
        uniqueResults.push(result);
        seen.add(result.field);
      }
    });

    console.log(JSON.stringify(uniqueResults, null, 2));
  } catch (error) {
    console.error(error);
  }
}

run();
