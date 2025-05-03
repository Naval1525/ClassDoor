// src/config/env.ts
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

// Validate environment variables with Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('8000'),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('30d'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  API_PREFIX: z.string().default('/api'),
  RATE_LIMIT_WINDOW: z.string().default('60000'),
  RATE_LIMIT_MAX: z.string().default('30'),
});

// Parse and export environment variables
export const env = envSchema.parse(process.env);