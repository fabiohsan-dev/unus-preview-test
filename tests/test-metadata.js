const https = require('https');
require('dotenv/config');

const VISTA_BASE_URL = process.env.VISTA_BASE_URL;
const VISTA_KEY = process.env.VISTA_KEY;

if (!VISTA_BASE_URL || !VISTA_KEY) {
  throw new Error('Defina VISTA_BASE_URL e VISTA_KEY para rodar este diagnóstico.');
}

const dataObj = {
  fields: ["Bairro", "Cidade", "Categoria", "ValorVenda", "ValorLocacao"]
};

const encoded = encodeURIComponent(JSON.stringify(dataObj));
const url = `${VISTA_BASE_URL}/imoveis/listarConteudo?key=${VISTA_KEY}&pesquisa=${encoded}`;

https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Status Code:', res.statusCode);
      console.log('Success:', Object.keys(json));
      console.log('Bairros type:', Array.isArray(json.Bairro) ? 'Array' : typeof json.Bairro);
      console.log('Bairros keys:', json.Bairro ? Object.keys(json.Bairro).length : 0);
    } catch {
      console.error('Error parsing JSON:', data);
    }
  });
}).on('error', console.error);
