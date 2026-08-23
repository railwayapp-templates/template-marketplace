# Deploy Kestra — Self-Hosted Workflow Orchestration & Airflow Alternative on Railway

Self-host Kestra — YAML data pipelines & workflow orchestration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-orchestration)

## About

Kestra is an open-source workflow orchestration platform — think Airflow, but with declarative YAML instead of Python DAGs. Build and schedule data pipelines, ETL jobs, infrastructure automation, and event-driven workflows, running scripts, SQL, HTTP calls, and Python from a clean web UI with full execution history. This template deploys Kestra in standalone mode against a managed PostgreSQL database with the configuration and storage volume set up — so you have a production orchestrator ready to run your first flow in minutes.

---

Kestra is a powerful orchestrator, and its configuration model is unusual — understanding it is the key to a clean deploy, and this template sets it up for you.

**Kestra's whole configuration is one YAML blob.** Unlike most apps with flat environment variables, Kestra takes its entire configuration as a single YAML string in `KESTRA_CONFIGURATION` — the Postgres datasource, the queue type, the storage path, and basic auth all live inside that one variable as nested YAML. This is the thing that confuses first-time deployers. This template provides a correct `KESTRA_CONFIGURATION` wired to the managed Postgres, so the engine starts configured rather than erroring on a malformed config.

**PostgreSQL is required — H2 loses everything.** Kestra stores flow definitions, executions, logs, KV pairs, and the scheduler queue in PostgreSQL. It can run with an embedded H2 database for local dev, but H2 is in-memory and loses everything on container restart, which is useless on a platform like Railway. This template wires a managed Postgres as the backend, so your flows and history persist.

**Standalone mode runs everything in one service.** The template runs Kestra in standalone mode — executor, scheduler, worker, and indexer in a single JVM — the right shape for small-to-medium workloads. The JVM defaults to ~3.8 GB max heap on a 4 GB container; for hundreds of concurrent executions, raise the memory to 8 GB or split into separate webserver and worker services. Flows are defined in declarative YAML, so pipelines are version-controllable and readable.

**Set basic auth, and artifacts persist.** Basic authentication is configured in the `KESTRA_CONFIGURATION` YAML (a username that must be a valid email, and a password), so your orchestrator isn't open on the public internet — on first visit you set up your account. Files produced by task runs are stored on the volume at `/app/storage`, and flows, executions, and logs live in PostgreSQL — both survive redeploys, with Postgres the primary backup target. For object storage at scale, Kestra supports S3-compatible backends via configuration.

Typical cost: **~$10–20/month** on Railway for Kestra and PostgreSQL, scaling with memory and execution volume. Kestra's open-source edition is Apache-2.0 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Kestra | [Shinyduo/kestra-railway](https://github.com/Shinyduo/kestra-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Kestra | 8080 | HTTP listen port (matches kestra/kestra image) |
| `KESTRA_URL` | Kestra | - | Public URL Kestra uses in generated links |
| `KESTRA_QUEUE_TYPE` | Kestra | postgres | Internal queue in Postgres (no Redis) |
| `KESTRA_STORAGE_TYPE` | Kestra | local | Local disk for execution artifacts |
| `KESTRA_CONFIGURATION` | Kestra | - | KESTRA_CONFIGURATION |
| `KESTRA_ADMIN_PASSWORD` | Kestra | (secret) | Admin password — 8+ chars, uppercase + number required (regex: ^(?=.[A-Z])(?=.[0-9]).{8,}$) |
| `KESTRA_ADMIN_USERNAME` | Kestra | (secret) | Admin email — used to log in to Kestra UI |
| `KESTRA_REPOSITORY_TYPE` | Kestra | postgres | Store flows & executions in Postgres |
| `DATASOURCES_POSTGRES_URL` | Kestra | - | JDBC URL — resolves from Postgres service |
| `DATASOURCES_POSTGRES_PASSWORD` | Kestra | (secret) | DB password — from Postgres service |
| `DATASOURCES_POSTGRES_USERNAME` | Kestra | (secret) | DB user — from Postgres service |
| `DATASOURCES_POSTGRES_DRIVER_CLASS_NAME` | Kestra | org.postgresql.Driver | JDBC driver class |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/storage`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kestra-orchestration)
