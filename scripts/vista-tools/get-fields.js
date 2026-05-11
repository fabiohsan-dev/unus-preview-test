function requireVistaEnv(baseUrl, key) {
  if (!baseUrl || !key) {
    throw new Error('Defina VISTA_BASE_URL e VISTA_KEY para rodar este diagnostico.');
  }
}

async function run() {
  await import('dotenv/config');
  const VISTA_BASE_URL = process.env.VISTA_BASE_URL;
  const VISTA_KEY = process.env.VISTA_KEY;
  requireVistaEnv(VISTA_BASE_URL, VISTA_KEY);

  const url = `${VISTA_BASE_URL}/imoveis/listarcampos?key=${VISTA_KEY}`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  const data = await response.json();

  const keywords = ['Destaque', 'Site', 'Web', 'Relevancia'];
  const results = [];

  for (const category in data) {
    const fields = data[category];
    if (Array.isArray(fields)) {
      fields.forEach((field) => {
        if (keywords.some((kw) => field.toLowerCase().includes(kw.toLowerCase()))) {
          results.push({ category, field });
        }
      });
    }
  }

  console.log('Fields matching criteria:');

  const listUrl = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa={"fields":["Codigo"]}&paginacao={"itens":1}`;
  const listRes = await fetch(listUrl, { headers: { Accept: 'application/json' } });
  const listData = await listRes.json();
  const firstId = Object.keys(listData).find((key) => !Number.isNaN(Number(key)));

  if (firstId) {
    const fieldsToFetch = results.map((item) => item.field);
    const detailUrl = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa={"fields":${JSON.stringify(fieldsToFetch)}}&paginacao={"itens":1}`;
    const detailRes = await fetch(detailUrl, { headers: { Accept: 'application/json' } });
    const detailData = await detailRes.json();
    const propertyData = detailData[firstId];

    results.forEach((result) => {
      const val = propertyData ? propertyData[result.field] : null;
      result.exampleValue = val;
      result.type = typeof val;
      if (val === 'Sim' || val === 'Nao') result.type = 'boolean (Sim/Nao)';
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

run();
