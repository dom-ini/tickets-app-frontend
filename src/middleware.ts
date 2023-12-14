import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_KEY } from "@/lib/constants";

type RouteMiddleware = {
  routeTestFunction: (path: string) => boolean;
  middlewareFunction: (request: NextRequest) => NextResponse | void;
};

function getAuthCookie(request: NextRequest): object | undefined {
  const cookie = request.cookies.get(AUTH_COOKIE_KEY);
  return cookie;
}

function checkToken(request: NextRequest): NextResponse | void {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/", request.url));
}

function redirectToLogin(request: NextRequest): NextResponse | void {
  const authCookie = getAuthCookie(request);
  if (!authCookie)
    return NextResponse.redirect(new URL("/logowanie", request.url));
}

function redirectToHome(request: NextRequest): NextResponse | void {
  const authCookie = getAuthCookie(request);
  if (authCookie) return NextResponse.redirect(new URL("/", request.url));
}

const accountRoute = "/konto";
const tokenRoutes = ["/reset-hasla", "/aktywacja"];
const authenticatedRoutes = [
  "/konto",
  "/konto/bilety",
  "/konto/dane-logowania",
];
const unauthenticatedRoutes = [
  "/logowanie",
  "/rejestracja",
  "/nie-pamietam-hasla",
  "/reset-hasla",
];

const middlewares: Array<RouteMiddleware> = [
  {
    routeTestFunction: (path: string) => tokenRoutes.includes(path),
    middlewareFunction: checkToken,
  },
  {
    routeTestFunction: (path: string) => path === accountRoute,
    middlewareFunction: (request) =>
      NextResponse.redirect(new URL(accountRoute + "/bilety", request.url)),
  },
  {
    routeTestFunction: (path: string) => authenticatedRoutes.includes(path),
    middlewareFunction: redirectToLogin,
  },
  {
    routeTestFunction: (path: string) => unauthenticatedRoutes.includes(path),
    middlewareFunction: redirectToHome,
  },
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  for (const routeMiddleware of middlewares) {
    if (routeMiddleware.routeTestFunction(path))
      return routeMiddleware.middlewareFunction(request);
  }
}
