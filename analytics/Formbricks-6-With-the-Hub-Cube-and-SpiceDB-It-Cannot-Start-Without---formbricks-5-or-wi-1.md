# Deploy Formbricks 6 | With the Hub, Cube and SpiceDB It Cannot Start Without on Railway

Formbricks 6 with the Hub, Cube and SpiceDB it refuses to start without.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-5-or-wi-1)

## About

Formbricks, the survey and feedback platform, self-hosted at version 5, with the two services it refuses to start without: the Hub and Cube.

Nothing to fill in. Every secret and both database passwords are generated.

The existing Formbricks template pulls `formbricks/formbricks:latest` **from Docker Hub**, where the newest tag is 3.6.0, from March 2025. The project moved to GHCR and never published to Docker Hub again, so that template keeps deploying a build from March 2025 and will never update on its own.

Bringing it current is not a tag change. Formbricks 5 refuses to boot without a Hub and a Cube service: its environment validation fails on `CUBEJS_API_URL`, `CUBEJS_API_SECRET`, `HUB_API_URL` and `HUB_API_KEY` before the application starts. Upstream runs those services with one-shot migration containers and `condition: service_completed_successfully`, which a template cannot express. The implementation details below are how it is expressed here instead.

That makes six services: Formbricks, its Postgres, Valkey, the Hub, the Hub's Postgres, and Cube. Six, because that is what Formbricks 5 needs to start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg18` | Database |
| SpiceDB | `authzed/spicedb:v1.56.2-debug` | Worker |
| Cube | [ak40u/formbricks-cube-railway](https://github.com/ak40u/formbricks-cube-railway) | Worker |
| SpiceDBPostgres | `postgres:18-alpine` | Database |
| Hub | `ghcr.io/formbricks/hub:0.8.7` | Worker |
| Valkey | `valkey/valkey:8.1.10-alpine` | Database |
| Formbricks | `ghcr.io/formbricks/formbricks:6.0.2` | Web service |
| HubPostgres | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | formbricks |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SPICEDB_GRPC_ADDR` | SpiceDB | [::]:50051 |
| `SPICEDB_LOG_FORMAT` | SpiceDB | json |
| `SPICEDB_HTTP_ENABLED` | SpiceDB | false |
| `SPICEDB_DATASTORE_ENGINE` | SpiceDB | postgres |
| `PORT` | Cube | 4000 |
| `CUBEJS_DB_PORT` | Cube | 5432 |
| `CUBEJS_DB_TYPE` | Cube | postgres |
| `CUBEJS_DB_USER` | Cube | (secret) |
| `CUBEJS_API_SECRET` | Cube | (secret) |
| `CUBEJS_JWT_ISSUER` | Cube | formbricks-web |
| `CUBEJS_JWT_AUDIENCE` | Cube | formbricks-cube |
| `CUBEJS_DEFAULT_API_SCOPES` | Cube | meta,data |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | Cube | memory |
| `POSTGRES_DB` | SpiceDBPostgres | spicedb |
| `POSTGRES_USER` | SpiceDBPostgres | (secret) |
| `POSTGRES_PASSWORD` | SpiceDBPostgres | (secret) |
| `PORT` | Hub | 8080 |
| `API_KEY` | Hub | (secret) |
| `REDIS_PASSWORD` | Valkey | (secret) |
| `PORT` | Formbricks | 3000 |
| `CRON_SECRET` | Formbricks | (secret) |
| `HUB_API_KEY` | Formbricks | (secret) |
| `AUTHZED_TOKEN` | Formbricks | (secret) |
| `AUTHZED_ENABLED` | Formbricks | true |
| `NEXTAUTH_SECRET` | Formbricks | (secret) |
| `AUTHZED_INSECURE` | Formbricks | true |
| `CUBEJS_API_SECRET` | Formbricks | (secret) |
| `CUBEJS_JWT_ISSUER` | Formbricks | formbricks-web |
| `AUTHZED_SYSTEM_KEY` | Formbricks | formbricks |
| `AUTHZED_CONSISTENCY` | Formbricks | fully_consistent |
| `CUBEJS_JWT_AUDIENCE` | Formbricks | formbricks-cube |
| `SKIP_STARTUP_MIGRATION` | Formbricks | true |
| `PASSWORD_RESET_DISABLED` | Formbricks | (secret) |
| `EMAIL_VERIFICATION_DISABLED` | Formbricks | 1 |
| `POSTGRES_DB` | HubPostgres | hub |
| `POSTGRES_USER` | HubPostgres | (secret) |
| `POSTGRES_PASSWORD` | HubPostgres | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'spicedb datastore migrate head && exec spicedb serve'`
- **Start command:** `/bin/sh -c '/usr/local/bin/goose -dir /app/migrations postgres "$DATABASE_URL" up && /usr/local/bin/river migrate-up --database-url "$DATABASE_URL" && exec /app/hub-api'`
- **Start command:** `/bin/sh -c 'valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'cd /home/nextjs && node packages/database/dist/scripts/apply-migrations.js && formbricks-authzed upgrade prepare && exec ./start.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nextjs/apps/web/uploads`

**Category:** Analytics · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/formbricks-5-or-wi-1)
