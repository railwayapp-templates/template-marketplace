# Deploy OpenAnalytics [Updated Aug '26] on Railway

OpenAnalytics [Aug '26] (Privacy-First Analytics & GA Alternative) SelfHost

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openanalytics)

## About

OpenAnalytics is open-source, privacy-first web analytics: one lightweight tracker script, no cookies, no cross-site profiles, aggregate-only reads. It covers page views, custom events, sessions, web vitals, funnels, live visitors, visitor journeys, embeddable widgets, share links and revenue analytics from your own Stripe account, and replaces Google Analytics without handing anyone your visitors.

Self hosting means every pageview, session and revenue fact lives in your own Postgres and ClickHouse, under AGPL-3.0, with no vendor holding your history and no sampling applied to it. The stack is eleven services and this template deploys all of them: two databases, two Valkey instances, the collector, gateway, API, realtime stream, worker, dashboard and a migration runner. Railway handles private networking, HTTPS and volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey-queue | `redis:8.2` | Database |
| api | [Shinyduo/openanalytics-api](https://github.com/Shinyduo/openanalytics-api) | Web service |
| valkey-realtime | `redis:8.2` | Database |
| clickhouse | [Shinyduo/openanalytics-clickhouse](https://github.com/Shinyduo/openanalytics-clickhouse) | Database |
| migrate | [Shinyduo/openanalytics-migrate](https://github.com/Shinyduo/openanalytics-migrate) | Worker |
| collector | [Shinyduo/openanalytics-collector](https://github.com/Shinyduo/openanalytics-collector) | Web service |
| realtime | [Shinyduo/openanalytics-realtime](https://github.com/Shinyduo/openanalytics-realtime) | Web service |
| web | `ghcr.io/openlabs-so/openanalytics/web:v0.2.0` | Web service |
| gateway | [Shinyduo/openanalytics-gateway](https://github.com/Shinyduo/openanalytics-gateway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| worker | `ghcr.io/openlabs-so/openanalytics/worker:v0.2.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | valkey-queue | - | REDISHOST |
| `REDISPORT` | valkey-queue | 6379 | REDISPORT |
| `REDISUSER` | valkey-queue | default | REDISUSER |
| `REDIS_URL` | valkey-queue | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | valkey-queue | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | valkey-queue | (secret) | REDIS_PASSWORD |
| `PORT` | api | 8082 | PORT |
| `NODE_ENV` | api | production | NODE_ENV |
| `LOG_LEVEL` | api | info | LOG_LEVEL |
| `AUTH_SECRET` | api | (secret) | AUTH_SECRET |
| `ENVIRONMENT` | api | production | ENVIRONMENT |
| `OA_KEY_SEED` | api | 18f30b9e6f162d4ec72734ff2cc662ce76340d4e3ef0c0def612c002b791b0d2 | OA_KEY_SEED |
| `APP_BASE_URL` | api | - | APP_BASE_URL |
| `DATABASE_URL` | api | - | DATABASE_URL |
| `PRODUCT_NAME` | api | OpenAnalytics | PRODUCT_NAME |
| `AUTH_BASE_URL` | api | - | AUTH_BASE_URL |
| `QUERY_GATEWAY_URL` | api | - | QUERY_GATEWAY_URL |
| `COLLECTOR_BASE_URL` | api | - | COLLECTOR_BASE_URL |
| `AUTH_COOKIE_SAMESITE` | api | none | AUTH_COOKIE_SAMESITE |
| `AUTH_PASSWORD_SIGNIN` | api | (secret) | AUTH_PASSWORD_SIGNIN |
| `AUTH_TRUSTED_ORIGINS` | api | - | AUTH_TRUSTED_ORIGINS |
| `QUERY_SIGNING_KEY_ID` | api | oa-selfhost-1 | QUERY_SIGNING_KEY_ID |
| `OA_CREDENTIAL_KEYRING` | api | (secret) | OA_CREDENTIAL_KEYRING |
| `TRIAL_IDENTITY_SECRET` | api | (secret) | TRIAL_IDENTITY_SECRET |
| `CREDENTIAL_SOURCE_SECRET` | api | (secret) | CREDENTIAL_SOURCE_SECRET |
| `REALTIME_CACHE_REDIS_URL` | api | - | REALTIME_CACHE_REDIS_URL |
| `REDISHOST` | valkey-realtime | - | REDISHOST |
| `REDISPORT` | valkey-realtime | 6379 | REDISPORT |
| `REDISUSER` | valkey-realtime | default | REDISUSER |
| `REDIS_URL` | valkey-realtime | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | valkey-realtime | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | valkey-realtime | (secret) | REDIS_PASSWORD |
| `CLICKHOUSE_READ_PASSWORD` | clickhouse | (secret) | CLICKHOUSE_READ_PASSWORD |
| `CLICKHOUSE_INGEST_PASSWORD` | clickhouse | (secret) | CLICKHOUSE_INGEST_PASSWORD |
| `CLICKHOUSE_MIGRATION_PASSWORD` | clickhouse | (secret) | CLICKHOUSE_MIGRATION_PASSWORD |
| `CLICKHOUSE_MAINTENANCE_PASSWORD` | clickhouse | (secret) | CLICKHOUSE_MAINTENANCE_PASSWORD |
| `ENVIRONMENT` | migrate | production | ENVIRONMENT |
| `CLICKHOUSE_URL` | migrate | - | CLICKHOUSE_URL |
| `CLICKHOUSE_DATABASE` | migrate | analytics | ENVIRONMENT |
| `POSTGRES_MIGRATION_URL` | migrate | - | ENVIRONMENT |
| `CLICKHOUSE_MIGRATION_USER` | migrate | (secret) | ENVIRONMENT |
| `CLICKHOUSE_MIGRATION_PASSWORD` | migrate | (secret) | ENVIRONMENT |
| `PORT` | collector | 8080 | PORT |
| `NODE_ENV` | collector | production | NODE_ENV |
| `LOG_LEVEL` | collector | info | LOG_LEVEL |
| `ENVIRONMENT` | collector | production | ENVIRONMENT |
| `OA_KEY_SEED` | collector | - | OA_KEY_SEED |
| `DATABASE_URL` | collector | - | DATABASE_URL |
| `OA_COLLECTOR_PORT` | collector | 8083 | OA_COLLECTOR_PORT |
| `EVENT_STREAM_REDIS_URL` | collector | - | EVENT_STREAM_REDIS_URL |
| `REALTIME_CACHE_REDIS_URL` | collector | - | REALTIME_CACHE_REDIS_URL |
| `ANONYMOUS_IDENTITY_SECRET` | collector | (secret) | ANONYMOUS_IDENTITY_SECRET |
| `ANONYMOUS_IDENTITY_KEY_VERSION` | collector | 1 | ANONYMOUS_IDENTITY_KEY_VERSION |
| `PORT` | realtime | 8084 | PORT |
| `NODE_ENV` | realtime | production | NODE_ENV |
| `LOG_LEVEL` | realtime | info | LOG_LEVEL |
| `ENVIRONMENT` | realtime | production | ENVIRONMENT |
| `OA_KEY_SEED` | realtime | - | OA_KEY_SEED |
| `REALTIME_CACHE_REDIS_URL` | realtime | - | REALTIME_CACHE_REDIS_URL |
| `PORT` | web | 3000 | PORT |
| `NODE_ENV` | web | production | NODE_ENV |
| `NEXT_PUBLIC_API_URL` | web | - | NEXT_PUBLIC_API_URL |
| `NEXT_PUBLIC_REALTIME_URL` | web | - | NEXT_PUBLIC_REALTIME_URL |
| `NEXT_PUBLIC_COLLECTOR_URL` | web | - | NEXT_PUBLIC_COLLECTOR_URL |
| `PORT` | gateway | 8081 | PORT |
| `NODE_ENV` | gateway | production | NODE_ENV |
| `LOG_LEVEL` | gateway | info | LOG_LEVEL |
| `ENVIRONMENT` | gateway | production | ENVIRONMENT |
| `OA_KEY_SEED` | gateway | - | OA_KEY_SEED |
| `CLICKHOUSE_DB` | gateway | analytics | CLICKHOUSE_DB |
| `CLICKHOUSE_URL` | gateway | - | CLICKHOUSE_URL |
| `CLICKHOUSE_READ_USER` | gateway | (secret) | CLICKHOUSE_READ_USER |
| `QUERY_SIGNING_KEY_ID` | gateway | oa-selfhost-1 | QUERY_SIGNING_KEY_ID |
| `CLICKHOUSE_READ_PASSWORD` | gateway | (secret) | CLICKHOUSE_READ_PASSWORD |
| `REALTIME_CACHE_REDIS_URL` | gateway | - | REALTIME_CACHE_REDIS_URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | worker | 8085 | PORT |
| `NODE_ENV` | worker | production | NODE_ENV |
| `LOG_LEVEL` | worker | info | LOG_LEVEL |
| `ENVIRONMENT` | worker | production | ENVIRONMENT |
| `DATABASE_URL` | worker | - | DATABASE_URL |
| `PRODUCT_NAME` | worker | OpenAnalytics | PRODUCT_NAME |
| `CLICKHOUSE_DB` | worker | analytics | CLICKHOUSE_DB |
| `CLICKHOUSE_URL` | worker | - | CLICKHOUSE_URL |
| `OA_CREDENTIAL_KEYRING` | worker | (secret) | OA_CREDENTIAL_KEYRING |
| `CLICKHOUSE_INGEST_USER` | worker | (secret) | CLICKHOUSE_INGEST_USER |
| `EVENT_STREAM_REDIS_URL` | worker | - | EVENT_STREAM_REDIS_URL |
| `REALTIME_CACHE_REDIS_URL` | worker | - | REALTIME_CACHE_REDIS_URL |
| `ANONYMOUS_IDENTITY_SECRET` | worker | (secret) | ANONYMOUS_IDENTITY_SECRET |
| `CLICKHOUSE_INGEST_PASSWORD` | worker | (secret) | CLICKHOUSE_INGEST_PASSWORD |
| `CLICKHOUSE_MAINTENANCE_USER` | worker | (secret) | CLICKHOUSE_MAINTENANCE_USER |
| `ANONYMOUS_IDENTITY_KEY_VERSION` | worker | 1 | ANONYMOUS_IDENTITY_KEY_VERSION |
| `CLICKHOUSE_MAINTENANCE_PASSWORD` | worker | (secret) | CLICKHOUSE_MAINTENANCE_PASSWORD |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openanalytics)
