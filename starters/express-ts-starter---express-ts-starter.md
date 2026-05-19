# Deploy express-ts-starter on Railway

Deploy and Host express-ts-starter with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/express-ts-starter)

## About

express-ts-starter is a minimal Express.js API starter built with TypeScript and Bun. It includes a small production-ready server setup with JSON parsing, URL-encoded body support, compression, security headers, request logging, and a sample `/misc/status` health endpoint for quick deployment checks.

Hosting express-ts-starter on Railway involves deploying a Bun-powered TypeScript Express server that listens on Railway's provided `PORT` environment variable. The app starts from `src/server.ts` using the `bun run start` script, configures common Express middleware, and exposes a simple status route for health checks. Railway can install dependencies from `bun.lock`, run the configured start command, and provide environment variables for future services such as databases, authentication providers, or external APIs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| express-ts-starter | [jtmozley/express-ts-starter](https://github.com/jtmozley/express-ts-starter) | Web service |

## Configuration

- **Healthcheck:** `/misc/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/express-ts-starter)
