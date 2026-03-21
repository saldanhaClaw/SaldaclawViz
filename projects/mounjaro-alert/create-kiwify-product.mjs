#!/usr/bin/env node
/**
 * create-kiwify-product.mjs — Cria produto Mounjaro Alert no Kiwify
 * Usa OAuth2 Client Credentials
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Credenciais fornecidas
const CLIENT_ID = '81420dfc-80d3-4573-bafb-f9085785a07e';
const CLIENT_SECRET = '89b7fe27b9f24fdf1eaeb34e1e4955c83014a8efca94ed53687852bab94cf16f';
const ACCOUNT_ID = '76FuqJg85ktZZau';

async function getToken() {
  const resp = await axios.post('https://api.kiwify.com.br/oauth/token', {
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'read write'
  });
  return resp.data.access_token;
}

async function createProduct(token) {
  const product = {
    name: 'Mounjaro Alert — Protocolo Completo (Grátis)',
    description: 'Guia completo sobre o uso de Mounjaro para emagrecimento. Protocolo, dosagem, acompanhamento e grupo VIP.',
    price: 0,
    currency: 'BRL',
    type: 'digital',
    has_checkout: true,
    checkout_type: 'direct',
    success_url: 'https://mounjaro-alert-vinisoccer372-5413s-projects.vercel.app/obrigado',
    cancel_url: 'https://mounjaro-alert-vinisoccer372-5413s-projects.vercel.app',
    email_required: true,
    send_email: true,
    email_subject: '🚀 Seu acesso ao Mounjaro Alert está aqui!',
    email_body: 'Olá! Seu download está disponível. Acesse: {{download_url}}'
  };

  const resp = await axios.post(
    `https://api.kiwify.com.br/v1/accounts/${ACCOUNT_ID}/products`,
    product,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return resp.data;
}

async function createCheckout(token, productId) {
  const checkout = {
    product_id: productId,
    currency: 'BRL',
    has_pix: false,
    has_card: false,
    redirect_url: 'https://mounjaro-alert-vinisoccer372-5413s-projects.vercel.app/obrigado',
    cancel_url: 'https://mounjaro-alert-vinisoccer372-5413s-projects.vercel.app',
  };
  const resp = await axios.post(
    `https://api.kiwify.com.br/v1/accounts/${ACCOUNT_ID}/checkouts`,
    checkout,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return resp.data;
}

async function main() {
  console.log('\n🛒 Kiwify Product Creation — Mounjaro Alert\n');
  try {
    const token = await getToken();
    console.log('✅ Autenticado no Kiwify');

    const product = await createProduct(token);
    console.log(`✅ Produto criado: ID ${product.id} — ${product.name}`);

    const checkout = await createCheckout(token, product.id);
    console.log(`✅ Checkout criado: ${checkout.url}`);

    // Salvar link no .env do projeto
    const envPath = path.join(__dirname, '..', 'projects', 'mounjaro-alert', '.env');
    const line = `NEXT_PUBLIC_KIWIFY_LINK=${checkout.url}\n`;
    fs.appendFileSync(envPath, '\n# Kiwify URL (auto-generated)\n' + line);
    console.log(`✅ .env atualizado com link`);

    console.log('\n🎯 Produto e checkout criados com sucesso!');
    console.log(`🔗 Link de checkout: ${checkout.url}\n`);
  } catch (err) {
    console.error('\n❌ Erro na criação do produto:');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
}

main();