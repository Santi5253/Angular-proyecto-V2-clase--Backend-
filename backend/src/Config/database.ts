import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const requiredVariables = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME'
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Falta configurar la variable ${variable}`);
  }
}

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'caja_user',
  password: process.env.DB_PASSWORD || 'caja123',
  database: process.env.DB_NAME || 'caja_clase_v2',
});
