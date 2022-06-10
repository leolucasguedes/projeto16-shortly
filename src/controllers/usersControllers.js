import db from "./../config/database.js";

export async function getUsers(req, res) {
  const userId = parseInt(req.params.id);
  const userToken = res.locals.userId;
  if (userId !== userToken) return res.sendStatus(401);

  try {
    const { rows: user } = await db.query(
      `
      SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount" 
      FROM users LEFT JOIN urls ON urls."userId" = users.id
      WHERE users.id = $1
      GROUP BY users.id;
      `,
      [userId]
    );

    const { rows: shortUrls } = await db.query(
      `
      SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls
      JOIN users ON users.id = urls."userId"
      WHERE users.id = $1;
      `,
      [userId]
    );

    const result = format(user[0], shortUrls);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await db.query(`
      SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitCount") as "visitCount" FROM users 
      LEFT JOIN urls ON users.id = urls."userId"
      WHERE urls."deletedAt" IS NULL
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;
      `);
    res.status(200).send(ranking);
  } catch (e) {
    res.status(500).send(e);
  }
}

function format(obj, arr) {
  return {
    ...obj,
    shortenedUrls: arr,
  };
}
