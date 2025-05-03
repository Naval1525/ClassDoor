import { z } from 'zod';


// Parameter validation schema
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid professor ID format"),
});


// Anonymous user schema
export const anonymousUserSchema = z.object({
  deviceHash: z.string().optional()
});

export const professorSchema = z.object({
  name: z.string().min(2).max(100),
  department: z.string().min(2).max(100),
  bio: z.string().optional(),
  imageUrl: z.string().url().optional(),
  collegeId: z.string().uuid()
});

