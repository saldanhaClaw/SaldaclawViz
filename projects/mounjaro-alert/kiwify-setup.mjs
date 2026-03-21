#!/usr/bin/env node
/**
 * kiwify-setup.mjs — Cria produto e checkout no Kiwify
 * Usa API v1 da Kiwify
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Credenciais (fornecidas)
const CLIENT_ID = '81420dfc-80d3-4573-bafb-f9085785a07e';
const CLIENT_SECRET = '89b7fe27b9f24fdf1eaeb34e1e4955c83014a8efca94ed53687852bab94cf16f';
const ACCOUNT_ID = '76FuqJg85ktZZau';

// Obter access token
async function getAccessToken() {
  const response = await axios.post('https://api.kiwify.com.br/oauth/token', {
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'read write',
  });
  return response.data.access_token;
}

// Criar produto
async function createProduct(token) {
  const productData = {
    name: 'Mounjaro Alert — Protocolo Completo',
    description: 'Guia completo sobre o uso de Mounjaro para emagrecimento. Inclui protocolo, dosagem, acompanhamento e grupo VIP.',
    price: 0, // Gratuito (pode ser 0 para lead magnet)
    currency: 'BRL',
    type: 'digital',
    has_checkout: true,
    checkout_type: 'direct', // checkout direto na Kiwify
    success_url: 'https://mounjaro-alert.vercel.app/obrigado',
    cancel_url: 'https://mounjaro-alert.vercel.app',
    email_required: true,
    send_email: true, // envia email com link de download
    email_subject: '🚀 Seu acesso ao Mounjaro Alert está aqui!',
    email_body: 'Olá! Seu download está disponível. Acesse: {{download_url}}',
  };

  const response = await axios.post(
    `https://api.kiwify.com.br/v1/accounts/${ACCOUNT_ID}/products`,
    productData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

// Criar checkout (link direto)
async function createCheckout(token, productId) {
  const checkoutData = {
    product_id: productId,
    currency: 'BRL',
    has_pix: false,
    has_card: false, // Gratuito, não precisa pagamento
    redirect_url: 'https://mounjaro-alert.vercel.app/obrigado',
    cancel_url: 'https://mounjaro-alert.vercel.app',
  };

  const response = await axios.post(
    `https://api.kiwify.com.br/v1/accounts/${ACCOUNT_ID}/checkouts`,
    checkoutData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

// Main
async function main() {
  console.log('\n🔧 Kiwify Setup — Mounjaro Alert\n');
  try {
    const token = await getAccessToken();
    console.log('✅ Autenticado na Kiwify');

    const product = await createProduct(token);
    console.log(`✅ Produto criado: ID ${product.id}`);

    const checkout = await createCheckout(token, product.id);
    console.log(`✅ Checkout criado: ${checkout.url}`);

    // Salvar no .env do projeto
    const envPath = path.join(__dirname, '..', 'projects', 'mounjaro-alert', '.env');
    const envLine = `NEXT_PUBLIC_KIWIFY_LINK=${checkout.url}\n`;
    fs.appendFileSync(envPath, '\n# Kiwify links\n' + envLine);
    console.log(`✅ .env atualizado com link: ${checkout.url}`);

    console.log('\n🎯 Produto e checkout no ar!');
  } catch (err) {
    console.error('❌ Erro:', err.response?.data || err.message);
    process.exit(1);
  }
}

main();