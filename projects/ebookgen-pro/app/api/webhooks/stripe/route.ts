import { getStripe } from '../../../../lib/stripe';
import { getDb } from '../../../../lib/db';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const text = await req.text().catch(() => "");
    const headerList = await headers().catch(() => null);
    if (!text || !headerList) return NextResponse.json({ ok: true });

    const signature = headerList.get('stripe-signature') as string;
    const stripe = getStripe();
    const sql = getDb();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const email = session.customer_details.email;
      const downloadToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await sql`
        INSERT INTO purchases (email, stripe_session_id, amount, download_token, download_expires_at)
        VALUES (${email}, ${session.id}, ${session.amount_total}, ${downloadToken}, ${expiresAt})
      `;

      await resend.emails.send({
        from: 'Método 30D <contato@saldaclaw-viz.vercel.app>',
        to: email,
        subject: 'Seu Método 30D está aqui! 🎉',
        html: `<p>Acesse aqui: ${process.env.NEXT_PUBLIC_BASE_URL}/api/download/${downloadToken}</p>`,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
