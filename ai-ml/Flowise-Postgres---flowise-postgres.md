# Deploy Flowise + Postgres on Railway

Flowise AI agents with Postgres, persistent storage, and auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-postgres)

## About

Self-host Flowise for visual AI agents and LLM workflows with Postgres, persistent storage, generated credentials, and private networking.

- `flowise`: public Flowise web service
- `postgres`: private Postgres database
- Persistent storage for uploads and credential key material
- Generated auth, session, and credential secrets
- No bundled model provider keys

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| flowise | `flowiseai/flowise:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `DATABASE_USER` | flowise | (secret) |
| `FLOWISE_PASSWORD` | flowise | (secret) |
| `FLOWISE_USERNAME` | flowise | (secret) |
| `DATABASE_PASSWORD` | flowise | (secret) |
| `JWT_AUTH_TOKEN_SECRET` | flowise | (secret) |
| `EXPRESS_SESSION_SECRET` | flowise | (secret) |
| `JWT_REFRESH_TOKEN_SECRET` | flowise | (secret) |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-postgres)
