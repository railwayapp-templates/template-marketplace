# Deploy Workbench - BullMQ Dashboard on Railway

Workbench, a BullMQ dashboard from getworkbench.dev

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workbench-bullmq-dashboard)

## About

[Workbench](https://getworkbench.dev) is a BullMQ dashboard for monitoring and managing queues. This Railway template deploys Workbench, connects to your existing Redis instance with `REDIS_URL`, and monitors the queues configured through `QUEUE_NAMES`.

Hosting this standalone Workbench service on Railway involves deploying the Docker image, connecting it to Redis, and configuring the queues it should monitor. The two core variables are `REDIS_URL`, which points Workbench at the Redis instance used by BullMQ, and `QUEUE_NAMES`, which defines the comma-separated queue names to show in the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Workbench | `thomasamol/getworkbench-bun-serve` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `READONLY` | false |
| `BASE_PATH` | / |
| `AUTH_PASSWORD` | (secret) |
| `AUTH_USERNAME` | (secret) |

## Configuration

- **Start command:** `bun run src/index.ts`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/deploy/workbench-bullmq-dashboard)
