# Deploy Metabase Self Host vs Cloud on Railway

self-host Metabase instead of Metabase Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-self-host-vs-cloud)

## About

Choosing Metabase Cloud Starter (~$85+/mo) versus self-hosting on Railway is mostly a cost-and-control call. This listing is the Railway Metabase + Postgres stack for teams that want the OSS app without the managed Cloud bill.

Metabase boots with an embedded H2 file database locally, but H2 is wiped on redeploy. This template pairs the official `metabase/metabase` image with a managed Postgres service that stores users, questions, dashboards, and settings. The app runs on port 3000 with a health check at `GET /api/health`. First boot runs migrations against Postgres, then you create the admin account in the setup wizard. Your actual analytics databases are separate — connect them later via Admin → Databases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-self-host-vs-cloud)
