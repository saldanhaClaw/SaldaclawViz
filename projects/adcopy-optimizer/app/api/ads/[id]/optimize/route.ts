import { NextResponse } from 'next/server';
import { sql, initDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const adId = parseInt(params.id);
    const ads = await sql`SELECT * FROM ads WHERE id = ${adId} AND user_id = ${decoded.userId}`;

    if (ads.length === 0) {
      return NextResponse.json({ error: 'Anúncio não encontrado' }, { status: 404 });
    }

    const ad = ads[0] as any;

    // Chamar OpenAI para otimização
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um copywriter de elite especialista em anúncios de alta conversão. Gere 3 variações curtas e persuasivas baseadas no texto fornecido. Retorne no formato JSON: { variations: [string, string, string] }"
        },
        {
          role: "user",
          content: ad.original_text
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content || '{}');
    const variations = content.variations || [];

    // Salvar no banco
    const updated = await sql`
      UPDATE ads 
      SET optimized_variations = ${JSON.stringify(variations)}, status = 'optimized'
      WHERE id = ${adId}
      RETURNING *
    `;

    return NextResponse.json(updated[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
