import db from "./../app/db.js";

async function verifyUser(email) {
	return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function findUser(email) {
	return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function findUserSession(user) {
	return db.query(`SELECT * FROM sessions WHERE userId=$1`, [user.rows[0].id]);
}

export const userRepository = {
	verifyUser,
    findUser,
    findUserSession
}