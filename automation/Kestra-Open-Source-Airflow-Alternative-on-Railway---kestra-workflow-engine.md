# Deploy Kestra | Open Source Airflow Alternative on Railway on Railway

Self-host Kestra. ETL, scheduling, automation, YAML flows, 600+ plugins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-workflow-engine)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-workflow-engine?referralCode=QXdhdr)

Kestra is an open-source, event-driven workflow orchestration platform that lets you build data pipelines, ETL jobs, and infrastructure automation as declarative YAML — no Python DAG boilerplate, no Spring beans, no DSL to learn. Self-host Kestra on Railway with a Postgres-backed standalone server, persistent storage volume, and basic-auth out of the box, and get a production-ready alternative to Airflow, Prefect, and Dagster in a single click.

This Railway template deploys Kestra in standalone mode (executor + scheduler + worker + indexer in one JVM) backed by a managed Postgres database, with persistent storage mounted at `/app/storage` and basic authentication pre-configured so the UI is locked down from the first request.

![Kestra Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776694291/Kestra_railway_architecture_wvsogk.png)

Kestra defines workflows in YAML — every task is a plugin (Python, shell, SQL, dbt, AWS, Slack, Snowflake, Kafka, etc.), and the entire flow is git-versionable, code-reviewable, and diffable. The standalone server bundled in this template runs all four core services (executor, scheduler, worker, indexer) inside one container, which is the recommended layout for small-to-medium workloads on a PaaS like Railway.

Key features:
- **600+ plugins** spanning AWS, GCP, Azure, dbt, Snowflake, BigQuery, Kafka, Slack, GitHub, Terraform, and more
- **Real-time triggers** — schedule, webhook, file-watch, message-queue, S3, Kafka, polling
- **Built-in UI** with live execution logs, Gantt charts, blueprint marketplace, and a no-code form-based flow editor
- **Declarative YAML** that's git-friendly, lintable, and PR-reviewable — no Python DSL lock-in
- **KV store, secrets, namespaces, labels** for multi-team and multi-environment workflows
- **Pluggable task runners** — process (in-container), Docker, Kubernetes, AWS Batch, GCP Cloud Run

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Kestra | `kestra/kestra:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Kestra | 8080 | HTTP listen port (matches kestra/kestra image) |
| `KESTRA_URL` | Kestra | - | Public URL Kestra uses in generated links |
| `KESTRA_QUEUE_TYPE` | Kestra | postgres | Internal queue in Postgres (no Redis) |
| `KESTRA_STORAGE_TYPE` | Kestra | local | Local disk for execution artifacts |
| `KESTRA_ADMIN_PASSWORD` | Kestra | (secret) | Admin password — 8+ chars, uppercase + number required (regex: ^(?=.*[A-Z])(?=.*[0-9]).{8,}$) |
| `KESTRA_ADMIN_USERNAME` | Kestra | (secret) | Admin email — used to log in to Kestra UI |
| `KESTRA_REPOSITORY_TYPE` | Kestra | postgres | Store flows & executions in Postgres |
| `DATASOURCES_POSTGRES_URL` | Kestra | - | JDBC URL — resolves from Postgres service |
| `DATASOURCES_POSTGRES_PASSWORD` | Kestra | (secret) | DB password — from Postgres service |
| `DATASOURCES_POSTGRES_USERNAME` | Kestra | (secret) | DB user — from Postgres service |
| `DATASOURCES_POSTGRES_DRIVER_CLASS_NAME` | Kestra | org.postgresql.Driver | JDBC driver class |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "/app/kestra server standalone"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/kestra-workflow-engine)
