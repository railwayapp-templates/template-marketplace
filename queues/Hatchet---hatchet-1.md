# Deploy Hatchet on Railway

Hatchet Lite 0.107 durable task queue and workflow engine on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hatchet-1)

## About

Hatchet is a platform for background tasks and durable workflows built on Postgres. Workers written with the Python, TypeScript or Go SDKs pick up tasks with retries, timeouts, concurrency limits, rate limits, schedules, cron and event triggers, while a dashboard shows every run, its logs and its inputs and outputs.

This template deploys Hatchet Lite v0.107.2, the single-container edition with the engine, API and dashboard, backed by a Railway Postgres database. The admin account is seeded from environment variables and public sign-up is disabled. Generated keys live on a Railway volume, so API tokens stay valid across redeploys. Workers connect over gRPC through a Railway TCP proxy from anywhere, or directly on the private network. Create an API token in the dashboard and start a worker. Hatchet Lite suits small and medium workloads on the Hobby plan. Postgres holds all queues and run history, so back it up regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hatchet | `ghcr.io/hatchet-dev/hatchet/hatchet-lite:v0.107.2` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | hatchet | 8888 |
| `ADMIN_NAME` | hatchet | Admin |
| `ADMIN_EMAIL` | hatchet | admin@example.com |
| `ADMIN_PASSWORD` | hatchet | (secret) |
| `SERVER_GRPC_PORT` | hatchet | 7077 |
| `SERVER_ALLOW_SIGNUP` | hatchet | false |
| `SERVER_GRPC_INSECURE` | hatchet | true |
| `SERVER_GRPC_BIND_ADDRESS` | hatchet | [::] |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet | false |
| `SERVER_AUTH_SET_EMAIL_VERIFIED` | hatchet | true |
| `SERVER_INTERNAL_CLIENT_INTERNAL_GRPC_BROADCAST_ADDRESS` | hatchet | localhost:7077 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/ready`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7077
- **Volume:** `/config`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/hatchet-1)
