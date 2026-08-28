# Deploy Dagster on Railway

Data orchestrator that builds and tracks your tables and models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dagster-orchestrator)

## About

Dagster is an open-source data orchestrator built around software-defined assets. Rather than describing a pipeline as a sequence of tasks, you declare the tables, files and models your code produces; Dagster works out what to run, records every materialization, and tracks lineage between them. Data teams use it to schedule dbt projects, keep warehouse tables fresh, and get a catalog that explains where a number came from.

Self-host Dagster on Railway with the production split its own documentation recommends: a webserver for the UI and GraphQL API, a daemon for schedules, sensors and the run queue, and a gRPC code server that loads your Python and executes runs. Deploy Dagster with Postgres wired up for run storage and the event log, a bucket for step logs and asset values, and an authenticating gateway in front — the open-source webserver has no login, and anything that reaches it can launch and terminate runs.

![Diagram of the Dagster services, Postgres and bucket on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787765703/dagster-architecture.png)

Dagster inverts the usual orchestration model. A task scheduler knows only that step B follows step A; Dagster knows `daily_revenue` is built from `raw_orders`, so it can say which downstream tables are stale, re-run only what changed, and attach metadata to each materialization.

- **Software-defined assets** with lineage across Python, dbt, Spark and SQL
- **Asset checks** that assert data quality and surface failures in the catalog
- **Schedules, sensors and declarative automation** from one daemon process
- **Backfills and partitions** for reprocessing date ranges without custom scripts
- **A run queue** with concurrency limits, and event logs queryable via GraphQL

The deployment splits into four roles because Dagster expects them separate. The **webserver** serves the UI and GraphQL API and holds no state. The **daemon** owns everything time-based: ticking schedules, evaluating sensors, dequeuing runs and monitoring crashed ones. The **code server** isolates your project, so a broken import shows as a code location error rather than taking the instance down; run workers spawn inside its container. **Postgres** holds run history, the event log and schedule state; the **bucket** holds step stdout and the values assets pass between each other, since every run worker is a separate process with its own filesystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dagster-code | [gridalpha/dagster-railway](https://github.com/gridalpha/dagster-railway) | Database |
| dagster-daemon | [gridalpha/dagster-railway](https://github.com/gridalpha/dagster-railway) | Database |
| dagster-gateway | [gridalpha/dagster-railway](https://github.com/gridalpha/dagster-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| dagster-webserver | [gridalpha/dagster-railway](https://github.com/gridalpha/dagster-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dagster-code | 4001 | Health check listening port |
| `DAGSTER_ROLE` | dagster-code | code | Runs the gRPC code server and run workers |
| `DAGSTER_PG_URL` | dagster-code | - | Run, event and schedule storage |
| `AWS_ACCESS_KEY_ID` | dagster-code | - | Bucket access key |
| `DAGSTER_GRPC_PORT` | dagster-code | 4000 | gRPC code location port |
| `DAGSTER_S3_BUCKET` | dagster-code | - | Bucket for logs and asset values |
| `DAGSTER_S3_PREFIX` | dagster-code | dagster | Key prefix inside the bucket |
| `DAGSTER_S3_REGION` | dagster-code | - | Object storage region |
| `DAGSTER_MODULE_NAME` | dagster-code | railway_demo.definitions | Module holding your Definitions |
| `DAGSTER_S3_ENDPOINT` | dagster-code | - | Object storage endpoint URL |
| `AWS_SECRET_ACCESS_KEY` | dagster-code | (secret) | Bucket secret key |
| `DAGSTER_LOCATION_NAME` | dagster-code | railway | Code location name in the UI |
| `DAGSTER_MAX_CONCURRENT_RUNS` | dagster-code | 10 | Run queue width |
| `PORT` | dagster-daemon | 4001 | Health check listening port |
| `DAGSTER_ROLE` | dagster-daemon | daemon | Runs schedules, sensors and the run queue |
| `DAGSTER_PG_URL` | dagster-daemon | - | Run, event and schedule storage |
| `AWS_ACCESS_KEY_ID` | dagster-daemon | - | Bucket access key |
| `DAGSTER_CODE_HOST` | dagster-daemon | - | gRPC code location host |
| `DAGSTER_GRPC_PORT` | dagster-daemon | 4000 | gRPC code location port |
| `DAGSTER_S3_BUCKET` | dagster-daemon | - | Bucket for logs and asset values |
| `DAGSTER_S3_PREFIX` | dagster-daemon | dagster | Key prefix inside the bucket |
| `DAGSTER_S3_REGION` | dagster-daemon | - | Object storage region |
| `DAGSTER_S3_ENDPOINT` | dagster-daemon | - | Object storage endpoint URL |
| `AWS_SECRET_ACCESS_KEY` | dagster-daemon | (secret) | Bucket secret key |
| `DAGSTER_LOCATION_NAME` | dagster-daemon | railway | Code location name in the UI |
| `DAGSTER_MAX_CONCURRENT_RUNS` | dagster-daemon | 10 | Run queue width |
| `PORT` | dagster-gateway | 8080 | Public HTTP listening port |
| `DAGSTER_ROLE` | dagster-gateway | gateway | Runs Caddy with HTTP basic auth |
| `DAGSTER_AUTH_USER` | dagster-gateway | (secret) | Gateway username |
| `DAGSTER_AUTH_PASSWORD` | dagster-gateway | (secret) | Gateway password, hashed at boot |
| `DAGSTER_GATEWAY_UPSTREAM` | dagster-gateway | - | Private webserver address |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | dagster-webserver | 3000 | HTTP listening port |
| `DAGSTER_ROLE` | dagster-webserver | webserver | Runs the Dagster UI and GraphQL API |
| `DAGSTER_PG_URL` | dagster-webserver | - | Run, event and schedule storage |
| `AWS_ACCESS_KEY_ID` | dagster-webserver | - | Bucket access key |
| `DAGSTER_CODE_HOST` | dagster-webserver | - | gRPC code location host |
| `DAGSTER_GRPC_PORT` | dagster-webserver | 4000 | gRPC code location port |
| `DAGSTER_S3_BUCKET` | dagster-webserver | - | Bucket for logs and asset values |
| `DAGSTER_S3_PREFIX` | dagster-webserver | dagster | Key prefix inside the bucket |
| `DAGSTER_S3_REGION` | dagster-webserver | - | Object storage region |
| `DAGSTER_S3_ENDPOINT` | dagster-webserver | - | Object storage endpoint URL |
| `AWS_SECRET_ACCESS_KEY` | dagster-webserver | (secret) | Bucket secret key |
| `DAGSTER_LOCATION_NAME` | dagster-webserver | railway | Code location name in the UI |
| `DAGSTER_MAX_CONCURRENT_RUNS` | dagster-webserver | 10 | Run queue width |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/opt/dagster/dagster_home`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/server_info`

**Category:** Automation · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dagster-orchestrator)
