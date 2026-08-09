# Deploy Prefect on Railway

Self-hosted Prefect (Airflow alternative) — password-protected + Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/z8tmK-)

## About

Prefect is a Python orchestration framework for building data pipelines. It turns
an ordinary script into a production workflow with two decorators — `@flow` and
`@task` — and wraps it in scheduling, retries, caching, logging and a UI that shows
you every run.

This template deploys a **self-hosted Prefect server** with its own **PostgreSQL**
database, so your orchestration state lives on infrastructure you control rather
than in a hosted control plane.

**Versions.** Prefect is pinned to the **3.8** line
(`prefecthq/prefect:3.8-python3.12`, currently 3.8.2) and PostgreSQL to **18**
(`postgres-ssl:18`). The pin means a deploy today and a deploy next month give you
the same Prefect minor — the same API, the same UI and the same database schema —
while patch releases still arrive automatically. Check what you are running with
`GET /api/admin/version`.

A self-hosted Prefect deployment is two long-running pieces:

- **The Prefect server** — the REST API and the web UI. It stores deployments,
  schedules, flow runs and logs, and serves the dashboard you watch runs in.
- **PostgreSQL** — where all of that state actually lives. Prefect defaults to
  SQLite locally, which is fine on a laptop and unsuitable for a deployed server;
  Postgres is the supported backend for anything long-lived.

This template provisions both and wires them together: the Postgres service gets a
persistent volume so your run history survives redeploys, and the server is given a
public domain with its API mounted at `/api`. Database migrations run automatically
when the server starts, so there is no manual setup step — deploy, wait for the
server to come up, and open the domain.

Note that a Prefect **server** schedules and records work; it does not execute it.
Running flows requires a **worker** attached to a work pool, which you run wherever
your code should execute — another Railway service, your own machine, or CI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prefect-server | `prefecthq/prefect:3.8-python3.12` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | prefect-server | 4200 | - |
| `PREFECT_SERVER_API_HOST` | prefect-server | 0.0.0.0 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "prefect server start --host 0.0.0.0"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/z8tmK-)
