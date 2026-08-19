# Deploy Windmill — Self-Hosted Retool & Automation Platform on Railway

Self-host Windmill — code-first internal tools, APIs & workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-automation)

## About

Windmill is an open-source developer platform for building internal tools, automations, and workflows — a self-hosted alternative to Retool, Airplane, and n8n, but code-first. Turn scripts in Python, TypeScript, Go, Bash, or SQL into UIs, APIs, cron jobs, and multi-step flows, with a fast Rust execution engine, auto-generated forms, and approval steps. This template deploys Windmill as a server, a worker, and PostgreSQL, pre-wired — a production automation platform, ready to add more workers as your job volume grows.

---

Windmill's architecture is the thing to understand, and it's what makes it scale cleanly on Railway — this template wires it correctly.

**Server and worker are the same image in different modes.** Windmill runs one image (`ghcr.io/windmill-labs/windmill`) in two roles: `MODE=server` serves the UI and API and is exposed publicly, while `MODE=worker` pulls jobs from the queue and executes them and stays private. They don't talk to each other directly — they coordinate through PostgreSQL. This template deploys both, so you can run and automate workflows immediately.

**Scale by adding more workers.** Because workers are stateless and coordinate through the database, adding job throughput is just adding more worker services: duplicate the worker with the same image, `MODE=worker`, `WORKER_GROUP=default`, and the same `DATABASE_URL`. No message broker, no reconfiguration — the queue lives in Postgres and any worker picks up jobs.

**PostgreSQL holds everything — back it up.** Unlike systems that need a separate queue or broker, Windmill stores its entire state in PostgreSQL: scripts, flows, schedules, resources, secrets, run history, and the job queue itself. So Postgres is the single source of truth and the one component to back up. Migrations run automatically on first boot (about 30–60 seconds).

**Native and standard workers for cost control.** Windmill supports lightweight native workers (roughly 0.1 CPU and 128 MB RAM) for simple scripts, and standard workers (about 1 vCPU and 2 GB RAM) for heavier jobs with dependencies. Right-size your worker services to your workload so you're not paying for idle capacity — a real advantage on Railway's usage-based pricing.
**Set the base URL to your domain.** `BASE_URL` (your Railway or custom domain) tells Windmill its public address, so generated app links, webhooks, and approval URLs resolve correctly. This template wires it to your domain.

**Code-first, with UIs and APIs for free.** Every script automatically gets an auto-generated UI, a REST endpoint, and can be scheduled or chained into flows — so a Python or TypeScript function becomes an internal tool, a webhook, or a cron job without extra work.

Typical cost: **~$5–15/month** on Railway for the server, a worker, and Postgres, scaling with how many workers you run. Windmill's core is open source (AGPL) and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Windmill-Worker | `ghcr.io/windmill-labs/windmill` | Worker |
| Windmill-Server | `ghcr.io/windmill-labs/windmill` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `MODE` | Windmill-Worker | worker | Run as job execution worker |
| `DATABASE_URL` | Windmill-Worker | - | PostgreSQL connection string |
| `WORKER_GROUP` | Windmill-Worker | default | Worker group assignment |
| `MODE` | Windmill-Server | server | Run as API server and frontend |
| `PORT` | Windmill-Server | 8000 | HTTP listening port |
| `BASE_URL` | Windmill-Server | - | Public-facing instance URL |
| `DATABASE_URL` | Windmill-Server | - | PostgreSQL connection string |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/windmill-automation)
