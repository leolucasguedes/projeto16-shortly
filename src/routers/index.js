import { Router } from "express";
import authRouter from "./../routers/authRouters.js";
import urlsRouter from "../routers/urlsRouters.js";
import userRouter from "./../routers/usersRouters.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(userRouter);

export default router;