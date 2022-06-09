import db from "./../app/db.js";
import joi from "joi";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;

  const schema = joi.object({
    url: joi.string().uri().required(),
  });

  const { error } = schema.validate(url, { abortEarly: false });

  if (error) {
    res.status(422).send("Erro ao cadastrar");
    return;
  }

  try {
    const shortUrl = nanoid();
    await db.query(
      'INSERT INTO urls ("url", "shortUrl", "userId") VALUES ($1, $2, $3)',
      [url, shortUrl, userId]
    );
    res.status(201).send({ shortUrl });
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getUrl(req, res) {
  const urlId = parseInt(req.params.id);
  try {
    const result = await db.query(
      'SELECT * FROM urls WHERE id = $1 AND "deletedAt" IS NULL',
      [urlId]
    );
    const validUrl = result.rows[0];
    if (!validUrl) return res.sendStatus(404);
    const { id, shortUrl, url } = validUrl;
    res.status(200).send({ id, shortUrl, url });
  } catch (e) {
    res.status(500).send(error);
  }
}

export async function redirectUrl(req, res) {
  const { id, url, visitCount } = res.locals.validUrl;
  try {
    await db.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [
      visitCount + 1,
      id,
    ]);
    res.redirect(url);
  } catch (e) {
    res.status(500).send(error);
  }
}

export async function deleteUrl(req, res) {
  const urlId = parseInt(req.params.id);
  const { userId } = res.locals;
  try {
    const result = await db.query(
      'SELECT * FROM urls WHERE id = $1 AND "deletedAt" IS NULL',
      [urlId]
    );
    if (result.rowCount === 0) return res.sendStatus(404);
    const validUrl = result.rows[0];
    if (validUrl.userId !== userId) return res.sendStatus(401);
    await db.query('UPDATE urls SET "deletedAt" = NOW() WHERE id = $1', [
      urlId,
    ]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
};