import { z } from "zod";

export const createFormInputType = z.object({
  title: z.string().min(3).describe("Form title"),
  description: z.string().min(3).describe("Form description"),
  slug: z
    .string()
    .describe("Slug for form")
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers and hyphens"),
  theme: z
    .enum(["apple-glass", "money-heist", "hacker-mode", "anime-neon", "startup-minimal"])
    .optional(),
  collectEmail: z.boolean().optional(),
});

export const createFormOutputType = z.object({
  message: z.string(),
  id: z.string(),
  slug: z.string().nullable(),
});

export const deleteFormInputType = z.object({
  id: z.uuid().describe("Form id"),
});

export const deleteFormOutputType = z.object({
  message: z.string(),
  id: z.string(),
});

export const getFormsInputType = z.undefined();

export const formOutputType = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  slug: z.string().nullable(),
  theme: z.string().nullable(),
  status: z.string(),
  visibility: z.string(),
  collectEmail: z.boolean().nullable(),
  allowMultipleResponses: z.boolean().nullable(),
  creatorId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type Form = z.infer<typeof formOutputType>;

export const getFormsOutputType = z.array(formOutputType);
