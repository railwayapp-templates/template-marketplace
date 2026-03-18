# Deploy n8n+postgres on Railway

n8n + postgres Low Memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Bu9iFP)

## About

Optimiza n8n con PostgreSQL en entornos de baja memoria limitando la retención de ejecuciones, configurando variables de entorno para reducir uso de RAM y ajustando parámetros de PostgreSQL como el tamaño de los buffers. ¡Mantén todo ligero y eficiente!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `timescale/timescaledb:latest-pg17` | Database |
| n8n | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5678 |
| `DB_TYPE` | postgresdb |
| `EXECUTIONS_MODE` | regular |
| `DB_POSTGRESDB_USER` | (secret) |
| `N8N_LISTEN_ADDRESS` | :: |
| `DB_POSTGRESDB_PASSWORD` | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | true |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres -p 5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/Bu9iFP)
