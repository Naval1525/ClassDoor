// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import prisma from '../config/db.js';

export const authenticateAnonymousUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Cookie or Authorization header
    const token =
      req.cookies?.anonToken ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : undefined);

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Verify JWT token
    try {
      const decoded = jwt.verify(
        token,
        env.JWT_SECRET
      ) as { anonId: string };

      // Check if user exists
      const user = await prisma.anonymousUser.findUnique({
        where: { id: decoded.anonId }
      });

      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      // Attach user to request
      req.user = { anonId: decoded.anonId };

      // Update last active timestamp
      await prisma.anonymousUser.update({
        where: { id: decoded.anonId },
        data: { lastActive: new Date() }
      });

      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
