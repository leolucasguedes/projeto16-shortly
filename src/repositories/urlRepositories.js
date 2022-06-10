import db from "./../app/db.js";

async function getUrl(urlId) {
  return db.query('SELECT * FROM urls WHERE id = $1 AND "deletedAt" IS NULL', [
    urlId,
  ]);
}

export const userRepository = {
  getUrl,
};
