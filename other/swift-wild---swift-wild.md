# Deploy swift-wild on Railway

Deploy and Host swift-wild with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swift-wild)

## About

Water Delivery is a full-stack water delivery management system featuring a Next.js 15 frontend, Hono v4 API server, real-time Socket.IO, PostgreSQL via Drizzle ORM, Redis caching, and JWT authentication for managing products, subscriptions, orders, and delivery schedules.

Deploying the Water Delivery API on Railway involves running a Hono-based Node.js 22 server with Socket.IO for real-time features. The monorepo requires installing workspace dependencies from `@water-delivery/shared` and `@water-delivery/db` before starting. Railway provisions managed PostgreSQL and Redis, injects connection strings as environment variables, and handles SSL, networking, and autoscaling. The API listens on port 3001 and exposes `/health` for Railway health checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| team-01-app | [vibe-code-tours/team-01-app](https://github.com/vibe-code-tours/team-01-app) | Worker |

**Category:** Other · **Languages:** TypeScript, Shell, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/swift-wild)
