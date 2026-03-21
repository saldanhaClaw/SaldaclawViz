import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getStripe } from '../../../lib/stripe';

export async function GET() {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Método 30D — Emagrecimento Real',
              description: 'O guia definitivo para transformar seu corpo em 30 dias.',
              images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ebookgen-pro.vercel.app'}/mockup_8k.png`],
            },
            unit_amount: 4790, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ebookgen-pro.vercel.app'}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ebookgen-pro.vercel.app'}/`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const email = json.email; 
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Método 30D — Emagrecimento Real',
              description: 'O guia definitivo para transformar seu corpo em 30 dias.',
              images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ebookgen-pro.vercel.app'}/mockup.png`],
            },
            unit_amount: 4790, // R$ 47,90
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ebookgen-pro.vercel.app'}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ebookgen-pro.vercel.app'}/`,
      customer_email: email || undefined,
      metadata: { product: 'm30d' },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
