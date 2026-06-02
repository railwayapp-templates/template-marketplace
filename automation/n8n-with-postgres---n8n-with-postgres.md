# Deploy n8n with postgres on Railway

Simple n8n deploy with Postgres and persistent storage. It just works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-postgres)

## About

n8n with Postgres is a simple Railway template for running n8n with a reliable PostgreSQL database and persistent storage. n8n is an open-source workflow automation tool that helps you connect apps, APIs, and services to automate repetitive tasks, build integrations, and run scheduled workflows.

Hosting n8n with Postgres on Railway gives you a straightforward automation setup that just works. The template deploys n8n together with a Postgres database for storing workflows, credentials metadata, executions, settings, and other application data.

This template also includes persistent storage through a mounted volume at `/data`, so local n8n files can remain available across deployments and restarts. Railway handles deployment, networking, database provisioning, and service management, so you can focus on building workflows instead of managing infrastructure.

![img](https://i.imgur.com/xR7jjsV.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres | railway |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PORT` | n8n | 5678 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `N8N_LISTEN_ADDRESS` | n8n | :: |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-postgres)
