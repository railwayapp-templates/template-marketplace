# Deploy Flowise - Low code LLM Builder with Postgres on Railway

Flowise - Low code LLM Apps Builder with Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9IHr5z)

## About

Flowise - Low code LLM Apps Builder with Postgres

Flowise is an open source low-code tool for developers to build customized LLM orchestration flows & AI agents. Developing LLM apps often involves countless iterations. Our low-code and drag-and-drop UI approach enables quick iterations, helping you go from testing to production faster

This template includes Postgres so all the data will be persisted in case the service gets restarted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Flowise - Low code LLM Apps Builder | `flowiseai/flowise` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LOG_PATH` | Flowise - Low code LLM Apps Builder | /opt/flowise/.flowise/logs | - |
| `APIKEY_PATH` | Flowise - Low code LLM Apps Builder | /opt/flowise/.flowise | - |
| `DATABASE_NAME` | Flowise - Low code LLM Apps Builder | railway | - |
| `DATABASE_PATH` | Flowise - Low code LLM Apps Builder | /opt/flowise/.flowise | - |
| `DATABASE_TYPE` | Flowise - Low code LLM Apps Builder | postgres | - |
| `DATABASE_USER` | Flowise - Low code LLM Apps Builder | (secret) | - |
| `SECRETKEY_PATH` | Flowise - Low code LLM Apps Builder | (secret) | - |
| `FLOWISE_PASSWORD` | Flowise - Low code LLM Apps Builder | (secret) | - |
| `FLOWISE_USERNAME` | Flowise - Low code LLM Apps Builder | (secret) | - |
| `DATABASE_PASSWORD` | Flowise - Low code LLM Apps Builder | (secret) | - |
| `OVERRIDE_DATABASE` | Flowise - Low code LLM Apps Builder | false | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/flowise/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/9IHr5z)
