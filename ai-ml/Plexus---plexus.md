# Deploy Plexus on Railway

Unified API gateway for multiple AI providers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plexus)

## About

Plexus is a high-performance API gateway that unifies multiple AI providers—OpenAI, Anthropic, Google Gemini, DeepSeek, Groq, and any OpenAI-compatible endpoint—behind a single API surface. Switch models and providers without rewriting client code, while gaining built-in protocol translation, load balancing, usage tracking, and per-key quota enforcement.

Hosting Plexus requires running a containerized service alongside a persistent database. On Railway, you can deploy the official `ghcr.io/mcowger/plexus` image alongside a PostgreSQL database service. You must set a `DATABASE_URL` pointing to your Postgres instance and an `ADMIN_KEY` for the built-in management dashboard. Once running, Plexus exposes port 4000 for API requests (chat completions, embeddings, transcriptions, and more) and a web UI for configuring providers, model aliases, and API keys. For production workloads, set an `ENCRYPTION_KEY` to enable AES-256-GCM encryption for secrets and tokens at rest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Plexus | `ghcr.io/mcowger/plexus:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | - | Address to bind to. |
| `PORT` | 4000 | HTTP server port. |
| `DATA_DIR` | - | Directory for SQLite database. |
| `ADMIN_KEY` | - | Password for admin dashboard and management API. Server refuses to start if unset. |
| `LOG_LEVEL` | - | Verbosity: `error`, `warn`, `info`, `debug`, `silly` |
| `DATABASE_URL` | sqlite:///app/data/plexus.db | Connection string. Supports sqlite:// and postgres:// URIs. |
| `ENCRYPTION_KEY` | - | 32-byte key for encrypting sensitive data at rest. Generated via: `openssl rand -hex 32` |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/plexus)
