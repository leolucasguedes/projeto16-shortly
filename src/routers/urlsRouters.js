import { Router } from "express";

import { postUrl, getUrl, redirectUrl } from "./../controllers/urlsControlllers.js";
import { getUrlByShortUrl } from "./../middlewares/urlMiddleware.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get('/urls/open/:shortUrl', getUrlByShortUrl, redirectUrl);

export default urlsRouter;