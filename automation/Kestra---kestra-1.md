# Deploy Kestra on Railway

Kestra 1.3 declarative workflow orchestration with 1,000+ plugins.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-1)

## About

Kestra is an event-driven, declarative orchestration platform. You describe flows in YAML with tasks for scripts, SQL, HTTP, files, cloud services and more than 1,000 plugins, and Kestra schedules them, reacts to events and webhooks, retries failures and shows every execution with logs, outputs and a topology view in its UI.

This template deploys Kestra v1.3.40 standalone, the full image with all plugins, backed by a Railway Postgres database for the repository and queue. Internal storage for files and outputs lives on a Railway volume. Basic authentication protects the UI and API with a generated password. Railway has no Docker daemon, so script tasks such as Shell and Python run as processes inside the container by default. Worker threads and JVM heap are pinned. Plan for at least 1.5 GB of memory. Back up Postgres regularly. Flows are stored in Postgres, so they survive redeploys and can also be managed with the API or Terraform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kestra | `kestra/kestra:v1.3.40` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | kestra | 8080 |
| `JAVA_OPTS` | kestra | -Xmx1g |
| `KESTRA_DB_USER` | kestra | (secret) |
| `KESTRA_ADMIN_EMAIL` | kestra | admin@example.com |
| `KESTRA_DB_PASSWORD` | kestra | (secret) |
| `KESTRA_CONFIGURATION` | kestra | datasources:
  postgres:
    url: ${KESTRA_DB_URL}
    driverClassName: org.postgresql.Driver
    username: ${KESTRA_DB_USER}
    password: ${KESTRA_DB_PASSWORD}
micronaut:
  server:
    port: 8080
kestra:
  server:
    basic-auth:
      username: ${KESTRA_ADMIN_EMAIL}
      password: ${KESTRA_ADMIN_PASSWORD}
  repository:
    type: postgres
  queue:
    type: postgres
  storage:
    type: local
    local:
      base-path: /app/storage
  tasks:
    tmp-dir:
      path: /tmp/kestra-wd/tmp
  url: ${KESTRA_URL}
  plugins:
    defaults:
      # Railway has no Docker daemon, so script tasks run as local processes.
      - type: io.kestra.plugin.scripts
        values:
          taskRunner:
            type: io.kestra.plugin.core.runner.Process
  anonymous-usage-report:
    enabled: false |
| `KESTRA_ADMIN_PASSWORD` | kestra | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/app/kestra server standalone --worker-thread=8`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/kestra-1)
