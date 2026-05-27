import type * as express from "express";
import type { TRPCContext } from "../context";

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 12 * ONE_MONTH;

const defaultCookieOption: express.CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod",
  sameSite: "none",
  maxAge: ONE_YEAR,
};

export function createCookieFactory(res: express.Response) {
  return function createCookie(
    name: string,
    value: string,
    opts: express.CookieOptions = defaultCookieOption,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res as any).cookie(name, value, opts);
  };
}

export function getCookieFactory(req: express.Request) {
  return function getCookie(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (req as any).cookies?.[name];
  };
}

export function deleteCookieFactory(res: express.Response) {
  return function deleteCookie(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res as any).clearCookie(name, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod",
      sameSite: "none",
    });
  };
}

const AUTHENTICATION_KEY = "authentication-token";
const REFRESH_TOKEN_KEY = "refresh-token";

export function setAuthenticationCookie(ctx: TRPCContext, accessToken: string) {
  ctx.createCookie(AUTHENTICATION_KEY, accessToken);
}

export function getAuthenticationCookkie(ctx: TRPCContext) {
  return ctx.getCookie(AUTHENTICATION_KEY);
}

export function deleteAuthenticationCookie(ctx: TRPCContext) {
  ctx.deleteCookie(AUTHENTICATION_KEY);
}

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export function setRefreshTokenCookie(ctx: TRPCContext, refreshToken: string) {
  ctx.createCookie(REFRESH_TOKEN_KEY, refreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod",
    sameSite: "none",
    maxAge: SEVEN_DAYS,
  });
}

export function getRefreshTokenCookie(ctx: TRPCContext) {
  return ctx.getCookie(REFRESH_TOKEN_KEY);
}

export function deleteRefreshTokenCookie(ctx: TRPCContext) {
  ctx.deleteCookie(REFRESH_TOKEN_KEY);
}
