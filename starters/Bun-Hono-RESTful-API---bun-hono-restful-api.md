# Deploy Bun Hono RESTful API 🔥 on Railway

A minimal & blazing fast Bun Hono API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-hono-restful-api)

## About

Bun Hono RESTful API 🔥 is a lightweight, production-ready template for building HTTP/JSON APIs using the Bun runtime and the Hono web framework. It compiles your TypeScript server into a single, fast binary, includes basic routing, health checks, and environment-based configuration, and is optimized for container-based deployments such as Railway.

Hosting Bun Hono RESTful API 🔥 on Railway means running a compact, compiled Bun binary inside a minimal container image. The provided Dockerfile handles installing dependencies, compiling `src/server.ts` into a standalone `server` binary, and defining the container entrypoint. On Railway, you typically connect your GitHub repository, enable automatic builds from the Dockerfile, and configure environment variables like `PORT` and `NODE_ENV`. Railway will then build the image, run the container, and expose your API over HTTPS, taking care of scaling, logs, and restarts for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bun-hono | [codestorm-official/bun-hono](https://github.com/codestorm-official/bun-hono) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | development |

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/bun-hono-restful-api)
