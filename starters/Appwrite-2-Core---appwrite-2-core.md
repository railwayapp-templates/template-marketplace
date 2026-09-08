# Deploy Appwrite 2 Core on Railway

Appwrite 2 core backend with private databases and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appwrite-2-core)

## About

An Appwrite 2.0.0 core-services template with its console, PostgreSQL, a MongoDB replica-set adapter, Redis, geolocation service, and a public routing gateway. API, combined workers, and scheduled tasks share one persistent /storage volume inside a supervised core service. Realtime runs privately in its own service to avoid conflicting with the API listener.

Release tested on Railway for the core workflows below. Functions and Sites execution are excluded.

The template defines 8 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `codex/remaining-template-drafts`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Services initialize independently. Let databases become ready before checking the API after a full-stack restart. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| console | `appwrite/new:1.1.16@sha256:28d528e6f02c00d369baf44ee56dea153bd7cc6bf7bcb33961349eb7ad7a44d8` | Worker |
| appwrite | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |
| realtime | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Worker |
| postgres | `appwrite/postgres:0.1.0@sha256:77156232a16d80f5830d914edb44f52a0853058939f2365cc3301d08db9d05e9` | Database |
| geo | `appwrite/geo:0.3.1@sha256:df3751399945ec22661f23d745d66ed3b06a61f70ac4d77a1e9011ea17797653` | Worker |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| mongodb | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_CONSOLE_PROFILE` | console | self-hosted | Vite console profile for console. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPWRITE_ENDPOINT_SAME_ORIGIN` | console | true | Appwrite endpoint same origin for console. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | appwrite | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `API_HOST` | appwrite | - | Api host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `CONSOLE_HOST` | appwrite | - | Console host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REALTIME_HOST` | appwrite | - | Realtime host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | realtime | - | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `_APP_ENV` | realtime | - |  app env resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DOMAIN` | realtime | - |  app domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_CPU_NUM` | realtime | - |  app cpu num resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_HOST` | realtime | - |  app db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PASS` | realtime | - |  app db pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PORT` | realtime | - |  app db port resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_USER` | realtime | (secret) |  app db user resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_EDITION` | realtime | - |  app edition resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_SCHEMA` | realtime | - |  app db schema resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ALLOW_MIGRATION` | realtime | - | Allow migration resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_ADAPTER` | realtime | - |  app db adapter resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_GEO_SECRET` | realtime | (secret) |  app geo secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_REDIS_HOST` | realtime | - |  app redis host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_REDIS_PASS` | realtime | - |  app redis pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_REDIS_PORT` | realtime | - |  app redis port resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_USAGE_STATS` | realtime | - |  app usage stats resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_WORKERS_NUM` | realtime | - |  app workers num resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_ROOT_PASS` | realtime | - |  app db root pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_GEO_ENDPOINT` | realtime | - |  app geo endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_POOL_ADAPTER` | realtime | swoole |  app pool adapter for realtime. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_OPTIONS_ABUSE` | realtime | - |  app options abuse resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_STORAGE_LIMIT` | realtime | - |  app storage limit resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_CONSOLE_DOMAIN` | realtime | - |  app console domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_OPENSSL_KEY_V1` | realtime | - |  app openssl key v1 resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_STORAGE_DEVICE` | realtime | - |  app storage device resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_EXECUTOR_SECRET` | realtime | (secret) |  app executor secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_WORKER_PER_CORE` | realtime | - |  app worker per core resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_CONSOLE_HOSTNAMES` | realtime | - |  app console hostnames resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_HOST_VECTORSDB` | realtime | - |  app db host vectorsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PORT_VECTORSDB` | realtime | - |  app db port vectorsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_STORAGE_ANTIVIRUS` | realtime | - |  app storage antivirus resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_FUNCTIONS_RUNTIMES` | realtime | - |  app functions runtimes resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_HOST_DOCUMENTSDB` | realtime | - |  app db host documentsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PORT_DOCUMENTSDB` | realtime | - |  app db port documentsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_OPTIONS_FORCE_HTTPS` | realtime | - |  app options force https resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPWRITE_WORKER_POOL_SIZE` | realtime | - | Appwrite worker pool size resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_ADAPTER_VECTORSDB` | realtime | - |  app db adapter vectorsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_ADAPTER_DOCUMENTSDB` | realtime | - |  app db adapter documentsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_NOTIFICATIONS_TRACKING_SECRET` | realtime | (secret) |  app notifications tracking secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_DB` | postgres | appwrite | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `GEO_SECRET` | geo | (secret) | Geo secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `MONGO_PRIVATE_HOST` | mongodb | - | Mongo private host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) | Mongo initdb root password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | (secret) | Mongo initdb root username for mongodb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | core | 80 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `_APP_ENV` | core | production | Production self-host runtime mode. |
| `_APP_DOMAIN` | core | - |  app domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_CPU_NUM` | core | 1 |  app cpu num for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_DB_HOST` | core | - |  app db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PASS` | core | - |  app db pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PORT` | core | 5432 |  app db port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_DB_USER` | core | (secret) |  app db user for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_EDITION` | core | self-hosted |  app edition for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_DB_SCHEMA` | core | appwrite |  app db schema for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ALLOW_MIGRATION` | core | false | Back up all data before allowing an upgrade migration on an existing volume. |
| `_APP_DB_ADAPTER` | core | postgresql |  app db adapter for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_GEO_SECRET` | core | (secret) | Generated  app geo secret. Keep private and preserve with backups. |
| `_APP_REDIS_HOST` | core | - |  app redis host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_REDIS_PASS` | core | - |  app redis pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_REDIS_PORT` | core | 6379 |  app redis port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_USAGE_STATS` | core | disabled |  app usage stats for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_WORKERS_NUM` | core | 1 |  app workers num for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_DB_ROOT_PASS` | core | - |  app db root pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_GEO_ENDPOINT` | core | - |  app geo endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_OPTIONS_ABUSE` | core | enabled |  app options abuse for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_STORAGE_LIMIT` | core | 30000000 | Maximum upload size in bytes; individual bucket limits must fit within this ceiling. |
| `_APP_CONSOLE_DOMAIN` | core | - |  app console domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_OPENSSL_KEY_V1` | core | - | Generated  app openssl key v1. Keep private and preserve with backups. |
| `_APP_STORAGE_DEVICE` | core | Local |  app storage device for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_EXECUTOR_SECRET` | core | (secret) | Generated  app executor secret. Keep private and preserve with backups. |
| `_APP_WORKER_PER_CORE` | core | 1 |  app worker per core for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_CONSOLE_HOSTNAMES` | core | - |  app console hostnames resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_HOST_VECTORSDB` | core | - |  app db host vectorsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PORT_VECTORSDB` | core | 5432 |  app db port vectorsdb for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_STORAGE_ANTIVIRUS` | core | disabled |  app storage antivirus for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_FUNCTIONS_RUNTIMES` | core | - | Functions and Sites execution are excluded: Railway does not supply the Docker socket required by the executor. |
| `_APP_DB_HOST_DOCUMENTSDB` | core | - |  app db host documentsdb resolved automatically from the linked service. Keep this reference when using the included topology. |
| `_APP_DB_PORT_DOCUMENTSDB` | core | 27017 |  app db port documentsdb for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_OPTIONS_FORCE_HTTPS` | core | enabled |  app options force https for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPWRITE_WORKER_POOL_SIZE` | core | 78 | Connection pool budget for the combined worker, matching the pinned upstream queue concurrency. Does not change HTTP pool size. |
| `_APP_DB_ADAPTER_VECTORSDB` | core | postgresql |  app db adapter vectorsdb for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_DB_ADAPTER_DOCUMENTSDB` | core | mongodb |  app db adapter documentsdb for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `_APP_NOTIFICATIONS_TRACKING_SECRET` | core | (secret) | Generated  app notifications tracking secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `realtime`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/storage`

**Category:** Starters · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/appwrite-2-core)
