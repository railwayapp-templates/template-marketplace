# Deploy dagu on Railway

Dagu 2.17: workflow engine with a web UI for YAML DAGs and cron jobs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dagu-1)

## About

Dagu is a workflow engine with a web UI. You describe jobs as simple YAML files, with steps, dependencies, schedules, retries and parameters, and Dagu runs them, shows live logs and keeps the run history. It is a lighter alternative to Airflow or plain cron for scripts, data jobs and operations tasks.

This template runs the official `ghcr.io/dagucloud/dagu:2.17.0` image as one service. Built-in authentication is on: an admin user is created on first boot from the variables, and the API and UI reject requests without a valid login. DAG files, run history, logs and users live on a Railway volume, so everything survives redeploys. The start command hands the volume to the `dagu` user, so the server runs as UID 1000. Steps run inside this container, so install any tools your scripts need, or call other services over Railway's private network. The service needs about 100 MB of memory plus whatever your jobs use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dagu | `ghcr.io/dagucloud/dagu:2.17.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `DAGU_TZ` | UTC |
| `DAGU_HOST` | :: |
| `DAGU_PORT` | 8080 |
| `DAGU_AUTH_MODE` | builtin |
| `DAGU_AUTH_BUILTIN_TOKEN_SECRET` | (secret) |
| `DAGU_AUTH_BUILTIN_INITIAL_ADMIN_PASSWORD` | (secret) |
| `DAGU_AUTH_BUILTIN_INITIAL_ADMIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -c 'chown -R ${PUID:-1000}:${PGID:-1000} /var/lib/dagu; exec /usr/local/bin/tini -s -g -- /entrypoint.sh dagu start-all'`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/dagu`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/dagu-1)
