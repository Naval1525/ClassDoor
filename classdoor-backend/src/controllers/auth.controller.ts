import { prisma } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { handleControllerError } from "../middleware/error.middleware.js";
import { Request, Response, RequestHandler } from "express";

export const createAnonymousSession = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const anonId = id;
    const user = await prisma.anonymousUser.create({
      data: { id: anonId },
    });
    const token = jwt.sign(
      { anonId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    res.cookie("anonToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ anonId: user.id, token });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const refreshAnonymousSession: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.anonToken;
    if (!token) {
      res.status(401).json({ message: "No token found, please log in." });
      return;
    }

    try {
      // Use promisified jwt.verify instead of callback pattern
      const decoded = await new Promise<any>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as string, (err:any, decoded:any) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });

      const { anonId } = decoded as { anonId: string };

      const user = await prisma.anonymousUser.findUnique({
        where: { id: anonId },
      });

      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      const newToken = jwt.sign(
        { anonId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "30d" }
      );

      res.cookie("anonToken", newToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ anonId: user.id, token: newToken });
    } catch (jwtError) {
      res.status(403).json({ message: "Invalid or expired token." });
    }
  } catch (error) {
    handleControllerError(error, res);
  }
};