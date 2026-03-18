# Deploy n8n on Railway

Simple n8n deploy with Postgres database, it just works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-1)

## About

n8n is an open-source workflow automation tool that lets you connect different apps and services to automate tasks. It’s flexible, easy to extend, and works well with APIs and databases. With n8n, you can create simple or complex workflows without writing too much code.

Hosting n8n on Railway is simple. You can quickly set up and deploy an instance connected to a Postgres database. Railway manages the server and database so you don’t need to worry about infrastructure or scaling. You just push your project, and Railway handles the rest. This makes it easy to run workflows reliably without complicated setup.

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

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-1)
