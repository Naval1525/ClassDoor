// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

// Helper for consistent error handling in controllers
export const handleControllerError = (error: any, res: Response): void => {
  console.error('Controller error:', error);

  // Handle specific error types
  if (error.code === 'P2002') {
    res.status(409).json({
      error: 'A record with this data already exists',
      fields: error.meta?.target
    });
    return;
  }

  if (error.code === 'P2025') {
    res.status(404).json({
      error: 'Record not found'
    });
    return;
  }

  // Default error response
  res.status(500).json({
    error: 'Something went wrong'
  });
};
