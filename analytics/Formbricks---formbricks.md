# Deploy Formbricks on Railway

Surveys and feedback analytics with private PostgreSQL, Hub, and Cube.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks)

## About

Deploy Formbricks **5.4.2**, Hub **0.8.7**, Cube **1.6.6**, PostgreSQL 18 with pgvector, and persistent Valkey. Only Formbricks is public. Hub, Cube, and databases communicate through the private network.

This five-service deployment combines the survey application, Hub, Cube analytics, PostgreSQL with pgvector, and Valkey. Railway builds the included startup adapters from the source repository and supplies a public HTTPS domain for Formbricks. The adapters coordinate database migrations before serving requests; other services stay on the private network. Database, uploads, and cache data use persistent volumes. Authentication and encryption secrets are generated automatically. After the first deployment, create the owner account, configure SMTP if needed, and test a survey from publication through response collection and analytics. Keep a single application replica when using the included local upload storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hub | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/railway-template-release) | Worker |
| redis | `valkey/valkey@sha256:e0eb7c480958d32bdc4357a74bdd70653ae15f2f9b4c93c4a5a9fad1dc471c84` | Database |
| postgres | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/railway-template-release) | Database |
| formbricks | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/railway-template-release) | Web service |
| cube | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/railway-template-release) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_KEY` | hub | (secret) | Generated API authentication key, or a reference to the shared internal API key. Keep private and preserve matching references. |
| `DATABASE_URL` | hub | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `APP_DB` | postgres | formbricks | Application database created during first initialization of an empty PostgreSQL volume. |
| `APP_USER` | postgres | (secret) | Dedicated application database role created during first initialization. |
| `POSTGRES_DB` | postgres | postgres | Initial PostgreSQL database name, or the matching database selected by the application. |
| `APP_PASSWORD` | postgres | (secret) | Generated password for the application database role. Preserve it with your backups. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `ENABLE_VECTOR` | postgres | true | Initialize the pgvector extension for applications that require vector storage. Keep the supplied value. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `ALLOW_APP_DATABASE_CREATION` | postgres | false | Grant database and role creation privileges required by ToolJet. Keep false for other applications. |
| `PORT` | formbricks | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `HOSTNAME` | formbricks | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `NODE_ENV` | formbricks | production | Node.js runtime mode. Keep production for hosted deployments. |
| `REDIS_URL` | formbricks | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `WEBAPP_URL` | formbricks | - | Public Formbricks HTTPS URL. Update together with NEXTAUTH_URL when changing domains. |
| `CRON_SECRET` | formbricks | (secret) | Generated secret authorizing Formbricks scheduled maintenance endpoints. Keep private. |
| `HUB_API_KEY` | formbricks | (secret) | Generated authentication key shared with the private Hub service. Keep the service references aligned. |
| `HUB_API_URL` | formbricks | - | Private Hub API base URL. Automatically references the hub service. |
| `DATABASE_URL` | formbricks | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `NEXTAUTH_URL` | formbricks | - | Public authentication callback base URL. Keep equal to WEBAPP_URL. |
| `CUBEJS_API_URL` | formbricks | - | Private Cube analytics API URL. Automatically references the cube service. |
| `ENCRYPTION_KEY` | formbricks | - | Generated Formbricks encryption key. Back it up securely; changing it can make encrypted data unreadable. |
| `NEXTAUTH_SECRET` | formbricks | (secret) | Generated authentication signing secret. Preserve across restarts and backup restores. |
| `CUBEJS_API_SECRET` | formbricks | (secret) | Shared generated Cube analytics signing secret. Preserve the matching app and Cube references. |
| `CUBEJS_JWT_ISSUER` | formbricks | formbricks-web | Expected issuer for Formbricks analytics tokens. Keep the app and Cube values identical. |
| `TELEMETRY_DISABLED` | formbricks | 1 | Disable application telemetry. Keep 1 to retain this privacy default. |
| `CUBEJS_JWT_AUDIENCE` | formbricks | formbricks-cube | Expected audience for Formbricks analytics tokens. Keep the app and Cube values identical. |
| `PASSWORD_RESET_DISABLED` | formbricks | (secret) | Password reset is initially disabled. Set to 0 after configuring and testing SMTP delivery. |
| `EMAIL_VERIFICATION_DISABLED` | formbricks | 1 | Email verification is initially disabled. Set to 0 only after configuring and testing SMTP delivery. |
| `CUBEJS_DB_HOST` | cube | - | Private PostgreSQL hostname used by Cube analytics. |
| `CUBEJS_DB_NAME` | cube | formbricks | Formbricks database queried by Cube analytics. |
| `CUBEJS_DB_PASS` | cube | - | Reference to the generated application database password used by Cube. |
| `CUBEJS_DB_PORT` | cube | 5432 | Private PostgreSQL port used by Cube. Keep 5432. |
| `CUBEJS_DB_TYPE` | cube | postgres | Cube database driver. Keep postgres for this deployment. |
| `CUBEJS_DB_USER` | cube | (secret) | Application database role used by Cube analytics. |
| `CUBEJS_API_SECRET` | cube | (secret) | Shared generated Cube analytics signing secret. Preserve the matching app and Cube references. |
| `CUBEJS_JWT_ISSUER` | cube | formbricks-web | Expected issuer for Formbricks analytics tokens. Keep the app and Cube values identical. |
| `CUBEJS_JWT_AUDIENCE` | cube | formbricks-cube | Expected audience for Formbricks analytics tokens. Keep the app and Cube values identical. |
| `CUBEJS_EXTERNAL_DEFAULT` | cube | false | Cube external pre-aggregation storage toggle. Keep the supplied default for this topology. |
| `CUBEJS_DEFAULT_API_SCOPES` | cube | meta,data | Cube API scopes enabled for analytics requests. Keep the upstream-compatible default. |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | cube | memory | Cube cache/queue driver. Uses memory in this single-service deployment. |

## Configuration

- **Start command:** `sh -c 'exec valkey-server --bind 0.0.0.0 --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nextjs/apps/web/uploads`

**Category:** Analytics · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/formbricks)
