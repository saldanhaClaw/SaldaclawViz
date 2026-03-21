import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function testCheckout() {
  const priceId = process.env.MOUNJARO_PRICE_ID;
  if (!priceId) throw new Error('MOUNJARO_PRICE_ID not set');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: 'https://mounjaro-alert.vercel.app/obrigado?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://mounjaro-alert.vercel.app/',
    billing_address_collection: 'required',
  });

  console.log('=== Checkout Session ===');
  console.log('ID:', session.id);
  console.log('URL:', session.url);
  console.log('Payment Intent:', session.payment_intent);
  console.log('Client Secret:', session.client_secret);
  console.log('Line Items:', JSON.stringify(session.line_items, null, 2));
  if (session.display_items) {
    console.log('Display Items (with images):', JSON.stringify(session.display_items, null, 2));
  } else {
    console.log('No display_items returned (checkout will fetch product images from product)');
  }
}

testCheckout().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});