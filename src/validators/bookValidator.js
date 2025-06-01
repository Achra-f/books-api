import { z } from 'zod';

// POST new Book Validation Rules
export const bookCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(150, 'Title must be 150 characters or less'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author name must be 100 characters or less'),
  year: z.number().int().gte(0, 'Year must be a positive integer'),
  genre: z.string().optional(),
  coverImageUrl: z.string().url('Must be a valid URL').optional(),
  readStatus: z.enum(['reading', 'finished', 'want to read']).optional(),
  addedBy: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID')
    .optional(),
});

// PATCH existing Book (same as POST but optional fields)
export const bookUpdateSchema = bookCreateSchema.partial();
