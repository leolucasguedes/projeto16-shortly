import db from "./../app/db.js";

export const getUrlByShortUrl = async (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  try {
    const result = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [
      shortUrl,
    ]);
    if (result.rowCount === 0) return res.sendStatus(404);
    const validUrl = result.rows[0];
    res.locals.validUrl = validUrl;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
