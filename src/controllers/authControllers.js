import db from "./../app/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { userRepository } from "../repositories/authRepositories.js";

import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";

export async function signUp(req, res) {
  const user = req.body;
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, parseInt(process.env.HASH));

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(422).send("Erro ao cadastrar");
    return;
  }

  try {
    const checkUser = await userRepository.verifyUser(email)

    if (checkUser.rows.length !== 0) {
      return res.status(409).send("Usuário com esse email já existe");
    }

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,
      [name, email, passwordHash]
    );
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}

export async function signIn(req, res) {
  const user = req.body;
  const { email, password } = req.body;

  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(422).send("Erro ao cadastrar");
    return;
  }
  try {
    let { rows: user } = await userRepository.findUser(email);
    if (!user[0] || !bcrypt.compareSync(password, user[0].password)) {
      return res.sendStatus(401);
    }
    const token = uuid();
    await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', [
      token,
      user[0].id,
    ]);
    res.status(200).send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}
