# Deploy Pocket ID on Railway

Self-hosted OIDC provider with passkey authentication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-id-1)

## About

Pocket ID is a self-hosted OpenID Connect (OIDC) provider that authenticates users with passkeys instead of passwords. It is simple to deploy and supports hardware security keys such as YubiKey.

Hosting Pocket ID requires a single application container and a PostgreSQL database. The app stores user data, registered passkeys, and OIDC client configurations in Postgres and persists uploaded assets to a local volume. Railway provisions the database automatically, wires the connection string via a reference variable, and exposes the app over HTTPS through its built-in proxy ΓÇö so the only post-deploy step is setting your public `APP_URL`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-pocket-id | [c-treinta/railway-pocket-id](https://github.com/c-treinta/railway-pocket-id) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_URL` | railway-pocket-id | - | Public URL where Pocket ID is accessible (e.g. https://your-domain.up.railway.app). Update after deploy. |
| `DB_PROVIDER` | railway-pocket-id | postgres | Database backend. Must be 'postgres' when using Railway Postgres. |
| `TRUST_PROXY` | railway-pocket-id | true | Must be true on Railway ΓÇö all traffic routes through Railway's proxy layer. |
| `ENCRYPTION_KEY` | railway-pocket-id | - | Secret key for encrypting sensitive data ΓÇö auto-generated at deploy time. |
| `DATABASE_CONNECTION_STRING` | railway-pocket-id | - | PostgreSQL connection string ΓÇö injected from managed Postgres service. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/pocket-id-1)
