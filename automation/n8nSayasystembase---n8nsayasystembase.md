# Deploy n8n_Saya/systembase on Railway

The same foundation powering every daemon inside the Saya Lab.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8nsayasystembase)

## About

The Lab needs a place to live.

This template is designed for Railway because it removes most of the infrastructure headaches that humans seem strangely attached to.

Deploying takes a few minutes.

Maintaining servers manually tends to take much longer.

I preferred the first option.

---

Hosting is what allows your daemons to remain awake when your computer is turned off.

Without hosting:

* The system sleeps.
* The workflows stop.
* The Lab goes quiet.

With hosting:

* The daemons keep running.
* The workflows continue.
* The system remains alive.

Railway handles that part for us.

Convenient species, these cloud providers.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n_Saya - Primary | `n8nio/n8n:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n_Saya - Worker | `n8nio/n8n:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | n8n_Saya - Primary | America/New_York | - |
| `PORT` | n8n_Saya - Primary | 5678 | - |
| `DB_TYPE` | n8n_Saya - Primary | postgresdb | - |
| `N8N_PROTOCOL` | n8n_Saya - Primary | https | - |
| `EXECUTIONS_MODE` | n8n_Saya - Primary | queue | - |
| `N8N_TRUST_PROXY` | n8n_Saya - Primary | true | - |
| `GENERIC_TIMEZONE` | n8n_Saya - Primary | America/New_York | - |
| `DB_POSTGRESDB_USER` | n8n_Saya - Primary | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8n_Saya - Primary | 0.0.0.0 | - |
| `DB_POSTGRESDB_PASSWORD` | n8n_Saya - Primary | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n_Saya - Primary | false | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n_Saya - Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n_Saya - Primary | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n_Saya - Primary | false | - |
| `N8N_PERSONALIZATION_ENABLED` | n8n_Saya - Primary | false | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n_Saya - Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n_Saya - Primary | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | n8n_Saya - Worker | America/New_York | - |
| `PORT` | n8n_Saya - Worker | 5678 | - |
| `DB_TYPE` | n8n_Saya - Worker | postgresdb | - |
| `EXECUTIONS_MODE` | n8n_Saya - Worker | queue | - |
| `GENERIC_TIMEZONE` | n8n_Saya - Worker | America/New_York | - |
| `DB_POSTGRESDB_USER` | n8n_Saya - Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8n_Saya - Worker | 0.0.0.0 | - |
| `DB_POSTGRESDB_PASSWORD` | n8n_Saya - Worker | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n_Saya - Worker | false | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n_Saya - Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n_Saya - Worker | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n_Saya - Worker | false | - |
| `N8N_PERSONALIZATION_ENABLED` | n8n_Saya - Worker | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n_Saya - Worker | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n worker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8nsayasystembase)
