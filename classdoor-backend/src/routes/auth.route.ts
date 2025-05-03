import express  from "express";
import { createAnonymousSession } from "@/controllers/auth.controller.js";

const anonymousUserRouter = express.Router();

anonymousUserRouter.post("/create", createAnonymousSession);
anonymousUserRouter.get("/verify",

export default anonymousUserRouter;