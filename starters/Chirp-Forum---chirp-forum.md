# Deploy Chirp Forum on Railway

Deploy Chirp Forum with PostgreSQL on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-forum)

## About

Launch a lightweight community forum with passwords, passkeys, recovery codes,
search, unread state, moderation, and durable sessions.

This template launches one Chirp web service and one managed PostgreSQL service.
Railway supplies private database networking, unique application credentials,
public HTTPS access, readiness checks, and persistent storage. After deployment,
visit the setup page to claim the first owner account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [lbliii/chirp-forum](https://github.com/lbliii/chirp-forum) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `FORUM_ENV` | web | production | Application runtime mode. Keep this set to production on Railway. |
| `DATABASE_URL` | web | - | Private PostgreSQL connection URL supplied by the Postgres service. |
| `FORUM_SECRET_KEY` | web | (secret) | Generated signing key for sessions and other security-sensitive application data. |
| `FORUM_BOOTSTRAP_TOKEN` | web | (secret) | One-time token used to claim the first forum owner account at /setup. |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 | Python version used by Railpack to build and run Chirp Forum. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/chirp-forum)
