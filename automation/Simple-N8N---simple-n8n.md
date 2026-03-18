# Deploy Simple N8N on Railway

N8N (self-hosted), PostgreSQL, simple and fast. [Updated 2026]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simple-n8n)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Simple N8N | [jorgehenrrique/n8n-railway](https://github.com/jorgehenrrique/n8n-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Simple N8N | America/Sao_Paulo | Sua Time Zone |
| `DB_TYPE` | Simple N8N | postgresdb | - |
| `N8N_METRICS` | Simple N8N | true | - |
| `N8N_PROTOCOL` | Simple N8N | https | - |
| `N8N_FORCE_SSL` | Simple N8N | true | - |
| `N8N_LOG_LEVEL` | Simple N8N | info | - |
| `N8N_SECURE_COOKIE` | Simple N8N | true | - |
| `DB_POSTGRESDB_USER` | Simple N8N | (secret) | - |
| `N8N_ENCRYPTION_KEY` | Simple N8N | Do5HiQ8gc0DRGI1s6N4s/V1SbBY4GSIwQ+0cDFu433o= | Alterar!!! |
| `N8N_BASIC_AUTH_USER` | Simple N8N | (secret) | Pode ser alterado |
| `N8N_BASIC_AUTH_ACTIVE` | Simple N8N | true | - |
| `DB_POSTGRESDB_PASSWORD` | Simple N8N | (secret) | - |
| `N8N_BASIC_AUTH_PASSWORD` | Simple N8N | (secret) | Alterar!!! |
| `N8N_DIAGNOSTICS_ENABLED` | Simple N8N | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Simple N8N | true | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/simple-n8n)
