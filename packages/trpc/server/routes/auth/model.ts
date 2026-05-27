import { z } from "zod";

export const createUserWithEmailPasswordInputType = z.object({
  fullName: z.string().describe("Full name of user"),
  email: z.email().describe("Email of user"),
  password: z.string().describe("Password of user"),
});

export const createUserWithEmailPasswordOutputType = z.object({
  message: z.string().describe("Message from server "),
  email: z.email().describe("email of user"),
});

export const signUserWithEmailPasswordInputType = z.object({
  email: z.email().describe("Email of user"),
  password: z.string().describe("Password of user"),
});

export const signUserWithEmailPasswordOutputType = z.object({
  message: z.string().describe("Message from server "),
  isVerified: z.boolean().describe("Useed for check user is verified or not"),
  id: z.string().describe("Id of user"),
  token: z.string().describe("Access token of user"),
  email: z.email().describe("email of user"),
  role: z.enum(["creator", "admin"]).optional().describe("Role of user"),
});

export const verifyEmailInputType = z.object({
  email: z.email().describe("Email of user"),
  otp: z.string().describe("otp for verify user"),
});

export const verifyEmailOutputType = z.object({
  message: z.string().describe("Message from server "),
  id: z.string().describe("Id of user"),
  token: z.string().default("").describe("Access token of user"),
  refreshToken: z.string().default("").describe("Refresh token of user"),
  role: z.enum(["creator", "admin"]).optional().describe("Role of user"),
});

export const resendEmailInputType = z.object({
  email: z.email().describe("Email of user"),
});

export const resendEmailOutputType = z.object({
  message: z.string().describe("Message from server "),
  email: z.email().describe("email of user"),
});
export const getUserInfoInputType = z.undefined({});

export const getUserInfoOutputType = z.object({
  fullName: z.string().describe("Full name of user"),
  email: z.email().describe("email of user"),
  role: z.enum(["creator", "admin"]).describe("Role of user"),
  id: z.string().describe("Id of user"),
  profileImageUrl: z.string().optional().describe("Profile image url"),
});

// ── Refresh Token ────────────────────────────────────────────────────────────
export const refreshTokenInputType = z.undefined();

export const refreshTokenOutputType = z.object({
  message: z.string().describe("Message from server"),
  id: z.string().describe("Id of user"),
});

// ── Sign Out ─────────────────────────────────────────────────────────────────
export const signOutInputType = z.object({}).optional();

export const signOutOutputType = z.object({
  message: z.string().describe("Message from server"),
});

export const getAllUsersOutputType = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string(),
    role: z.string(),
    createdAt: z.date().nullable(),
  })
);

export const forgotPasswordInputType = z.object({
  email: z.email().describe("Email of user"),
});

export const forgotPasswordOutputType = z.object({
  message: z.string().describe("Message from server"),
  email: z.email().describe("email of user"),
});

export const resetPasswordInputType = z.object({
  email: z.email().describe("Email of user"),
  otp: z.string().describe("OTP code"),
  newPassword: z.string().min(8).describe("New password"),
});

export const resetPasswordOutputType = z.object({
  message: z.string().describe("Message from server"),
  email: z.email().describe("email of user"),
});
