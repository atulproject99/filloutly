import { z } from "zod";

export const getPlatformStatsOutputType = z.object({
  totalUsers: z.number(),
  totalForms: z.number(),
  totalResponses: z.number(),
});

export const getUsersOutputType = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string(),
    role: z.string(),
    createdAt: z.date().nullable(),
  })
);

export const getGlobalFormsOutputType = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    responses: z.number(),
    creatorEmail: z.string(),
    createdAt: z.date().nullable(),
  })
);
