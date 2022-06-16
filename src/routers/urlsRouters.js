import { Router } from "express";

import { postUrl, getUrl, redirectUrl, deleteUrl } from "../controllers/urlsControllers.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), validateToken, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get('/urls/open/:shortUrl', redirectUrl);
urlsRouter.delete('/urls/:id', validateToken, deleteUrl);

export default urlsRouter;