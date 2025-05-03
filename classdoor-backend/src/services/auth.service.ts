import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createAnonymousUser } from "../models/auth.model.js";
import { findAnonymousUserById } from "../models/auth.model.js";

export const createAnonymousSessionService = async () => {
  const id = uuidv4();
  const user = await createAnonymousUser(id);

  const token = jwt.sign(
    { anonId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );

  return { anonId: user.id, token };
};


export const refreshAnonymousSessionService = async (token?: string) => {
    if (!token) {
      return { success: false, status: 401, message: "No token found, please log in." };
    }
  
    try {
      const decoded = await new Promise<any>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });
  
      const { anonId } = decoded as { anonId: string };
  
      const user = await findAnonymousUserById(anonId);
      if (!user) {
        return { success: false, status: 404, message: "User not found." };
      }
  
      const newToken = jwt.sign(
        { anonId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "30d" }
      );
  
      return { success: true, anonId: user.id, token: newToken };
    } catch (err) {
      return { success: false, status: 403, message: "Invalid or expired token." };
    }
  };