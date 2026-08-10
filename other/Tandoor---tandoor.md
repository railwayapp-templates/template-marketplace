# Deploy Tandoor on Railway

Deploy and host Tandoor Recipes with PostgreSQL and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tandoor)

## About

Deploy Tandoor on Railway with a digest-pinned application image, PostgreSQL 16,
and persistent storage for recipe media and database data. The template exposes
the web application through Railway while keeping its database connection within
the Railway project.

This community template runs Tandoor 2.6.13 from the official digest-pinned
container image alongside a digest-pinned PostgreSQL 16 Alpine container.
Railway exposes Tandoor on public port `80` and checks application health at
`/`. PostgreSQL is used by Tandoor over Railway's internal service network.
Uploaded media persists at `/opt/recipes/mediafiles`, and PostgreSQL data
persists at `/var/lib/postgresql/data`.

Database connection values are passed to Tandoor with Railway service references
rather than copied credentials. Sensitive application values are generated when
the template is deployed. Keep those reference and generated-variable semantics
intact when editing the template; do not replace them with shared literal
credentials or commit resolved values to source control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tandoor | `vabene1111/recipes:2.6.13@sha256:f6c58afdea7a721d079ebd6ee5483f2c9da77dd1e709e16d60a82c218e80a451` | Web service |
| Postgres | `postgres:16-alpine@sha256:16bc17c64a573ef34162af9298258d1aec548232985b33ed7b1eac33ba35c229` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | Tandoor | Etc/UTC |
| `DB_ENGINE` | Tandoor | django.db.backends.postgresql |
| `SECRET_KEY` | Tandoor | (secret) |
| `TANDOOR_PORT` | Tandoor | 80 |
| `ENABLE_SIGNUP` | Tandoor | 0 |
| `POSTGRES_PORT` | Tandoor | 5432 |
| `POSTGRES_USER` | Tandoor | (secret) |
| `POSTGRES_PASSWORD` | Tandoor | (secret) |
| `POSTGRES_DB` | Postgres | tandoor |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/recipes/mediafiles`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tandoor)
