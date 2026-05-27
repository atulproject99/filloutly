import { userService } from "../../services";
import { authProcedure, publicProcedure, router } from "../../trpc";
import {
  deleteAuthenticationCookie,
  deleteRefreshTokenCookie,
  setAuthenticationCookie,
  setRefreshTokenCookie,
} from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailPasswordInputType,
  createUserWithEmailPasswordOutputType,
  getAllUsersOutputType,
  getUserInfoInputType,
  getUserInfoOutputType,
  refreshTokenInputType,
  refreshTokenOutputType,
  resendEmailInputType,
  resendEmailOutputType,
  signOutInputType,
  signOutOutputType,
  signUserWithEmailPasswordInputType,
  signUserWithEmailPasswordOutputType,
  verifyEmailInputType,
  verifyEmailOutputType,
} from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailPasswordInputType)
    .output(createUserWithEmailPasswordOutputType)
    .mutation(async ({ input }) => {
      const { message, email } = await userService.createUserWithEmailPassword(input);
      return { message, email };
    }),

  signUserWithEmailPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signUserWithEmailPassword"),
        tags: TAGS,
      },
    })
    .input(signUserWithEmailPasswordInputType)
    .output(signUserWithEmailPasswordOutputType)
    .mutation(async ({ input, ctx }) => {
      const { message, isVerified, token, refreshToken, email, id, role } =
        await userService.signUserWithEmailPassword(input);
      if (token) {
        setAuthenticationCookie(ctx, token);
      }
      if (refreshToken) {
        setRefreshTokenCookie(ctx, refreshToken);
      }
      return { message, isVerified, token, email, id, role };
    }),

  verifyEmail: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/verifyEmail"),
        tags: TAGS,
      },
    })
    .input(verifyEmailInputType)
    .output(verifyEmailOutputType)
    .mutation(async ({ input, ctx }) => {
      const { message, token, refreshToken, id } = await userService.verifyEmail(input);
      setAuthenticationCookie(ctx, token);
      setRefreshTokenCookie(ctx, refreshToken);
      return { message, token, id };
    }),

  resendOtpEmail: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/resendEmail"),
        tags: TAGS,
      },
    })
    .input(resendEmailInputType)
    .output(resendEmailOutputType)
    .mutation(async ({ input }) => {
      const { message, email } = await userService.resendEmail(input);
      return { message, email };
    }),

  // ── Refresh Token ───────────────────────────────────────────────────────────
  refreshToken: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/refreshToken"),
        tags: TAGS,
      },
    })
    .input(refreshTokenInputType)
    .output(refreshTokenOutputType)
    .mutation(async ({ ctx }) => {
      const storedRefreshToken = ctx.getCookie("refresh-token");
      if (!storedRefreshToken) {
        const { TRPCError } = await import("@trpc/server");
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No refresh token" });
      }
      const { accessToken, refreshToken, id } =
        await userService.refreshUserToken(storedRefreshToken);
      // Rotate both cookies
      setAuthenticationCookie(ctx, accessToken);
      setRefreshTokenCookie(ctx, refreshToken);
      return { message: "Token refreshed successfully", id };
    }),

  // ── Sign Out ────────────────────────────────────────────────────────────────
  signOut: authProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signOut"),
        tags: TAGS,
      },
    })
    .input(signOutInputType)
    .output(signOutOutputType)
    .mutation(async ({ ctx }) => {
      await userService.revokeRefreshToken(ctx.user.id);
      deleteAuthenticationCookie(ctx);
      deleteRefreshTokenCookie(ctx);
      return { message: "Signed out successfully" };
    }),

  logout: authProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/logout"),
        tags: TAGS,
      },
    })
    .input(signOutInputType)
    .output(signOutOutputType)
    .mutation(async ({ ctx }) => {
      await userService.revokeRefreshToken(ctx.user.id);
      deleteAuthenticationCookie(ctx);
      deleteRefreshTokenCookie(ctx);
      return { message: "Logged out successfully" };
    }),

  getUserInfo: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getUserInfo"),
        tags: TAGS,
      },
    })
    .input(getUserInfoInputType)
    .output(getUserInfoOutputType)
    .query(async ({ input, ctx }) => {
      const { id, email, fullName, role, profileImageUrl } = await userService.userInfoUsingId(
        ctx.user.id,
      );
      return { id, email, fullName, role, profileImageUrl: profileImageUrl || "" };
    }),

  getAllUsers: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/all"),
        tags: TAGS,
      },
    })
    .output(getAllUsersOutputType)
    .query(async () => {
      const { db, desc, ne } = await import("@repo/database");
      const { usersTable } = await import("@repo/database/models/user");

      const users = await db
        .select()
        .from(usersTable)
        .where(ne(usersTable.role, "admin"))
        .orderBy(desc(usersTable.createdAt));

      return users.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        role: u.role,
        createdAt: u.createdAt,
      }));
    }),
});
