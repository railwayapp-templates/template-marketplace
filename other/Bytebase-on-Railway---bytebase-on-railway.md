# Deploy Bytebase on Railway on Railway

Deploy Bytebase with Railway-native Postgres metadata storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebase-on-railway)

## About

Bytebase is a database DevSecOps and change-management platform for managing database schema changes, reviews, environments, and governance workflows.

This Railway template deploys Bytebase with a pinned upstream image wrapper and Railway-native Postgres for Bytebase metadata storage.

Hosting Bytebase gives your team a self-managed control plane for database change workflows. Railway handles the app service, public HTTPS route, environment variables, health check, and Postgres metadata database so you do not have to assemble those pieces manually.

This template is intentionally small:

- One Bytebase app service.
- One Railway Postgres metadata database.
- Public HTTPS route for the Bytebase UI.
- Health check at `/healthz`.
- External URL wired from the generated Railway domain.

The base deploy does not collect target database credentials, SSO secrets, Git provider tokens, or AI keys. Configure those inside Bytebase after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| bytebase | [l4time/railway-bytebase-template](https://github.com/l4time/railway-bytebase-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | bytebase | 8080 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bytebase-on-railway)
