# Deploy flowise-with-n8n-ai-automation on Railway

n8n ai automation template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Xx4_lu)

## About

This one-click deploy template combines the power of Flowise for multi-agent flows and n8n for a wide array of tools. 

Flowise enables seamless management of multi-agent flows, while n8n provides a comprehensive set of tools for various purposes. 

By utilizing this template, users can effortlessly set up both Flowise and n8n with just a single click, saving time and effort in the deployment process. Furthermore, n8n's extensive library of over 500 integrations for agent tools ensures that you have access to a wide range of connectors and functionalities to streamline and optimize your workflows.

Whether you need to streamline communication between agents, automate tasks, or manage data flows, this template offers a convenient and robust solution that combines the strengths of Flowise and n8n, empowering you to create sophisticated and efficient workflows with ease.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowiseai/flowise | `flowiseai/flowise` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| n8n-railway-custom | [derekcheungsa/n8n-railway-custom](https://github.com/derekcheungsa/n8n-railway-custom) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LOG_PATH` | flowiseai/flowise | /opt/flowise/.flowise/logs | - |
| `APIKEY_PATH` | flowiseai/flowise | /opt/flowise/.flowise | - |
| `DATABASE_PATH` | flowiseai/flowise | /opt/flowise/.flowise | - |
| `DATABASE_USER` | flowiseai/flowise | (secret) | - |
| `SECRETKEY_PATH` | flowiseai/flowise | (secret) | - |
| `DATABASE_PASSWORD` | flowiseai/flowise | (secret) | - |
| `OVERRIDE_DATABASE` | flowiseai/flowise | false | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | flowiseai/flowise | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `DB_TYPE` | n8n-railway-custom | postgresdb | - |
| `DB_POSTGRESDB_USER` | n8n-railway-custom | (secret) | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-railway-custom | (secret) | - |

## Configuration

- **Start command:** `flowise start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/flowise/.flowise`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/Xx4_lu)
