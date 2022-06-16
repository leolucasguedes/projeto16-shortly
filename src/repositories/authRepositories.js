import db from "./../app/db.js";

async function verifyUser(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function findUser(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function createUser(name, email, passwordHash) {
  return db.query(
    `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,
    [name, email, passwordHash]);
}

async function createSession(token, user) {
  return db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', 
  [token, user[0].id,
  ]);
}

async function validateToken(token) {
  return db.query('SELECT * FROM sessions WHERE token = $1', [token]);
}

async function getUserById(id) {
  return db.query(`SELECT FROM users WHERE id=$1`, [id]);
}

export const authRepository = {
  verifyUser,
  findUser,
  createUser,
  createSession,
  validateToken,
  getUserById
};
