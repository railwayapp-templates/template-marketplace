# Deploy n8n-scalable-railway on Railway

Scalable production-ready n8n setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-scalable-railway)

## About

Deploy this template directly on Railway to get a fully isolated and scalable multi-service n8n infrastructure.  
Railway will automatically provision the Editor, Worker, Webhook, PostgreSQL, and Valkey services with zero manual setup.

[Click here to Deploy on Railway](https://railway.com)

---

This template is designed specifically for **production hosting** on Railway, ensuring:

- Automatic resource provisioning  
- Service isolation  
- Secure environment variable handling  
- Automatic HTTPS via Railway domains  
- Horizontal scaling for Worker and Webhook services  
- Built-in persistent storage for PostgreSQL  

Everything is preconfigured for real-world, enterprise-grade workloads.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Editor | [kaleldias/n8n-railway](https://github.com/kaleldias/n8n-railway) (root: apps/editor) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Valkey | `valkey/valkey:latest` | Database |
| Webhook | [kaleldias/n8n-railway](https://github.com/kaleldias/n8n-railway) (root: apps/webhook) | Web service |
| Worker | [kaleldias/n8n-railway](https://github.com/kaleldias/n8n-railway) (root: apps/worker) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Editor | 5678 | - |
| `DB_TYPE` | Editor | postgresdb | - |
| `NODE_ENV` | Editor | production | - |
| `N8N_PROTOCOL` | Editor | https | - |
| `N8N_SMTP_SSL` | Editor | false | - |
| `N8N_LOG_LEVEL` | Editor | info | - |
| `N8N_SMTP_HOST` | Editor | - | SMTP server hostname (e.g., smtp.resend.com) |
| `N8N_SMTP_PASS` | Editor | - | SMTP password or API key from your provider |
| `N8N_SMTP_PORT` | Editor | - | SMTP port (e.g., 587, 2587, 465)[2587 is by default available] |
| `N8N_SMTP_USER` | Editor | (secret) | SMTP username from your provider |
| `N8N_EMAIL_MODE` | Editor | smtp | Email delivery method (must be "smtp") |
| `N8N_PROXY_HOPS` | Editor | 1 | - |
| `EXECUTIONS_MODE` | Editor | queue | - |
| `N8N_SMTP_SENDER` | Editor | - | Default sender email (e.g., noreply@yourdomain.com) |
| `GENERIC_TIMEZONE` | Editor | America/Sao_Paulo | - |
| `N8N_SECURE_COOKIE` | Editor | true | - |
| `N8N_SMTP_STARTTLS` | Editor | true | - |
| `DB_POSTGRESDB_USER` | Editor | (secret) | - |
| `N8N_ENCRYPTION_KEY` | Editor | - | Auto-generated encryption key used to secure credentials |
| `N8N_LISTEN_ADDRESS` | Editor | 0.0.0.0 | - |
| `N8N_RUNNERS_ENABLED` | Editor | true | - |
| `DB_POSTGRESDB_SCHEMA` | Editor | public | - |
| `N8N_PAYLOAD_SIZE_MAX` | Editor | 16 | - |
| `EXECUTIONS_DATA_PRUNE` | Editor | true | - |
| `DB_POSTGRESDB_PASSWORD` | Editor | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | Editor | 336 | - |
| `N8N_PUBLIC_API_DISABLED` | Editor | true | - |
| `DB_POSTGRESDB_SSL_ENABLED` | Editor | true | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Editor | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Editor | true | - |
| `NODE_FUNCTION_ALLOW_BUILTIN` | Editor | * | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Editor | false | - |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | Editor | moment,lodash | - |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | Editor | true | - |
| `N8N_REINSTALL_MISSING_PACKAGES` | Editor | true | - |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED` | Editor | true | - |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Editor | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Editor | true | - |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Editor | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Editor | true | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `VALKEY_PORT` | Valkey | 6379 | - |
| `VALKEY_USER` | Valkey | (secret) | - |
| `VALKEY_PASSWORD` | Valkey | (secret) | - |
| `PORT` | Webhook | 5678 | - |
| `DB_TYPE` | Webhook | postgresdb | - |
| `NODE_ENV` | Webhook | production | - |
| `N8N_PROTOCOL` | Webhook | https | - |
| `N8N_LOG_LEVEL` | Webhook | info | - |
| `EXECUTIONS_MODE` | Webhook | queue | - |
| `GENERIC_TIMEZONE` | Webhook | America/Sao_Paulo | - |
| `DB_POSTGRESDB_USER` | Webhook | (secret) | - |
| `INGEST_HMAC_SECRET` | Webhook | (secret) | Shared ingest secret used by Editor/Worker/Webhook |
| `N8N_ENCRYPTION_KEY` | Webhook | - | Webhook uses the SAME encryption key as Editor |
| `N8N_LISTEN_ADDRESS` | Webhook | 0.0.0.0 | - |
| `N8N_RUNNERS_ENABLED` | Webhook | true | - |
| `DB_POSTGRESDB_SCHEMA` | Webhook | public | - |
| `DB_POSTGRESDB_PASSWORD` | Webhook | (secret) | - |
| `DB_POSTGRESDB_SSL_ENABLED` | Webhook | true | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Webhook | true | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Webhook | false | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Webhook | true | - |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Webhook | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Webhook | true | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_ENCRYPTION_KEY` | Worker | - | Auto-generated encryption key used to secure credentials |
| `N8N_RUNNERS_ENABLED` | Worker | true | - |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `DB_POSTGRESDB_SSL_ENABLED` | Worker | true | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Worker | false | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | - |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Worker | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **Volume:** `/data`
- **Start command:** `n8n webhook`
- **Start command:** `n8n worker --concurrency=10`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/n8n-scalable-railway)
