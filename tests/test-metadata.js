const https = require('https');

const dataObj = {
  fields: ["Bairro", "Cidade", "Categoria", "ValorVenda", "ValorLocacao"]
};

const encoded = encodeURIComponent(JSON.stringify(dataObj));
const url = `https://luizhenr-rest.vistahost.com.br/imoveis/listarConteudo?key=ced97a1526d0338e62818ada0b2def88&pesquisa=${encoded}`;

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
