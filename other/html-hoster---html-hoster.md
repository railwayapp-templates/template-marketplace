# Deploy html-hoster on Railway

Publish static HTML pages via REST API or AI agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/html-hoster)

## About

html-hoster is a lightweight REST API server that lets you publish static HTML pages programmatically. Send HTML via curl or an AI agent, get back a public URL — no CMS, no dashboard, no deploy pipeline needed.

html-hoster runs as a single Bun HTTP server exposing REST endpoints and a native MCP server for AI agent integration. This template deploys the full stack automatically: the Bun server is provisioned via the included `nixpacks.toml`, storage is pre-configured, and your public URL is set to the Railway-generated domain. The only thing you choose is your `API_KEY` — the secret token that protects all write operations. Once deployed, pages are served publicly at `/` with no authentication required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| html-hoster | [codebyant/html-hoster](https://github.com/codebyant/html-hoster) (root: /apps/api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP port |
| `API_KEY` | (secret) | Bearer token for all write routes |
| `APP_ENV` | production | App mode: development | demo | production (default) |
| `S3_BUCKET` | - | Bucket name (required for s3) |
| `S3_REGION` | - | Bucket region |
| `S3_ENDPOINT` | - | Custom endpoint (MinIO, R2, non-AWS) |
| `STORAGE_DRIVER` | s3 | local or s3 |
| `PUBLIC_BASE_URL` | http://change-this-with-generated-public-url-later:3000 | Base URL returned in responses |
| `MAX_HTML_SIZE_MB` | 10 | Server |
| `S3_ACCESS_KEY_ID` | - | Access key (required for s3) |
| `S3_SECRET_ACCESS_KEY` | (secret) | Secret key (required for s3) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML, Rust, CSS

[View on Railway →](https://railway.com/deploy/html-hoster)
