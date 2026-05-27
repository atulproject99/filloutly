import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  RESEND_API_KEY: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string().default("7d"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    console.error("❌ Invalid environment variables:", safeParseResult.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables: " + JSON.stringify(safeParseResult.error.flatten().fieldErrors));
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);
