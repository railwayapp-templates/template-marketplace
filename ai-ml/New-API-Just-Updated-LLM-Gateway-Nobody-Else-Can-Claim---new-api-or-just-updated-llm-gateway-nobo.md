# Deploy New API | (Just Updated) LLM Gateway Nobody Else Can Claim on Railway

Multi-provider LLM gateway; admin seeded at boot, sessions survive redeploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/new-api-or-just-updated-llm-gateway-nobo)

## About

New API is an open-source LLM gateway: one OpenAI-compatible endpoint in front of many providers (OpenAI, Anthropic, Gemini, DeepSeek, Azure, and dozens more), with API-key management, per-key quotas, model routing, request logging and a full admin console. This template deploys it with the admin account already created and the session keys pinned, so nobody but you can claim the instance and nobody gets logged out by a redeploy.

This template runs New API v1.0.0-rc.25 as three services: the gateway itself on a persistent volume, PostgreSQL for accounts, keys, channels and logs, and Redis for caching and rate limiting. The admin account is seeded on the volume before the public port is ever served, and the credential is re-applied on every boot, so a redeploy doubles as a working password reset. `SESSION_SECRET` and `CRYPTO_SECRET` are generated once per deployment and published as template variables — upstream defaults both to a fresh UUID at each start, which silently invalidates every session and every stored encrypted value when the container restarts. The public service honours Railway's injected port and is healthchecked on `/api/status`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1-alpine` | Database |
| postgres | `postgres:17.10-alpine` | Database |
| new-api | `ghcr.io/bon5co/new-api-railway:v1.0.0-rc.25` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `CRYPTO_SECRET` | new-api | (secret) |
| `SESSION_SECRET` | new-api | (secret) |
| `NEW_API_ADMIN_PASSWORD` | new-api | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/new-api-or-just-updated-llm-gateway-nobo)
