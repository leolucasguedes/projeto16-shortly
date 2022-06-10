import db from "./../config/database.js";

import { userRepository } from "../repositories/userRepositories.js";

export async function getUsers(req, res) {
  const userId = parseInt(req.params.id);
  const userToken = res.locals.userId;
  if (userId !== userToken) return res.sendStatus(401);

  try {
    const { rows: user } = await userRepository.getUser(userId)

    const { rows: shortUrls } = await userRepository.getShortUrl(userId)

    const result = format(user[0], shortUrls);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await userRepository.getRanking()
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
