# Deploy ToolJet on Railway

Build internal tools with ToolJet CE, PostgreSQL, PostgREST, and Valkey.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tooljet-2)

## About

Deploy ToolJet **v3.20.223-lts** with its internal database, PostgREST **12.0.2**, and persistent Valkey. The adapter uses the external queue service instead of the upstream image's non-persistent local Redis process.

This four-service deployment combines ToolJet Community Edition, PostgreSQL, PostgREST, and Valkey. Railway exposes the ToolJet web application over HTTPS while the database, data API, and queue remain private. The startup adapter runs upstream database setup and migrations and uses persistent Valkey instead of the application image’s local Redis process. Railway generates the signing, encryption, database, and PostgREST secrets. Create the initial administrator after deployment, connect a data source, and test a published internal tool. Preserve the encryption keys when backing up or restoring databases. Optional SMTP and workflow features need their own configuration and validation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `valkey/valkey@sha256:e0eb7c480958d32bdc4357a74bdd70653ae15f2f9b4c93c4a5a9fad1dc471c84` | Database |
| postgres | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/railway-template-release) | Database |
| tooljet | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/railway-template-release) | Web service |
| postgrest | `postgrest/postgrest:v12.0.2@sha256:79369c0cdf9d7112ed4e327bc1b80156be11575dd66fbda245077a2d13b803bc` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `APP_DB` | postgres | tooljet | Application database created during first initialization of an empty PostgreSQL volume. |
| `APP_USER` | postgres | (secret) | Dedicated application database role created during first initialization. |
| `POSTGRES_DB` | postgres | postgres | Initial PostgreSQL database name, or the matching database selected by the application. |
| `APP_PASSWORD` | postgres | (secret) | Generated password for the application database role. Preserve it with your backups. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `ENABLE_VECTOR` | postgres | false | Initialize the pgvector extension for applications that require vector storage. Keep the supplied value. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `ALLOW_APP_DATABASE_CREATION` | postgres | true | Grant database and role creation privileges required by ToolJet. Keep false for other applications. |
| `PORT` | tooljet | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `PG_DB` | tooljet | tooljet | Database name for ToolJet application metadata. |
| `PG_SSL` | tooljet | false | PostgreSQL TLS toggle for ToolJet metadata. The default uses Railway private networking. |
| `WORKER` | tooljet | true | Enable the ToolJet background worker in the application service. |
| `PG_HOST` | tooljet | - | Private PostgreSQL hostname for ToolJet application metadata. |
| `PG_PASS` | tooljet | - | Reference to the generated PostgreSQL application password used by ToolJet. |
| `PG_PORT` | tooljet | 5432 | Private PostgreSQL port for ToolJet application metadata. Keep 5432. |
| `PG_USER` | tooljet | (secret) | Dedicated PostgreSQL application role used by ToolJet. |
| `NODE_ENV` | tooljet | production | Node.js runtime mode. Keep production for hosted deployments. |
| `PGRST_HOST` | tooljet | - | Private PostgREST base URL. Automatically references the postgrest service. |
| `REDIS_HOST` | tooljet | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `REDIS_PORT` | tooljet | 6379 | Private Redis/Valkey port. Keep 6379. |
| `TOOLJET_DB` | tooljet | tooljet_data | Database name for built-in ToolJet Database storage. |
| `SERVE_CLIENT` | tooljet | true | Serve the ToolJet web client from the application service. |
| `TOOLJET_HOST` | tooljet | - | Public ToolJet HTTPS URL. Automatically generated; update for a custom domain. |
| `SMTP_DISABLED` | tooljet | true | SMTP starts disabled. Configure upstream SMTP settings and enable delivery before using invitations or password resets. |
| `REDIS_PASSWORD` | tooljet | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `TOOLJET_DB_SSL` | tooljet | false | PostgreSQL TLS toggle for ToolJet Database. The default uses Railway private networking. |
| `SECRET_KEY_BASE` | tooljet | (secret) | Generated application signing secret. Preserve across restarts and backup restores. |
| `TOOLJET_DB_HOST` | tooljet | - | Private PostgreSQL hostname for ToolJet Database. |
| `TOOLJET_DB_PASS` | tooljet | - | Reference to the generated PostgreSQL application password for ToolJet Database. |
| `TOOLJET_DB_PORT` | tooljet | 5432 | Private PostgreSQL port for ToolJet Database. Keep 5432. |
| `TOOLJET_DB_USER` | tooljet | (secret) | Dedicated PostgreSQL application role used for ToolJet Database. |
| `TOOLJET_EDITION` | tooljet | ce | ToolJet edition selector. Keep ce for this Community Edition image. |
| `PGRST_JWT_SECRET` | tooljet | (secret) | Generated JWT secret shared between ToolJet and PostgREST. Preserve matching references and keep private. |
| `ENABLE_TOOLJET_DB` | tooljet | true | Enable the built-in ToolJet Database backed by the private PostgreSQL and PostgREST services. |
| `LOCKBOX_MASTER_KEY` | tooljet | - | Generated encryption key for saved ToolJet data-source credentials. Preserve securely with database backups. |
| `TOOLJET_DB_RECONFIG` | tooljet | true | Enable ToolJet Database configuration for the selected upstream startup flow. Keep the supplied value. |
| `DISABLE_TOOLJET_TELEMETRY` | tooljet | true | Disable ToolJet telemetry. Keep the supplied privacy default. |
| `TOOLJET_QUEUE_DASH_PASSWORD` | tooljet | (secret) | Generated password for ToolJet queue administration. Keep private. |
| `TOOLJET_WORKFLOW_SANDBOX_BYPASS` | tooljet | false | Python sandbox bypass. Keep false; this template does not advertise Python workflow execution support. |
| `PGRST_DB_URI` | postgrest | - | Private PostgreSQL connection URL used by PostgREST for ToolJet Database. |
| `PGRST_JWT_SECRET` | postgrest | (secret) | Generated JWT secret shared between ToolJet and PostgREST. Preserve matching references and keep private. |
| `PGRST_SERVER_PORT` | postgrest | 3000 | Private PostgREST HTTP port. Keep aligned with the ToolJet reference. |
| `PGRST_DB_PRE_CONFIG` | postgrest | postgrest.pre_config | Upstream ToolJet pre-configuration function invoked by PostgREST. Keep the supplied function name. |

## Configuration

- **Start command:** `sh -c 'exec valkey-server --bind 0.0.0.0 --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tooljet-2)
