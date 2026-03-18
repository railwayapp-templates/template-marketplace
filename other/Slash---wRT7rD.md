# Deploy Slash on Railway

An open source, self-hosted links shortener and sharing platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wRT7rD)

## About

# Slash

**Slash** is an open source, self-hosted links shortener and sharing platform. It allows you to organize your links with tags, and share them with custom shortened URLs. Slash also supports team sharing of link libraries for easy collaboration.

![demo](https://github.com/yourselfhosted/slash/raw/main/docs/assets/demo.png)

## Background

In today's workplace, essential information is often scattered across the cloud in the form of links. We understand the frustration of endlessly searching through emails, messages, and websites just to find the right link. Links are notorious for being unwieldy, complex, and easily lost in the shuffle. Remembering and sharing them can be a challenge.

That's why we developed Slash, a solution that transforms these links into easily accessible, discoverable, and shareable shortcuts(e.g., `s/shortcut`). Say goodbye to link chaos and welcome the organizational ease of Slash into your daily online workflow.

## Features

- Create customizable `s/` short links for any URL.
- Share short links public or only with your teammates.
- View analytics on link traffic and sources.
- Easy access to your shortcuts with browser extension.
- Share your shortcuts with Collection to anyone, on any browser.
- Open source self-hosted solution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:15` | Database |
| Slash | `yourselfhosted/slash:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | Postgres | - | Private database host used for liveness check by clients |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private database port used for liveness check by clients |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database privately |
| `PORT` | Slash | - | The port Slash runs on internally |
| `SLASH_DSN` | Slash | - | Private DSN for database connection |
| `SLASH_PORT` | Slash | 8080 | The port Slash runs on internally |
| `SLASH_DRIVER` | Slash | postgres | Use Postgres |
| `SLASH_METRIC` | Slash | false | Disallow metric collection |
| `PGHOST_PRIVATE` | Slash | - | Private database host used for liveness check |
| `PGPORT_PRIVATE` | Slash | - | Private database port used for liveness check |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Slash | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |

## Configuration

- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh postgres --port=${PGPORT_PRIVATE}"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "echo 'Waiting for database...'; while ! nc -z ${PGHOST_PRIVATE} ${PGPORT_PRIVATE}; do sleep 1; done; ./slash"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/slash`

**Category:** Other

[View on Railway →](https://railway.com/template/wRT7rD)
