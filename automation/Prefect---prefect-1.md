# Deploy Prefect on Railway

Prefect 3.8 workflow orchestration server and UI with Postgres and login.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prefect-1)

## About

Prefect is a workflow orchestration framework for Python. You turn functions into flows and tasks with decorators, and the Prefect server tracks every run with retries, caching, schedules, concurrency limits and a detailed UI. Data pipelines, machine learning jobs and scripts become observable and repeatable without rewriting them.

This template deploys the Prefect v3.8.6 server and UI from the official image with a Railway Postgres database. The API and UI are protected with basic authentication using a generated password, and analytics are off. Flows running anywhere connect to the public API URL with the same credentials; workers on Railway can use the private URL. The server only orchestrates: add a worker service or run flows from your own machines and CI to execute work. The server is light and fits on the Hobby plan. Back up Postgres regularly to keep the run history.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| prefect | `prefecthq/prefect:3.8.6-python3.12` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | prefect | 4200 |
| `PREFECT_SERVER_ANALYTICS_ENABLED` | prefect | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/bin/tini -g -- /opt/prefect/entrypoint.sh prefect server start --host 0.0.0.0 --port 4200`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/prefect-1)
