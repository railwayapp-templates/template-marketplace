# Deploy n8n on Railway

Simple and dependable automation platform using n8n + PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xIplv6)

## About

# n8n + PostgreSQL

n8n is a open-source automation platform. This template aims to provide an affordable, stable and dependable self-hosted workflow service.

## Features

The template includes a single n8n instance (workers are not implemented to keep costs and complexity low) and a PostgreSQL database. It is therefore reccomended to people and entities that do not need to process large numbers of requests. If this is a requirement, take a look to other templates that feature n8n workers. Learn more about n8n workers on the [official documentation](https://docs.n8n.io/hosting/scaling/queue-mode/).

## Setup

You're asked to provide a single variable to get the template up and running.

The variable is `GENERIC_TIMEZONE` and should be set to an appropriate value to get the most out of the [Schedule tool](https://docs.n8n.io/hosting/configuration/configuration-examples/time-zone/). Find your time zone on [momentjs.com](https://momentjs.com/timezone/).

## Documentation

If you encounter any issue, please feel free to contact me. For reference, the projects' docs are available on:

- n8n website: [n8n website](https://n8n.io/) and [n8n first-party integrations](https://n8n.io/integrations)
- n8n self-hosting documentation: [n8n docs](https://docs.n8n.io/hosting/)
- PostgreSQL documentation: [PostgreSQL docs](https://www.postgresql.org/docs/)

_I'm myselft a user of this template, so expect further updates and maintenance._

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
