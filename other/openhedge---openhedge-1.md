# Deploy openhedge on Railway

Discover hedges in event contracts and prediction markets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhedge-1)

## About

openhedge is an open source experimental tool for discovering relevant hedges using event contracts and prediction markets. It does not hold money or place trades. Any order happens on the source venue (today, Kalshi).

This template deploys five services from GitHub (`api`, `sync`, `mcp`, `caddy`) plus Qdrant as `qdrant/qdrant:v1.19.0` with a volume at `/qdrant/storage`. `api` and `mcp` stay private. `caddy` is the only public HTTP edge and reverse-proxies streamable HTTP MCP. `sync` ingests open Kalshi markets and writes embeddings on an hourly cron. You must provide an OpenRouter API key (`OPENROUTER_API_KEY`) for embeddings and search. Point an MCP client at the Caddy public hostname plus `/mcp`. Search stays empty until the first successful `sync` pass (`open batch created=` in logs). After deploy, trigger **Run now** on `sync` if you do not want to wait until `:00` UTC.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | [mark-antal-csizmadia/openhedge](https://github.com/mark-antal-csizmadia/openhedge) | Web service |
| sync | [mark-antal-csizmadia/openhedge](https://github.com/mark-antal-csizmadia/openhedge) | Worker |
| api | [mark-antal-csizmadia/openhedge](https://github.com/mark-antal-csizmadia/openhedge) | Worker |
| mcp | [mark-antal-csizmadia/openhedge](https://github.com/mark-antal-csizmadia/openhedge) | Worker |
| Qdrant | `qdrant/qdrant:v1.19.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | caddy | 8080 | Public Caddy listen port. Keep 8080. Railway's healthcheck and the public domain bind here. |
| `UPSTREAM_URL` | caddy | - | Private MCP host:port for Caddy reverse_proxy. No http:// prefix. Keep the generated default (${{mcp.RAILWAY_PRIVATE_DOMAIN}}:8001). No public domain on mcp. |
| `QDRANT_URL` | sync | - | Private Qdrant HTTP URL. Keep the generated default (${{Qdrant.RAILWAY_PRIVATE_DOMAIN}}:6333). No API key. Image defaults already use HTTP 6333 and /qdrant/storage. |
| `OPENROUTER_API_KEY` | sync | (secret) | OpenRouter API key for embeddings and search. Create one at https://openrouter.ai/keys. The same key is applied to api and sync. |
| `PORT` | api | 8000 | HTTP listen port for the REST API. Keep 8000. MCP talks to this service on :8000; the port is not referenceable as ${{api.PORT}}. |
| `QDRANT_URL` | api | - | Private Qdrant HTTP URL. Keep the generated default (${{Qdrant.RAILWAY_PRIVATE_DOMAIN}}:6333). No API key. Image defaults already use HTTP 6333 and /qdrant/storage. |
| `OPENROUTER_API_KEY` | api | (secret) | OpenRouter API key for embeddings and search. Create one at https://openrouter.ai/keys. The same key is applied to api and sync. |
| `PORT` | mcp | 8001 | HTTP listen port for streamable MCP. Keep 8001. Caddy reverse-proxies this service on :8001; the port is not referenceable as ${{mcp.PORT}}. |
| `OPENHEDGE_API_URL` | mcp | - | Private REST API base URL for MCP. Keep the generated default (${{api.RAILWAY_PRIVATE_DOMAIN}}:8000). No public domain on api. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `python -m openhedge_core.sync_markets`
- **Start command:** `/bin/sh -c 'export API_HOST=0.0.0.0 API_PORT="$PORT"; exec python -m openhedge_core.server'`
- **Start command:** `/bin/sh -c 'export MCP_HOST=0.0.0.0 MCP_PORT="$PORT"; exec python -m openhedge_core.mcp_server'`
- **Volume:** `/qdrant/storage`

**Category:** Other · **Languages:** Python, Shell, Jinja, Dockerfile

[View on Railway →](https://railway.com/deploy/openhedge-1)
