import { userService } from "../../services";
import { authProcedure, publicProcedure, router } from "../../trpc";
import { setAuthenticationCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailPasswordInputType,
  createUserWithEmailPasswordOutputType,
  getUserInfoInputType,
  getUserInfoOutputType,
  resendEmailInputType,
  resendEmailOutputType,
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
      const { message, isVerified, token, email, id } =
        await userService.signUserWithEmailPassword(input);
      if (!token) {
        setAuthenticationCookie(ctx, token);
      }
      return { message, isVerified, token, email, id };
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
      const { message, token, id } = await userService.verifyEmail(input);
      setAuthenticationCookie(ctx, token);
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
    .mutation(async ({ input, ctx }) => {
      const { id, email, fullName, role, profileImageUrl } = await userService.userInfoUsingId(
        ctx.user.id,
      );
      return { id, email, fullName, role, profileImageUrl: profileImageUrl || "" };
    }),
});
