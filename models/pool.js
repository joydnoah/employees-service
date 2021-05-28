//import { Pool } from 'pg';
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

const connectionString = process.env.POSTGRESS_DB
export const pool = new Pool({ connectionString });
