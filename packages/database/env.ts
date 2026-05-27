import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().describe("DB URL"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    console.error("❌ Invalid environment variables (database):", safeParseResult.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables (database): " + JSON.stringify(safeParseResult.error.flatten().fieldErrors));
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);
