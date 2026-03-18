# Deploy langflow 1.0-alpha w/ user auth on Railway

Authenticated langflow sessions only.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Z1CH2j)

## About

By default, this variable is set to True. When enabled (True), Langflow operates as it did in versions prior to 0.5—automatic login without requiring explicit user authentication.

---

This template turns authentication ON by default. Make sure to set the .envs below:

LANGFLOW_AUTO_LOGIN=False
LANGFLOW_SUPERUSER=username
LANGFLOW_SUPERUSER_PASSWORD=hunter2
LANGFLOW_SECRET_KEY=randomly_generated_secure_key

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| langflow 1.0-alpha | `langflowai/langflow:1.0-alpha` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | langflow 1.0-alpha | 7860 |
| `LANGFLOW_AUTO_LOGIN` | langflow 1.0-alpha | (secret) |
| `LANGFLOW_SECRET_KEY` | langflow 1.0-alpha | (secret) |
| `LANGFLOW_SUPERUSER_PASSWORD` | langflow 1.0-alpha | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/Z1CH2j)
