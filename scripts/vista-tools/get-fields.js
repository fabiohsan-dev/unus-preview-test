const VISTA_BASE_URL = 'https://luizhenr-rest.vistahost.com.br';
const VISTA_KEY = 'ced97a1526d0338e62818ada0b2def88';

async function run() {
  const url = `${VISTA_BASE_URL}/imoveis/listarcampos?key=${VISTA_KEY}`;
  const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
  const data = await response.json();

  const keywords = ['Destaque', 'Site', 'Web', 'Relevancia'];
  const results = [];

  for (const category in data) {
    const fields = data[category];
    if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (keywords.some(kw => field.toLowerCase().includes(kw.toLowerCase()))) {
          results.push({ category, field });
        }
      });
    }
  }

  console.log('Fields matching criteria:');
  
  // Now let's try to get one property to see the types
  const listUrl = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa={"fields":["Codigo"]}&paginacao={"itens":1}`;
  const listRes = await fetch(listUrl, { headers: { 'Accept': 'application/json' } });
  const listData = await listRes.json();
  const firstId = Object.keys(listData).find(key => !isNaN(key));

  if (firstId) {
    const fieldsToFetch = results.map(r => r.field);
    const detailUrl = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa={"fields":${JSON.stringify(fieldsToFetch)}}&paginacao={"itens":1}`;
    const detailRes = await fetch(detailUrl, { headers: { 'Accept': 'application/json' } });
    const detailData = await detailRes.json();
    const propertyData = detailData[firstId];

    results.forEach(res => {
      const val = propertyData ? propertyData[res.field] : null;
      res.exampleValue = val;
      res.type = typeof val;
      if (val === 'Sim' || val === 'Não') res.type = 'boolean (Sim/Não)';
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

run();
