import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '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';

try {
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });
  const products = await stripe.products.list({ limit: 10 });
  console.log('✅ Stripe key OK — Products retrieved:', products.data.length);
  console.log('Products:', products.data.map(p => ({ id: p.id, name: p.name })));
} catch (err) {
  console.error('❌ Stripe key failed:', err.message);
  process.exit(1);
}