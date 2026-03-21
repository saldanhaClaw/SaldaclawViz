import { NextResponse } from 'next/server';
import { sql, initDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    // Garante que a tabela existe (Apenas para MVP; em PRD, usar migrations)
    await initDB();

    // Insere no NeonDB
    await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json({ success: true, message: 'Email cadastrado com sucesso.' }, { status: 200 });
  } catch (error: any) {
    console.error('Erro na API waitlist', error);
    return NextResponse.json(
      { error: 'Erro interno ao cadastrar email na waitlist.' },
      { status: 500 }
    );
  }
}
