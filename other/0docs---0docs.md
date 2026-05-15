# Deploy 0docs on Railway

A Mintlify-grade documentation platform you can self-host for free.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0docs)

## About

0docs is an open-source documentation platform with a block-based editor (code, callouts, tabs, cards, API endpoints), a themable design system, branch-based drafts, atomic version publishing, an AI "Ask docs" assistant, and a built-in MCP server so AI agents like Claude Desktop and Cursor can read and edit your docs.

0docs deploys as a single Node service that serves both the API at `/api/*` and the built React frontend at `/`. Railway provisions PostgreSQL automatically; the app picks up `$PORT`, runs idempotent migrations on every boot, and auto-generates its session-signing secret into Postgres on first start. Sessions, the signing secret, and uploaded media all live in the database so nothing depends on the ephemeral container filesystem. Optional S3-compatible storage can be toggled on later via env vars when you outgrow inline BLOBs. The `/api/healthz` endpoint verifies successful boots; the first user to sign up becomes the admin, after which the in-app Team page handles further invites.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| 0docs | [Withso/0docs](https://github.com/Withso/0docs) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | 0docs | production | set environment |
| `ADMIN_EMAIL` | 0docs | - | set admin email |
| `DATABASE_URL` | 0docs | - | Database URL |
| `ADMIN_PASSWORD` | 0docs | (secret) | set admin password |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/0docs)
