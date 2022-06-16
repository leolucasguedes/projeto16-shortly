import db from "./../app/db.js";

async function getUrl(urlId) {
  return db.query('SELECT * FROM urls WHERE id = $1 AND "deletedAt" IS NULL', [
    urlId,
  ]);
}

async function createShortUrl(url, shortURL, userId) {
  return db.query('INSERT INTO urls ("url", "shortUrl", "userId") VALUES ($1, $2, $3)',
    [url, shortURL, userId]
  );
}

async function getByShortURL(shortUrl) {
  return db.query(`
    SELECT * 
    FROM urls 
    WHERE "shortUrl" = $1`, 
    [shortUrl])
}

async function incrementURLVisitCount(urlId) {
  return db.query(`
    UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE id = $1`, 
    [urlId]);
}

async function deleteURL(id) {
  return db.query('DELETE FROM urls WHERE id=$1', [id])
}

async function updateDelete(id) {
  return db.query('UPDATE urls SET "deletedAt" = NOW() WHERE id = $1', [id]);
}


export const urlRepository = {
  getUrl,
  getByShortURL,
  incrementURLVisitCount,
  createShortUrl,
  deleteURL,
  updateDelete
};
