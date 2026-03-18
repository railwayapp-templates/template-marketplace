# Deploy BullMQ with BullBoard on Railway

A queueing solution with a dashboard to visualize, monitor and retry.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0s3-xR)

## About

## ✨ Features

- Queueing system with [BullMQ](https://docs.bullmq.io/) and Redis;
- Dashboard built with [bull-board](https://github.com/felixmosh/bull-board) and [Fastify](https://fastify.dev/);
- Run services through [pm2](https://pm2.keymetrics.io/).

GitHub: [https://github.com/ncontiero/fastify-bullmq](https://github.com/ncontiero/fastify-bullmq)

## Explanations

This application uses **BullMQ**, a Redis-based queueing system, and **Bull-Board**, a dashboard to monitor and manage these queues, served by a **Fastify** server. Both services are built using [Rslib](https://rslib.rs/) and managed by **PM2**.

There are three distinct ways to start the services:

1. **Unified Execution:** To start both services simultaneously, use the command `pnpm start`. This is the simplest option for local development.
2. **Separate Execution:** To start the worker and Fastify server individually, use the commands `pnpm start:worker` and `pnpm start:server`, respectively. This approach offers greater control and is used in this template, but can be easily adapted to your needs.
3. **Direct Node.js Execution:** For simple projects that do not require PM2 features, direct execution with Node.js can result in lower resource consumption. Use `node ./dist/worker.js` for the worker and `node ./dist/server.js` for the Fastify server.

PM2 also supports [Bun](https://bun.sh/). If desired, you can replace the project's package manager with Bun and execute the TypeScript files directly (Bun has native support for TypeScript), eliminating the need for a build. However, be aware that Bun is not fully compatible with Node.js, which may result in execution problems.

**Scalability (PM2):** Both services support horizontal scaling through the `WORKER_INSTANCES` and `SERVER_INSTANCES` environment variables. Set these variables to the desired number of instances to increase the processing capacity of the worker and server, respectively. **These variables will only take effect if PM2 is being used.**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bull-board | [ncontiero/fastify-bullmq](https://github.com/ncontiero/fastify-bullmq) | Web service |
| Redis | `redis:8.2.2` | Database |
| bullmq-worker | [ncontiero/fastify-bullmq](https://github.com/ncontiero/fastify-bullmq) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_USER` | bull-board | (secret) | - |
| `REDIS_PASSWORD` | bull-board | (secret) | - |
| `SERVER_INSTANCES` | bull-board | 1 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_USER` | bullmq-worker | (secret) | - |
| `REDIS_PASSWORD` | bullmq-worker | (secret) | - |
| `WORKER_INSTANCES` | bullmq-worker | 1 | - |

## Configuration

- **Start command:** `pnpm start:server`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `pnpm start:worker`

**Category:** Queues · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/0s3-xR)
