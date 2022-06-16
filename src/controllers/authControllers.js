import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { authRepository } from "../repositories/authRepositories.js";

export async function signUp(req, res) {
  const user = req.body;
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, parseInt(process.env.HASH));

  try {
    const checkUser = await authRepository.verifyUser(email)

    if (checkUser.rows.length !== 0) {
      return res.status(409).send("Usuário com esse email já existe");
    }

    await authRepository.createUser(name, email, passwordHash)
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}

export async function signIn(req, res) {
  const user = req.body;
  const { email, password } = req.body;

  try {
    let { rows: user } = await authRepository.findUser(email);
    if (!user[0] || !bcrypt.compareSync(password, user[0].password)) {
      return res.sendStatus(401);
    }
    const token = uuid();

    await authRepository.createSession(token, user)
    res.status(200).send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}
