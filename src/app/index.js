import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRouter from "./../routers/authRouters.js";

const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    chalk.green.bold(`Server is running on port http://localhost:${PORT}`)
  );
});