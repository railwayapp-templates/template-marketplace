# Deploy Sharkey on Railway

Federated social server with generated root, PostgreSQL, and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sharkey)

## About

Sharkey is a feature-rich federated social platform in the Misskey family, with ActivityPub federation, reactions, custom emoji, rich notes, channels, and Mastodon-compatible APIs. This template deploys stable 2025.4.7 with a generated root account, private PostgreSQL, authenticated Redis, and durable media.

Sign in as `admin` with `SHARKEY_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sharkey | [monotykamary/railway-template-sharkey](https://github.com/monotykamary/railway-template-sharkey) | Web service |
| postgres | `postgres:17.6-alpine` | Database |
| redis | [monotykamary/railway-template-sharkey](https://github.com/monotykamary/railway-template-sharkey) (root: redis) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sharkey | 3000 | Public Sharkey port. |
| `DOMAIN` | sharkey | - | Stable federation domain; do not change after launch. |
| `DB_HOST` | sharkey | - | Private PostgreSQL host. |
| `DB_NAME` | sharkey | sharkey | Database name. |
| `DB_PASS` | sharkey | - | Shared generated database password. |
| `DB_PORT` | sharkey | 5432 | PostgreSQL port. |
| `DB_USER` | sharkey | (secret) | Database user. |
| `REDIS_HOST` | sharkey | - | Private Redis host. |
| `REDIS_PASS` | sharkey | - | Shared generated Redis password. |
| `REDIS_PORT` | sharkey | 6379 | Redis port. |
| `NODE_OPTIONS` | sharkey | --max-old-space-size=2048 | Node.js memory ceiling. |
| `PUBLIC_SCHEME` | sharkey | https | Canonical public URL scheme. |
| `SHARKEY_ADMIN_PASSWORD` | sharkey | (secret) | Generated root administrator password. |
| `POSTGRES_DB` | postgres | sharkey | Sharkey database. |
| `POSTGRES_USER` | postgres | (secret) | Sharkey database user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated database password. |
| `REDIS_PASSWORD` | redis | (secret) | Generated Redis password. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/sharkey/files`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile, JavaScript, Python

[View on Railway →](https://railway.com/deploy/sharkey)
