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
      console.log('Bairros:', JSON.stringify(json.Bairro, null, 2));
      console.log('Array.isArray(json.Bairro):', Array.isArray(json.Bairro));
      console.log('Object.values(json.Bairro):', Object.values(json.Bairro));
    } catch {
      console.error('Error parsing JSON:', data);
    }
  });
}).on('error', console.error);
