# Deploy BullMQ | API and Worker, With Outcomes in Postgres on Railway

API and BullMQ worker wired up, with every outcome recorded in Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bullmq-or-api-and-worker-with-outcomes-i)

## About

An API that answers immediately and a worker that does the slow part — with Redis as the queue, Postgres as the record of what happened, and a repeatable job standing in for cron.

Post a job, get an id back in milliseconds, read the outcome when it is ready.

The BullMQ template in this catalogue has 299 installs and a 68% success rate. The whole Queues category is 55 templates and 2837 installs, on a platform where background work is table stakes.

BullMQ itself is not the difficult part. The difficult part is everything around it: two processes that must agree on a queue name, a Redis client configured so that a blocking read does not take the worker down, an outcome written somewhere that outlives Redis, and retry handling that does not mark a job failed while an attempt is still pending.

Each of those is one line or one decision, and each of them fails quietly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | [ak40u/bullmq-railway-starter](https://github.com/ak40u/bullmq-railway-starter) | Worker |
| Redis | `redis:8.6.5-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| API | [ak40u/bullmq-railway-starter](https://github.com/ak40u/bullmq-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `QUEUE_NAME` | Worker | jobs |
| `WORKER_CONCURRENCY` | Worker | 4 |
| `REDIS_PASSWORD` | Redis | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Redis | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | API | 8080 |
| `API_TOKEN` | API | (secret) |
| `QUEUE_NAME` | API | jobs |

## Configuration

- **Start command:** `node dist/worker.js`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node dist/server.js`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Languages:** TypeScript, Shell

[View on Railway →](https://railway.com/deploy/bullmq-or-api-and-worker-with-outcomes-i)
