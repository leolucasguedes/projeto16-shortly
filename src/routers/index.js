import { Router } from "express";
import authRouter from "./../routers/authRouters.js";
import urlsRouter from "../routers/urlsRouters.js";
import userRouter from "./../routers/usersRouters.js";

const router = Router();

app.use(authRouter);
app.use(urlsRouter);
app.use(userRouter);

export default router;