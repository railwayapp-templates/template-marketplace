# Deploy Redis Insights - Redis UI on Railway

An official GUI for Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/redis-insights-redis-gui)

## About

Redis Insight is the official GUI for Redis. It allows developers to visually browse and interact with Redis data, run commands through an advanced CLI, and leverage diagnostic tools to monitor, debug, and optimize Redis databases. It supports Redis Open Source, Redis Stack, Redis Enterprise, Redis Cloud, and Amazon ElastiCache.

Hosting Redis Insights - Redis GUI on Railway makes it easy to deploy a powerful visualization and management tool for your Redis databases without worrying about manual setup. With Redis Insights running on Railway, you gain an intuitive interface to explore your Redis keys, run commands, track performance, and debug issues—all from the cloud. Developers can optimize memory usage, run analytics, and troubleshoot bottlenecks in real-time, while Railway handles infrastructure scaling, networking, and uptime. This combination enables teams to focus on building applications while ensuring their Redis databases are monitored and optimized through an accessible, cloud-hosted GUI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Insights | `redis/redisinsight:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Host of a Redis database |
| `REDISPORT` | - | Port of a Redis database |
| `REDISUSER` | - | Username to connect to a Redis database |
| `REDIS_URL` | - | Public URL of a Redis database as Redis Insights uses ioredis package to connect and it only connects via IPv4. See more here: https://docs.railway.com/reference/errors/enotfound-redis-railway-internal#ioredis |
| `REDISPASSWORD` | (secret) | Password to connect to a Redis database |

**Category:** Storage

[View on Railway →](https://railway.com/template/redis-insights-redis-gui)
