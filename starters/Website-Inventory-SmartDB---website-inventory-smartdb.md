# Deploy Website Inventory SmartDB on Railway

Railway starter for site route inventory SmartDBs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/website-inventory-smartdb)

## About

Website Inventory SmartDB is a reusable starter for storing tenant, site, and route inventory in Postgres. It ships with health checks, schema-state inspection, release/audit discipline, optional keyword intent tables, and an optional path for semantic storage and API Hub/Voyage rerank integration.

This template deploys a small authenticated Node API plus a Railway Postgres database. It is intended as an operator/data service rather than a public-facing UI. The app exposes /healthz for liveness, /readyz for database and schema readiness, and authenticated /v1/* routes for inventory and preflight workflows. The template wires the app to Postgres, generates an orchestrator bearer token at deploy time, enables keyword-intent tables by default, runs migrations before deploy, and uses /healthz as the Railway healthcheck path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| smartdb-website-inventory-template | [momba5/smartdb-website-inventory-template](https://github.com/momba5/smartdb-website-inventory-template) (branch: main) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENABLE_KEYWORD_INTENT` | smartdb-website-inventory-template | 1 | - |
| `ORCHESTRATOR_AUTH_TOKEN` | smartdb-website-inventory-template | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/website-inventory-smartdb)
