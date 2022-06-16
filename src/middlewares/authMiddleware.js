import { authRepository } from "../repositories/authRepositories";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  try {
    const { rows:sessions } = await authRepository.validateToken(token)
    const [session] = sessions;
    if (!session) return res.sendStatus(401);

    const { rows: users } = await authRepository.findUser(session.userId)
    const [user] = users;
    if (!user) return res.sendStatus(404);

    res.locals.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Error checking token");
  }
};