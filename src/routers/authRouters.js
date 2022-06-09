import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/", signIn);

export default authRouter;
