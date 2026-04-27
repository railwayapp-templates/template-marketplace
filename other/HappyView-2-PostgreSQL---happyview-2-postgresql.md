# Deploy HappyView 2 (PostgreSQL) on Railway

A lexicon-driven ATProto AppView.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/happyview-2-postgresql)

## About

HappyView is a lexicon-driven ATProto AppView. Upload lexicon definitions at runtime and HappyView dynamically generates XRPC query and procedure endpoints, indexes records from the network, and proxies writes to users' PDSes. This Railway template uses PostgreSQL for production use.

HappyView can use either SQLite or PostgreSQL for its database. This template deploys HappyView and PostgreSQL pre-configured. PostgreSQL is the recommended backend for large, production deployments.

If you'd prefer to use SQLite, check out the [HappyView w/ SQLite template](https://railway.com/deploy/happyview-2-sqlite-1?referralCode=0QOgj_).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| HappyView | `ghcr.io/gamesgamesgamesgamesgames/happyview:2.3.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RUST_LOG` | HappyView | happyview=info,tower_http=info | Log level filter |
| `PUBLIC_URL` | HappyView | - | Your public URL (e.g. https://happyview-production.up.railway.app) |
| `SESSION_SECRET` | HappyView | (secret) | A random 64+ character string (e.g. `openssl rand -base64 48`) |
| `TOKEN_ENCRYPTION_KEY` | HappyView | (secret) | Base64-encoded 32-byte key for encrypting plugin secrets and DPoP private keys at rest. Required for dashboard-managed plugin secrets and third-party app OAuth sessions (e.g. `openssl rand -base64 32`) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/happyview-2-postgresql)
