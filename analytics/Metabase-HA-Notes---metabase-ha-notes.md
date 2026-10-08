# Deploy Metabase HA Notes on Railway

honest single-node OSS HA expectations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-ha-notes)

## About

This template runs one Metabase JVM and one Postgres app database. No replicas, no multi-region failover. What you do get is healthcheck-gated deploys, automatic restarts after a crash, and a Postgres you can back up and restore. For Monday 9 a.m. dashboards, those three matter more than an HA sticker.

Metabase HA Notes is the official `metabase/metabase` image wired to a companion Postgres on Railway. Not a fork, not a cluster. The name is an honesty exercise: the failure modes, and which Railway primitive covers each.

Picture a redeploy during the Monday report rush. Railway polls `GET /api/health` on port 3000 and only switches traffic once the new container answers 200. If the new build can't reach Postgres because someone typoed `MB_DB_HOST`, the deploy fails and the old container keeps serving. The catch: Railway only checks health at deploy time. A JVM that dies later is the restart policy's job: dashboards blip, in-flight queries error, the container comes back.

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

[View on Railway →](https://railway.com/deploy/metabase-ha-notes)
