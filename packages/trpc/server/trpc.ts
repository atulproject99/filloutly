import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { TRPCError } from "@trpc/server";
import { createContext } from "./context";
import { userService } from "./services";
import { getAuthenticationCookkie, getRefreshTokenCookie, setAuthenticationCookie, setRefreshTokenCookie } from "./utils/cookie";

export const tRPCContext = initTRPC.meta<OpenApiMeta>().context<typeof createContext>().create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

export const authProcedure = tRPCContext.procedure.use(async ({ ctx, next }) => {
  const token = getAuthenticationCookkie(ctx);

  if (!token) {
    // No access token — try refresh token
    const refreshToken = getRefreshTokenCookie(ctx);
    if (!refreshToken) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }
    try {
      const { accessToken, refreshToken: newRefreshToken, id } =
        await userService.refreshUserToken(refreshToken);
      setAuthenticationCookie(ctx, accessToken);
      setRefreshTokenCookie(ctx, newRefreshToken);
      return next({ ctx: { ...ctx, user: { id } } });
    } catch {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Session expired, please sign in again" });
    }
  }

  try {
    const { id } = await userService.verifyAndDecodeUserToken(token);
    return next({ ctx: { ...ctx, user: { id } } });
  } catch (error: any) {
    // Access token invalid/expired — attempt silent refresh
    const refreshToken = getRefreshTokenCookie(ctx);
    if (!refreshToken) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Session expired, please sign in again" });
    }
    try {
      const { accessToken, refreshToken: newRefreshToken, id } =
        await userService.refreshUserToken(refreshToken);
      setAuthenticationCookie(ctx, accessToken);
      setRefreshTokenCookie(ctx, newRefreshToken);
      return next({ ctx: { ...ctx, user: { id } } });
    } catch {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Session expired, please sign in again" });
    }
  }
});


export enum UserRole {
  CREATOR = "creator",
  ADMIN = "admin",
}
export const adminProcedure = (userRole: UserRole) => {
  return tRPCContext.procedure.use(async ({ ctx, next }) => {
    const token = getAuthenticationCookkie(ctx);

    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    try {
      const { id, role } = await userService.verifyAndDecodeUserToken(token);
      if (role !== userRole)
        throw new TRPCError({
          message: "Your haven't permission for access",
          code: "FORBIDDEN",
        });
      return next({
        ctx: {
          ...ctx,
          user: { id },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }
  });
};
