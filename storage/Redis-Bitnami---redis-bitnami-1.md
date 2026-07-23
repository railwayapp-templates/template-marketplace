# Deploy Redis Bitnami on Railway

Redis key-value store (Bitnami) - cache, sessions, queues, pub/sub

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-bitnami-1)

## About

**Redis®** — the legendary open source, advanced key-value store. Often called a "data structure server" because it can hold strings, hashes, lists, sets, and sorted sets like a boss.

This template uses the official **Bitnami Redis** secure image with a custom Dockerfile for better compatibility on Railway.

Deploy Redis in one click using Bitnami's hardened Docker image. This template includes a custom Dockerfile to handle permission issues commonly found on Railway, strong password protection, and optimized settings for production use.

Just deploy and connect your apps using the provided `REDIS_URL`. Perfect for fast caching and real-time workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-bitnami | [codestorm-official/redis-bitnami](https://github.com/codestorm-official/redis-bitnami) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISPORT` | 6379 | - |
| `REDISUSER` | default | - |
| `REDISPASSWORD` | (secret) | - |
| `REDIS_PASSWORD` | (secret) | - |
| `REDIS_RDB_POLICY` | 3600 | 1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | no | - |
| `REDIS_EXTRA_FLAGS` | --maxmemory 512mb --maxmemory-policy allkeys-lru | - |
| `REDIS_PORT_NUMBER` | 6379 | - |
| `ALLOW_EMPTY_PASSWORD` | (secret) | - |
| `REDIS_DISABLE_COMMANDS` | FLUSHALL,FLUSHDB,CONFIG | - |
| `REDIS_ALLOW_REMOTE_CONNECTIONS` | yes | - |

## Configuration

- **Volume:** `/bitnami`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/redis-bitnami-1)
