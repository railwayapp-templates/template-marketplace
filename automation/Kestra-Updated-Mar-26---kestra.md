# Deploy Kestra [Updated Mar ’26] on Railway

Kestra [Mar ’26] (Data Pipelines/Task Runner/Orchestration Engine) Selfhost

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra)

## About

Kestra is a powerful, open-source orchestration and workflow automation platform available on GitHub. It allows you to design, schedule, and monitor data pipelines and automation tasks at scale. With Kestra, you can integrate multiple systems, APIs, and processes into a single, reliable workflow, all while leveraging modern technologies like Docker and Kubernetes.

You can **self host Kestra** to take full control over your workflow orchestration setup. By hosting Kestra on Railway, you eliminate dependency on third-party providers and retain full ownership of your pipelines, schedules, and logs.

Railway provides the perfect managed environment for self hosting Kestra. It streamlines the deployment process, offering automated scaling, built-in monitoring, and secure containerized hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kestra-railway | [Shinyduo/kestra-railway](https://github.com/Shinyduo/kestra-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KESTRA_PG_USER` | kestra-railway | (secret) | - |
| `KESTRA_PASSWORD` | kestra-railway | (secret) | Change this, but should be 8 char, 1 min Upper Case, 1 min Number and 1 min Special Char |
| `KESTRA_USERNAME` | kestra-railway | (secret) | - |
| `KESTRA_QUEUE_TYPE` | kestra-railway | postgres | - |
| `KESTRA_PG_PASSWORD` | kestra-railway | (secret) | - |
| `LOGGER_LEVELS_ROOT` | kestra-railway | INFO | - |
| `KESTRA_REPOSITORY_TYPE` | kestra-railway | postgres | - |
| `LOGGER_LEVELS_ORG_FLYWAYDB` | kestra-railway | INFO | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kestra)
