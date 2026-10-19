# Deploy Listmonk on Railway

Self-hosted newsletter & mailing list manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-3)

## About

Self-hosted newsletter and mailing-list manager (listmonk v6.2.0, AGPL-3.0) with a PostgreSQL 16 companion. One-click deploy: the form has zero fields — the Postgres password is auto-generated and the app is auto-wired over the private network. First boot installs the schema; the setup wizard on the public URL creates your superuser.

- Services: `listmonk` (Go binary) + `postgres` (PostgreSQL 16)
- Volumes: 2 — Postgres data at `/var/lib/postgresql/data`, app uploads at `/data` (`listmonk-data`)
- Memory at rest: ~30–60 MB app, ~100–200 MB Postgres
- Healthcheck: `GET /health` → 200 (public, unauthenticated)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| listmonk | [mc9max/listmonk-lite](https://github.com/mc9max/listmonk-lite) | Web service |
| postgres | [mc9max/listmonk-lite](https://github.com/mc9max/listmonk-lite) (root: postgres) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LISTMONK_db__password` | listmonk | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/listmonk-3)
