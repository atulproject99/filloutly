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
});

export const verifyEmailInputType = z.object({
  email: z.email().describe("Email of user"),
  otp: z.string().describe("otp for verify user"),
});

export const verifyEmailOutputType = z.object({
  message: z.string().describe("Message from server "),
  id: z.string().describe("Id of user"),
  token: z.string().default("").describe("Access token of user"),
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
