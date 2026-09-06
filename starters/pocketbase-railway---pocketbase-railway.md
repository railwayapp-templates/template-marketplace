# Deploy pocketbase-railway on Railway

🪄 Full-text search, soft delete, webhooks, anonymous auth, CSV/JSON import

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-railway)

## About

Railway builds a multi-arch Alpine image from the custom Go binary, then runs it with a persistent volume mounted at `/pb/pb_data`. Your database, uploads, and settings survive redeploys and restarts. An entrypoint script handles first-boot setup, creating the admin superuser from environment variables. A healthcheck on `/api/health` keeps the service honest.

Versioned JavaScript migrations and hooks are copied into the image, so schema changes and custom logic deploy automatically with each push. No manual migration steps, no SSH into containers to run scripts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [8u9i/pocketbase-railway](https://github.com/8u9i/pocketbase-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | port |
| `PB_ADMIN_EMAIL` | admin@example.com | CHANGE ME |
| `PB_ADMIN_PASSWORD` | (secret) | CHANGE ME PASS |

## Configuration

- **Start command:** `/pb/entrypoint.sh`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Starters · **Languages:** JavaScript, Go, Dockerfile, Shell, TypeScript

[View on Railway →](https://railway.com/deploy/pocketbase-railway)
