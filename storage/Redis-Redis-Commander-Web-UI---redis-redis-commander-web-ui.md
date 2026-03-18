# Deploy Redis + Redis Commander Web UI on Railway

One Click Redis + Redis Commander Web UI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-redis-commander-web-ui)

## About

This template allows you to deploy Redis Commander automatically connected to Redis with a single click. It simplifies setting up a Redis instance alongside a Web UI for easy management and visualization.

Deploying Redis + Redis Commander Web UI on Railway requires no parameters or complex setup. With a single click, you can deploy both Redis and Redis Commander together, where Redis Commander automatically connects to the Redis instance. This makes it effortless to visualize and manage your Redis databases through a Web UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-commander-and-redis-template | [compbyter/redis-commander-and-redis-template](https://github.com/compbyter/redis-commander-and-redis-template) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Railway Private Domain Name. |
| `REDISPORT` | 6379 | Port to connect to Redis. |
| `REDISUSER` | default | Default user to connect to Redis. |
| `REDIS_URL` | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/redis-redis-commander-web-ui)
