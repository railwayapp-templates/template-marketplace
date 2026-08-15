# Deploy Kestra on Railway

Orchestration platform for data, AI, and infrastructure workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-railway)

## About

Kestra is an open-source orchestration platform that runs declarative YAML workflows on a schedule, on an event, or through its API. Teams adopt it as an Apache Airflow and Astronomer alternative because a flow is a versionable YAML file, not a Python DAG, so one workflow can chain a shell script, a Python job, a SQL query and any of Kestra's 1,900+ plugins. The Apache 2.0 core lets you self-host Kestra with no seat or execution limits.

Self-host Kestra on Railway in the distributed topology upstream documents for production. Six services deploy together: **kestra-webserver** serves the UI and REST API on the public domain, **kestra-executor** drives orchestration logic and flow triggers, **kestra-scheduler** evaluates schedules, and **kestra-worker** runs the tasks. Managed **Postgres** is the JDBC backend holding the queue and the repository; a managed **object storage bucket** is Kestra's internal storage. All four Kestra services build from one public repo, [gridalpha/kestra-railway](https://github.com/gridalpha/kestra-railway), wrapping `kestra/kestra:v1.3.33` and taking each role from a single `KESTRA_COMPONENT` variable. There are no volumes: the shared bucket is the storage.

![Kestra Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786743054/4ebdd1d0-3b99-4fef-b7dc-5201fc7262ab.png)

Kestra separates *what* runs from *how* it runs: you declare tasks, triggers, inputs and outputs in YAML, and the platform handles queuing, concurrency, retries and observability. Teams self-host it when workflows touch private databases or regulated data.

- Schedule, webhook, polling and flow triggers, plus a REST API for programmatic runs
- Python, Node.js, Shell and R scripts as first-class tasks that pass files between them
- 1,900+ plugins across AWS, GCP, Azure, Postgres, Kafka, dbt, Terraform, Slack and LLM providers

