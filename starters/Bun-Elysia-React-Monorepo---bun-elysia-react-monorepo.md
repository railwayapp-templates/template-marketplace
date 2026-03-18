# Deploy Bun + Elysia + React (Monorepo) on Railway

Deploy and host a Bun monorepo with Elysia and React

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-elysia-react-monorepo)

## About

<img width="128" src="https://railway.com/brand/logo-light.svg"><img width="128" src="https://bun.com/logo.svg"><img width="128" src="https://elysiajs.com/assets/elysia.svg">


A production-ready monorepo combining Bun's fast runtime with Elysia's type-safe API framework and React + Vite for the frontend. Features end-to-end type safety via Eden Treaty, shared type contracts, and native binary compilation for optimal performance.

Deploying a monorepo requires coordinating multiple services that share code and types. This template deploys the API and UI as independent Railway services with a shared `contracts` package for type-safe communication. The API compiles to a native binary for optimal cold start performance, while private networking enables secure service-to-service calls. Railway's variable references (`${{service.VARIABLE}}`) connect services automatically, and watch paths ensure rebuilds when shared code changes. Each service scales independently while maintaining a single source of truth for types.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | [Salam81/railway-bun-monorepo-elysia-starter](https://github.com/Salam81/railway-bun-monorepo-elysia-starter) | Web service |
| Backend | [Salam81/railway-bun-monorepo-elysia-starter](https://github.com/Salam81/railway-bun-monorepo-elysia-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_API_URL` | Frontend | - | API URL |
| `RAILPACK_BUILD_CMD` | Frontend | bun --filter @bun-monorepo-railway/ui build | Custom Build Command |
| `RAILPACK_SPA_OUTPUT_DIR` | Frontend | apps/ui/dist | Directory containing built static files |
| `FRONTEND_URL` | Backend | - | Used for CORS |
| `RAILPACK_BUILD_CMD` | Backend | bun --filter @bun-monorepo-railway/api build | Custom Build Command |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `./apps/api/dist/server`
- **Healthcheck:** `/health`

**Category:** Starters · **Languages:** TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/bun-elysia-react-monorepo)
