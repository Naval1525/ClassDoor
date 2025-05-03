import { Express } from 'express-serve-static-core';

// Extend Express Request type to include user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      anonId: string;
    };
  }
}