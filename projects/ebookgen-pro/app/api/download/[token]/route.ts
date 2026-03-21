import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getDb } from '../../../../lib/db';

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  try {
    const sql = getDb();
    const results = (await sql`
      SELECT * FROM purchases 
      WHERE download_token = ${token} 
      AND download_expires_at > NOW()
    `) as any[];

    if (results.length === 0) {
      return new NextResponse('Link de download inválido ou expirado.', { status: 404 });
    }

    // Placeholder do PDF (Em produção, ler de um bucket ou storage)
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const response = await fetch(pdfUrl);
    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="metodo-30d-emagrecimento.pdf"',
      },
    });
  } catch (err) {
    return new NextResponse('Erro ao processar download.', { status: 500 });
  }
}
