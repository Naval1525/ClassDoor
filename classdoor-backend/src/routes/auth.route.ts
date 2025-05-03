import express  from "express";
import { createAnonymousSession,refreshAnonymousSession } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/create", createAnonymousSession);
authRouter.get("/refresh",refreshAnonymousSession);

export default authRouter;