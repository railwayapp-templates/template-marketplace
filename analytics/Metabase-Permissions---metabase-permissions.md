# Deploy Metabase Permissions on Railway

collection and data permissions in Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-permissions)

## About

Running Metabase without thinking through permissions is how a curious intern accidentally emails a sales forecast to the whole company. The OSS version gives you real, working collection and data sandboxes, but the moment someone asks for SSO or row-level restrictions tied to user attributes, you hit the AGPL ceiling and start reading Pro pricing pages. This guide walks through what the self-hosted permission model actually does on Railway, where it breaks, and how to run it without locking yourself into a managed contract.

You deploy the same `metabase/metabase` image you would run anywhere else. Railway just removes the part where you babysit a VPS, patch Docker, and wonder if your Postgres backups actually restore. The template pairs the Metabase container with a dedicated Postgres service for the application database, not for your analytics data. That distinction matters more than most people expect: the app DB stores users, collections, dashboards, and permission graphs, while the actual warehouse stays wherever it already lives.

Railway's environment variable editor is where the permission-relevant settings live. `MB_ENCRYPTION_SECRET_KEY` has to stay stable across redeploys or Metabase can no longer decrypt stored connection details and sandbox settings. I have seen that exact mistake turn a routine deploy into a 2 a.m. incident where every database connection shows a cryptic "encryption key wrong" error. Set it once, store it somewhere safe, and never rotate it casually.

The app listens on port 3000 and Railway uses the health check at `/api/health`. That endpoint returns 200 when Metabase is up but does not tell you whether migrations are still running. During first boot the container runs schema migrations against the app Postgres before the web UI accepts logins. If you hit the health check too early during a cold start, it looks alive while the setup wizard is still mid-migration.

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

[View on Railway →](https://railway.com/deploy/metabase-permissions)
