import { Router } from "express";

import { getUsers, getRanking } from "./../controllers/usersControllers.js";
import { verifyUser } from "../middlewares/userMiddleware.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", validateToken, verifyUser, getUsers);
userRouter.get("/ranking", getRanking);

export default userRouter;
