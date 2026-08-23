# Deploy Prefect — Self-Hosted Python Workflow Orchestration on Railway

Self-host Prefect — Pythonic orchestration, password-protected

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prefect-orchestration)

## About

Prefect is a modern open-source workflow orchestration platform for Python — a Pythonic alternative to Airflow where flows are just Python functions decorated with `@flow`. Build, schedule, and monitor data pipelines and automations in code you write in your own repo, with a clean UI for runs, logs, retries, and scheduling. This template deploys the Prefect server (UI, API, scheduler) with PostgreSQL and basic authentication configured — a private, password-protected orchestration backend, ready for your workers to connect, in minutes.

---

Prefect's self-hosted architecture has two things to understand — authentication and the server/worker split — and this template sets both up right.

**Prefect's open-source server has no auth by default — this template adds it.** This is critical: the Prefect OSS server ships with no authentication, no RBAC, and no API keys (those are Prefect Cloud features), so a naive deploy leaves your orchestration API and UI open to anyone with the URL. This template sets `PREFECT_SERVER_API_AUTH_STRING` to a username and password, locking the server behind basic auth from the first deploy. A common gotcha when connecting workers: the client reads `PREFECT_API_AUTH_STRING` (not the SERVER variant), and if `PREFECT_API_KEY` is set anywhere in a worker's environment it takes precedence and causes 401 errors — so leave it unset for self-hosted.

**This deploys the server — workers run separately.** The template runs the Prefect server (UI, API, scheduler) — the orchestration brain, not where your flows execute. Your flow code runs on workers, which you run as separate processes (another Railway service, your own machine, or any compute) that poll this server outbound — no inbound access needed. Point a worker at your server with `PREFECT_API_URL` set to your Railway domain's `/api`, and it picks up scheduled runs. This keeps the server light and lets you size workers per workload.

**PostgreSQL with the right driver prefix.** Prefect stores flow runs, deployments, schedules, logs, and state in PostgreSQL via `PREFECT_API_DATABASE_CONNECTION_URL`, which must use the `postgresql+asyncpg://` driver prefix — a plain `postgresql://` URL won't connect. This template wires it correctly to the managed Postgres, replacing the default SQLite that's unsuitable for a persistent PaaS deployment.

**The UI needs its API URL, and state persists.** `PREFECT_UI_API_URL` (and `PREFECT_SERVER_API_HOST=0.0.0.0`) are set so the web UI reaches the API through your Railway domain — without this, the UI loads but can't reach the backend. All orchestration state — flow runs, deployments, schedules, and logs — lives in PostgreSQL, so it survives redeploys and is the single backup target; the server itself is stateless.

Typical cost: **~$10–15/month** on Railway for the server and PostgreSQL — the server is light, and workers are sized separately to your workloads. Prefect's open-source server is Apache-2.0 and free, versus Prefect Cloud's paid plans.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| prefect-server | `prefecthq/prefect:3.8-python3.12` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | prefect-server | 4200 | PORT |
| `PREFECT_UI_URL` | prefect-server | - | PREFECT UI URL |
| `PREFECT_API_URL` | prefect-server | - | PREFECT API URL |
| `PREFECT_SERVER_API_HOST` | prefect-server | 0.0.0.0 | PREFECT SERVER API HOST |
| `PREFECT_SERVER_API_PORT` | prefect-server | - | PREFECT SERVER API PORT |
| `PREFECT_SERVER_API_AUTH_STRING` | prefect-server | - | PREFECT SERVER API AUTH STRING |
| `PREFECT_API_DATABASE_CONNECTION_URL` | prefect-server | - | PREFECT API DATABASE CONNECTION URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/prefect-orchestration)
