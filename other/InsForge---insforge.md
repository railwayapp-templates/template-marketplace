# Deploy InsForge on Railway

InsForge is a backend development platform designed for agentic coding.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/insforge)

## About

InsForge is a backend development platform designed for agentic coding, it is suited for teams building applications with AI coding agents who want to move from idea to production without manual backend configuration.

InsForge enables coding agents to provision and operate backend infrastructure such as databases, authentication, storage, functions, deployment, and a model gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgrest | `postgrest/postgrest:v12.2.12` | Database |
| insforge | `ghcr.io/insforge/insforge-oss:v2.0.0` | Web service |
| deno | `ghcr.io/insforge/deno-runtime:latest` | Worker |
| postgres | `ghcr.io/insforge/postgres-all:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGRST_DB_URI` | postgrest | - | postgres db uri |
| `PGRST_DB_POOL` | postgrest | 10 | postgres db pool size. |
| `PGRST_DB_SCHEMA` | postgrest | public | postgres db schema |
| `PGRST_JWT_SECRET` | postgrest | (secret) | postgres jwt secret |
| `PGRST_SERVER_PORT` | postgrest | 3000 | postgrest server port |
| `PGRST_DB_ANON_ROLE` | postgrest | anon | postgrest anonymous role |
| `PORT` | insforge | 7130 | insforge default port |
| `APP_KEY` | insforge | - | insforge app key |
| `JWT_SECRET` | insforge | (secret) | insforge jwt secret |
| `ADMIN_EMAIL` | insforge | admin@example.com | dashboard login account(admin) |
| `POSTGRES_DB` | insforge | - | postgres database name |
| `API_BASE_URL` | insforge | - | api base uri |
| `DATABASE_URL` | insforge | - | database uri |
| `PROJECT_ROOT` | insforge | /app | project root dir |
| `POSTGRES_HOST` | insforge | - | postgres database host. |
| `POSTGRES_PORT` | insforge | 5432 | postgres database port |
| `POSTGRES_USER` | insforge | (secret) | postgres database user |
| `ACCESS_API_KEY` | insforge | (secret) | access api key |
| `ADMIN_PASSWORD` | insforge | (secret) | dashboard login password(admin) |
| `ENCRYPTION_KEY` | insforge | - | system encryption key. |
| `DENO_RUNTIME_URL` | insforge | - | deno runtime access uri |
| `POSTGRES_PASSWORD` | insforge | (secret) | postgres database password |
| `VITE_API_BASE_URL` | insforge | - | dashboard access uri |
| `POSTGREST_BASE_URL` | insforge | - | postgres database uri |
| `PORT` | deno | 7133 | deno listen port |
| `DENO_ENV` | deno | production | deno runtime env |
| `JWT_SECRET` | deno | (secret) | system jwt secret |
| `POSTGRES_DB` | deno | - | postgres database name |
| `POSTGRES_HOST` | deno | - | postgres database host |
| `POSTGRES_PORT` | deno | 5432 | postgres database port |
| `POSTGRES_USER` | deno | (secret) | postgres database user |
| `ENCRYPTION_KEY` | deno | - | system encryption key |
| `POSTGRES_PASSWORD` | deno | (secret) | postgres database password |
| `WORKER_TIMEOUT_MS` | deno | 30000 | worker timeout ms |
| `POSTGREST_BASE_URL` | deno | - | postgres database uri |
| `POSTGRES_DB` | postgres | insforge | postgres database name |
| `POSTGRES_USER` | postgres | (secret) | postgres database user |
| `ENCRYPTION_KEY` | postgres | - | system encryption key. |
| `POSTGRES_PASSWORD` | postgres | (secret) | postgres database password |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/insforge)
