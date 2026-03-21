import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function testWithPlaceholder() {
  const priceId = process.env.MOUNJARO_PRICE_ID;
  if (!priceId) throw new Error('MOUNJARO_PRICE_ID not set');

  // Get product
  const price = await stripe.prices.retrieve(priceId);
  const productId = typeof price.product === 'string' ? price.product : price.product.id;
  const product = await stripe.products.retrieve(productId);

  console.log('Current product image:', product.images);

  // Update product with a known good square image (placehold.co 512x512)
  const placeholderUrl = 'https://placehold.co/512x512/0f172a/D4AF37?text=Mounjaro+Alert';
  const updated = await stripe.products.update(productId, {
    images: [placeholderUrl],
  });

  console.log('Updated product images:', updated.images);

  // Create a test checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  console.log('\nTest checkout URL:', session.url);
  console.log('Open it in an incognito window to verify the image appears.');
}

testWithPlaceholder().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});