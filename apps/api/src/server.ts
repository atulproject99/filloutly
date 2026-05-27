import { logger } from "@repo/logger";
import express from "express";


import * as trpcExpress from "@trpc/server/adapters/express";
import { createOpenApiExpressMiddleware, generateOpenApiDocument } from "trpc-to-openapi";

import { createContext, serverRouter } from "@repo/trpc/server";

import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { env } from "./env";

export const app = express();

const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: "Streamyst OpenAPI",
  version: "1.0.0",
  baseUrl: env.BASE_URL.concat("/api"),
});

app.set("trust proxy", 1);

// Helmet first — security headers, but allow CORS headers through
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }),
);

// CORS — must come before routes
const allowedOrigins = [
  "http://localhost:3000",
  "https://filloutly.in",
  "https://www.filloutly.in",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, mobile apps, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    maxAge: 86400, // cache preflight for 24h
  }),
);



app.use(express.json());
app.use(cookieParser());

const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later.",
  },
  ipv6Subnet: 56,
});

//app.use(globalLimiter);

app.get("/", (req, res) => {
  return res.json({ message: "Streamyst is up and running..." });
});

app.get("/health", (req, res) => {
  return res.json({ message: "Streamyst server is healthy", healthy: true });
});

logger.debug(`openapi.json: ${env.BASE_URL}/openapi.json`);
app.get("/openapi.json", (req, res) => {
  return res.json(openApiDocument);
});



app.use(
  "/api",
  createOpenApiExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

app.use(
  "/trpc",
  (req, res, next) => {
    // Fix TRPC Parse Error (Unexpected end of JSON input) on empty body mutations
    if (req.method === "POST" && !req.body) {
      req.body = {};
    }
    next();
  },
  trpcExpress.createExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

export default app;
