# Deploy MageAI or Mage AI (Open-Source Data Pipeline & Workflow Tool) on Railway

MageAI [Mar ’26] (Build, Orchestrate & Monitor Data Flows) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mageai)

## About

MageAI is an open-source data orchestration and transformation platform built for modern data teams. It enables you to build, run, and manage data pipelines effortlessly with a focus on usability, extensibility, and performance. MageAI is designed as a next-generation alternative to Airflow, Prefect, and Dagster, combining simplicity with powerful capabilities for data engineering, analytics, and machine learning workflows.

Self-hosting MageAI gives you complete control over your data orchestration environment, ensuring that your workflows, pipelines, and datasets remain private and secure. When you deploy MageAI on Railway, you combine the power of open-source data management with the simplicity of a managed cloud infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mageai | `mageai/mageai:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | mageai | (secret) |
| `DEFAULT_USER_EMAIL` | mageai | admin@admin.com |
| `JWT_DOWNLOAD_SECRET` | mageai | (secret) |
| `DEFAULT_USER_PASSWORD` | mageai | (secret) |
| `REQUIRE_USER_AUTHENTICATION` | mageai | 0 |
| `MAGE_ACCESS_TOKEN_EXPIRY_TIME` | mageai | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/src`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/mageai)
