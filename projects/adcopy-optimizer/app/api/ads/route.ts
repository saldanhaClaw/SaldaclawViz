import { NextResponse } from 'next/server';
import { sql, initDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const adSchema = z.object({
  originalText: z.string().min(10),
});

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const ads = await sql`
      SELECT * FROM ads 
      WHERE user_id = ${decoded.userId} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(ads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { originalText } = adSchema.parse(body);

    const result = await sql`
      INSERT INTO ads (user_id, original_text, status)
      VALUES (${decoded.userId}, ${originalText}, 'draft')
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
