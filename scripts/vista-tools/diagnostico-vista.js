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
    
    const relevantFields = Object.keys(data).filter(key => 
      key.toLowerCase().includes('destaque') || 
      key.toLowerCase().includes('site') || 
      key.toLowerCase().includes('web') ||
      key.toLowerCase().includes('relevancia')
    );

    console.log('--- DIAGNÓSTICO DE CAMPOS DE DESTAQUE ---');
    console.log('Total de campos encontrados:', Object.keys(data).length);
    console.log('Campos que podem controlar destaques:', relevantFields);
    
    // Mostra o tipo de cada campo relevante
    relevantFields.forEach(field => {
      console.log(`${field}:`, data[field]);
    });

  } catch (err) {
    console.error('Erro na requisição:', err);
  }
}

diagnose();
