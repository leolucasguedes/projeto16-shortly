import { userRepository } from "../repositories/userRepositories.js";

export async function verifyUser(req, res, next) {
  const userId = parseInt(req.params.id);
  try {
    const { rows: user } = await userRepository.verifyUser(userId);
    if (!user[0]) return res.sendStatus(404);
    next();
  } catch (e) {
    res.status(500).send(e);
  }
}
