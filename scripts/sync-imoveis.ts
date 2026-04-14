/**
 * scripts/sync-imoveis.ts
 *
 * CLI wrapper para sincronizar imóveis da Vista API → Supabase.
 * Uso: npm run sync (ou npx tsx scripts/sync-imoveis.ts)
 *
 * Carrega .env.local antes de executar o sync-engine.
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Carrega variáveis de ambiente antes de qualquer import do projeto
config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
  // Import dinâmico após carregar env
  const { runSync } = await import('../src/lib/server/sync-engine');

  console.log('─'.repeat(60));
  console.log('UNUS — Sincronização Vista API → Supabase');
  console.log('─'.repeat(60));

  const result = await runSync();

  console.log('─'.repeat(60));

  if (result.ok) {
    console.log(`✅ Sucesso!`);
    console.log(`   Sincronizados: ${result.synced}`);
    console.log(`   Removidos:     ${result.deleted}`);
    console.log(`   Duração:       ${result.duration_ms}ms`);
    console.log(`   Timestamp:     ${result.timestamp}`);
  } else {
    console.error(`❌ Erro: ${result.error}`);
    process.exit(1);
  }
}

main();
