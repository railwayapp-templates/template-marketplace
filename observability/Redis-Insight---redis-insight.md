# Deploy Redis Insight on Railway

Redis UI for real-time monitoring, debugging, and data analysis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-insight)

## About

![](https://cdn.sanity.io/images/sy1jschh/production/8f55bd3acc15dcbe6547e331e5b0ef8dd011ef16-646x400.svg)

This template deploys Redis Insight as a standalone service, allowing you to connect to any Redis instance, whether hosted on Railway or externally. It is designed for developers who need better visibility into their Redis data without additional setup.

With an intuitive UI and built-in analytics tools, Redis Insight helps you inspect keys, analyze memory usage, and troubleshoot performance issues efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis/redisinsight | `redis/redisinsight` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5540 |
| `REDIS_PASSWORD` | (secret) |

**Category:** Observability

[View on Railway →](https://railway.com/deploy/redis-insight)
