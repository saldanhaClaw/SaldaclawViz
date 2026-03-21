import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params; // token is actually the Checkout Session ID

  if (!token || !token.startsWith('cs_')) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }

  try {
    // Verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(token);
    if (!session) {
      return NextResponse.json(
        { error: 'Sessão não encontrada' },
        { status: 404 }
      );
    }

    // Check payment status
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Pagamento não confirmado' },
        { status: 403 }
      );
    }

    // Serve the PDF
    const pdfPath = path.join(process.cwd(), 'public', 'downloads', 'mounjaro-alert.pdf');

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(pdfPath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${session.customer_details?.name || 'Mounjaro'}.pdf"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    if (error instanceof Error && error.message.includes('No such checkout session')) {
      return NextResponse.json(
        { error: 'Sessão inválida' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao processar download' },
      { status: 500 }
    );
  }
}
