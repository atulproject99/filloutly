import { z } from "zod";
export enum FormTheme {
  APPLE_GLASS = "apple-glass",
  MONEY_HEIST = "money-heist",
  HACKER_MODE = "hacker-mode",
  ANIME_NEON = "anime-neon",
  STARTUP_MINIMAL = "startup-minimal",
}

export enum FormStatusEnum {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
export enum FormVisiblityEnum {
  PUBLIC = "public",
  UNLISTED = "unlisted",
}

export const createFormInput = z.object({
  title: z.string().min(3).describe("Form title"),
  description: z.string().min(3).describe("Form description"),
  slug: z
    .string()
    .describe("Slug for form")
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers and hyphens"),
  theme: z.enum(FormTheme).default(FormTheme.APPLE_GLASS),
  collectEmail: z
    .boolean()
    .describe("Just confirm from user need to take email for fill this form or not")
    .default(false),
  creatorId: z.uuid().describe("Creator user id "),
});

export const updateFormInput = z.object({
  formId: z.uuid().describe("Form id "),
  title: z.string().min(3).describe("Form title").optional(),
  description: z.string().min(3).describe("Form description").optional(),
  theme: z.enum(FormTheme).optional(),
  slug: z
    .string()
    .describe("Slug for form")
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers and hyphens")
    .optional(),
  collectEmail: z
    .boolean()
    .describe("Just confirm from user need to take email for fill this form or not")
    .optional(),
  allowMultipleResponses: z
    .boolean()
    .describe("Just confirm from user multiple response allowed or not")
    .optional(),
  visibility: z
    .enum(FormVisiblityEnum)
    .describe("Visiblity of form can be publci or unlisted")
    .optional(),
  status: z.enum(FormStatusEnum).describe("Status of form draft,published or archived").optional(),
});

export const deleteFormInput = z.object({
  id: z.uuid().describe("Form id"),
});
export const getFormByIdInput = z.object({
  id: z.uuid().describe("Form id"),
});

export const getAllFormsInput = z.object({
  id: z.uuid().describe("Creator id").optional(),
});

export type CreateFormInput = z.infer<typeof createFormInput>;

export type UpdateFormInput = z.infer<typeof updateFormInput>;

export type DeleteFormInput = z.infer<typeof deleteFormInput>;

export type GetFormByIdInput = z.infer<typeof getFormByIdInput>;

export type GetAllFormsInput = z.infer<typeof getAllFormsInput>;

export const createFieldInput = z.object({
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
  options: z.any().optional(), // Can refine this later if needed
  validations: z.any().optional(),
});

export const updateFieldInput = z.object({
  fieldId: z.string().uuid(),
  label: z.string().min(1).optional(),
  placeholder: z.string().optional(),
  helperText: z.string().optional(),
  required: z.boolean().optional(),
  options: z.any().optional(),
  validations: z.any().optional(),
});

export const deleteFieldInput = z.object({
  fieldId: z.string().uuid(),
});

export const reorderFieldsInput = z.object({
  formId: z.string().uuid(),
  fieldIds: z.array(z.string().uuid()).describe("Array of field IDs in the new order"),
});

export type CreateFieldInput = z.infer<typeof createFieldInput>;
export type UpdateFieldInput = z.infer<typeof updateFieldInput>;
export type DeleteFieldInput = z.infer<typeof deleteFieldInput>;
export type ReorderFieldsInput = z.infer<typeof reorderFieldsInput>;
