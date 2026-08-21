# Deploy Redis UI on Railway

Manage and explore Redis visually with a powerful web UI, ready in 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-ui)

## About

![Redis Insight](https://cdn.sanity.io/images/sy1jschh/production/8f55bd3acc15dcbe6547e331e5b0ef8dd011ef16-646x400.svg)

Redis UI provides a modern web interface powered by Redis Insight for exploring, monitoring, and managing Redis databases. Inspect keys, browse data structures, run commands, analyze memory usage, and troubleshoot Redis workloads directly from your browser.

This template deploys **Redis Insight as a standalone Redis management interface** with persistent application storage.

You can connect it to Redis instances running in the same Railway project, Redis databases hosted elsewhere, or other compatible Redis deployments.

Redis Insight provides a visual alternative to working exclusively through `redis-cli`, making it easier to inspect data structures, investigate memory usage, execute commands, and understand what is happening inside your Redis database.

Persistent storage keeps saved database connections and Redis Insight application state available across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-insight | `redis/redisinsight:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5540 | Railway public service port |
| `RI_APP_HOST` | 0.0.0.0 | Listen on all interfaces |
| `RI_APP_PORT` | 5540 | Redis Insight application port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/redis-ui)
