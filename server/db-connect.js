import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.VITE_PGUSER,
    host: process.env.VITE_PGHOST,
    database: process.env.VITE_PGDATABASE,
    password: process.env.VITE_PGPASSWORD,
    port: process.env.VITE_PGPORT,
    ssl: {
        rejectUnauthorized: false
    }
});

