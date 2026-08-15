# Deploy It's a Plan on Railway

Self-hosted project tracker with boards, cycles and AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/its-a-plan)

## About

It's a Plan is a self-hosted project tracker. It holds projects, issues, boards, cycles and initiatives, and every project defines its own columns, issue types, labels and custom fields. Dashboards, webhooks, a Telegram bot, an MCP server and AI agents that work on issues are included. The source is AGPL-3.0.

The stack is four services built from one repository, plus a database and a bucket. `api` is an Elysia server on Bun that applies its own database migrations on startup and serves the REST API, the MCP endpoint and the auth handler. `web` is a Next.js app rendered on the server; the API origin is compiled into its bundle, so it rebuilds whenever that origin changes. `worker` delivers webhooks and notifications and runs agent schedules. `bot` runs Telegram long polling and stays at a single replica. Postgres holds all data and the bucket holds issue attachments. Secrets are generated at deploy time — you supply two hostnames and nothing else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| bot | [croffasia/itsaplan](https://github.com/croffasia/itsaplan) (branch: release) | Worker |
| api | [croffasia/itsaplan](https://github.com/croffasia/itsaplan) (branch: release) | Web service |
| worker | [croffasia/itsaplan](https://github.com/croffasia/itsaplan) (branch: release) | Worker |
| web | [croffasia/itsaplan](https://github.com/croffasia/itsaplan) (branch: release) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Name of the database created on first boot. |
| `DATABASE_URL` | postgres | - | Connection string used by the api and the worker. |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password, generated per deploy. |
| `NODE_ENV` | bot | production | Runtime mode. Keep it on production. |
| `SERVICE_URL_API` | bot | - | Private address of the API inside the project. |
| `WORKER_INTERNAL_TOKEN` | bot | (secret) | Shared secret for the API internal routes. |
| `PORT` | api | 3000 | Port Railway routes traffic to. |
| `API_URL` | api | - | Public origin of the API. Taken from the web service. |
| `APP_URL` | api | - | Public origin of the web app. Taken from the web service. |
| `API_PORT` | api | 3000 | Port the API process listens on. |
| `NODE_ENV` | api | production | Runtime mode. Keep it on production. |
| `S3_BUCKET` | api | - | Bucket that holds uploaded files. |
| `S3_REGION` | api | - | Region reported to the S3 client. |
| `S3_ENDPOINT` | api | - | Object storage endpoint for attachments. |
| `DATABASE_URL` | api | - | Postgres connection string. |
| `S3_ACCESS_KEY_ID` | api | - | Access key for the bucket. |
| `APP_ENCRYPTION_KEY` | api | - | Encrypts stored AI provider keys. Changing it makes existing ones unreadable. |
| `BETTER_AUTH_SECRET` | api | (secret) | Signs session cookies. Generated per deploy. |
| `S3_FORCE_PATH_STYLE` | api | false | Keep false for Railway buckets. Set true for MinIO. |
| `S3_SECRET_ACCESS_KEY` | api | (secret) | Secret key for the bucket. |
| `WORKER_INTERNAL_TOKEN` | api | (secret) | Shared secret the worker and the bot authenticate with. |
| `NODE_ENV` | worker | production | Runtime mode. Keep it on production. |
| `DATABASE_URL` | worker | - | Postgres connection string. |
| `SERVICE_URL_API` | worker | - | Private address of the API inside the project. |
| `WORKER_INTERNAL_TOKEN` | worker | (secret) | Shared secret for the API internal routes. |
| `PORT` | web | 3001 | Port the web server listens on. |
| `API_URL` | web | - | Public origin of the API, e.g. https://api.example.com. Attach this hostname to the api service after deploy. |
| `APP_URL` | web | - | Public origin of this web app, e.g. https://app.example.com. Attach this hostname to this service after deploy. |
| `HOSTNAME` | web | 0.0.0.0 | Interface the web server binds to. |
| `NODE_ENV` | web | production | Runtime mode. Keep it on production. |
| `NEXT_PUBLIC_API_URL` | web | - | API origin baked into the browser bundle at build time. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/login`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/its-a-plan)
