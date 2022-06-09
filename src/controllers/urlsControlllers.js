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
  } catch (error) {
    res.status(500).send(error);
  }
}
