# Deploy Operately on Railway

Deploy Operately, open-source goal and project tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/operately)

## About

Operately is an open-source goal, project, and OKR tracking tool that replaces status-update
meetings with structured check-ins. This template runs the official `operately/operately`
Docker image on Railway, backed by a separate Postgres service for data storage.

Hosting Operately on Railway means running its Elixir/Phoenix release container next to a
managed Postgres instance, with Railway generating the domain, terminating TLS, and running
the database migration automatically before every deploy — no server to patch, no reverse
proxy to configure by hand.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Operately | [vergissberlin/railwayapp-operately](https://github.com/vergissberlin/railwayapp-operately) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SECRET_KEY_BASE` | Operately | (secret) |
| `ALLOW_LOGIN_WITH_EMAIL` | Operately | (secret) |
| `OPERATELY_BLOB_TOKEN_SECRET_KEY` | Operately | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/media`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/operately)
