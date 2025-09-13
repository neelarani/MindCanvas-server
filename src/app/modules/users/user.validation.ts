import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().nullable().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  phone: z.string(),
  picture: z.string().nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().optional()
  ),
  updatedAt: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().optional()
  ),
  post: z
    .object({
      create: z
        .array(
          z.object({
            title: z.string(),
            content: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
});
