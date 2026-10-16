# Deploy n8n on Railway

Simple and dependable automation platform using n8n + PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xIplv6)

## About

n8n is a fair-code workflow automation platform that connects apps, APIs, and AI models through a visual, node-based editor. It offers hundreds of built-in integrations, supports custom JavaScript and Python code, and can be fully self-hosted, keeping your data and credentials under your control.

Self-hosting n8n means running the n8n application alongside a database that stores your workflows, credentials, and execution history. This template provides an affordable, stable, and dependable setup: a single n8n instance backed by PostgreSQL, preconfigured to talk to each other over Railway's private network. To keep costs and complexity low, it does not use queue mode or separate workers, so all executions run on the main instance. This makes it a good fit for individuals and small teams with moderate workloads. If you need to process large volumes of executions, consider a template that includes n8n workers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| n8n | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `TZ` | n8n | - | The preferred time zone. |
| `DB_TYPE` | n8n | postgresdb | The database type. |
| `GENERIC_TIMEZONE` | n8n | - | The preferred time zone. For example: Europe/Rome. Visit https://momentjs.com/timezone/ to find your time zone. |
| `DB_POSTGRESDB_HOST` | n8n | - | PostgreSQL hostname. |
| `DB_POSTGRESDB_PORT` | n8n | - | PostgreSQL connection port. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | PostgreSQL username. |
| `N8N_RUNNERS_ENABLED` | n8n | true | Enables n8n runners feature (reccomended). |
| `DB_POSTGRESDB_DATABASE` | n8n | - | PostgreSQL database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | PostgreSQL password. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | Enforces correct file permissions (reccomended). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/xIplv6)
