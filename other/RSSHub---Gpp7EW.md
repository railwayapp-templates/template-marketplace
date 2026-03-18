# Deploy RSSHub on Railway

Everything is RSSible. The world's largest RSS network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Gpp7EW)

## About

RSSHub is the world's largest RSS network, consisting of over 5,000 global instances.

RSSHub delivers millions of contents aggregated from all kinds of sources, our vibrant open source community is ensuring the deliver of RSSHub's new routes, new features and bug fixes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSSHub | `ghcr.io/diygod/rsshub:chromium-bundled` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | RSSHub | production | Node environment |
| `REDIS_URL` | RSSHub | - | Redis URL |
| `CACHE_TYPE` | RSSHub | redis | Cache Type |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Gpp7EW)
