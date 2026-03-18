# Deploy SearXNG API on Railway

A pre-configured SearXNG optimized for private and LLM tool use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-api)

## About

SearXNG is a privacy-respecting metasearch engine that aggregates results from multiple sources. This template configures SearXNG as a JSON API with GET requests enabled, making it easy to integrate with backends, scripts, and LLM agents that need web search capabilities.

Running SearXNG typically requires configuring YAML settings, managing search engine lists, and tuning timeouts. This template handles all of that. It ships with a curated engine list (DuckDuckGo, Brave, GitHub, arXiv, StackOverflow, and more), extended timeouts for reliability, and settings tuned for API access rather than browser use. Rate limiting is disabled since you control who has access. Add Redis for caching and you're done.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| SearXNG | `ghcr.io/joeychilson/searxng-railway:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `SEARXNG_SECRET_KEY` | SearXNG | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/searxng-api)
