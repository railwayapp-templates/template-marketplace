# Deploy Typesense MCP on Railway

Let AI agents query Typesense over MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-typesense-mcp-server-for-agents)

## About

This Railway template runs a Typesense node behind Caddy. Point a community MCP server like TypesenseKit at the public URL and your AI coding agent can search and read schemas using a scoped key, not the admin key.

This template runs Typesense 30 behind Caddy on one Railway service; Caddy listens on PORT 8080 and proxies to 127.0.0.1:8118. Your index stays in the Railway volume at TYPESENSE_DATA_DIR. CORS is off by default. Railway handles TLS, the volume, and restarts, so you skip nginx and certbot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/deploy-typesense-mcp-server-for-agents)
