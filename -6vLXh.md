# Deploy Elysia-bun-server on Railway

Elysia user management API with real-time WebSockets and Swagger UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/-6vLXh)

## About

Complete RESTful API built with Elysia and Bun featuring user CRUD operations, real-time WebSocket notifications, and interactive Swagger documentation. Includes Docker support, proper HTTP status codes, and demo users. Ready for production deployment with minimal configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-elysia-bun-template | [ali-eljerrari/railway-elysia-bun-template](https://github.com/ali-eljerrari/railway-elysia-bun-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `API_KEY` | (secret) | API_KEY for authorization |
| `NODE_ENV` | production | NODE_ENV |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/-6vLXh)
