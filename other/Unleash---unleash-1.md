# Deploy Unleash on Railway

Unleash 8.2 feature flag server with Postgres and a ready backend token.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unleash-1)

## About

Unleash is an open-source feature management platform. Teams create feature flags with gradual rollouts, targeting, variants and environments in a web UI, and applications evaluate them locally through official SDKs for Node.js, Java, Go, Python, .NET, Ruby, PHP, Rust and frontend frameworks. Flags change instantly without redeploying.

This template deploys Unleash v8.2.0 with a Railway Postgres database. The admin account is `admin` with a password generated at deploy time, so the well-known default password never exists. A backend API token for the `development` environment is created on first start, so an SDK can connect immediately. Database migrations run automatically on boot. Unleash listens on IPv4 and IPv6, so services on the same project can use the private URL. It is light enough for the Hobby plan. Create more tokens and environments in the admin UI. Back up Postgres regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| unleash | `unleashorg/unleash-server:8.2.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | unleash | 4242 |
| `DATABASE_SSL` | unleash | false |
| `INIT_BACKEND_API_TOKENS` | unleash | (secret) |
| `UNLEASH_DEFAULT_ADMIN_PASSWORD` | unleash | (secret) |
| `UNLEASH_DEFAULT_ADMIN_USERNAME` | unleash | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/unleash-1)
