import { Router } from "express";

import { postUrl } from "../controllers/urlsControlllers.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, postUrl);

export default urlsRouter;