The Railway layout mirrors Kestra's own distributed deployment: the webserver is the only public service and runs the embedded indexer the JDBC backend needs, the executor and scheduler decide what runs, the worker runs it, and all four coordinate through Postgres.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kestra-scheduler | [gridalpha/kestra-railway](https://github.com/gridalpha/kestra-railway) | Worker |
| kestra-webserver | [gridalpha/kestra-railway](https://github.com/gridalpha/kestra-railway) | Web service |
| kestra-worker | [gridalpha/kestra-railway](https://github.com/gridalpha/kestra-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kestra-executor | [gridalpha/kestra-railway](https://github.com/gridalpha/kestra-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | kestra-scheduler | 8081 | Management port for health checks |
| `KESTRA_URL` | kestra-scheduler | - | Public base URL for links |
| `DATABASE_URL` | kestra-scheduler | - | Postgres connection string |
| `KESTRA_COMPONENT` | kestra-scheduler | scheduler | Starts the trigger scheduler |
| `KESTRA_SECRET_SEED` | kestra-scheduler | (secret) | Shared secrets encryption seed |
| `KESTRA_DB_POOL_SIZE` | kestra-scheduler | 10 | JDBC connection pool size |
| `KESTRA_STORAGE_BUCKET` | kestra-scheduler | - | Internal storage bucket name |
| `KESTRA_STORAGE_REGION` | kestra-scheduler | - | Bucket region |
| `KESTRA_STORAGE_ENDPOINT` | kestra-scheduler | - | S3-compatible storage endpoint |
| `KESTRA_STORAGE_ACCESS_KEY` | kestra-scheduler | - | Bucket access key id |
| `KESTRA_STORAGE_SECRET_KEY` | kestra-scheduler | (secret) | Bucket secret access key |
| `KESTRA_BASIC_AUTH_PASSWORD` | kestra-scheduler | (secret) | Shared login password |
| `KESTRA_BASIC_AUTH_USERNAME` | kestra-scheduler | (secret) | Shared login email |
| `PORT` | kestra-webserver | 8080 | HTTP port behind the public domain |
| `KESTRA_URL` | kestra-webserver | - | Public base URL for links |
| `DATABASE_URL` | kestra-webserver | - | Postgres connection string |
| `KESTRA_COMPONENT` | kestra-webserver | webserver | Starts the UI and REST API |
| `KESTRA_SECRET_SEED` | kestra-webserver | (secret) | Seed for secrets encryption key |
| `KESTRA_DB_POOL_SIZE` | kestra-webserver | 10 | JDBC connection pool size |
| `KESTRA_STORAGE_BUCKET` | kestra-webserver | - | Internal storage bucket name |
| `KESTRA_STORAGE_REGION` | kestra-webserver | - | Bucket region |
| `KESTRA_STORAGE_ENDPOINT` | kestra-webserver | - | S3-compatible storage endpoint |
| `KESTRA_STORAGE_ACCESS_KEY` | kestra-webserver | - | Bucket access key id |
| `KESTRA_STORAGE_SECRET_KEY` | kestra-webserver | (secret) | Bucket secret access key |
| `KESTRA_BASIC_AUTH_PASSWORD` | kestra-webserver | (secret) | Login password, 8+ characters |
| `KESTRA_BASIC_AUTH_USERNAME` | kestra-webserver | (secret) | Login email, valid address required |
| `PORT` | kestra-worker | 8081 | Management port for health checks |
| `KESTRA_URL` | kestra-worker | - | Public base URL for links |
| `DATABASE_URL` | kestra-worker | - | Postgres connection string |
| `KESTRA_COMPONENT` | kestra-worker | worker | Starts the task worker |
| `KESTRA_SECRET_SEED` | kestra-worker | (secret) | Shared secrets encryption seed |
| `KESTRA_DB_POOL_SIZE` | kestra-worker | 10 | JDBC connection pool size |
| `KESTRA_STORAGE_BUCKET` | kestra-worker | - | Internal storage bucket name |
| `KESTRA_STORAGE_REGION` | kestra-worker | - | Bucket region |
| `KESTRA_STORAGE_ENDPOINT` | kestra-worker | - | S3-compatible storage endpoint |
| `KESTRA_STORAGE_ACCESS_KEY` | kestra-worker | - | Bucket access key id |
| `KESTRA_STORAGE_SECRET_KEY` | kestra-worker | (secret) | Bucket secret access key |
| `KESTRA_BASIC_AUTH_PASSWORD` | kestra-worker | (secret) | Shared login password |
| `KESTRA_BASIC_AUTH_USERNAME` | kestra-worker | (secret) | Shared login email |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | kestra-executor | 8081 | Management port for health checks |
| `KESTRA_URL` | kestra-executor | - | Public base URL for links |
| `DATABASE_URL` | kestra-executor | - | Postgres connection string |
| `KESTRA_COMPONENT` | kestra-executor | executor | Starts the orchestration executor |
| `KESTRA_SECRET_SEED` | kestra-executor | (secret) | Shared secrets encryption seed |
| `KESTRA_DB_POOL_SIZE` | kestra-executor | 10 | JDBC connection pool size |
| `KESTRA_STORAGE_BUCKET` | kestra-executor | - | Internal storage bucket name |
| `KESTRA_STORAGE_REGION` | kestra-executor | - | Bucket region |
| `KESTRA_STORAGE_ENDPOINT` | kestra-executor | - | S3-compatible storage endpoint |
| `KESTRA_STORAGE_ACCESS_KEY` | kestra-executor | - | Bucket access key id |
| `KESTRA_STORAGE_SECRET_KEY` | kestra-executor | (secret) | Bucket secret access key |
| `KESTRA_BASIC_AUTH_PASSWORD` | kestra-executor | (secret) | Shared login password |
| `KESTRA_BASIC_AUTH_USERNAME` | kestra-executor | (secret) | Shared login email |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kestra-railway)
