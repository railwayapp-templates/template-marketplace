# Deploy FastAPI Procrastinate on Railway

FastAPI + Procrastinate + Postgres job queue. Python 3.12, no Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-procrastinate)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new)

Postgres-native background jobs for Python 3.12. FastAPI enqueues, a Procrastinate worker drains the same Postgres, and there is no Redis. Healthcheck: `GET /healthz` (200 even when the queue is empty).

This template runs three services in one Railway project:

1. **API** — FastAPI + uvicorn. `POST /jobs/demo` inserts a job. `GET /healthz` binds `PORT` and returns 200 before any job exists.
2. **Worker** — `python -m app.worker` (or `procrastinate --app=app.tasks.procrastinate_app worker`). Same repo, different start command. Serves `/healthz` on `PORT` so Railway has a liveness probe.
3. **Postgres** — app data and Procrastinate job tables on the private network (`*.railway.internal`). Volume stays on Postgres only.

Railpack builds Python from `.python-version` and `RAILPACK_PYTHON_VERSION=3.12`. First deploy applies the job schema with Alembic (`python -m app.migrate`) and an idempotent `procrastinate` schema apply if the tables are missing.

Procrastinate is the Postgres-native queue. Celery/Huey/RQ templates exist on the marketplace; this one exists so you do not add Redis to get a worker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [bhanuvadlakonda/fast-queue](https://github.com/bhanuvadlakonda/fast-queue) | Worker |
| api | [bhanuvadlakonda/fast-queue](https://github.com/bhanuvadlakonda/fast-queue) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `python -m app.worker`
- **Healthcheck:** `/healthz`
- **Start command:** `python -m app.main`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** Python, TypeScript, Mako, Shell

[View on Railway →](https://railway.com/deploy/fastapi-procrastinate)
