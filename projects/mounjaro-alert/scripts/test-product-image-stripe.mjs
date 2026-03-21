import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function testImageVisibility() {
  // Use the existing product and price
  const priceId = process.env.MOUNJARO_PRICE_ID;
  if (!priceId) throw new Error('MOUNJARO_PRICE_ID not set');

  // Get product details
  const price = await stripe.prices.retrieve(priceId);
  const productId = typeof price.product === 'string' ? price.product : price.product.id;
  const product = await stripe.products.retrieve(productId);

  console.log('Current product image:', product.images);

  // Create a checkout session to inspect the line items and display_items returned
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  // Retrieve the session with expand to include line items and display_items
  const expanded = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'display_items'],
  });

  console.log('\n=== Expanded Session ===');
  console.log('Line items data:', JSON.stringify(expanded.line_items?.data?.[0], null, 2));
  console.log('Display items:', JSON.stringify(expanded.display_items, null, 2));
}

testImageVisibility().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});