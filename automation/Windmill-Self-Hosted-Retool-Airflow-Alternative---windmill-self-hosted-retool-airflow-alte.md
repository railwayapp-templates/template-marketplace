# Deploy Windmill (Self-Hosted Retool / Airflow Alternative) on Railway

Self-hosted Retool/Airflow alternative for scripts, APIs & workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-self-hosted-retool-airflow-alte)

## About

Windmill is an open-source developer platform and workflow engine — a self-hosted alternative to Retool, Airflow, and n8n. Turn scripts in Python, TypeScript, Go, Bash, or SQL into internal tools, auto-generated UIs, REST endpoints, and scheduled or event-driven workflows, all from one instance. [Updated August '26]

This template runs the full Windmill stack: a server (web UI + API), a dedicated worker that executes jobs, and a PostgreSQL database that stores scripts, flows, and run history. Server and worker share the same image and database over Railway's private network, so you scale throughput by adding worker replicas without touching the server. Database migrations run automatically on first boot. Sign in with the default admin@windmill.dev / changeme and change the password immediately. Everything persists to a Postgres volume, so redeploys keep your scripts, flows, schedules, and history intact.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| windmill | `ghcr.io/windmill-labs/windmill:1.792.1` | Web service |
| postgres | `postgres:16` | Database |
| humble-tenderness | `ghcr.io/windmill-labs/windmill:1.792.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | windmill | server | Runs this service as the Windmill server (web UI + API). Database migrations run automatically on boot. |
| `PORT` | windmill | 8000 | Port the Windmill server listens on. Must match the public domain's target port. |
| `BASE_URL` | windmill | - | Public URL of your Windmill instance, auto-filled from the generated Railway domain. |
| `RUST_LOG` | windmill | info | Log verbosity: error, warn, info, debug, or trace. |
| `DATABASE_URL` | windmill | - | Postgres connection string, referencing the postgres service over Railway's private network. sslmode=disable is required. |
| `BASE_INTERNAL_URL` | windmill | http://localhost:8000 | Internal URL the server uses to reach itself. Leave as the default. |
| `POSTGRES_DB` | postgres | windmill | Name of the database Windmill uses. Created automatically on first boot. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name used by Windmill to connect. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. Alphanumeric to stay safe inside the connection string. |
| `MODE` | humble-tenderness | worker | Runs this service as a Windmill worker that executes jobs. Add more worker replicas to scale throughput. |
| `RUST_LOG` | humble-tenderness | info | Log verbosity: error, warn, info, debug, or trace. |
| `NUM_WORKERS` | humble-tenderness | 1 | Number of worker processes per container. Increase for more parallelism on a larger container. |
| `DATABASE_URL` | humble-tenderness | - | Postgres connection string, referencing the postgres service over Railway's private network. Must match the server's value. |
| `WORKER_GROUP` | humble-tenderness | default | Worker group this worker belongs to. Leave as default unless you configure dedicated groups. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/windmill-self-hosted-retool-airflow-alte)
