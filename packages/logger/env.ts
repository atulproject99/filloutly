import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "prod", "production"]).default("development"),
  LOGGER_LEVEL: z.enum(["error", "debug", "info"]).optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    console.error("❌ Invalid environment variables (logger):", safeParseResult.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables (logger): " + JSON.stringify(safeParseResult.error.flatten().fieldErrors));
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);
