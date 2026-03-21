import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY não definida (verifique .env)');
  process.exit(1);
}

try {
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Mounjaro Alert',
            description: 'Guia essencial sobre Mounjaro.',
          },
          unit_amount: 990,
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/`,
    billing_address_collection: 'required',
  });

  console.log('✅ Checkout session criada:', session.url);
  console.log('Session ID:', session.id);
} catch (err) {
  console.error('❌ Checkout error:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
}