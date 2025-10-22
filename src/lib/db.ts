import { Pool } from 'pg';

// Ensure we only ever connect to Neon (remote Postgres) and never any local fallback
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set. This project is configured to use Neon only — no local database fallback.'
  );
}

// Force SSL on (Neon requires it) and keepAlive for serverless friendliness
export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
});

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] } > {
  const client = await pool.connect();
  try {
    const res = await client.query<T>(text, params);
    return { rows: res.rows };
  } finally {
    client.release();
  }
}
