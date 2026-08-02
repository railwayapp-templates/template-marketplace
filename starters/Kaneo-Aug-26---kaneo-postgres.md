# Deploy Kaneo [Aug 26] on Railway

Self-hosted project management — Kanban, time tracking · Updated Aug 26

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-postgres)

## About

Railway provides a modern, streamlined platform for deploying web applications and databases. This template bundles **Kaneo** — open source project management ("All you need. Nothing you don't.") — running the official `ghcr.io/usekaneo/kaneo` image with a managed Postgres database, configured to work together out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kaneo | [marco-quintella/kaneo-postgres](https://github.com/marco-quintella/kaneo-postgres) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AUTH_SECRET` | kaneo | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kaneo-postgres)
