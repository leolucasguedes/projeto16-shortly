import db from "../app/db.js";

export async function verifyUser(req, res, next) {
  const userId = parseInt(req.params.id);
  try {
    const { rows: user } = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (!user[0]) return res.sendStatus(404);
    next();
  } catch (e) {
    res.status(500).send(e);
  }
}
