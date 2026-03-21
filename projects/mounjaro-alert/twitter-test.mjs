#!/usr/bin/env node
/**
 * twitter-test.mjs — Post de teste no Twitter usando credenciais fornecidas
 */

import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Credenciais (fixas, fornecidas)
const client = new TwitterApi({
  appKey: 'vC7jVKvz1ELwUEInnaS6jlx1r',
  appSecret: 'xjTrS2SvgeQx3hMO4BAe9li7nNSd8PFXAyGFLnPe00zXDBabKp',
  accessToken: '2908606601-rL8Z3z9ATMyTVU7chK8Oug2JH4KtcLoUPJLJXEm',
  accessSecret: 'hI8gXE7ELjqRb5cuuYKL5bHoIzGcqryn7o8KUsATpKqpD',
});

async function main() {
  console.log('\n🐦 Twitter Test — SaldaCloud Factory\n');
  try {
    const tweet = await client.v2.tweet('🚀 TESTE DE CONEXÃO — SaldaCloud Factory ativa. O Mounjaro Alert está prestes a entrar no ar. https://mounjaro-alert.vercel.app #Mounjaro #MarketingDigital');
    console.log('✅ Tweet postado com sucesso!');
    console.log(`🔗 URL: https://twitter.com/i/web/status/${tweet.data.id}`);
    // Salvar ID em arquivo para referência
    fs.writeFileSync(path.join(__dirname, 'twitter-test-result.json'), JSON.stringify({ id: tweet.data.id, url: `https://twitter.com/i/web/status/${tweet.data.id}` }, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao postar tweet:', err.message);
    console.error('Detalhes:', err);
    process.exit(1);
  }
}

main();