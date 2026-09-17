# Deploy Marmot on Railway

The open-source context layer for AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/marmot)

## About

[Marmot](https://github.com/marmotdata/marmot) is an open-source data catalog. It indexes the tables,
topics, queues and APIs you already run, enriches them with ownership and business context, and makes
all of it searchable — by your team in a web UI, and by your AI agents over MCP.

This template runs it on Railway with Postgres alongside it, and replaces Marmot's default
`admin:admin` credential before the service is ever reachable from the internet.

Marmot ships as a single static Go binary with its frontend embedded, so the deployed service is one
process with one HTTP port carrying the UI, the REST API and the MCP endpoint. The only thing it
needs beside itself is PostgreSQL, which this template provisions and wires up for you. It runs its
own schema migrations at startup, so there is nothing to initialise by hand.

The catalog lives entirely in Postgres — assets, lineage, glossary, teams, users, API keys. The
volume attached to the service holds only Marmot's plugin cache, which is rebuildable.

Two things are worth knowing before the first deploy. Marmot installs 31 connector plugins from a
container registry when it starts, roughly 800 MB, and there is no setting to narrow that list — so
the first boot takes several minutes and the volume exists to make sure you only pay for it once.
And Marmot's built-in account is `admin:admin` until it is changed, which this template does on your
behalf before the public listener ever opens.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| marmot | [RockinPaul/marmot_railway_template](https://github.com/RockinPaul/marmot_railway_template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | marmot | Database Marmot stores its catalog in. |
| `POSTGRES_USER` | Postgres | (secret) | Database role Marmot connects as. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated per deployment. |
| `PORT` | marmot | 8080 | Port Marmot listens on. Railway probes this variable for the healthcheck, so changing it moves both the server and the probe. |
| `MARMOT_DATABASE_PORT` | marmot | 5432 | Postgres port. |
| `MARMOT_DATABASE_USER` | marmot | (secret) | - |
| `MARMOT_ADMIN_PASSWORD` | marmot | (secret) | Password for the admin account. Marmot ships as admin:admin; this template replaces that on first boot, before the service accepts a public request, and refuses to start without a password of at least 12 characters. |
| `MARMOT_ENCRYPTION_SEED` | marmot | - | Seed the XChaCha20-Poly1305 key for stored pipeline credentials is derived from. Keep it: losing it means losing access to those credentials. |
| `MARMOT_DATABASE_SSLMODE` | marmot | require | Postgres runs with SSL on Railway. |
| `MARMOT_DATABASE_PASSWORD` | marmot | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/marmot)
