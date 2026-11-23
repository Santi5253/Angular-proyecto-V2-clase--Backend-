import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const ssl = process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined;

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'caja_user',
      password: process.env.DB_PASSWORD || 'caja123',
      database: process.env.DB_NAME || 'caja_clase_v2',
    });
