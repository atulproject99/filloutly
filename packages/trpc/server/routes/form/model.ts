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

export const updateFormInputType = z.object({
  formId: z.string().uuid(),
  title: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  theme: z.enum(["apple-glass", "money-heist", "hacker-mode", "anime-neon", "startup-minimal"]).optional(),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/).optional(),
  collectEmail: z.boolean().optional(),
  allowMultipleResponses: z.boolean().optional(),
  visibility: z.enum(["public", "unlisted"]).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const updateFormOutputType = z.object({
  message: z.string(),
  id: z.string(),
});

export const getFormsInputType = z.undefined();

export const getFormByIdInput = z.object({
  id: z.string().uuid().describe("Form id"),
});

export const formOutputType = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  slug: z.string().nullable(),
  theme: z.string().nullable(),
  status: z.enum(["draft", "published", "archived"]),
  visibility: z.enum(["public", "unlisted"]),
  collectEmail: z.boolean().nullable(),
  allowMultipleResponses: z.boolean().nullable(),
  creatorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  fields: z.array(z.any()).optional(), // Add fields array
});

export type Form = z.infer<typeof formOutputType>;

export const getFormsOutputType = z.array(formOutputType);

// --- FIELD SCHEMAS ---

export const addFieldInputType = z.object({
  formId: z.string().uuid(),
  type: z.enum([
    "short_text",
    "long_text",
    "email",
    "number",
    "single_select",
    "multi_select",
    "dropdown",
    "checkbox",
    "rating",
    "date",
  ]),
  label: z.string().min(1),
  placeholder: z.string().optional(),
  helperText: z.string().optional(),
  required: z.boolean().default(false),
  options: z.any().optional(),
  validations: z.any().optional(),
});

export const addFieldOutputType = z.object({
  message: z.string(),
  field: z.any(),
});

export const updateFieldInputType = z.object({
  fieldId: z.string().uuid(),
  label: z.string().min(1).optional(),
  placeholder: z.string().optional(),
  helperText: z.string().optional(),
  required: z.boolean().optional(),
  options: z.any().optional(),
  validations: z.any().optional(),
});

export const updateFieldOutputType = z.object({
  message: z.string(),
  field: z.any(),
});

export const deleteFieldInputType = z.object({
  fieldId: z.string().uuid(),
});

export const deleteFieldOutputType = z.object({
  message: z.string(),
  id: z.string(),
});

export const reorderFieldsInputType = z.object({
  formId: z.string().uuid(),
  fieldIds: z.array(z.string().uuid()),
});

export const reorderFieldsOutputType = z.object({
  message: z.string(),
});
