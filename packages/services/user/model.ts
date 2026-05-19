import { z } from "zod";

export const authenticationProviderEnum = z.enum(["google"]);

export const getAuthenticationMethodOutputSchema = z.object({
  provider: authenticationProviderEnum,
  name: z.string(),
  iconUrl: z.string().url(),
});

export type AuthenticationMethod = z.infer<
  typeof getAuthenticationMethodOutputSchema
>;
