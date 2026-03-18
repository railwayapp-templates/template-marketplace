# Deploy Gin on Railway

A minimal Gin RESTful API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gin)

## About

Hosting and deploying this Gin API involves compiling the Go source code into a lightweight binary. This template is optimized for cloud platforms like Railway, utilizing `godotenv` for flexible configuration and a **Graceful Shutdown** mechanism to ensure zero-downtime deployments. By default, the server listens on port 3000 (configurable via environment variables) and operates in `ReleaseMode` to maximize throughput. Deployment on Railway is seamless, as the platform automatically detects the Go environment, manages your `PORT` variables, and provides a secure runtime for your high-performance service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GIn | [codestorm-official/go-gin](https://github.com/codestorm-official/go-gin) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

**Category:** Starters · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/gin)
