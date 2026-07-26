# Deploy maxun on Railway

No-code platform for web scraping, crawling, search and AI data extraction

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maxun)

## About

Maxun is an open-source no-code platform for web scraping, crawling, search, and AI data extraction. Train robots in minutes to turn websites into structured APIs, schedules, and automations—without writing scrapers by hand.

This template deploys Maxun as a multi-service stack: an nginx gateway (single public origin for UI + API), frontend, backend, remote Chromium browser, PostgreSQL, and MinIO for screenshots. The gateway is required so Maxun’s httpOnly auth cookie works across login and API calls. Expect higher memory use on the backend and browser services during recording and scheduled runs. Optional Anthropic/OpenAI keys unlock AI mode; Google/Airtable OAuth is optional for integrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gateway | [osbytes/template-maxun](https://github.com/osbytes/template-maxun) (root: /services/gateway) | Web service |
| frontend | [osbytes/template-maxun](https://github.com/osbytes/template-maxun) (root: /services/frontend) | Worker |
| backend | [osbytes/template-maxun](https://github.com/osbytes/template-maxun) (root: /services/backend) | Worker |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| browser | [osbytes/template-maxun](https://github.com/osbytes/template-maxun) (root: /services/browser) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | maxun | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | gateway | 8080 | - |
| `PORT` | frontend | 5173 | - |
| `FRONTEND_PORT` | frontend | 5173 | - |
| `PORT` | backend | 8080 | - |
| `DB_SSL` | backend | false | - |
| `DB_PORT` | backend | 5432 | - |
| `DB_USER` | backend | (secret) | - |
| `NODE_ENV` | backend | production | - |
| `JWT_SECRET` | backend | (secret) | - |
| `MINIO_PORT` | backend | 9000 | - |
| `DB_PASSWORD` | backend | (secret) | - |
| `BACKEND_PORT` | backend | 8080 | - |
| `SESSION_SECRET` | backend | (secret) | - |
| `BROWSER_WS_PORT` | backend | 3001 | - |
| `MAXUN_TELEMETRY` | backend | true | - |
| `MINIO_SECRET_KEY` | backend | (secret) | - |
| `BROWSER_HEALTH_PORT` | backend | 3002 | - |
| `PORT` | minio | 9000 | - |
| `MINIO_ROOT_USER` | minio | (secret) | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | - |
| `PORT` | browser | 3002 | - |
| `NODE_ENV` | browser | production | - |
| `BROWSER_WS_PORT` | browser | 3001 | - |
| `BROWSER_HEALTH_PORT` | browser | 3002 | - |
| `PLAYWRIGHT_BROWSERS_PATH` | browser | /ms-playwright | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Start command:** `minio server /data --console-address :9001`

**Category:** Automation · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/maxun)
