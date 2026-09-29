# Deploy Redash on Railway

Redash [Sep '26] (SQL Dashboards/Alerts/Metabase Alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mb8XJA)

## About

Redash is an open source business intelligence tool built for people who write SQL. You connect a data source, write a query, turn the result into a chart, combine charts into dashboards, schedule refreshes and send alerts to Slack or email. No semantic layer to model and no drag-and-drop builder to learn: if you know SQL, you are productive in minutes. This template deploys the full self hosted Redash stack on Railway in one click, already wired and ready for your first query.

Redash is not a single container. A production Redash installation runs the same `redash/redash` image as several services with different roles: a web server for the UI and API, a scheduler that enqueues periodic work, and workers that execute queries, refresh schemas and evaluate alerts. It also needs PostgreSQL to store queries, dashboards, users and cached results, and Redis as the job broker.

Wiring all of that by hand, with the right secrets, queues and connection strings, is where most self hosted Redash attempts stall. This template provisions every service, connects them over Railway's private network, generates the secrets and exposes Redash on an HTTPS domain.

This template includes: Database, Workers, Schedules and Redash Server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KeyDB | `eqalpha/keydb:latest` | Database |
| ADHOC Worker | `redash/redash:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Server | `redash/redash:latest` | Web service |
| Scheduled Worker | `redash/redash:latest` | Worker |
| Worker | `redash/redash:latest` | Worker |
| Scheduler | `redash/redash:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYDB_URL` | KeyDB | - | URL to connect to KeyDB over the private network |
| `KEYDB_HOST` | KeyDB | - | Railway private domain name |
| `KEYDB_PORT` | KeyDB | 6379 | Port to connect to KeyDB over the private network |
| `KEYDB_USER` | KeyDB | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | KeyDB | (secret) | Password to connect to KeyDB |
| `KEYDB_PUBLIC_URL` | KeyDB | - | URL to connect to KeyDB Publically |
| `KEYDB_PUBLIC_HOST` | KeyDB | - | Railway public TCP domain name |
| `KEYDB_PUBLIC_PORT` | KeyDB | - | Port to connect to KeyDB Publically |
| `QUEUES` | ADHOC Worker | queries | - |
| `WORKERS_COUNT` | ADHOC Worker | 2 | - |
| `PYTHONUNBUFFERED` | ADHOC Worker | 0 | - |
| `REDASH_LOG_LEVEL` | ADHOC Worker | INFO | - |
| `POSTGRES_PASSWORD` | ADHOC Worker | (secret) | - |
| `REDASH_SECRET_KEY` | ADHOC Worker | (secret) | - |
| `REDASH_ENFORCE_CSRF` | ADHOC Worker | true | - |
| `REDASH_COOKIE_SECRET` | ADHOC Worker | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | ADHOC Worker | 60 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Server | 5000 | - |
| `PYTHONUNBUFFERED` | Server | 0 | - |
| `REDASH_LOG_LEVEL` | Server | INFO | - |
| `POSTGRES_PASSWORD` | Server | (secret) | - |
| `REDASH_SECRET_KEY` | Server | (secret) | - |
| `REDASH_WEB_WORKERS` | Server | 4 | - |
| `REDASH_ENFORCE_CSRF` | Server | true | - |
| `REDASH_COOKIE_SECRET` | Server | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Server | 60 | - |
| `QUEUES` | Scheduled Worker | scheduled_queries,schemas | - |
| `WORKERS_COUNT` | Scheduled Worker | 1 | - |
| `PYTHONUNBUFFERED` | Scheduled Worker | 0 | - |
| `REDASH_LOG_LEVEL` | Scheduled Worker | INFO | - |
| `POSTGRES_PASSWORD` | Scheduled Worker | (secret) | - |
| `REDASH_SECRET_KEY` | Scheduled Worker | (secret) | - |
| `REDASH_ENFORCE_CSRF` | Scheduled Worker | true | - |
| `REDASH_COOKIE_SECRET` | Scheduled Worker | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Scheduled Worker | 60 | - |
| `QUEUES` | Worker | periodic,emails,default | - |
| `WORKERS_COUNT` | Worker | 1 | - |
| `PYTHONUNBUFFERED` | Worker | 0 | - |
| `REDASH_LOG_LEVEL` | Worker | INFO | - |
| `POSTGRES_PASSWORD` | Worker | (secret) | - |
| `REDASH_SECRET_KEY` | Worker | (secret) | - |
| `REDASH_ENFORCE_CSRF` | Worker | true | - |
| `REDASH_COOKIE_SECRET` | Worker | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Worker | 60 | - |
| `PYTHONUNBUFFERED` | Scheduler | 0 | - |
| `REDASH_LOG_LEVEL` | Scheduler | INFO | - |
| `POSTGRES_PASSWORD` | Scheduler | (secret) | - |
| `REDASH_SECRET_KEY` | Scheduler | (secret) | - |
| `REDASH_ENFORCE_CSRF` | Scheduler | true | - |
| `REDASH_COOKIE_SECRET` | Scheduler | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Scheduler | 60 | - |

## Configuration

- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/app/bin/docker-entrypoint worker`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "/app/bin/docker-entrypoint create_db && exec /app/bin/docker-entrypoint server"`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/bin/docker-entrypoint scheduler`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mb8XJA)
