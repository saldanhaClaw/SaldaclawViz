import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = 'https://mounjaro-alert.vercel.app';

    if (!stripeSecretKey || stripeSecretKey.includes('sk_test_') || stripeSecretKey.includes('placeholder')) {
      return NextResponse.json({ url: `${appUrl}/obrigado?test=true` });
    }

    // Parse body to get upsell flag
    const body = await request.json().catch(() => ({}));
    const upsell = body.upsell === true;

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });

    const priceId = process.env.MOUNJARO_PRICE_ID;
    if (!priceId) {
      throw new Error('MOUNJARO_PRICE_ID não configurada');
    }

    // Build line items
    const line_items: any[] = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    // Upsell: usando price_data inline (pode ser substituído por price_id fixo depois)
    if (upsell) {
      line_items.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Atualização VIP',
            description: 'Consultoria de 15 minutos via vídeo + suporte prioritário.',
          },
          unit_amount: 1990, // R$ 19,90
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: line_items,
      success_url: `${appUrl}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
      billing_address_collection: 'required',
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err.message);
    return NextResponse.json(
      { error: 'Checkout failed', details: err.message },
      { status: 500 }
    );
  }
}
