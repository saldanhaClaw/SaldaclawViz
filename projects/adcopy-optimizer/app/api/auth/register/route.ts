import { NextResponse } from 'next/server';
import { sql, initDB } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    const { email, password } = registerSchema.parse(body);

    // Verificar se já existe
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 });
    }

    // Criar hash e salvar
    const hashedPassword = await hashPassword(password);
    await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: 'Usuário criado com sucesso' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro no servidor' }, { status: 500 });
  }
}
