# Deploy Dagster on Railway

Production-ready Dagster orchestration with daemon and durable PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dagster)

## About

Dagster is an open-source data orchestrator for building, observing, and operating data assets and jobs. This template deploys Dagster OSS with a public webserver, private daemon, sample asset job, and persistent PostgreSQL storage.

The webserver serves Dagster's UI and GraphQL API, while the private daemon evaluates schedules, dequeues runs, and executes one run at a time. PostgreSQL persists run, event-log, schedule, and concurrency state, so application restarts do not erase orchestration history.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dagster Webserver | [tech-progress/railway-template-dagster](https://github.com/tech-progress/railway-template-dagster) (branch: release-v1) (root: /) | Web service |
| PostgreSQL | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Dagster Daemon | [tech-progress/railway-template-dagster](https://github.com/tech-progress/railway-template-dagster) (branch: release-v1) (root: /) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Dagster Webserver | 3000 |
| `DAGSTER_HOME` | Dagster Webserver | /opt/dagster/dagster_home |
| `POSTGRES_DB` | PostgreSQL | railway |
| `POSTGRES_USER` | PostgreSQL | (secret) |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) |
| `PORT` | Dagster Daemon | 3001 |
| `DAGSTER_HOME` | Dagster Daemon | /opt/dagster/dagster_home |

## Configuration

- **Start command:** `./scripts/start.sh webserver`
- **Healthcheck:** `/server_info`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./scripts/start.sh daemon`
- **Healthcheck:** `/health`

**Category:** Automation · **Languages:** Shell, Python, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/dagster)
