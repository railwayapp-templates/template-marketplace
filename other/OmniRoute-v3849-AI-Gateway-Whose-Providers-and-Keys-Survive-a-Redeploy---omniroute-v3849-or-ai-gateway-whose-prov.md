# Deploy OmniRoute v3.8.49 | AI Gateway Whose Providers and Keys Survive a Redeploy on Railway

[v3.8.49] AI gateway whose providers and keys survive a redeploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-v3849-or-ai-gateway-whose-prov)

## About

OmniRoute is a self-hosted AI gateway: one OpenAI-compatible `/v1` endpoint in front of many
LLM providers, with a dashboard for provider credentials, generated API keys, model aliases,
routing rules and automatic fallback. Point Claude Code, Codex, Cursor, Cline, OpenWebUI or any
OpenAI-compatible SDK at a single base URL and change providers behind it without touching the
client.

This template runs `ghcr.io/bon5co/omniroute-railway`, a thin wrapper over the official upstream
image pinned at **3.8.49**. No fork and no patches — only the configuration a Railway deployment
needs, plus three corrections that are wrong by default on this platform. One service and one
volume; nothing else to pay for.

**Your providers, endpoints and API keys survive a redeploy.** This is the whole reason the
template exists. OmniRoute keeps every piece of its state in one directory — `storage.sqlite`
holds the provider connections, generated API keys and routing rules, and `server.env` holds the
auto-generated `JWT_SECRET` and `STORAGE_ENCRYPTION_KEY` that those stored credentials are
encrypted with. The upstream image is explicit about where that directory is:

```dockerfile

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omniroute | `ghcr.io/bon5co/omniroute-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `INITIAL_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/monitoring/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/omniroute-v3849-or-ai-gateway-whose-prov)
