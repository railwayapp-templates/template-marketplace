# Deploy PostHog on Railway

Deploy the self-hosted version of PostHog.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/posthog-1)

## About

PostHog is an open-source analytics platform built for product teams that want full control over their data. It provides powerful tools for product analytics, session recording, feature flags, A/B testing, and event pipelines—without needing to send your data to third-party SaaS tools.

Hosting PostHog yourself means owning your data, reducing vendor lock-in, and avoiding usage-based pricing surprises. Traditionally, setting up PostHog involves running a complex install script, configuring multiple services manually, and managing infrastructure updates.

This template simplifies the entire process by provisioning everything needed to run PostHog on Railway, with just a few clicks. It’s containerized, portable, and production-ready—making it a seamless way to self-host with minimal DevOps overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Plugins | `ghcr.io/hexatare/posthog-railway-template/plugins:latest` | Worker |
| ZooKeeper | `ghcr.io/hexatare/posthog-railway-template/zookeeper:latest` | Database |
| Objectstorage | `ghcr.io/hexatare/posthog-railway-template/objectstorage:latest` | Database |
| Property Defs RS | `ghcr.io/hexatare/posthog-railway-template/property-defs-rs:latest` | Worker |
| Temporal | `ghcr.io/hexatare/posthog-railway-template/temporal:latest` | Worker |
| ClickHouse | `ghcr.io/hexatare/posthog-railway-template/clickhouse:latest` | Database |
| Replay Capture | `ghcr.io/hexatare/posthog-railway-template/replay-capture:latest` | Worker |
| Kafka Init | `ghcr.io/hexatare/posthog-railway-template/kafka-init:latest` | Database |
| Feature Flags | `ghcr.io/hexatare/posthog-railway-template/feature-flags:latest` | Worker |
| SeaweedFS | `ghcr.io/hexatare/posthog-railway-template/seaweedfs:latest` | Database |
| Temporal Django Worker | `ghcr.io/hexatare/posthog-railway-template/temporal-django-worker:latest` | Worker |
| Cyclotron Janitor | `ghcr.io/hexatare/posthog-railway-template/cyclotron-janitor:latest` | Worker |
| Web | `ghcr.io/hexatare/posthog-railway-template/web:latest` | Web service |
| Worker | `ghcr.io/hexatare/posthog-railway-template/worker:latest` | Worker |
| Postgres | `ghcr.io/hexatare/posthog-railway-template/db:latest` | Database |
| Kafka | `ghcr.io/hexatare/posthog-railway-template/kafka` | Database |
| Livestream | `ghcr.io/hexatare/posthog-railway-template/livestream:latest` | Web service |
| Redis | `ghcr.io/hexatare/posthog-railway-template/redis7:latest` | Database |
| Capture | `ghcr.io/hexatare/posthog-railway-template/capture:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY` | Plugins | (secret) |
| `CDP_REDIS_PORT` | Plugins | 6379 |
| `LOGS_REDIS_TLS` | Plugins | false |
| `LOGS_REDIS_PORT` | Plugins | 6379 |
| `CLICKHOUSE_SECURE` | Plugins | false |
| `CLICKHOUSE_VERIFY` | Plugins | false |
| `CLICKHOUSE_DATABASE` | Plugins | posthog |
| `ENCRYPTION_SALT_KEYS` | Plugins | 71781d6c2ecefb5c55d5db6202414b33 |
| `COOKIELESS_REDIS_PORT` | Plugins | 6379 |
| `OBJECT_STORAGE_ENABLED` | Plugins | true |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | Plugins | (secret) |
| `SESSION_RECORDING_V2_S3_TIMEOUT_MS` | Plugins | 120000 |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | Plugins | any |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | Plugins | (secret) |
| `MINIO_ROOT_USER` | Objectstorage | (secret) |
| `MINIO_ROOT_PASSWORD` | Objectstorage | (secret) |
| `SKIP_READS` | Property Defs RS | false |
| `FILTER_MODE` | Property Defs RS | opt-out |
| `SKIP_WRITES` | Property Defs RS | false |
| `DB` | Temporal | postgresql |
| `DB_PORT` | Temporal | 5432 |
| `ENABLE_ES` | Temporal | false |
| `POSTGRES_USER` | Temporal | (secret) |
| `DYNAMIC_CONFIG_FILE_PATH` | Temporal | config/dynamicconfig/development-sql.yaml |
| `CLICKHOUSE_SKIP_USER_SETUP` | ClickHouse | 1 |
| `ADDRESS` | Replay Capture | 0.0.0.0:3000 |
| `KAFKA_TOPIC` | Replay Capture | session_recording_snapshot_item_events |
| `CAPTURE_MODE` | Replay Capture | recordings |
| `ADDRESS` | Feature Flags | 0.0.0.0:3001 |
| `RUST_LOG` | Feature Flags | info |
| `MAXMIND_DB_PATH` | Feature Flags | /share/GeoLite2-City.mmdb |
| `COOKIELESS_REDIS_PORT` | Feature Flags | 6379 |
| `SITE_URL` | Temporal Django Worker | https://test.posthog.net |
| `DEPLOYMENT` | Temporal Django Worker | hobby |
| `SECRET_KEY` | Temporal Django Worker | (secret) |
| `IS_BEHIND_PROXY` | Temporal Django Worker | true |
| `CLICKHOUSE_SECURE` | Temporal Django Worker | false |
| `CLICKHOUSE_VERIFY` | Temporal Django Worker | false |
| `OTEL_SDK_DISABLED` | Temporal Django Worker | true |
| `CLICKHOUSE_API_USER` | Temporal Django Worker | (secret) |
| `CLICKHOUSE_APP_USER` | Temporal Django Worker | (secret) |
| `CLICKHOUSE_DATABASE` | Temporal Django Worker | posthog |
| `FLAGS_REDIS_ENABLED` | Temporal Django Worker | false |
| `API_QUERIES_PER_TEAM` | Temporal Django Worker | {"1": 100} |
| `CLICKHOUSE_API_PASSWORD` | Temporal Django Worker | (secret) |
| `CLICKHOUSE_APP_PASSWORD` | Temporal Django Worker | (secret) |
| `DISABLE_SECURE_SSL_REDIRECT` | Temporal Django Worker | true |
| `KAFKA_TOPIC` | Cyclotron Janitor | clickhouse_app_metrics2 |
| `DEPLOYMENT` | Web | hobby |
| `SECRET_KEY` | Web | (secret) |
| `CDP_API_URL` | Web | http://plugins:6738 |
| `USE_GRANIAN` | Web | true |
| `GRANIAN_WORKERS` | Web | 2 |
| `IS_BEHIND_PROXY` | Web | true |
| `OPT_OUT_CAPTURE` | Web | false |
| `CLICKHOUSE_SECURE` | Web | false |
| `CLICKHOUSE_VERIFY` | Web | false |
| `OTEL_SDK_DISABLED` | Web | true |
| `OTEL_SERVICE_NAME` | Web | posthog |
| `CLICKHOUSE_API_USER` | Web | (secret) |
| `CLICKHOUSE_APP_USER` | Web | (secret) |
| `CLICKHOUSE_DATABASE` | Web | posthog |
| `FLAGS_REDIS_ENABLED` | Web | false |
| `API_QUERIES_PER_TEAM` | Web | {"1": 100} |
| `ENCRYPTION_SALT_KEYS` | Web | 71781d6c2ecefb5c55d5db6202414b33 |
| `OBJECT_STORAGE_ENABLED` | Web | true |
| `CLICKHOUSE_API_PASSWORD` | Web | (secret) |
| `CLICKHOUSE_APP_PASSWORD` | Web | (secret) |
| `DISABLE_SECURE_SSL_REDIRECT` | Web | true |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | Web | (secret) |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | Web | any |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | Web | (secret) |
| `DEPLOYMENT` | Worker | hobby |
| `SECRET_KEY` | Worker | (secret) |
| `IS_BEHIND_PROXY` | Worker | true |
| `CLICKHOUSE_SECURE` | Worker | false |
| `CLICKHOUSE_VERIFY` | Worker | false |
| `OTEL_SDK_DISABLED` | Worker | true |
| `CLICKHOUSE_API_USER` | Worker | (secret) |
| `CLICKHOUSE_APP_USER` | Worker | (secret) |
| `CLICKHOUSE_DATABASE` | Worker | posthog |
| `FLAGS_REDIS_ENABLED` | Worker | false |
| `API_QUERIES_PER_TEAM` | Worker | {"1": 100} |
| `ENCRYPTION_SALT_KEYS` | Worker | 71781d6c2ecefb5c55d5db6202414b33 |
| `OBJECT_STORAGE_ENABLED` | Worker | true |
| `CLICKHOUSE_API_PASSWORD` | Worker | (secret) |
| `CLICKHOUSE_APP_PASSWORD` | Worker | (secret) |
| `DISABLE_SECURE_SSL_REDIRECT` | Worker | true |
| `POSTHOG_SKIP_MIGRATION_CHECKS` | Worker | 1 |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | Worker | (secret) |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | Worker | any |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | Worker | (secret) |
| `POSTGRES_DB` | Postgres | posthog |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `KAFKA_LOG_DIRS` | Kafka | /var/lib/kafka/data/kafka-logs |
| `KAFKA_BROKER_ID` | Kafka | 1001 |
| `KAFKA_LISTENERS` | Kafka | PLAINTEXT://:9092 |
| `KAFKA_LOG_RETENTION_MS` | Kafka | 3600000 |
| `ALLOW_PLAINTEXT_LISTENER` | Kafka | true |
| `KAFKA_LOG_RETENTION_HOURS` | Kafka | 1 |
| `KAFKA_RESERVED_BROKER_MAX_ID` | Kafka | 1001 |
| `KAFKA_LOG_RETENTION_CHECK_INTERVAL_MS` | Kafka | 300000 |
| `LIVESTREAM_JWT_SECRET` | Livestream | (secret) |
| `ADDRESS` | Capture | 0.0.0.0:3000 |
| `RUST_LOG` | Capture | info,rdkafka=warn |
| `KAFKA_TOPIC` | Capture | events_plugin_ingestion |
| `CAPTURE_MODE` | Capture | events |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/kafka/data`
- **TCP Proxies:** 6379

**Category:** Analytics

[View on Railway →](https://railway.com/template/posthog-1)
