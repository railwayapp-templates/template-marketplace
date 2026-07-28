# Deploy Scheduled Jobs | Cron on the Platform's Scheduler, With a Run History on Railway

Cron on Railway's own scheduler, with a run history and alerts on failure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scheduled-jobs-or-cron-on-the-platforms-)

## About

A cron job that runs only when it is supposed to, keeps a record of every run — start, duration, exit code, output — and tells you when one fails.

Three services: the job itself, which exists only while it runs; a small page showing the history; and Postgres holding it.

The scheduling templates already in the catalogue are long-running containers with a cron library inside: one at 524 installs and 60% health, another at 219 and 32%. They stay awake around the clock so that, once a night, they can do thirty seconds of work — and the bill covers all twenty-four hours.

Railway has its own scheduler. It starts the container on your schedule and expects it to exit, which is both cheaper and simpler. What it does not give you is the operational half: no history of what ran, no output kept after the container is gone, and no alert when a run fails. A scheduled task that fails quietly is worse than no scheduled task at all, because you go on believing the work is happening.

This template uses the platform's scheduler and adds the missing half.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Run History | [ak40u/scheduled-jobs-railway-starter](https://github.com/ak40u/scheduled-jobs-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Scheduled Job | [ak40u/scheduled-jobs-railway-starter](https://github.com/ak40u/scheduled-jobs-railway-starter) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Run History | 8080 |
| `HISTORY_TOKEN` | Run History | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JOB_NAME` | Scheduled Job | example |
| `JOB_COMMAND` | Scheduled Job | echo the scheduled job ran at $(date -u) |
| `JOB_TIMEOUT_MS` | Scheduled Job | 900000 |

## Configuration

- **Start command:** `node dist/history.js`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node dist/run-job.js`

**Category:** Other · **Languages:** TypeScript, Shell

[View on Railway →](https://railway.com/deploy/scheduled-jobs-or-cron-on-the-platforms-)
