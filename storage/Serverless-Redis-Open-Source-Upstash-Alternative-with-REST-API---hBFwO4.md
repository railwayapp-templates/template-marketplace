# Deploy Serverless Redis | Open Source Upstash Alternative with REST API on Railway

Redis behind an HTTP REST API — drop-in for @upstash/redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hBFwO4)

## About

Serverless Redis puts an HTTP REST API in front of a real Redis instance, speaking the same protocol as Upstash. Anywhere you cannot open a TCP socket — Cloudflare Workers, Vercel Edge, Deno Deploy, a browser — you can still talk to Redis over `fetch`.

Two services: Redis Stack for storage, and a small HTTP server in front of it that accepts Upstash-shaped requests and executes them. The `@upstash/redis` SDK works against it unchanged — swap the URL and token, keep the code.

The HTTP service holds the public domain and is protected by a generated bearer token. Redis itself sits on the private network with a generated password and a persistent volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| http | `ghcr.io/ikatsuba/serverless-redis:2.2.1` | Database |
| Redis | `redis/redis-stack:7.4.0-v8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | http | :: | - |
| `PORT` | http | 8080 | Port |
| `SR_TOKEN` | http | (secret) | Super secret token |
| `REDIS_URL` | http | - | Private Redis URL |
| `PUBLIC_URL` | http | - | Public URL |
| `PRIVATE_URL` | http | - | Private URL |
| `SR_IDLE_TIMEOUT_MS` | http | 300000 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | - |
| `REDISHOST` | Redis | - | Private host of Redis, reachable from other services in this project. |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Redis connection string over the private network. |
| `REDIS_ARGS` | Redis | - | Arguments passed to the Redis server. Sets the password and enables the append-only file, so writes survive a redeploy. |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. Generated per deployment and applied through REDIS_ARGS. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/hBFwO4)
