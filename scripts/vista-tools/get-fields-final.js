const VISTA_BASE_URL = 'https://luizhenr-rest.vistahost.com.br';
const VISTA_KEY = 'ced97a1526d0338e62818ada0b2def88';

async function run() {
  try {
    const url = `${VISTA_BASE_URL}/imoveis/listarcampos?key=${VISTA_KEY}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    const data = await response.json();

    const keywords = ['Destaque', 'Site', 'Web', 'Relevancia'];
    const candidates = [];

    for (const category in data) {
      const fields = data[category];
      if (Array.isArray(fields)) {
        fields.forEach(field => {
          if (keywords.some(kw => field.toLowerCase().includes(kw.toLowerCase()))) {
            candidates.push({ category, field });
          }
        });
      }
    }

    // Get a property with ALL fields to see types
    const listUrl = `${VISTA_BASE_URL}/imoveis/listar?key=${VISTA_KEY}&pesquisa={"fields":["*"]}&paginacao={"itens":1}`;
    const listRes = await fetch(listUrl, { headers: { 'Accept': 'application/json' } });
    const listData = await listRes.json();
    
    const firstId = Object.keys(listData).find(key => !isNaN(key));
    const propertyData = firstId ? listData[firstId] : {};

    const finalResults = candidates.map(c => {
      const val = propertyData[c.field];
      let type = 'string'; // Default for Vista API strings
      if (val === 'Sim' || val === 'Não') {
        type = 'boolean (Sim/Não)';
      } else if (typeof val === 'number') {
        type = 'number';
      } else if (val === null || val === undefined) {
        // If we don't have a value, we guess based on name
        if (c.field.startsWith('Tique') || c.field.includes('Destaque') || c.field.startsWith('Exibir')) {
           type = 'boolean (Sim/Não)';
        } else if (c.field.includes('Descricao') || c.field.includes('Titulo') || c.field.includes('Keywords') || c.field.includes('URL') || c.field.includes('Foto')) {
           type = 'string';
        }
      } else {
        type = typeof val;
      }
      return { field: c.field, type };
    });

    // Remove duplicates (some fields appear in multiple categories or same field name)
    const uniqueResults = [];
    const seen = new Set();
    finalResults.forEach(r => {
      if (!seen.has(r.field)) {
        uniqueResults.push(r);
        seen.has(r.field);
        seen.add(r.field);
      }
    });

    console.log(JSON.stringify(uniqueResults, null, 2));
  } catch (e) {
    console.error(e);
  }
}

run();
