import db from "./../app/db.js";


export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  try {
    const session = await db.query(`SELECT FROM sessions WHERE token=$1`, [
      token,
    ]);
    if (!session) return res.sendStatus(401);

    const user = await db.query(`SELECT FROM users WHERE id=$1`, [
      session.userId,
    ]);
    if (!user) return res.sendStatus(404);

    res.locals.user = user;

    next();
  } catch (e) {
    console.error("token ", e);
    res.send("Error checking token");
  }
}