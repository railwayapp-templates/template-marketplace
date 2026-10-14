# Deploy Prefect | (Just Updated) Workflow Orchestration, Server + Worker + Postgres, Login Protected on Railway

Self-hosted Prefect: server, worker, Postgres, login protected

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prefect-or-just-updated-workflow-orchest)

## About

Prefect is an open-source workflow orchestration platform: write Python flows, schedule them, retry them, and watch every run in a web dashboard. This template deploys a complete self-hosted Prefect 3 stack — API server and UI, a process worker, and a Postgres database — with the dashboard and API protected by a login generated at deploy time.

The template runs three services. `prefect` is the Prefect server (API and dashboard) backed by a Postgres 18 database whose data lives on a persistent volume, so flow runs, deployments, and schedules survive redeploys. `prefect-worker` is a process worker that polls the `default` work pool over Railway's private network and executes your scheduled flow runs. The API and UI sit behind basic authentication: the username is `admin` and the password is the `PREFECT_PASSWORD` variable generated on your `prefect` service. The worker receives the same credentials automatically. To use it from your own machine, run `prefect config set PREFECT_API_URL=https:///api` and `prefect config set PREFECT_API_AUTH_STRING=admin:`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prefect-worker | `prefecthq/prefect:3.8.8-python3.12@sha256:57e02b3f63d663e02b06d4127362ea48d92d4b361fbd96c8ba8f01e5702755f4` | Worker |
| postgres | `postgres:18` | Database |
| prefect | `prefecthq/prefect:3.8.8-python3.12@sha256:57e02b3f63d663e02b06d4127362ea48d92d4b361fbd96c8ba8f01e5702755f4` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PREFECT_PASSWORD` | prefect-worker | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PREFECT_PASSWORD` | prefect | (secret) |
| `POSTGRES_PASSWORD` | prefect | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export PREFECT_API_URL="http://${PREFECT_HOST}:8080/api" PREFECT_API_AUTH_STRING="admin:${PREFECT_PASSWORD}"; exec prefect worker start --pool default --type process'`
- **Start command:** `/bin/sh -c 'export POSTGRES_DB=prefect; exec docker-entrypoint.sh postgres'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export PREFECT_API_DATABASE_CONNECTION_URL="postgresql+asyncpg://postgres:${POSTGRES_PASSWORD}@${PG_HOST}:5432/prefect" PREFECT_SERVER_API_AUTH_STRING="admin:${PREFECT_PASSWORD}" PREFECT_UI_API_URL="https://${PUBLIC_DOMAIN}/api"; exec prefect server start --host 0.0.0.0 --port ${PORT:-8080}'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/prefect-or-just-updated-workflow-orchest)
