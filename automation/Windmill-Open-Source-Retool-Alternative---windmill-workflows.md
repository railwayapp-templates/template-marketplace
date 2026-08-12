# Deploy Windmill | Open Source Retool Alternative on Railway

Self-hostable Retool/n8n/Airflow alternative for scripts & workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-workflows)

## About

Windmill is an open-source developer platform and workflow engine — a self-hostable
alternative to Retool, n8n, Airflow and Temporal. Turn scripts in Python, TypeScript, Go,
Bash, SQL and more into internal apps, UIs and scheduled or event-driven workflows, with a
job queue, permissions and secrets built in.

This template runs Windmill the way it is meant to run in production: as three separate
services rather than one all-in-one container. A **server** node serves the web UI and API
and runs the database migrations, a dedicated **worker** node pulls jobs from the queue and
executes them, and a **PostgreSQL** database holds every workflow, script, job and secret on
a persistent Railway volume. Splitting the server from the worker is Windmill's own
recommended architecture — the API stays responsive while heavy jobs run on the worker, and
you scale the two independently.

Everything is pinned to the exact upstream image `ghcr.io/windmill-labs/windmill:1.785.0`.
Windmill ships roughly one release a day and runs its schema migrations on startup, so an
image that floats on `:latest` can rewrite your database the next time it restarts. A pinned
tag means the version you deploy is the version you keep until you choose to move it.

- **Server + worker split** — the intended production shape, not a single standalone process.
- **Pinned engine version** — no surprise upgrades or migrations on redeploy.
- **Persistent Postgres volume** — scripts, flows, schedules, secrets and job history survive
  restarts and redeploys.
- **Database wait on boot** — the server and worker wait for Postgres before starting, so a
  cold start never fails the migration on a race.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.10-alpine` | Database |
| Windmill Worker | `ghcr.io/windmill-labs/windmill:1.785.0` | Worker |
| Windmill | `ghcr.io/windmill-labs/windmill:1.785.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | windmill | Database Windmill uses for all of its state. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser Windmill connects as; owns the schema and runs migrations. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated Postgres password, referenced by DATABASE_URL on the app services. |
| `MODE` | Windmill Worker | worker | worker = pulls jobs from the queue and executes them; talks only to the database. |
| `DATABASE_URL` | Windmill Worker | - | Full Postgres connection string; sslmode=disable for the plain private database. |
| `DB_WAIT_HOST` | Windmill Worker | - | Postgres host the boot wait-loop probes. |
| `DB_WAIT_PORT` | Windmill Worker | 5432 | Postgres port the boot wait-loop probes before the worker starts. |
| `WORKER_GROUP` | Windmill Worker | default | Worker group this node joins. Duplicate this service to add parallel workers. |
| `MODE` | Windmill | server | server = API + web UI; runs the DB migrations on boot (workers forced to 0). |
| `PORT` | Windmill | 8000 | HTTP port the server binds; Railway routes traffic and the healthcheck here. |
| `BASE_URL` | Windmill | - | Public URL of this instance; used for webhooks, emails and the SDK base handed to jobs. |
| `DATABASE_URL` | Windmill | - | Full Postgres connection string; sslmode=disable for the plain private database. |
| `DB_WAIT_HOST` | Windmill | - | Postgres host the boot wait-loop probes. |
| `DB_WAIT_PORT` | Windmill | 5432 | Postgres port the boot wait-loop probes before the server starts. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; exec windmill'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/windmill-workflows)
