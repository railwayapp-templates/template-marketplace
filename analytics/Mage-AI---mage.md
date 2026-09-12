# Deploy Mage AI on Railway

Notebook-style tool for building and scheduling data pipelines

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mage)

## About

Mage AI is an open source data pipeline tool that data and analytics engineers use to build, schedule and monitor the jobs moving data between systems. Each step is a block of Python, SQL or R written in a notebook-style editor; you connect the blocks into a graph, preview each block's output as you go, then attach a trigger and let the built-in scheduler run it. It covers ground that usually takes three tools: loading through its connectors, transformation in code, and orchestration with retries, backfills and run history. Teams pick it over older orchestrators because you see real data at every step while writing the pipeline.

Deploy Mage AI on Railway and this template gives you the workspace wired together. The `mage` service runs the web server and scheduler in one container, on a 5 GB volume holding pipeline code, block outputs, run logs and the key Mage encrypts stored secrets with. A managed `Postgres` holds orchestration metadata: users, triggers, pipeline runs and block runs. A managed `Redis` gives the job queue a liveness key and the scheduler a distributed lock. Only `mage` gets a public domain; Postgres and Redis stay private, reached through reference variables.

![Diagram of the Mage, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1789018429/mage-ai-architecture.png)

Self-hosting Mage AI means running the editor, API, scheduler and execution kernel yourself, so pipeline code and the data it touches never leave infrastructure you control. That matters when pipelines carry customer records or reach a private database.

Key features:

- Notebook-style editor with per-block output previews and charts
- Batch, streaming and data integration pipeline types
- Cron, event and API triggers, plus backfills
- Sources and destinations built on the Singer spec
- Native dbt support, so existing dbt models run as blocks
- Block-level tests, per-block run logs and role-based access control

The architecture is deliberately small. Mage's server forks the scheduler at startup and runs each block in its own subprocess, so one container handles the UI and the work. Postgres stores what the orchestrator needs to survive a restart; Redis lets the queue recover an orphaned job.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mage | [gridalpha/mage-railway](https://github.com/gridalpha/mage-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mage | 6789 | HTTP port the server listens on |
| `REDIS_URL` | mage | - | Job queue liveness and scheduler lock |
| `SERVER_VERBOSITY` | mage | info | Application and Tornado log level |
| `DEFAULT_OWNER_EMAIL` | mage | admin@example.com | Email of the first owner user |
| `DEFAULT_OWNER_PASSWORD` | mage | (secret) | Password of the first owner user |
| `DEFAULT_OWNER_USERNAME` | mage | (secret) | Username of the first owner user |
| `DISABLE_AUTO_BROWSER_OPEN` | mage | 1 | Do not open a browser at startup |
| `SCHEDULER_TRIGGER_INTERVAL` | mage | 10 | Seconds between scheduler ticks |
| `REQUIRE_USER_AUTHENTICATION` | mage | 1 | Require sign-in for the UI and API |
| `MAGE_DATABASE_CONNECTION_URL` | mage | - | Metadata database connection string |
| `MAGE_ACCESS_TOKEN_EXPIRY_TIME` | mage | (secret) | Session token lifetime in seconds |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/src`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mage)
