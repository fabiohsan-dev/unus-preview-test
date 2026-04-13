import { getVistaServerConfig } from './src/lib/server/vistaConfig.js';

async function diagnose() {
  const config = getVistaServerConfig();
  if (!config.ok) {
    console.error('Configuração não encontrada.');
    return;
  }

  const url = new URL('/imoveis/listarcampos', config.baseUrl);
  url.searchParams.set('key', config.apiKey);

  try {
    const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
    const data = await res.json();
    
    console.log('Structure of data keys:', Object.keys(data));
    if (data.imoveis) console.log('imoveis is array:', Array.isArray(data.imoveis));

    const relevantFields = [];
    
    // If it's the structure we saw in curl
    for (const cat in data) {
        if (Array.isArray(data[cat])) {
            data[cat].forEach(f => {
                if (['Destaque', 'Site', 'Web', 'Relevancia'].some(kw => f.toLowerCase().includes(kw.toLowerCase()))) {
                    relevantFields.push({ name: f, category: cat, type: 'Sim/Não ou Texto' });
                }
            });
        } else {
            // If it's a flat object as the original script assumed
            if (['Destaque', 'Site', 'Web', 'Relevancia'].some(kw => cat.toLowerCase().includes(kw.toLowerCase()))) {
                relevantFields.push({ name: cat, type: data[cat] });
            }
        }
    }

    console.log('--- DIAGNÓSTICO DE CAMPOS DE DESTAQUE ---');
    relevantFields.forEach(f => {
        console.log(`${f.name} (${f.category || 'flat'}): ${f.type}`);
    });

  } catch (err) {
    console.error('Erro na requisição:', err);
  }
}

diagnose();
