import { nanoid } from "nanoid";

import { urlRepository } from "../repositories/urlRepositories.js";

export async function postUrl(req, res) {
  const { url } = req.body;
  const { id } = res.locals.user;
  const NUM_OF_CHARS = 8;
  const shortURL = nanoid(NUM_OF_CHARS);

  try {
    await urlRepository.createShortUrl(url, shortURL, id)
    res.status(201).send({ shortURL });
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;
  try {
    const result = await urlRepository.getUrl(id);
    if(result.rowCount === 0) {
      return res.sendStatus(404);
    }
  
    const [url] = result.rows;
  
    delete url.visitCount;
    delete url.userId;
    res.status(200).send(url);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const result = await urlRepository.getByShortURL(shortUrl)
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    const [url] = result.rows;
    await urlRepository.incrementURLVisitCount(url.id);
    res.redirect(url.url);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;
  try {
    const result = await urlRepository.getUrl(urlId);
    if (result.rowCount === 0) return res.sendStatus(404);

    const [url] = result.rows;
    if(url.userId !== user.id) {
      return res.sendStatus(401);
    }
    await urlRepository.updateDelete(id);
    await urlRepository.deleteURL(id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e);
  }
};