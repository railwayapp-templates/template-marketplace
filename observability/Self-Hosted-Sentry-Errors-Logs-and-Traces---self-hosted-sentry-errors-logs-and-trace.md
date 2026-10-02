# Deploy Self-Hosted Sentry: Errors, Logs and Traces on Railway

Errors, logs and traces. Fair Source (FSL-1.1-Apache-2.0).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-sentry-errors-logs-and-trace)

## About

Sentry 26.9.0 for errors, structured logs and linked traces from your applications
in the same Railway environment. Fair Source (FSL-1.1-Apache-2.0).
Unofficial community template, not affiliated with or endorsed by Sentry.

Sentry UI, private ingestion, automatic bootstrap, per-install passwords,
persistent databases and separate object-storage buckets. Errors appear in
**Issues**, structured logs in **Logs**, and parent/child spans in **Traces**.
The pinned runtime needs PostgreSQL, Valkey, ClickHouse, Kafka, Memcached,
Symbolicator, Taskbroker, Relay, Snuba, processing workers and a gateway.
Only the gateway exposes public HTTP; ingestion is private.

This profile excludes replay, profiling, feedback, uptime, cron monitoring,
AI features and legacy metrics. It is single-node. Indexed retention is seven
days; Kafka queue age is three hours, so a prolonged outage can lose queued data.
Email is disabled by default; optional SMTP setup is in [operations](OPERATIONS.md).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sentry-consumers | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| sentry-tasks | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| memcached | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| snuba-api | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| relay | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| clickhouse | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Database |
| valkey | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Database |
| web | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| symbolicator | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| snuba-consumers | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Worker |
| gateway | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Web service |
| postgres | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Database |
| kafka | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Database |
| taskbroker | [kayossouza/railway-sentry](https://github.com/kayossouza/railway-sentry) (root: /runtime) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | sentry-consumers | 8080 |
| `REDIS_PASSWORD` | sentry-consumers | (secret) |
| `FILE_SECRET_KEY` | sentry-consumers | (secret) |
| `NODE_SECRET_KEY` | sentry-consumers | (secret) |
| `COMPOSE_PROFILES` | sentry-consumers | feature-complete |
| `POSTGRES_PASSWORD` | sentry-consumers | (secret) |
| `SENTRY_SYSTEM_SECRET_KEY` | sentry-consumers | (secret) |
| `PORT` | sentry-tasks | 8080 |
| `REDIS_PASSWORD` | sentry-tasks | (secret) |
| `FILE_SECRET_KEY` | sentry-tasks | (secret) |
| `NODE_SECRET_KEY` | sentry-tasks | (secret) |
| `COMPOSE_PROFILES` | sentry-tasks | feature-complete |
| `POSTGRES_PASSWORD` | sentry-tasks | (secret) |
| `TASKWORKER_CONCURRENCY` | sentry-tasks | 1 |
| `SENTRY_SYSTEM_SECRET_KEY` | sentry-tasks | (secret) |
| `PORT` | snuba-api | 1218 |
| `REDIS_PASSWORD` | snuba-api | (secret) |
| `SNUBA_SETTINGS` | snuba-api | self_hosted |
| `SNUBA_API_WORKERS` | snuba-api | 1 |
| `CLICKHOUSE_PASSWORD` | snuba-api | (secret) |
| `CLICKHOUSE_TRACE_PASSWORD` | snuba-api | (secret) |
| `CLICKHOUSE_READONLY_PASSWORD` | snuba-api | (secret) |
| `PORT` | relay | 3000 |
| `NODE_SECRET_KEY` | relay | (secret) |
| `PORT` | clickhouse | 8123 |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `MAX_MEMORY_USAGE_RATIO` | clickhouse | 0.3 |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 |
| `REDIS_PASSWORD` | valkey | (secret) |
| `PORT` | web | 9000 |
| `ADMIN_EMAIL` | web | admin@sentry.local |
| `WEB_WORKERS` | web | 1 |
| `ADMIN_PASSWORD` | web | (secret) |
| `REDIS_PASSWORD` | web | (secret) |
| `FILE_SECRET_KEY` | web | (secret) |
| `NODE_SECRET_KEY` | web | (secret) |
| `COMPOSE_PROFILES` | web | feature-complete |
| `POSTGRES_PASSWORD` | web | (secret) |
| `SENTRY_SYSTEM_SECRET_KEY` | web | (secret) |
| `SENTRY_EVENT_RETENTION_DAYS` | web | 7 |
| `PORT` | symbolicator | 3021 |
| `PORT` | snuba-consumers | 8080 |
| `REDIS_PASSWORD` | snuba-consumers | (secret) |
| `SNUBA_SETTINGS` | snuba-consumers | self_hosted |
| `SNUBA_API_WORKERS` | snuba-consumers | 1 |
| `CLICKHOUSE_PASSWORD` | snuba-consumers | (secret) |
| `CLICKHOUSE_TRACE_PASSWORD` | snuba-consumers | (secret) |
| `CLICKHOUSE_READONLY_PASSWORD` | snuba-consumers | (secret) |
| `PORT` | gateway | 8080 |
| `POSTGRES_DB` | postgres | postgres |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `CLUSTER_ID` | kafka | MkU3OEVBNTcwNTJENDM2Qk |
| `KAFKA_NODE_ID` | kafka | 1001 |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/logs |
| `KAFKA_HEAP_OPTS` | kafka | -Xms256m -Xmx512m |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://[::]:29092,EXTERNAL://[::]:9092,CONTROLLER://[::]:29093 |
| `KAFKA_LOG4J_LOGGERS` | kafka | kafka.cluster=WARN,kafka.controller=WARN,kafka.coordinator=WARN,kafka.log=WARN,kafka.server=WARN,state.change.logger=WARN |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller |
| `KAFKA_MAX_REQUEST_SIZE` | kafka | 50000000 |
| `KAFKA_MESSAGE_MAX_BYTES` | kafka | 50000000 |
| `KAFKA_LOG4J_ROOT_LOGLEVEL` | kafka | WARN |
| `KAFKA_LOG_RETENTION_HOURS` | kafka | 3 |
| `KAFKA_TOOLS_LOG4J_LOGLEVEL` | kafka | WARN |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1001@127.0.0.1:29093 |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER |
| `CONFLUENT_SUPPORT_METRICS_ENABLE` | kafka | false |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT |
| `KAFKA_OFFSETS_TOPIC_NUM_PARTITIONS` | kafka | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | kafka | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | kafka | 1 |
| `TASKBROKER_DB_PATH` | taskbroker | /opt/sqlite/taskbroker-activations.sqlite |

## Configuration

- **Healthcheck:** `/ready`
- **Healthcheck:** `/health`
- **Healthcheck:** `/api/relay/healthcheck/ready/`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/data`
- **Healthcheck:** `/_health/`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/kafka/data`
- **Volume:** `/opt/sqlite`

**Category:** Observability · **Languages:** Python, Dockerfile, TypeScript, Shell

[View on Railway →](https://railway.com/deploy/self-hosted-sentry-errors-logs-and-trace)
