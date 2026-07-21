# Deploy homarr on Railway

Self-hosted dashboard for managing home server apps with 50+ integrations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homarr-2)

## About

Homarr is a lightweight, self-contained Node.js application that can run on minimal hardware. On Railway, it deploys instantly with no external database required — SQLite is included by default. You can optionally configure PostgreSQL or MySQL for multi-user production deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homarr | `ghcr.io/homarr-labs/homarr:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Homarr listens on (container must EXPOSE this) |
| `DB_DRIVER` | better-sqlite3 | Database driver (better-sqlite3 for embedded SQLite) |
| `AUTH_SECRET` | (secret) | Secret used to sign auth tokens — generate a random 32-char string |
| `SECRET_ENCRYPTION_KEY` | (secret) | 64-char hex encryption key — generate your own via: openssl rand -hex 32 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homarr-2)
