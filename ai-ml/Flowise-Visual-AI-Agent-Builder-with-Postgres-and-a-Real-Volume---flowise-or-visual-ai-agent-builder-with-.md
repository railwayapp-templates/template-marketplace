# Deploy Flowise | Visual AI Agent Builder with Postgres and a Real Volume on Railway

Self-host Flowise on Railway: agents, Postgres and flows that survive

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-or-visual-ai-agent-builder-with-)

## About

Flowise is a visual builder for LLM apps and agents: you wire nodes together on a canvas, attach credentials and vector stores, and expose the result as a chat widget or an API endpoint.

This template runs the official flowiseai/flowise image on a pinned release, backed by Postgres and a persistent volume.

That combination is the point. Flowise defaults to a SQLite file and a generated encryption key inside the container. On a platform that replaces the container on every deploy, that means the flows, the API keys and the credentials you saved are gone the next time you redeploy - and because the encryption key is regenerated too, even a restored database would not decrypt.

Here the data lives in Postgres, uploads and API keys live on a volume at /root/.flowise, and the encryption key, JWT secrets, session secret and token hash secret are generated once per deployment and kept as service variables. Redeploys keep your work and keep you logged in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Flowise | `flowiseai/flowise:3.1.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | flowise |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Flowise | 3000 |
| `LOG_PATH` | Flowise | /root/.flowise/logs |
| `APIKEY_PATH` | Flowise | /root/.flowise |
| `DATABASE_SSL` | Flowise | false |
| `DATABASE_PORT` | Flowise | 5432 |
| `DATABASE_TYPE` | Flowise | postgres |
| `DATABASE_USER` | Flowise | (secret) |
| `SECRETKEY_PATH` | Flowise | (secret) |
| `SECURE_COOKIES` | Flowise | true |
| `BLOB_STORAGE_PATH` | Flowise | /root/.flowise/storage |
| `DATABASE_PASSWORD` | Flowise | (secret) |
| `NUMBER_OF_PROXIES` | Flowise | 1 |
| `TOKEN_HASH_SECRET` | Flowise | (secret) |
| `JWT_AUTH_TOKEN_SECRET` | Flowise | (secret) |
| `EXPRESS_SESSION_SECRET` | Flowise | (secret) |
| `JWT_REFRESH_TOKEN_SECRET` | Flowise | (secret) |
| `DISABLE_FLOWISE_TELEMETRY` | Flowise | true |
| `FLOWISE_SECRETKEY_OVERWRITE` | Flowise | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-or-visual-ai-agent-builder-with-)
