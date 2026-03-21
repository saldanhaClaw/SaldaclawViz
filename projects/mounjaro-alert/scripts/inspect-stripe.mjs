import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function inspect() {
  const priceId = process.env.MOUNJARO_PRICE_ID;
  if (!priceId) throw new Error('MOUNJARO_PRICE_ID not set');

  // 1. Get price
  const price = await stripe.prices.retrieve(priceId);
  console.log('=== Price ===');
  console.log('ID:', price.id);
  console.log('Active:', price.active);
  console.log('Product (raw):', price.product);
  const productId = typeof price.product === 'string' ? price.product : price.product.id;
  console.log('Product ID:', productId);

  // 2. Get product
  const product = await stripe.products.retrieve(productId);
  console.log('\n=== Product ===');
  console.log('Name:', product.name);
  console.log('Active:', product.active);
  console.log('Images:', product.images);
  console.log('Description:', product.description?.substring(0, 100));

  // 3. Create checkout session with explicit parameters that show product image
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://mounjaro-alert.vercel.app/obrigado?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://mounjaro-alert.vercel.app/',
    // Ensure product image is shown by providing product_reference (optional)
    // Also, automatic tax, billing address collection doesn't affect image
  });

  console.log('\n=== Checkout Session ===');
  console.log('ID:', session.id);
  console.log('URL:', session.url);
  console.log('Display items?', session.display_items ? 'yes' : 'no');
  if (session.display_items) {
    console.log('Display items:', JSON.stringify(session.display_items, null, 2));
  }
  console.log('Customer email (null ok):', session.customer_email);
}

inspect().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});