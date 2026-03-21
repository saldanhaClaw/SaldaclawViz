import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function createMounjaroProduct() {
  const product = await stripe.products.create({
    name: 'Mounjaro Alert',
    description: 'Guia essencial sobre Mounjaro.',
    images: [],
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 990,
    currency: 'brl',
  });

  console.log('✅ Mounjaro Alert criado');
  console.log('Product ID:', product.id);
  console.log('Price ID:', price.id);
  return { productId: product.id, priceId: price.id };
}

async function createEbookGenProduct() {
  const product = await stripe.products.create({
    name: 'Método 30D — Emagrecimento Real Sem Dietas Malucas',
    description: 'E-book completo (80+ páginas) + 3 bônus exclusivos. Cardápio 30 dias, 50 receitas fit, treinos em casa, diário de progresso.',
    images: [],
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 4790,
    currency: 'brl',
  });

  console.log('✅ EbookGen Pro criado');
  console.log('Product ID:', product.id);
  console.log('Price ID:', price.id);
  return { productId: product.id, priceId: price.id };
}

async function main() {
  try {
    const mounjaro = await createMounjaroProduct();
    const ebookgen = await createEbookGenProduct();

    console.log('\n📋 IDs para .env:');
    console.log(`MOUNJARO_PRICE_ID=${mounjaro.priceId}`);
    console.log(`EBOOKGEN_PRICE_ID=${ebookgen.priceId}`);

    // Salvar em arquivo para facilitar
    const fs = require('fs');
    const out = {
      mounjaro: mounjaro,
      ebookgen: ebookgen,
      generatedAt: new Date().toISOString(),
    };
    fs.writeFileSync('stripe-products.json', JSON.stringify(out, null, 2));
    console.log('\n💾 IDs salvos em stripe-products.json');
  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
}

main();