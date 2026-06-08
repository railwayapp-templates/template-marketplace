# Deploy eqms-tenant-template on Railway

PostgreSQL + eqms for isolated per-customer Railway projects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eqms-tenant-template)

## About

What is eqms? eqms is a quality management system for document control, training, CAPA, and compliance workflows. This template deploys a production-ready eqms instance with PostgreSQL on Railway.

This template creates an isolated Railway project with two services: a PostgreSQL database and the eqms Next.js application from GitHub. The database and app are wired together via reference variables. After deploy, open the eqms public URL and verify `/api/health` returns `"ok": true`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eqms | [phillipjamesmarzouk-bot/eqms](https://github.com/phillipjamesmarzouk-bot/eqms) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AUTH_SECRET` | eqms | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Shell, CSS, PLpgSQL

[View on Railway →](https://railway.com/deploy/eqms-tenant-template)
