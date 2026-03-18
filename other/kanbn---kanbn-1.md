# Deploy kan.bn on Railway

open-source project management alternative to Trello

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kanbn-1)

## About

Kan is an open-source project management tool and Trello alternative. It offers kanban boards with workspace collaboration, board visibility controls, labels and filters, comments, activity logging, Trello imports, and reusable board templates—all self-hosted under the AGPLv3 license.

Kan is a Next.js application that requires a PostgreSQL database. For a minimal deployment, you only need the Kan container and a PostgreSQL database with two required environment variables: `BETTER_AUTH_SECRET` for session encryption and `NEXT_PUBLIC_BASE_URL` for your deployment URL. The first user to sign up can start creating workspaces and boards immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| kan | `ghcr.io/kanbn/kan:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_URL` | kan | - | Postgres URL |
| `BETTER_AUTH_SECRET` | kan | (secret) | Better auth secret |
| `NEXT_PUBLIC_BASE_URL` | kan | - | Public domain |
| `NEXT_PUBLIC_DISABLE_SIGN_UP` | kan | false | Disable sign up |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | kan | (secret) | Allow email & password login |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/kanbn-1)
