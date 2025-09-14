import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters'),

  content: z.string().min(10, 'Content must be at least 10 characters long'),

  thumbnail: z.string().url('Thumbnail must be a valid URL'),

  isFeatured: z.boolean().optional().default(false),

  tags: z.array(z.string()).nonempty('At least one tag is required'),

  views: z.number().optional().default(0),

  authorId: z.number().int('Author ID must be an integer'),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters')
    .optional(),

  content: z
    .string()
    .min(10, 'Content must be at least 10 characters long')
    .optional(),

  thumbnail: z.string().url('Thumbnail must be a valid URL').optional(),

  isFeatured: z.boolean().optional(),

  tags: z.array(z.string()).nonempty('At least one tag is required').optional(),

  views: z.number().optional(),

  authorId: z.number().int('Author ID must be an integer').optional(),
});
