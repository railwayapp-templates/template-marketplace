# Deploy 0colors on Railway

Build a color system on an infinite canvas.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0colors)

## About

0colors is a self-hosted, open-source design-tokens canvas. Build a complete color system visually on an infinite canvas, derive themes and semantic tokens automatically, and export to CSS variables, Tailwind config, DTCG JSON, or Figma variables. Multi-user with invite-based collaboration. No third-party cloud, no telemetry, no SaaS account required.

This template provisions everything 0colors needs in a single Railway project: one application service (a Hono backend that serves both the JSON API on /api/* and the built React SPA on /) and a Railway-managed Postgres plugin, wired automatically via ${{Postgres.DATABASE_URL}}. One service, one domain, no CORS surface. Schema migrations run idempotently as a pre-deploy command, so updates from the upstream repo apply safely without operator intervention. First boot creates your admin account from the ADMIN_EMAIL and ADMIN_PASSWORD you supply at deploy time; from then on you invite collaborators directly from inside the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 0colors | [Withso/0colors](https://github.com/Withso/0colors) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ADMIN_EMAIL` | 0colors | - | Admin email |
| `DATABASE_URL` | 0colors | - | Database |
| `ADMIN_PASSWORD` | 0colors | (secret) | Admin password |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/0colors)
