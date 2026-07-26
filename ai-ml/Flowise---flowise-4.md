# Deploy Flowise on Railway

Self-hosted Flowise: build AI agents & LLM workflows visually. Your keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-4)

## About

Flowise is an open-source, low-code tool for building AI agents and LLM workflows visually. Drag and drop nodes to create chatbots, RAG pipelines, and agentic apps using your own OpenAI, Anthropic, or other API keys — no vendor lock-in and no per-message fees. This template runs Flowise with a persistent volume, ready in one click.

This template deploys the Flowise application with a persistent volume mounted at /root/.flowise, where its SQLite database, encryption keys, logs, and uploaded files are stored so your flows survive redeploys. All secrets — the credential encryption key and the JWT and session secrets — are generated automatically on deploy. After deploying, open the generated domain and create your admin account on the setup screen. If you add a custom domain, update APP_URL to that domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise | `flowiseai/flowise:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `LOG_PATH` | /root/.flowise/logs |
| `DATABASE_PATH` | /root/.flowise |
| `SECRETKEY_PATH` | (secret) |
| `BLOB_STORAGE_PATH` | /root/.flowise/storage |
| `TOKEN_HASH_SECRET` | (secret) |
| `JWT_AUTH_TOKEN_SECRET` | (secret) |
| `EXPRESS_SESSION_SECRET` | (secret) |
| `JWT_REFRESH_TOKEN_SECRET` | (secret) |
| `DISABLE_FLOWISE_TELEMETRY` | true |
| `FLOWISE_SECRETKEY_OVERWRITE` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-4)
