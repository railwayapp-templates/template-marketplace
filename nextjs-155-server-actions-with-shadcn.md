# Deploy NextJS 15.5 (Server Actions) with Shadcn on Railway

Better-Auth Ready with Auth flows and Server actions (Prod ready)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nextjs-155-server-actions-with-shadcn)

## About

**NextJS 15.5 (Server Actions) with Shadcn** is a production-ready **Next.js 15.5.4** starter template using the App Router. It features **Server Actions** for type-safe data mutations, replacing traditional API routes for logic like authentication. The template is built with a **Screaming Architecture** and styled using beautiful **shadcn/ui** components with an Amber Minimal theme.

-----

Hosting this setup involves deploying a **full-stack application** that heavily relies on Next.js's integrated server-side capabilities. The primary goal is ensuring the **Server Actions** execute correctly in a production environment. A platform like **Railway** excels here due to its zero-config deployment: it automatically detects Next.js, installs dependencies, builds the app, and configures the container to run correctly (e.g., binding to `0.0.0.0`), including crucial production features like graceful shutdown and built-in health checks (`/api/health`).

-----

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NextJS with Better-Auth and Shadcn | [contourkde/railway_nextjs_with_shadcn](https://github.com/contourkde/railway_nextjs_with_shadcn) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | Environment |
| `NEXT_PUBLIC_APP_NAME` | NextJS App_Name | Name of your deployment |
| `NEXT_PUBLIC_APP_VERSION` | 1.0.0 | App Version |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/template/nextjs-155-server-actions-with-shadcn)
