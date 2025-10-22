import dotenv from 'dotenv';
import pg from 'pg';

// Load .env or .env.local explicitly
dotenv.config();
dotenv.config({ path: '.env.local' });

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL');
  process.exit(2);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
});

try {
  const res = await pool.query('SELECT 1 as ok');
  console.log('DB OK:', res.rows[0]);
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('DB ERROR:', err?.message || err);
  process.exit(1);
}
