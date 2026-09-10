# Deploy AFFiNE on Railway

Collaborative docs and whiteboards with PostgreSQL and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-2)

## About

Deploy AFFiNE **0.27.4** with PostgreSQL/pgvector and persistent Valkey. A startup adapter waits for dependencies and runs the upstream self-host initialization before starting the server.

This three-service deployment hosts AFFiNE with PostgreSQL/pgvector and Valkey. Railway builds the application and database adapters from the included Dockerfiles, creates the private service connections, and exposes the application over HTTPS. Startup waits for dependencies and runs the upstream self-host initialization. The application volume preserves configuration, signing keys, and uploaded files; PostgreSQL and Valkey also use persistent storage. Create an administrator and workspace after deployment, then configure any email or optional provider settings in AFFiNE. Keep one application replica with the included filesystem storage and back up both the database and application volume before upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| affine | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| redis | `valkey/valkey@sha256:e0eb7c480958d32bdc4357a74bdd70653ae15f2f9b4c93c4a5a9fad1dc471c84` | Database |
| postgres | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | affine | 3010 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DATABASE_URL` | affine | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `REDIS_SERVER_HOST` | affine | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `REDIS_SERVER_PORT` | affine | 6379 | Private Redis/Valkey port. Keep 6379. |
| `AFFINE_SERVER_HOST` | affine | 0.0.0.0 | AFFiNE bind address. Keep 0.0.0.0 for container networking. |
| `AFFINE_SERVER_PORT` | affine | 3010 | AFFiNE HTTP port. Keep aligned with PORT and Railway networking. |
| `REDIS_SERVER_PASSWORD` | affine | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `AFFINE_INDEXER_ENABLED` | affine | false | AFFiNE indexer toggle. Disabled in this deployment; enabling it requires separate upstream setup. |
| `AFFINE_SERVER_EXTERNAL_URL` | affine | - | Public AFFiNE HTTPS URL. Generated from the Railway domain; update when assigning a custom domain. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `APP_DB` | postgres | affine | Application database created during first initialization of an empty PostgreSQL volume. |
| `APP_USER` | postgres | (secret) | Dedicated application database role created during first initialization. |
| `POSTGRES_DB` | postgres | postgres | Initial PostgreSQL database name, or the matching database selected by the application. |
| `APP_PASSWORD` | postgres | (secret) | Generated password for the application database role. Preserve it with your backups. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `ENABLE_VECTOR` | postgres | true | Initialize the pgvector extension for applications that require vector storage. Keep the supplied value. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `ALLOW_APP_DATABASE_CREATION` | postgres | false | Grant database and role creation privileges required by ToolJet. Keep false for other applications. |

## Configuration

- **Healthcheck:** `/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`
- **Start command:** `sh -c 'exec valkey-server --bind 0.0.0.0 --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/affine-2)
