# Deploy Web Tools (Open Source Alternative To Firecrawl, Linkup, Tavily, Exa or Bright Data) on Railway

Power your AI apps with the world's most accurate open source web tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/web-tools)

## About

Web Tools is an open-source web toolkit that gives AI agents fifteen tools to search, fetch, screenshot, crawl, and archive the web — available as an MCP server, REST API, and CLI. It consumes zero LLM tokens for web access, so your models spend their budget on reasoning, not searching.

This template deploys a complete self-hosted web toolkit as five services on Railway: **Redis** (cache), **SearXNG** (privacy-respecting metasearch engine), **Scrapling** (stealth fetching, rendering, screenshots, PDFs and JS execution, with residential egress and JS-challenge solving), **Camoufox** (stealth Firefox on a geo-targeted residential exit, for sources that refuse anything else), and the **Web Tools Server** that ties them together. An API key is auto-generated at deploy time to secure your endpoint. Once deployed, any MCP-compatible client (Claude Code, Claude Desktop, Cursor, Windsurf, etc.) can connect over HTTP, and the REST API (`POST /api/v0/{tool_name}`) serves non-MCP integrations. You own the infrastructure; the data never leaves your stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Camoufox | [arnaudjnn/web-tools](https://github.com/arnaudjnn/web-tools) (root: /services/camoufox) | Worker |
| SearXNG | [arnaudjnn/web-tools](https://github.com/arnaudjnn/web-tools) (root: /services/searxng) | Worker |
| Redis | `redis:8.2.1` | Database |
| Tools | [arnaudjnn/web-tools](https://github.com/arnaudjnn/web-tools) | Web service |
| Scrapling | [arnaudjnn/web-tools](https://github.com/arnaudjnn/web-tools) (root: /services/scrapling) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Camoufox | 8000 | Port number the Camoufox service listens on (default: 8000) |
| `WORKERS` | Camoufox | 1 | Number of browser sessions per container (default: 1) |
| `PROXY_URL` | Camoufox | - | Optional proxy for outgoing requests |
| `PROXY_URL` | SearXNG | - | Optional proxy for outgoing requests |
| `SEARXNG_REDIS_URL` | SearXNG | - | Redis connection URI used by SearXNG for caching/rate limiting |
| `SEARXNG_SECRET_KEY` | SearXNG | (secret) | Secret key used by SearXNG for cryptographic signing and session security |
| `REDISHOST` | Redis | - | Hostname or IP address of the Redis server |
| `REDISPORT` | Redis | 6379 | Port number the Redis server listens on (default: 6379) |
| `REDISUSER` | Redis | default | Username for Redis authentication (default: default) |
| `REDIS_URL` | Redis | - | Full connection URI for Redis (e.g., redis://user:pass@host:port) |
| `REDISPASSWORD` | Redis | (secret) | Redis authentication password, derived from REDIS_PASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated password used to secure the Redis instance |
| `REDIS_PUBLIC_URL` | Redis | - | Publicly accessible Redis connection URI, used for external access |
| `API_KEY` | Tools | (secret) | Auto-generated secret used to secure the MCP server URL endpoint via Bearer token authentication |
| `SEARXNG_URL` | Tools | - | Base URL of the SearXNG instance used for web searches |
| `CAMOUFOX_URL` | Tools | - | Base URL of the Camoufox service used for web browser |
| `SCRAPLING_URL` | Tools | - | Base URL of the Scrapling service used for web crawling and content extraction |
| `PORT` | Scrapling | 8000 | Port number the Scrapling service listens on (default: 8000) |
| `PROXY_URL` | Scrapling | - | Optional proxy for outgoing requests |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/web-tools)
