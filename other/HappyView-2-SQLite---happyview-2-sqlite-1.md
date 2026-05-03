# Deploy HappyView 2 (SQLite) on Railway

A lexicon-driven ATProto AppView.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/happyview-2-sqlite-1)

## About

HappyView is a lexicon-driven ATProto AppView. Upload lexicon definitions at runtime and HappyView dynamically generates XRPC query and procedure endpoints, indexes records from the network, and proxies writes to users' PDSes. This Railway template uses embedded SQLite, so there's no additional services to manage.

This template deploys HappyView with no external database needed — SQLite runs embedded within the container. SQLite works well for smaller instances and personal projects where you want to keep infrastructure simple.

If you'd prefer to use PostgreSQL, check out the [HappyView w/ Postgres template](https://railway.com/deploy/happyview-2-postgresql).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HappyView | `ghcr.io/gamesgamesgamesgamesgames/happyview:2.4.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RUST_LOG` | happyview=info,tower_http=info | Log level filter |
| `PUBLIC_URL` | - | Your public URL (e.g. https://happyview-production.up.railway.app) |
| `DATABASE_URL` | sqlite:///data/happyview.db?mode=rwc | Database connection string |
| `SESSION_SECRET` | (secret) | A random 64+ character string (e.g. `openssl rand -base64 48`) |
| `TOKEN_ENCRYPTION_KEY` | (secret) | Base64-encoded 32-byte key for encrypting plugin secrets and DPoP private keys at rest. Required for dashboard-managed plugin secrets and third-party app OAuth sessions (e.g. `openssl rand -base64 32`) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/happyview-2-sqlite-1)
