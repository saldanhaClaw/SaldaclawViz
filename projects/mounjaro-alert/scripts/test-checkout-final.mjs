import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function test() {
  const priceId = process.env.MOUNJARO_PRICE_ID;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://mounjaro-alert.vercel.app/obrigado?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://mounjaro-alert.vercel.app/',
  });
  console.log('🔗 Checkout URL:', session.url);
  console.log('Product image should now appear.');
}

test().catch(console.error);