# Deploy Immich with Machine Learning on Railway

Photo backup with matching CPU machine learning and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-with-machine-learning)

## About

Immich v3.1.0 provides self-hosted photo and video backup with a matching CPU machine-learning service. The stack includes the upstream VectorChord/pgvecto.rs PostgreSQL image, an authenticated persistent Redis service, media storage, and a persistent model cache.

Verified in an isolated Railway deployment. See the validation scope below for the checks performed and operational limits.

The template defines 4 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `main`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Cold-start initialization was verified in a fresh Railway project. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| immich | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| machine-learning | `ghcr.io/immich-app/immich-machine-learning:v3.1.0@sha256:5a0839dc5303cd7215bcd2180a26aed3af41675aefb3e75e5157e9f10ad16e6e` | Database |
| postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0@sha256:bcf63357191b76a916ae5eb93464d65c07511da41e3bf7a8416db519b40b1c23` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | immich | 2283 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DB_PORT` | immich | 5432 | Db port for immich. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_PORT` | immich | 6379 | Private Redis/Valkey port. Keep 6379. |
| `DB_HOSTNAME` | immich | - | Db hostname resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_PASSWORD` | immich | (secret) | Db password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_USERNAME` | immich | (secret) | Db username for immich. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_HOSTNAME` | immich | - | Redis hostname resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_PASSWORD` | immich | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `DB_DATABASE_NAME` | immich | immich | Db database name for immich. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IMMICH_CONFIG_FILE` | immich | /tmp/immich-config.json | Generated at startup to configure the private machine-learning service. |
| `MACHINE_LEARNING_URL` | immich | - | Machine learning url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `IMMICH_TELEMETRY_INCLUDE` | immich | - | Empty selection disables telemetry collection. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `MACHINE_LEARNING_WORKERS` | machine-learning | 1 | One CPU inference worker initially. No GPU is configured. |
| `POSTGRES_DB` | postgres | immich | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `POSTGRES_INITDB_ARGS` | postgres | --data-checksums | Initialization options applied only to an empty database volume. Keep locale and encoding compatible with the application. |

## Configuration

- **Healthcheck:** `/api/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/cache`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/immich-with-machine-learning)
