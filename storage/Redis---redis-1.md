# Deploy Redis on Railway

Self Host Latest Redis with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-1)

## About

Redis is an open-source, in-memory data store used as a cache, database, message broker, and streaming engine. It supports rich data structures, extremely low-latency operations, and real-time workloads, making it a popular choice for accelerating applications, managing sessions, powering queues, and supporting AI, analytics, and event-driven systems.

Hosting Redis on Railway provides a fully managed, high-performance in-memory data store without requiring you to configure servers or networking manually. Railway deploys Redis as a dedicated service, provides private networking for secure connections between your applications and database, and exposes connection details through environment variables. Redis can be used as a standalone service or alongside web applications, APIs, workers, and AI agents running on Railway. As your workload grows, Railway allows you to scale compute resources while maintaining fast, low-latency access for caching, messaging, and data storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis:8.2.1 | `redis:8.2.1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISPORT` | 6379 | - |
| `REDISUSER` | default | - |
| `REDIS_URL` | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | (secret) | - |
| `REDIS_PASSWORD` | (secret) | - |
| `REDIS_PUBLIC_URL` | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-1)
