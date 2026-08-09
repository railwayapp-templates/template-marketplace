# Deploy Prefect + Worker on Railway

Self-hosted Prefect 3 with a worker — your flows actually run

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prefect-worker)

## About

Prefect is a Python orchestration framework for building data pipelines. Two
decorators — `@flow` and `@task` — turn an ordinary script into a production
workflow with scheduling, retries, caching, logging and a UI that shows you every
run.

This template deploys the **whole loop**: a self-hosted Prefect server, its
PostgreSQL database, and a **worker that is already running and already attached to
a work pool**. Deployments you declare start executing on schedule immediately —
there is no separate machine to keep awake and no `prefect worker start` running on
your laptop.

**Versions.** Prefect is pinned to the **3.8** line (`prefecthq/prefect:3.8-python3.12`,
currently 3.8.2) on both the server and the worker, and PostgreSQL to **18**. Pinning
means a deploy today and a deploy next month give you the same Prefect minor — the
same API, the same UI, the same database schema — while patch releases still arrive
automatically.

Self-hosting Prefect properly means running three things, not one:

1. **The server** — the REST API and the web UI. It stores deployments, schedules,
   flow runs and logs, and decides *when* work is due.
2. **PostgreSQL** — where all of that state lives. Prefect defaults to SQLite, which
   is fine on a laptop and unsuitable for a deployed server.
3. **A worker** — the process that actually *executes* your flows. It polls a work
   pool, claims scheduled runs, and runs them.

The third is the one people miss. A Prefect server with no worker is a control plane
over an empty queue: you can schedule a flow for 3am, and at 3am nothing happens.
The run simply sits in a `Late` state. Most "I self-hosted Prefect and nothing runs"
confusion is exactly this.

This template provisions all three and wires them together. The database is attached
over Railway's private network rather than the public internet. The server gets a
domain and is password-protected with a unique random password generated at deploy
time. The worker waits for the server to finish its migrations, ensures the work pool
exists, registers whatever you declared, and starts polling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| prefect-server | `prefecthq/prefect:3.8-python3.12` | Web service |
| worker | [yuting1214/Prefect-PostgreSQL](https://github.com/yuting1214/Prefect-PostgreSQL) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | prefect-server | 4200 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "prefect server start --host 0.0.0.0 --port 4200"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/prefect-worker)
