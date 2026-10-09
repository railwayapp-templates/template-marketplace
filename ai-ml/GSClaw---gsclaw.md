# Deploy GSClaw on Railway

Google Search Console MCP server for Claude, ChatGPT and AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gsclaw)

## About

GSClaw is an open-source MCP (Model Context Protocol) server that gives AI assistants such as Claude, ChatGPT, Cursor and VS Code first-party access to your Google Search Console data. Beyond raw queries it ships ready-made SEO analyses: striking-distance keywords, CTR gaps, keyword cannibalization, content decay and period comparisons.

GSClaw runs as a single stateless Node.js service built from the repository's Dockerfile, with no database to manage. It signs in to Google with a service account: create one in Google Cloud, enable the Search Console API, download a JSON key, and add the service account's email as a user on each Search Console property. Paste the key into `GOOGLE_SERVICE_ACCOUNT_JSON`; the template generates `GSCLAW_ACCESS_TOKEN` for you. After deploying, your MCP endpoint is `https://YOUR_DOMAIN/mcp`. Clients send the token as a bearer header, or use `https://YOUR_DOMAIN/mcp/YOUR_TOKEN` in clients that cannot set headers, such as claude.ai custom connectors. A `/healthz` endpoint backs Railway's health checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gsclaw | [tuyakhov/gsclaw](https://github.com/tuyakhov/gsclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the server listens on. Keep 3000; it must match the service's HTTP proxy port. |
| `GSCLAW_ACCESS_TOKEN` | (secret) | Auto-generated secret your AI client must send, as an 'Authorization: Bearer' header or in the URL path /mcp/YOUR_TOKEN. Copy it from this service's Variables after deploying. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | - | Service-account key JSON (raw or base64). See the README quickstart. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gsclaw)
