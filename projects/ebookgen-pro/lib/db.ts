import { neon } from '@neondatabase/serverless';

let sqlInstance: any = null;

export function getDb() {
  if (sqlInstance) return sqlInstance;
  
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not defined');
  
  sqlInstance = neon(url);
  return sqlInstance;
}

export async function initPurchasesTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS purchases (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      stripe_session_id TEXT UNIQUE NOT NULL,
      product TEXT NOT NULL DEFAULT 'm30d',
      amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'completed',
      download_token TEXT NOT NULL,
      download_expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
