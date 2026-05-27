import { z } from "zod";

export const createUserWithEmailPasswordInput = z.object({
  fullName: z.string().describe("Full Name of user"),
  email: z.email().describe("Email of user"),
  password: z.string().min(8).max(20).describe("Password of user"),
});

export const signUserWithEmailPasswordInput = z.object({
  email: z.email().describe("Email of user"),
  password: z.string().min(8).max(20).describe("Password of user"),
});

export const verifyEmailInput = z.object({
  email: z.email().describe("Email of user"),
  otp: z.string().describe("Otp code for verification"),
});

export const generateTokenInput = z.object({
  id: z.string().describe("Id of user"),
  email: z.email().describe("Email of user"),
  role: z.string().describe("role of user"),
});

export const resendEmailInput = z.object({
  email: z.email().describe("Email of user"),
});

export const forgotPasswordInput = z.object({
  email: z.email().describe("Email of user"),
});

export const resetPasswordInput = z.object({
  email: z.email().describe("Email of user"),
  otp: z.string().describe("Otp code for password reset"),
  newPassword: z.string().min(8).max(20).describe("New password of user"),
});
export type CreateUserWithEmailPasswordInput = z.infer<typeof createUserWithEmailPasswordInput>;

export type SignUserWithEmailPasswordInput = z.infer<typeof signUserWithEmailPasswordInput>;

export type VerifyEmailInput = z.infer<typeof verifyEmailInput>;

export type GenerateTokePayloadType = z.infer<typeof generateTokenInput>;

export type ResendEmailInput = z.infer<typeof resendEmailInput>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInput>;

export type ResetPasswordInput = z.infer<typeof resetPasswordInput>;
