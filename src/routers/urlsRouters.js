import { Router } from "express";

import { postUrl, getUrl, redirectUrl, deleteUrl } from "./../controllers/urlsControlllers.js";
import { getUrlByShortUrl } from "./../middlewares/urlMiddleware.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get('/urls/open/:shortUrl', getUrlByShortUrl, redirectUrl);
urlsRouter.delete('/urls/:id', validateToken, deleteUrl);

export default urlsRouter;