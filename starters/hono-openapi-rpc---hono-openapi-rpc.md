# Deploy hono-openapi-rpc on Railway

A full-stack monorepo with Hono API, React, and type-safe OpenAPI endpoints

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hono-openapi-rpc)

## About

A modern monorepo for building full-stack applications with Bun, Hono, OpenAPI, and TanStack Router. Combines a Hono API server, React web app, and shared Drizzle ORM database schema in a single workspace for rapid development.

Hosting hono-openapi-rpc on Railway enables seamless deployment of a complete full-stack application. The project bundles a Hono API server with a React frontend built with Vite and TanStack Router, serving both from a single instance. Railway handles the infrastructure complexity, allowing you to focus on development while automatically managing database connections, environment variables, and scaling. With built-in OpenAPI documentation and type-safe validation via Zod, hono-openapi-rpc is designed for modern development workflows and integrates perfectly with Railway's platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hono-openapi-rpc | [aldotestino/hono-openapi-rpc](https://github.com/aldotestino/hono-openapi-rpc) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `DATABASE_URL` | Neon Database URL |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/hono-openapi-rpc)
