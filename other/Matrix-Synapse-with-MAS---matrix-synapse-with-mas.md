# Deploy Matrix Synapse with MAS on Railway

Matrix messaging with Synapse, MAS authentication, and Element Web.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matrix-synapse-with-mas)

## About

This template combines Synapse 1.160.0, Matrix Authentication Service 1.24.0, Element Web 1.12.27, and separate PostgreSQL databases for the homeserver and authentication service. A routing gateway directs legacy login/logout/refresh endpoints to MAS and other Matrix endpoints to Synapse.

Release tested on Railway. See the validation scope below for verified workflows and remaining limitations.

The template defines 6 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `main`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Services initialize independently; allow the homeserver to finish database startup before testing client routes. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| synapse-db | `postgres:17@sha256:67f41722b7a8cbdb868a44a4995c846eddfdc2973bccb291ce937dce88ad5675` | Database |
| matrix | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| mas-db | `postgres:17@sha256:67f41722b7a8cbdb868a44a4995c846eddfdc2973bccb291ce937dce88ad5675` | Database |
| element | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| mas | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| synapse | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | synapse-db | synapse | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | synapse-db | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | synapse-db | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | synapse-db | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `POSTGRES_INITDB_ARGS` | synapse-db | --encoding=UTF8 --locale=C | Initialization options applied only to an empty database volume. Keep locale and encoding compatible with the application. |
| `PORT` | matrix | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `MAS_HOST` | matrix | - | Mas host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PUBLIC_HOST` | matrix | - | Public host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SYNAPSE_HOST` | matrix | - | Synapse host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_DB` | mas-db | mas | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | mas-db | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | mas-db | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | mas-db | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | element | 80 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `SERVER_NAME` | element | - | Server name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `HOMESERVER_URL` | element | - | Homeserver url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PUBLIC_URL` | mas | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SERVER_NAME` | mas | - | Server name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SYNAPSE_URL` | mas | - | Synapse url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_URL` | mas | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `MATRIX_SHARED_SECRET` | mas | (secret) | Matrix shared secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REGISTRATION_ENABLED` | mas | false | Self-service registration stays closed. Create users with the MAS CLI, or deliberately enable registration for onboarding. |
| `DB_HOST` | synapse | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_USER` | synapse | (secret) | Db user for synapse. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MAS_URL` | synapse | - | Mas url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PUBLIC_URL` | synapse | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_PASSWORD` | synapse | (secret) | Db password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SYNAPSE_SERVER_NAME` | synapse | - | Immutable Matrix server name. Choose your final domain before first deployment; it cannot be renamed later. |
| `MATRIX_SHARED_SECRET` | synapse | (secret) | Generated matrix shared secret. Keep private and preserve with backups. |
| `SYNAPSE_REPORT_STATS` | synapse | no | Synapse report stats for synapse. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/matrix-synapse-with-mas)
