import Stripe from 'stripe';

const sk = process.env.STRIPE_SECRET_KEY;
if (!sk) throw new Error('Missing STRIPE_SECRET_KEY');

const stripe = new Stripe(sk, { apiVersion: '2023-10-16' });

try {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'brl',
        product_data: { name: 'Teste Mounjaro' },
        unit_amount: 990,
      },
      quantity: 1,
    }],
    success_url: 'https://mounjaro-alert.vercel.app/obrigado?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://mounjaro-alert.vercel.app/',
  });
  console.log('✅ Session created:', session.url);
} catch (err) {
  console.error('❌ Stripe error:', err.code, err.message);
  if (err.type) console.error('Type:', err.type);
  if (err.raw) console.error('Raw:', JSON.stringify(err.raw, null, 2));
}
