import { NextResponse } from 'next/server';
import { sql, initDB } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const user = users[0] as any;
    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email });
    return NextResponse.json({ token, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro no servidor' }, { status: 500 });
  }
}
