# Deploy nanollm on Railway

Lightweight LLM gateway with web admin and private persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanollm)

## About

A lightweight LLM gateway with OpenAI Chat Completions, Responses, Anthropic Messages, and OpenAI image API support. Manage providers, models, and fallback groups in a browser.

This template runs two Docker services in US West: nanollm and a private quicSQL database named sqld. Node.js and the Rust OAuth transport helper are built into the gateway image. Each service has its own persistent volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sqld | [sunwu51/nanollm](https://github.com/sunwu51/nanollm) (branch: dev) (root: /.railway/quicsql) | Database |
| nanollm | [sunwu51/nanollm](https://github.com/sunwu51/nanollm) (branch: dev) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NANOLLM_STORAGE` | sqlite | - |
| `NANOLLM_AUTH_TOKEN` | (secret) | - |
| `NANOLLM_SQLITE_URL` | - | Private quicSQL database; keep the /app/ suffix. |
| `NANOLLM_MAX_OLD_SPACE_SIZE` | 256 | - |

## Configuration

- **Healthcheck:** `/_health`
- **Volume:** `/var/lib/sqld`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Rust, Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/nanollm)
