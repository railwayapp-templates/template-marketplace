# Deploy Web Tools (Open Source Alternative To Firecrawl, Linkup, Tavily, Exa or Bright Data) on Railway

Power your AI apps with the world's most accurate open source web tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/web-tools)

## About

Web Tools is an open-source web toolkit that gives AI agents eight tools to search, fetch, screenshot, crawl, and archive the web. Available as an [MCP](https://modelcontextprotocol.io/) server, REST API, and CLI. It consumes zero LLM tokens for web access, so your models spend their budget on reasoning, not searching. The web has always been free for humans, so why should AI agents have to pay per query?

This template deploys a complete self-hosted web toolkit as four services on Railway: **Redis**, **SearXNG** (privacy-respecting metasearch engine), **Crawl4AI** (headless browser for content extraction, screenshots, PDFs, and JS execution), and the **Web Tools Server** that ties them together. An API key is auto-generated at deploy time to secure your endpoint. Once deployed, any MCP-compatible client (Claude Code, Claude Desktop, Cursor, Windsurf, etc.) can connect over HTTP and use all eight tools. A REST API (`POST /api/v0/{tool_name}`) is also available for non-MCP integrations. No per-query fees, no third-party API keys, no usage limits. You own the infrastructure and the data never leaves your stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearXNG | [arnaudjnn/web-tools](https://github.com/arnaudjnn/web-tools) (root: /services/searxng) | Worker |
| Crawl4AI | `unclecode/crawl4ai:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Tools | [arnaudjnn/web-tools](https://github.com/arnaudjnn/web-tools) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROXY_URL` | SearXNG | - | Optional proxy for outgoing requests |
| `SEARXNG_REDIS_URL` | SearXNG | - | Redis connection URI used by SearXNG for caching/rate limiting |
| `SEARXNG_SECRET_KEY` | SearXNG | (secret) | Secret key used by SearXNG for cryptographic signing and session security |
| `PORT` | Crawl4AI | 11235 | Port number the Crawl4AI service listens on (default: 11235) |
| `CRAWL4AI_API_TOKEN` | Crawl4AI | (secret) | API token for authenticating requests to the Crawl4AI service |
| `REDISHOST` | Redis | - | Hostname or IP address of the Redis server |
| `REDISPORT` | Redis | 6379 | Port number the Redis server listens on (default: 6379) |
| `REDISUSER` | Redis | default | Username for Redis authentication (default: default) |
| `REDIS_URL` | Redis | - | Full connection URI for Redis (e.g., redis://user:pass@host:port) |
| `REDISPASSWORD` | Redis | (secret) | Redis authentication password, derived from REDIS_PASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated password used to secure the Redis instance |
| `REDIS_PUBLIC_URL` | Redis | - | Publicly accessible Redis connection URI, used for external access |
| `API_KEY` | Tools | (secret) | Auto-generated secret used to secure the MCP server URL endpoint via Bearer token authentication |
| `SEARXNG_URL` | Tools | - | Base URL of the SearXNG instance used for web searches |
| ` CRAWL4AI_URL` | Tools | - | Base URL of the Crawl4AI service used for web crawling and content extraction |
| ` CRAWL4AI_API_TOKEN` | Tools | (secret) | API token for authenticating requests to the Crawl4AI service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/web-tools)
