# Deploy PostHog Hobby on Railway

Deploy and Host PostHog Hobby with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posthog-hobby)

## About

PostHog Hobby is a reliable self-hosted deployment of PostHog — a complete product analytics platform with event tracking, feature flags, session recordings, funnels, and dashboards. This template ships a hobby-tier configuration pinned to a specific PostHog commit, with healthchecks on every service and a one-shot migration runner so upgrades stay clean.

This template runs the official PostHog application stack on Railway with 10 pre-configured services, each pinned to immutable image tags rather than `latest`. The setup mirrors PostHog's official `docker-compose.hobby.yml` but adapts it for Railway's per-service architecture: ZooKeeper is replaced with Redpanda (KRaft mode, single binary), ClickHouse ships pre-baked with PostHog's required cluster topology and UDFs, and migrations run as a separate one-shot service to avoid races on rebuild.

Pinned to PostHog `sha-70c912d` (2026-05-04). All cross-service connections use Railway's private network with auto-generated secrets. After the first deploy, redeploy the `Web` service once to pick up the `CAPTURE_ENDPOINT` reference (Railway's public domains populate after the first build).

Resources: requires approximately 8 GB RAM total. Railway Pro plan recommended (~$25-30/mo). Single-broker Kafka (Redpanda) is suitable for projects up to ~1M events/day.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:15.12-alpine` | Database |
| Redis | `redis:8.2.1` | Database |
| Capture | `ghcr.io/posthog/posthog/capture:sha-70c912d` | Web service |
| ClickHouse | `ghcr.io/ikatsuba/posthog-clickhouse:26.3.9.8-70c912d` | Database |
| Web | `posthog/posthog:sha-70c912d` | Web service |
| Worker | `posthog/posthog:sha-70c912d` | Worker |
| MinIO | `minio/minio:RELEASE.2025-04-22T22-12-26Z` | Database |
| Migrate | `posthog/posthog:sha-70c912d` | Worker |
| Kafka | `bitnami/kafka:3.9` | Database |
| Plugins | `posthog/posthog-node:30c8ab7fe262baa51c639565ebbd0041280ef989` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Capture | 3000 | HTTP port |
| `ADDRESS` | Capture | [::]:3000 | Listen on IPv6 (Railway proxy uses IPv6 for healthcheck through public domain) |
| `RUST_LOG` | Capture | info,rdkafka=warn | Log level |
| `REDIS_URL` | Capture | - | Redis (no ?family=0) |
| `KAFKA_HOSTS` | Capture | - | Kafka brokers |
| `KAFKA_TOPIC` | Capture | events_plugin_ingestion | Kafka topic for events |
| `CAPTURE_MODE` | Capture | events | Modes: events | recordings | replay |
| `KAFKA_HOSTS` | ClickHouse | - | PostHog config.d/default.xml uses <kafka_broker_list from_env="KAFKA_HOSTS"/> for named_collections; without this, entrypoint logs "Env variable is not set: KAFKA_HOSTS" and named collections become unusable |
| `CLICKHOUSE_DB` | ClickHouse | posthog | Default database |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Admin user |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Admin password (alphanumeric) |
| `CLICKHOUSE_INTERNAL_HOST` | ClickHouse | - | Self-hostname for system.clusters; Web/Worker reads cluster topology from here and connects via this address |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Allow runtime user creation by app |
| `PORT` | Web | 8000 | Django port |
| `DEBUG` | Web | 0 | Production mode |
| `SITE_URL` | Web | - | Self public URL |
| `REDIS_URL` | Web | - | Redis (no ?family=0) |
| `DEPLOYMENT` | Web | railway | Telemetry tag |
| `SECRET_KEY` | Web | (secret) | Reuse from Migrate |
| `KAFKA_HOSTS` | Web | - | Kafka brokers |
| `DATABASE_URL` | Web | - | Postgres |
| `CLICKHOUSE_HOST` | Web | - | ClickHouse host |
| `CLICKHOUSE_USER` | Web | (secret) | ClickHouse user |
| `IS_BEHIND_PROXY` | Web | true | Trust X-Forwarded-* |
| `CAPTURE_ENDPOINT` | Web | - | Where SDK sends events |
| `CELERY_BROKER_URL` | Web | - | Same as REDIS_URL but separated for kombu |
| `CLICKHOUSE_SECURE` | Web | false | TLS off |
| `CLICKHOUSE_VERIFY` | Web | false | TLS verify off |
| `TRUST_ALL_PROXIES` | Web | true | Same |
| `CLICKHOUSE_DATABASE` | Web | - | ClickHouse database |
| `CLICKHOUSE_PASSWORD` | Web | (secret) | ClickHouse password |
| `ENCRYPTION_SALT_KEYS` | Web | - | Reuse from Migrate |
| `OBJECT_STORAGE_BUCKET` | Web | posthog | Bucket name |
| `OBJECT_STORAGE_ENABLED` | Web | true | Enable S3 storage |
| `OBJECT_STORAGE_ENDPOINT` | Web | - | MinIO private endpoint |
| `DISABLE_SECURE_SSL_REDIRECT` | Web | true | Railway terminates TLS |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | Web | - | S3 access key |
| `POSTHOG_SKIP_MIGRATION_CHECKS` | Web | 1 | Skip migration check |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | Web | - | Public for session recordings |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | Web | (secret) | S3 secret |
| `DEBUG` | Worker | 0 | Production mode |
| `SITE_URL` | Worker | - | Public URL (for emails) |
| `REDIS_URL` | Worker | - | Redis (no ?family=0) |
| `DEPLOYMENT` | Worker | railway | Telemetry tag |
| `SECRET_KEY` | Worker | (secret) | Reuse from Migrate (NOT a new secret) |
| `KAFKA_HOSTS` | Worker | - | Kafka brokers |
| `DATABASE_URL` | Worker | - | Postgres |
| `CLICKHOUSE_HOST` | Worker | - | ClickHouse host |
| `CLICKHOUSE_USER` | Worker | (secret) | ClickHouse user |
| `IS_BEHIND_PROXY` | Worker | true | Trust X-Forwarded-* (Railway proxy) |
| `CELERY_BROKER_URL` | Worker | - | Same as REDIS_URL but separated for kombu |
| `CLICKHOUSE_SECURE` | Worker | false | TLS off |
| `CLICKHOUSE_VERIFY` | Worker | false | TLS verify off |
| `TRUST_ALL_PROXIES` | Worker | true | Same |
| `CLICKHOUSE_DATABASE` | Worker | - | ClickHouse database |
| `CLICKHOUSE_PASSWORD` | Worker | (secret) | ClickHouse password |
| `ENCRYPTION_SALT_KEYS` | Worker | - | Reuse from Migrate |
| `OBJECT_STORAGE_BUCKET` | Worker | posthog | Bucket name |
| `OBJECT_STORAGE_ENABLED` | Worker | true | Enable S3 storage |
| `OBJECT_STORAGE_ENDPOINT` | Worker | - | MinIO private endpoint |
| `CELERY_WORKER_CONCURRENCY` | Worker | 4 | Default 32 workers OOM-killed on 1 GB; 4 fits comfortably |
| `DISABLE_SECURE_SSL_REDIRECT` | Worker | true | Railway terminates TLS |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | Worker | - | S3 access key |
| `POSTHOG_SKIP_MIGRATION_CHECKS` | Worker | 1 | Skip migration check (Migrate runs separately) |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | Worker | - | Public endpoint |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | Worker | (secret) | S3 secret |
| `MINIO_ROOT_USER` | MinIO | (secret) | Root access key (alphanumeric — S3 SDK signing strict on special chars) |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Root secret key (alphanumeric) |
| `DEBUG` | Migrate | 0 | Production mode |
| `SITE_URL` | Migrate | - | Public URL (for emails/links) |
| `REDIS_URL` | Migrate | - | Redis (NO ?family=0 — newer redis-py rejects 'family' kwarg) |
| `DEPLOYMENT` | Migrate | railway | Telemetry tag |
| `SECRET_KEY` | Migrate | (secret) | Django SECRET_KEY — generated HERE, other services reference it |
| `KAFKA_HOSTS` | Migrate | - | Kafka brokers |
| `DATABASE_URL` | Migrate | - | Postgres connection |
| `CLICKHOUSE_HOST` | Migrate | - | ClickHouse host |
| `CLICKHOUSE_USER` | Migrate | (secret) | ClickHouse user |
| `CELERY_BROKER_URL` | Migrate | - | Celery broker (separate from REDIS_URL because kombu also rejects 'family' query param) |
| `CLICKHOUSE_SECURE` | Migrate | false | TLS off (private network) |
| `CLICKHOUSE_VERIFY` | Migrate | false | TLS verify off |
| `CLICKHOUSE_DATABASE` | Migrate | - | ClickHouse database |
| `CLICKHOUSE_PASSWORD` | Migrate | (secret) | ClickHouse password |
| `ENCRYPTION_SALT_KEYS` | Migrate | - | Salt for team API key encryption — generated HERE |
| `KAFKA_HEAP_OPTS` | Kafka | -Xms512m -Xmx512m | - |
| `KAFKA_CFG_NODE_ID` | Kafka | 0 | - |
| `KAFKA_CFG_LISTENERS` | Kafka | PLAINTEXT://:9092,CONTROLLER://:9093 | - |
| `KAFKA_CFG_PROCESS_ROLES` | Kafka | controller,broker | - |
| `ALLOW_PLAINTEXT_LISTENER` | Kafka | yes | - |
| `KAFKA_CFG_CONTROLLER_QUORUM_VOTERS` | Kafka | 0@localhost:9093 | - |
| `KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE` | Kafka | true | - |
| `KAFKA_CFG_CONTROLLER_LISTENER_NAMES` | Kafka | CONTROLLER | - |
| `KAFKA_CFG_INTER_BROKER_LISTENER_NAME` | Kafka | PLAINTEXT | - |
| `KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT | - |
| `PORT` | Plugins | 6738 | Plugin server port |
| `REDIS_URL` | Plugins | - | Redis (no ?family=0) |
| `CDP_API_URL` | Plugins | http://localhost:6738 | Self-loopback for CDP loop |
| `KAFKA_HOSTS` | Plugins | - | Kafka brokers |
| `DATABASE_URL` | Plugins | - | Postgres |
| `CLICKHOUSE_HOST` | Plugins | - | ClickHouse host |
| `CLICKHOUSE_USER` | Plugins | (secret) | ClickHouse user |
| `CELERY_BROKER_URL` | Plugins | - | Same as REDIS_URL but separated for kombu |
| `CLICKHOUSE_SECURE` | Plugins | false | TLS off |
| `CLICKHOUSE_VERIFY` | Plugins | false | TLS verify off |
| `CLICKHOUSE_DATABASE` | Plugins | - | ClickHouse database |
| `CLICKHOUSE_PASSWORD` | Plugins | (secret) | ClickHouse password |
| `FLAGS_REDIS_ENABLED` | Plugins | false | Hobby simplicity — no separate flags Redis |
| `ENCRYPTION_SALT_KEYS` | Plugins | - | Reuse from Migrate |
| `PERSONS_DATABASE_URL` | Plugins | - | Same DB in hobby (PostHog v3+ may split) |
| `OBJECT_STORAGE_BUCKET` | Plugins | posthog | Bucket name (auto-created by PostHog) |
| `OBJECT_STORAGE_ENABLED` | Plugins | true | Enable S3 storage |
| `OBJECT_STORAGE_ENDPOINT` | Plugins | - | MinIO private endpoint |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | Plugins | - | S3 access key |
| `BEHAVIORAL_COHORTS_DATABASE_URL` | Plugins | - | Same DB in hobby |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | Plugins | (secret) | S3 secret |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `./bin/docker`
- **Start command:** `./bin/docker-worker-celery --with-scheduler`
- **Start command:** `minio server /data --address "[::]:9000" --console-address "[::]:9001"`
- **Start command:** `sh -c "python manage.py migrate && python manage.py migrate_clickhouse && python manage.py run_async_migrations"`
- **Start command:** `sh -c "rpk redpanda start --kafka-addr internal://[::]:9092 --advertise-kafka-addr internal://${RAILWAY_PRIVATE_DOMAIN}:9092 --rpc-addr [::]:33145 --advertise-rpc-addr ${RAILWAY_PRIVATE_DOMAIN}:33145 --mode dev-container --smp 1 --memory 768M --reserve-memory 256M --overprovisioned --set redpanda.empty_seed_starts_cluster=true --set redpanda.auto_create_topics_enabled=true"`
- **Start command:** `node nodejs/dist/index.js`

**Category:** Other

[View on Railway →](https://railway.com/deploy/posthog-hobby)
