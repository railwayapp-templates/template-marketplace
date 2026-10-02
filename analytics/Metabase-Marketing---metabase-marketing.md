# Deploy Metabase Marketing on Railway

marketing campaign and funnel reporting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-marketing)

## About

Tuesday morning: three ad platform exports, a CRM dump, and a spreadsheet the last growth hire left behind. Nobody's seen campaign-level ROI in two months. Metabase Marketing on Railway turns that pile of CSVs into a Postgres-backed question engine your whole team can actually use — no data engineering sprint required.

Metabase is open-source business intelligence for non-technical folks who need browser-based questions and dashboards, plus raw SQL for analysts. The "Marketing" flavor isn't a fork — it's the same AGPL Metabase pointed at ad exports, UTM-tagged sessions, CRM stages, and the revenue table that ties it together.

Running it on Railway changes the feel of deployment. No EC2 provisioning, Postgres patching, or CORS fights. Add the Metabase service, attach Postgres, set a few env vars, and Railway wires networking, health checks, and TLS.

The catch most first-timers hit: Metabase needs its own application database, and that database must be Postgres in production. If the container falls back to embedded H2, every redeploy wipes questions, dashboards, and users. Point the app at a Railway Postgres service and that problem disappears.

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

[View on Railway →](https://railway.com/deploy/metabase-marketing)
