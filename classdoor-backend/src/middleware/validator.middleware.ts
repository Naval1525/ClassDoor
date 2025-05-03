import { Request, Response, NextFunction } from 'express';
import { ZodError, z, type ZodSchema } from 'zod';

/**
 * Creates validation middleware for request body using a Zod schema
 * @param {z.ZodType} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      // Replace request body with validated data
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors in a user-friendly way
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(500).json({ error: 'Validation error' });
      }
      // Don't call next() here - the response has already been sent
    }
  };
};

/**
 * Creates validation middleware for request params using a Zod schema
 * @param {z.ZodType} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.params);
      // Replace request params with validated data
      req.params = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Invalid parameters',
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(500).json({ error: 'Parameter validation error' });
      }
      // Don't call next() here - the response has already been sent
    }
  };
};