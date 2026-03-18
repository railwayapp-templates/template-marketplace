# Deploy Windmill (Open-Source Automation & Workflow Orchestration Platform) on Railway

Windmill [Mar’26] (Automation & ScriptFirst, Airflow Alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill)

## About

Windmill is an open-source automation and workflow orchestration platform available on [Windmill GitHub](https://github.com/windmill-labs/windmill). It provides a fast, secure, and flexible environment for running scripts, automating tasks, and integrating APIs. With **hosting windmill docker**, you can deploy Windmill seamlessly on Railway and build automations without worrying about infrastructure.

Self-hosting Windmill ensures you retain full control of your automations, scripts, and sensitive data. Instead of relying on third-party cloud providers, you can configure **Windmill software** exactly to your needs. Using **Windmill.dev** and Docker, deployment becomes simple, Railway automates scaling, health checks, and environment setup so you can focus on workflows, not servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| windmill | `ghcr.io/windmill-labs/windmill:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| windmill worker | `ghcr.io/windmill-labs/windmill:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | windmill | 8000 |
| `WM_ADMIN_PASSWORD` | windmill | (secret) |
| `WM_ADMIN_USERNAME` | windmill | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | windmill worker | 8000 |
| `WM_ADMIN_PASSWORD` | windmill worker | (secret) |
| `WM_ADMIN_USERNAME` | windmill worker | (secret) |

## Configuration

- **Start command:** `windmill server`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `windmill worker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/windmill)
