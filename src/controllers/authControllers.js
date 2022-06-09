import db from "./../app/db.js";
import joi from "joi";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const user = req.body;
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(
    user.password,
    parseInt(process.env.HASH)
  );
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(6).max(12).required(),
    confirmation: joi.ref("password"),
  });

  const { error } = schema.validate(user, { abortEarly: false });

  if (error) {
    res.status(422).send("Erro ao cadastrar");
    return;
  }

  try {
    const verifyUser = await db.query(`SELECT FROM users WHERE email=$1`, [
      user.email
    ]);
    //console.log(checkUser)
    if (verifyUser.rows.length !== 0) {
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

export async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const user = await db.query(`SELECT FROM users WHERE email=$1`, [
            email
          ]);
        const userSessionExists = await db.query(`SELECT FROM sessions WHERE userId=$1`, [
            user.id
          ]);
        if(user && bcrypt.compareSync(password, user.password) && userSessionExists){
            const token = uuid(); 
            await db.query(`UPDATE sessions SET token=${token} WHERE userId=$1`, [
                user.id
              ]);
            res.status(200).send({token});
        }
        else if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid();            
            await database.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, user.rows[0].id]);
            return res.status(200).send({token});            
        }else{
            res.status(401).send("Erro ao logar");
        }
    }catch(e){
        console.error(e);
        res.status(500).send("Erro de conexão com servidor")
    }
}
