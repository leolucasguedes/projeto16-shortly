import db from "./../app/db.js";

async function verifyUser(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function findUser(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

export const userRepository = {
  verifyUser,
  findUser,
};
