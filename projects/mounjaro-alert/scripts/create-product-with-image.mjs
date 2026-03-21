import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function createProductWithImage() {
  // Produto com imagem desde a criação
  const product = await stripe.products.create({
    name: 'Mounjaro Alert',
    description: 'Guia definitivo sobre Mounjaro — efeitos, alternativas e protocolo seguro',
    images: ['https://mounjaro-alert.vercel.app/assets/001-professional-female-pharmacist-doctor-he.png'],
    metadata: {
      project: 'mounjaro-alert',
    },
  });

  console.log('✅ Produto criado:', product.id);
  console.log('   Nome:', product.name);
  console.log('   Imagens:', product.images);

  // Preço: R$ 9,90 (990 cents)
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 990,
    currency: 'brl',
    metadata: {
      type: 'one-time',
    },
  });

  console.log('✅ Preço criado:', price.id);
  console.log('   Valor:', price.unit_amount, price.currency);

  // Atualizar .env
  const envPath = '.env';
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  envContent = envContent.replace(/MOUNJARO_PRICE_ID=.*/gm, `MOUNJARO_PRICE_ID=${price.id}`);
  if (!envContent.includes('MOUNJARO_PRICE_ID=')) {
    envContent += `\nMOUNJARO_PRICE_ID=${price.id}`;
  }
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env atualizado com novo MOUNJARO_PRICE_ID');

  // Test checkout
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: price.id, quantity: 1 }],
    success_url: 'https://mounjaro-alert.vercel.app/obrigado?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://mounjaro-alert.vercel.app/',
    billing_address_collection: 'required',
  });

  console.log('✅ Sessão de checkout criada:', session.id);
  console.log('🔗 URL de checkout (teste):', session.url);
}

createProductWithImage().catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});