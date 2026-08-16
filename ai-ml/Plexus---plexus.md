# Deploy Plexus on Railway

Unified API gateway for multiple AI providers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plexus)

## About

Deploy Plexus `2026.08.12.1`, a unified gateway for OpenAI, Anthropic, Google Gemini, DeepSeek, Groq, and OpenAI-compatible AI providers.

This template runs the official Plexus container as one public service on port 4000. It stores configuration, API keys, usage data, and encrypted provider credentials in SQLite on a persistent Railway volume. `ADMIN_KEY` and `ENCRYPTION_KEY` are generated independently for every deployment.

Open the service domain, enter the generated `ADMIN_KEY`, then configure providers, model aliases, routing, quotas, and scoped API keys in the management dashboard. Keep both generated secrets private and preserve them across redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Plexus | `ghcr.io/mcowger/plexus:2026.08.12.1@sha256:91c02e0fe04886216fe0ddc132a6664a49bd269fe73d428b162381ec6dfe1dd3` | Web service |

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
