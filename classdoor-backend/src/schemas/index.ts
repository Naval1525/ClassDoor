import { z } from 'zod';

// Anonymous user schema
export const anonymousUserSchema = z.object({
  deviceHash: z.string().optional()
});
