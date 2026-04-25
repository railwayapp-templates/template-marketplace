# Deploy Prefect [Updated May ’26] on Railway

Prefect [May ’26] (ETL & Automation alternative to Airflow) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prefect)

## About

Prefect is a modern open-source workflow orchestration platform available on GitHub, designed to help developers and data teams build, run, and monitor data pipelines with ease. Prefect Python SDK, Prefect Cloud, and Prefect Docker integrations make it highly versatile for data engineering, machine learning, and automation projects.

You can **self host Prefect Docker** to take complete control of your data workflows, scheduling, and orchestration environment. By self-hosting, you decide how and where your data flows, ensuring maximum security, compliance, and flexibility.

When you deploy Prefect standalone or Prefect 3 on Railway, you get:

* A Docker-based environment for orchestration.
* Automated scaling and zero-downtime.
* Secure, managed infrastructure.
* Easy integration with Prefect Git, Prefect GitHub, and external APIs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prefect | `prefecthq/prefect:3-latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | prefect | 4200 |
| `PREFECT_SERVER_API_HOST` | prefect | 0.0.0.0 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `prefect server start --host 0.0.0.0 --port 4200`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/prefect)
