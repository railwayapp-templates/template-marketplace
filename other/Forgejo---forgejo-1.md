# Deploy Forgejo on Railway

Self-hosted Git service with repos, issues, PRs, and CI/CD

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/forgejo-1)

## About

Forgejo is a self-hosted, lightweight Git service ΓÇö a community-driven fork of Gitea. It provides Git repository hosting, issue tracking, pull requests, CI/CD pipelines, and a full web interface for collaborative software development.

Hosting Forgejo requires a persistent volume to store repositories, configuration files, and attachments across redeployments. It also depends on a PostgreSQL database for metadata storage. On Railway, Forgejo runs as a single Docker-based service backed by a Railway-managed Postgres instance. The `FORGEJO__` environment variable prefix maps directly to Forgejo's `app.ini` configuration, making it straightforward to tune the server without mounting custom config files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| railway-forgejo | [c-treinta/railway-forgejo](https://github.com/c-treinta/railway-forgejo) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | railway-forgejo | 3000 | HTTP port Forgejo listens on |
| `FORGEJO__database__HOST` | railway-forgejo | - | Postgres private host:port |
| `FORGEJO__database__NAME` | railway-forgejo | - | Postgres database name |
| `FORGEJO__database__USER` | railway-forgejo | (secret) | Postgres username |
| `FORGEJO__server__DOMAIN` | railway-forgejo | - | Public domain |
| `FORGEJO__database__PASSWD` | railway-forgejo | - | Postgres password |
| `FORGEJO__server__ROOT_URL` | railway-forgejo | - | Public URL |
| `FORGEJO__database__DB_TYPE` | railway-forgejo | postgres | Database engine |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`

**Category:** Other · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/forgejo-1)
