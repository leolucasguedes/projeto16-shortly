import { Router } from "express";

import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import { signIn, signUp } from "../controllers/authControllers.js";


const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);

authRouter.post("/signin", validateSchema(signInSchema), signIn);

export default authRouter;
