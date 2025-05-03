import { z } from 'zod';


// Parameter validation schema
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});


// Anonymous user schema
export const anonymousUserSchema = z.object({
  deviceHash: z.string().optional()
});

//professor schema
export const professorSchema = z.object({
  name: z.string().min(2).max(100),
  department: z.string().min(2).max(100),
  bio: z.string().optional(),
  imageUrl: z.string().url().optional(),
  collegeId: z.string().uuid()
});

// College schema
export const collegeSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  description: z.string().optional()
});

// Course schema
export const courseSchema = z.object({
  code: z.string().min(2).max(20),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  collegeId: z.string().uuid(),
  professorIds: z.array(z.string().uuid()).optional()
});

// Review schema
export const reviewSchema = z.object({
  content: z.string().min(10).max(2000),
  rating: z.number().min(1).max(5),
  professorId: z.string().uuid().optional(),
  courseId: z.string().uuid().optional(),
  collegeId: z.string().uuid().optional(),
  type: z.enum(['PROFESSOR', 'COURSE', 'CAMPUS']),
  tags: z.array(z.string().min(2).max(30)).max(5)
});

