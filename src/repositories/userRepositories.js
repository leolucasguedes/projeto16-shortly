import db from "./../app/db.js";

async function getUser(userId) {
  return db.query(
    `
        SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount" 
        FROM users LEFT JOIN urls ON urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id;
        `,
    [userId]
  );
}

async function getShortUrl(userId) {
  return db.query(
    `
        SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls
        JOIN users ON users.id = urls."userId"
        WHERE users.id = $1;
        `,
    [userId]
  );
}

async function getRanking() {
  return db.query(`
    SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitCount") as "visitCount" FROM users 
    LEFT JOIN urls ON users.id = urls."userId"
    WHERE urls."deletedAt" IS NULL
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;
    `);
}

async function verifyUser(id) {
  return db.query("SELECT * FROM users WHERE id = $1", [userId]);
}

export const userRepository = {
  getUser,
  getShortUrl,
  getRanking,
  verifyUser
};
