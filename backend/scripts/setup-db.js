// Aplica schema.sql y seed.sql solo si la BD está vacía (usa DATABASE_URL).
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function main() {
  if (!process.env.DATABASE_URL) { console.log('Sin DATABASE_URL: se omite setup-db.'); return; }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const r = await pool.query("SELECT to_regclass('public.usuarios') AS t");
  if (r.rows[0].t) { console.log('Esquema ya existe, no se hace nada.'); await pool.end(); return; }
  for (const f of ['schema.sql', 'seed.sql']) {
    console.log(`Ejecutando ${f}...`);
    await pool.query(fs.readFileSync(path.join(__dirname, '..', 'sql', f), 'utf8'));
  }
  await pool.end();
  console.log('BD inicializada.');
}
main().catch((e) => { console.error(e); process.exit(1); });
