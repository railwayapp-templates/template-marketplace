# Deploy InsForge on Railway

The all-in-one, open-source backend platform for agentic coding.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/insforge-1)

## About

InsForge is the all-in-one, open-source backend platform for agentic coding. It
gives a coding agent a database, auth, storage, edge functions, hosting and an AI
gateway, and exposes all of it through an MCP server so the agent can operate the
backend the way a backend engineer would.

This template deploys the full self-hosted stack. Nothing in it calls back to a
managed InsForge service.

InsForge is four services, not one: the backend and dashboard, a Postgres
database carrying the extensions its row-level security depends on, PostgREST
generating a REST API from your schema, and a Deno runtime executing edge
functions. They talk to each other over the private network; only the backend
gets a public domain.

Postgres and the function runtime are built from the InsForge repository at
deploy time rather than pulled as prebuilt images, so their configuration and
function host always match the release rather than drifting behind it.

Self-hosting it means running those four services, keeping their credentials in
step, and giving the database and the file store somewhere durable to live. This
template does all of that: two volumes, private hostnames wired between the
services, and every credential generated at deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deno | [InsForge/InsForge](https://github.com/InsForge/InsForge) | Worker |
| postgrest | `postgrest/postgrest:v12.2.12` | Database |
| insforge | `ghcr.io/insforge/insforge-oss:v2.3.0` | Web service |
| postgres | [InsForge/InsForge](https://github.com/InsForge/InsForge) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | deno | 7133 |
| `DENO_DIR` | deno | /deno-dir |
| `DENO_ENV` | deno | production |
| `JWT_SECRET` | deno | (secret) |
| `POSTGRES_DB` | deno | insforge |
| `POSTGRES_PORT` | deno | 5432 |
| `POSTGRES_USER` | deno | (secret) |
| `POSTGRES_PASSWORD` | deno | (secret) |
| `WORKER_TIMEOUT_MS` | deno | 60000 |
| `PGRST_DB_POOL` | postgrest | 50 |
| `PGRST_DB_SCHEMA` | postgrest | public |
| `PGRST_DB_CHANNEL` | postgrest | pgrst |
| `PGRST_JWT_SECRET` | postgrest | (secret) |
| `PGRST_SERVER_HOST` | postgrest | :: |
| `PGRST_SERVER_PORT` | postgrest | 3000 |
| `PGRST_DB_ANON_ROLE` | postgrest | anon |
| `PGRST_DB_CHANNEL_ENABLED` | postgrest | true |
| `PGRST_OPENAPI_SERVER_PROXY_URI` | postgrest | http://localhost:3000 |
| `PORT` | insforge | 7130 |
| `LOGS_DIR` | insforge | /insforge-data/logs |
| `JWT_SECRET` | insforge | (secret) |
| `POSTGRES_DB` | insforge | insforge |
| `STORAGE_DIR` | insforge | /insforge-data/storage |
| `PROJECT_ROOT` | insforge | /app |
| `POSTGRES_PORT` | insforge | 5432 |
| `POSTGRES_USER` | insforge | (secret) |
| `POSTGRES_PASSWORD` | insforge | (secret) |
| `ROOT_ADMIN_PASSWORD` | insforge | (secret) |
| `ROOT_ADMIN_USERNAME` | insforge | (secret) |
| `INSFORGE_DEPLOYMENT_METHOD` | insforge | railway |
| `JWT_EXP` | postgres | 3600 |
| `JWT_SECRET` | postgres | (secret) |
| `POSTGRES_DB` | postgres | insforge |
| `POSTGRES_USER` | postgres | (secret) |
| `ENCRYPTION_KEY` | postgres | secret(32) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `sh -c "deno cache --no-lock functions/server.ts && deno run --no-lock --unstable-worker-options --allow-net --allow-env --allow-read=./functions/worker-template.js functions/server.ts"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/insforge-data`
- **Start command:** `sh -c "docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf -c cron.database_name=insforge -c app.encryption_key=$ENCRYPTION_KEY"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Shell, PLpgSQL, JavaScript, CSS, Dockerfile, HTML, Python

[View on Railway →](https://railway.com/deploy/insforge-1)
