# Deploy Redis Stack (6.2.6-v19) on Railway

Redis with extended capabilities.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/y5XLWL)

## About

# Redis Stack

Learn more: [https://redis.io/about/about-stack](https://redis.io/about/about-stack/)

Redis Stack unifies and simplifies the developer experience of Redis by offering all the cutting-edge capabilities provided by the leading Redis modules. Redis Stack bundles the following capabilities into Redis: [RedisJSON](https://redis.io/json), [RediSearch](https://redis.io/search), [RedisTimeSeries](https://redis.io/timeseries), and [RedisBloom](https://redis.io/probabilistic).

**This template deploys Redis Stack Server only**. RedisInsight is currently not included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Stack (6.2.6-v19) | `redis/redis-stack-server:6.2.6-v19` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | (Ignore; do not modify this. For Railway "Data" tab to work.) |
| `REDISPORT` | - | (Ignore; do not modify this. For Railway "Data" tab to work.) |
| `REDISUSER` | - | (Ignore; do not modify this. For Railway "Data" tab to work.) |
| `REDIS_URL` | - | Private Connection URL |
| `REDIS_ARGS` | - | Arguments for Redis |
| `REDIS_USER` | (secret) | - |
| `REDISPASSWORD` | (secret) | (Ignore; do not modify this. For Railway "Data" tab to work.) |
| `REDISJSON_ARGS` | - | Arguments for RedisJSON |
| `REDIS_PASSWORD` | (secret) | - |
| `REDISBLOOM_ARGS` | - | Arguments for RedisBloom |
| `REDISEARCH_ARGS` | - | Arguments for RediSearch |
| `REDISGRAPH_ARGS` | - | Arguments for RedisGraph |
| `REDIS_PUBLIC_URL` | - | Public Connection URL |
| `REDIS_PRIVATE_PORT` | 6379 | - |
| `REDISTIMESERIES_ARGS` | - | Arguments for RedisTimeSeries |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/y5XLWL)
