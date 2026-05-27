import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(["development", "prod", "production"]).default("development"),
  BASE_URL: z.string().default("https://api.filloutly.in"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    console.error("❌ Invalid environment variables (api):", safeParseResult.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables (api): " + JSON.stringify(safeParseResult.error.flatten().fieldErrors));
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);
