# Deploy SuperTokens | Open Source Auth0 Alternative for Authentication on Railway

Self-hosted auth with sessions and social login, Auth0 alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/i1xFfT)

## About

SuperTokens is open-source user authentication: email and password, passwordless, social login, sessions with refresh-token rotation, and multi-factor — running on your own infrastructure, with user data in your own database.

This template runs the SuperTokens core against a PostgreSQL instance on a persistent volume. The core is the stateful half of SuperTokens: it stores users, sessions and tokens, and your backend talks to it through a SuperTokens SDK. The frontend SDK never talks to the core directly.

The core gets a public domain so a backend deployed elsewhere can reach it; Postgres stays private.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| supertokens-core | `supertokens/supertokens-postgresql` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRESQL_CONNECTION_URI` | supertokens-core | - | DB connection URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/i1xFfT)
