import { createAnonymousSessionService,refreshAnonymousSessionService } from "../services/auth.service.js";
import { handleControllerError } from "../middleware/error.middleware.js";
import { Request, Response, RequestHandler } from "express";

export const createAnonymousSession = async (req: Request, res: Response) => {
  try {
    const { anonId, token } = await createAnonymousSessionService();

    res.cookie("anonToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ anonId, token });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const refreshAnonymousSession: RequestHandler = async (req, res) => {
  try {
    const result = await refreshAnonymousSessionService(req.cookies.anonToken);
    
    if (!result) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const { anonId, token } = result;

    res.cookie("anonToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ anonId, token });
  } catch (error) {
    handleControllerError(error, res);
  }
};