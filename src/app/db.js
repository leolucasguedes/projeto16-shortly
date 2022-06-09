import pg from 'pg';

const { Pool } = pg;

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = 5432;
const database = process.env.DATABASE_NAME;

const db = new Pool({
  user,
  password,
  host,
  port,
  database,
  ssl: {
    rejectUnauthorized: false,
  }
});

export default db;