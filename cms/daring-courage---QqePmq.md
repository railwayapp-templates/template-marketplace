# Deploy daring-courage on Railway

Una implementación de Prueba

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/QqePmq)

## About

Esta es una implementación de prueba, a partir de un repositorio clonado de Github, específicamente «Medusa». Aun se encuentra en una fase muy embrionaria, espero mejorarlo en los proximos dias Tened Paciencia! Apenas estoy dando mis primeros pininos con estas tecnologías
Esta es una implementación de prueba, a partir de un repositorio clonado de Github, específicamente «Medusa». Aun se encuentra en una fase muy embrionaria, espero mejorarlo en los proximos dias Tened Paciencia! Apenas estoy dando mis primeros pininos con estas tecnologías

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| medusa | [fg9671/medusa](https://github.com/fg9671/medusa) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | - | Railway Private Domain |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, JavaScript, Shell, Handlebars, CSS, HTML

[View on Railway →](https://railway.com/deploy/QqePmq)
