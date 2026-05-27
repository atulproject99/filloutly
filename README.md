# Filloutly - Full-Stack Monorepo

Welcome to the **Filloutly** project! This is a modern, high-performance monorepo powered by **Turborepo**. We use a monorepo structure to easily share code (like our database models, logging tools, and tRPC configurations) between our frontend and backend.

## 🏗️ Project Architecture

This repository is split into two main sections: **Apps** (the things that actually run) and **Packages** (the shared code they both use).

### 🖥️ Apps (`apps/`)

*   **`api`**: Our backend server! It's built with Express and runs our **tRPC** server. This is where all the backend magic, API endpoints, and authentication logic live.
*   **`web`**: Our frontend web application! Built with **Next.js**. It communicates seamlessly with the `api` through tRPC to display data and handle user interactions.

### 📦 Packages (`packages/`)

These are shared libraries that both the `api` and `web` apps can use. Keeping them here means we only write the code once!

*   **`database`**: The single source of truth for our database. It contains our Prisma schemas, database client, and migrations. Whenever the `api` needs to talk to the database, it uses this package.
*   **`trpc`**: The bridge between frontend and backend. It defines our tRPC routers (backend endpoints) and the tRPC React client (how the frontend calls those endpoints). Because this is shared, we get perfect end-to-end type safety!
*   **`services`**: Integrations with external APIs and third-party tools (like Resend for emails).
*   **`logger`**: A custom logging utility we use everywhere to keep our console output clean and consistent.
*   **`eslint-config`**: Shared linting rules to keep our code style unified across the entire codebase.
*   **`typescript-config`**: Shared TypeScript settings so we don't have to duplicate `tsconfig.json` files everywhere.

---

## 🚀 How Data Flows (The Big Picture)

1.  **The User Acts**: A user clicks a button on the `web` frontend (Next.js).
2.  **tRPC Call**: The frontend uses the shared `trpc` package to make a fully typed API call to the backend.
3.  **Backend Receives**: The `api` (Express) receives the request. It validates the input and makes sure the user is authenticated.
4.  **Database Action**: If the backend needs to read or save data, it imports the `database` package and uses Prisma to talk to our PostgreSQL database.
5.  **External Services**: If we need to send an email or do something external, the `api` imports the `services` package.
6.  **Response**: The backend sends the result back through tRPC, and the frontend updates the UI!

---

## 🛠️ Getting Started

Because we use Turborepo, running the entire project is incredibly simple.

### Prerequisites
*   Node.js (v18+)
*   `pnpm` (We use pnpm for managing our monorepo workspaces)

### 1. Install Dependencies
Run this in the root of the project to install everything for all apps and packages:
```bash
pnpm install
```

### 2. Environment Variables
Make sure you have your `.env` files set up in the root, `apps/api`, and `apps/web`. You'll need your `DATABASE_URL` and other secrets.

### 3. Database Setup
Push the database schema to your database (Neon/Postgres):
```bash
pnpm db:push
```

### 4. Run the Project
Start both the frontend and backend simultaneously:
```bash
pnpm dev
```

This command uses Turbo to spin up both the `api` and the `web` app at the same time. You can now access your frontend locally while it talks to your local backend!

---

## 🚢 Deployment

*   **Backend (`apps/api`)**: Deployed as serverless functions on Vercel. We bundle our shared packages into a single compiled output to ensure fast cold starts and avoid ESM module resolution issues.
*   **Frontend (`apps/web`)**: Deployed on Vercel as a Next.js application.

Enjoy building with Filloutly!
