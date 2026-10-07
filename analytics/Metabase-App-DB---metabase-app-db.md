# Deploy Metabase App DB on Railway

Postgres app DB, not H2, for production Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-app-db)

## About

Metabase ships with H2 for internal state—fine on a laptop, dangerous in a container. Railway redeploys wipe that file. This template pins the Metabase application database to Postgres so users, dashboards, and settings survive every deploy.

Metabase has two database relationships. The app DB stores its own brain: users, permissions, saved questions, dashboard layouts, settings. Analytics databases are separate, connected after setup through Admin → Databases. This template handles only the app DB: the metabase/metabase image wired to companion Postgres via MB_DB_* variables.

H2 fails because Metabase keeps it as an embedded file on the container filesystem. Railway containers are ephemeral; a rebuild, restart, or image tag change deletes it. Postgres gives transactional migrations, backups, replication, and room to grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase/metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-app-db)
