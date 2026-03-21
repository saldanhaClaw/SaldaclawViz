import { neon } from '@neondatabase/serverless';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL não configurada no .env');
}

export const sql = neon(process.env.NEON_DATABASE_URL);

// Função auxiliar para inicializar o schema do AdCopy Optimizer
export async function initDB() {
  // Tabela de Usuários
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Tabela de Anúncios (Ads)
  await sql`
    CREATE TABLE IF NOT EXISTS ads (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      original_text TEXT NOT NULL,
      optimized_variations JSONB DEFAULT '[]',
      status VARCHAR(50) DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Tabela de Waitlist (Legado/MVP)
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}
