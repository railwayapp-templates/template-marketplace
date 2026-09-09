# Deploy Switch Console on Railway

Humans and AI agents together in the tools where your team already works

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/switch-console)

## About

Deploy a production-ready instance of **Flint AI Switch** (`v0.25.0`) on Railway, fully equipped with a managed PostgreSQL database, persistent volume storage, and pre-enabled **Gateway** and **Collab (Mattermost)** profiles.

---

Hosting Flint AI Switch on Railway provides an isolated, self-hosted environment for managing and orchestrating AI agents. By utilizing Railway's container orchestration and private networking, this deployment couples the `ghcr.io/sandbox-quantum/standalone-compose:0.25.0` image with a dedicated PostgreSQL database (`mattermost`). Railway automatically handles container lifecycle management, automatic domain assignment, SSL termination, and internal networking.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flint-switch | `ghcr.io/sandbox-quantum/standalone-compose:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | flint-switch | - | Postgresql URL |
| `COMPOSE_PROFILES` | flint-switch | gateway,collab | profiles |
| `SWITCH_BIND_ADDR` | flint-switch | 0.0.0.0 | IP binding |
| `MATRIX_SERVER_NAME` | flint-switch | ${RAILWAY_PUBLIC_DOMAIN:-localhost} | Matrix server |
| `TUWUNEL_SERVER_NAME` | flint-switch | ${RAILWAY_PUBLIC_DOMAIN:-localhost} | Tuwunel server |
| `AGENT_REGISTRATION_TOKEN` | flint-switch | (secret) | Your authentication key |
| `POSTGRES_DB` | Postgres | mattermost | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/tuwunel`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/switch-console)
