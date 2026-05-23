import type { CookieOptions, Request, Response } from "express";
import { TRPCContext } from "../context";

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 12 * ONE_MONTH;
const defaultCookieOption: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: ONE_YEAR,
};

export function createCookieFactory(res: Response) {
  return function createCookie(
    name: string,
    value: string,
    opts: CookieOptions = defaultCookieOption,
  ) {
    res.cookie(name, value, opts);
  };
}
export function getCookieFactory(req: Request) {
  return function getCookie(name: string) {
    return req.cookies?.[name];
  };
}

export function deleteCookieFactory(res: Response) {
  return function deleteCookie(name: string) {
    res.clearCookie(name);
  };
}
const AUTHENTICATION_KEY = "authentication-token";
const REFRESH_TOKEN_KEY = "refresh-token";

// ── Access Token Cookie ────────────────────────────────────────────────────────
export function setAuthenticationCookie(ctx: TRPCContext, accessToken: string) {
  ctx.createCookie(AUTHENTICATION_KEY, accessToken);
}
export function getAuthenticationCookkie(ctx: TRPCContext) {
  return ctx.getCookie(AUTHENTICATION_KEY);
}
export function deleteAuthenticationCookie(ctx: TRPCContext) {
  ctx.deleteCookie(AUTHENTICATION_KEY);
}

// ── Refresh Token Cookie (7 days) ──────────────────────────────────────────────
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export function setRefreshTokenCookie(ctx: TRPCContext, refreshToken: string) {
  ctx.createCookie(REFRESH_TOKEN_KEY, refreshToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: SEVEN_DAYS,
  });
}
export function getRefreshTokenCookie(ctx: TRPCContext) {
  return ctx.getCookie(REFRESH_TOKEN_KEY);
}
export function deleteRefreshTokenCookie(ctx: TRPCContext) {
  ctx.deleteCookie(REFRESH_TOKEN_KEY);
}
