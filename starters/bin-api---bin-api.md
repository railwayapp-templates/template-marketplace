# Deploy bin-api on Railway

A minimalist HTTP API for testing and debugging HTTP requests

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bin-api)

## About

bin-api is a minimalist HTTP API for testing and debugging HTTP requests during development. This "bin" API receives arbitrary HTTP requests and returns all request details as structured JSON responses, making it perfect for webhook testing, API debugging, and integration testing.

Hosting bin-api involves deploying a lightweight Go-based HTTP server that processes incoming requests and returns structured JSON responses. The application is stateless, requires no database, and runs in a single container with minimal resource requirements. Railway's platform handles the containerization, scaling, and networking automatically, making deployment as simple as connecting your GitHub repository. The service exposes port 8081 and includes built-in health checks for reliable operation in production environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| secnex/bin-api:latest | `ghcr.io/secnex/bin-api:latest` | Worker |

## Configuration

- **Healthcheck:** `/healthz`

**Category:** Starters

[View on Railway →](https://railway.com/template/bin-api)
