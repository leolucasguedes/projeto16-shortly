import pg from 'pg';

const { Pool } = pg;

const user = 'postgres';
const password = process.env.PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'projeto16-shortly';

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