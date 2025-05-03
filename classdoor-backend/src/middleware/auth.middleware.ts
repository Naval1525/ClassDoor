// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import prisma from '../config/db.js';

// Define interface for the decoded token
interface DecodedToken {
  anonId: string;
}

// Create a custom interface that extends Request
interface AuthenticatedRequest extends Request {
  user?: {
    anonId: string;
  };
}

export const authenticateAnonymousUser = async (
  req: AuthenticatedRequest,
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
      ) as DecodedToken;

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