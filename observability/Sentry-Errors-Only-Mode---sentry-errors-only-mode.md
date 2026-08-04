# Deploy Sentry (Errors Only Mode) on Railway

Deploy and Host Sentry (Errors Only Mode) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sentry-errors-only-mode)

## About

Sentry is the industry-standard error tracking platform. This template deploys **real self-hosted Sentry** — the same stack as [getsentry/self-hosted](https://github.com/getsentry/self-hosted) in its errors-only profile — with issues, grouping, metric alerts, and stack-trace symbolication, at the bleeding edge (`nightly`) or pinned to any upstream release.

Self-hosted Sentry is a genuinely heavy, multi-service system: Postgres, Redis, Kafka, ClickHouse, and Memcached feed Sentry's web UI, Relay ingestion gateway, Snuba query engine, Symbolicator, and a fleet of stream consumers. This template runs the complete upstream errors-only profile as 23 cooperating Railway services on the private network, with one public nginx entrypoint carrying upstream's exact routing (your DSNs and UI share one domain). Deployment is one-click — no required inputs: the admin login defaults to `admin@example.com` with a generated password (both editable on the `web` service). First boot is zero-touch: secrets are generated per deployment, Relay credentials persist to a volume, object storage lives in a Railway bucket with retention lifecycle, and database migrations plus Kafka topics bootstrap automatically. Expect 10–14 GB resident RAM — this is the genuine article, not a lookalike.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/sentry) | Worker |
| symbolicator | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/symbolicator) | Worker |
| snuba-subscription-consumer-eap-items | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| kafka | `confluentinc/cp-kafka:7.6.6` | Database |
| clickhouse | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/clickhouse) | Database |
| snuba-outcomes-billing-consumer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| snuba-outcomes-consumer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| attachments-consumer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/sentry) | Worker |
| post-process-forwarder-errors | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/sentry) | Worker |
| relay | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/relay) | Database |
| snuba-api | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| taskscheduler | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/sentry) | Worker |
| snuba-errors-consumer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| postgres | `postgres:14.23-bookworm` | Database |
| memcached | `memcached:1.6.45-alpine` | Database |
| nginx | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/nginx) | Web service |
| taskworker | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/sentry) | Worker |
| events-consumer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/sentry) | Worker |
| taskbroker | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/taskbroker) | Database |
| redis | `redis:6.2.20-alpine` | Database |
| snuba-replacer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| snuba-subscription-consumer-events | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |
| snuba-group-attributes-consumer | [jratienza65/sentry-railway](https://github.com/jratienza65/sentry-railway) (root: /services/snuba) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SNUBA` | web | - | Snuba API URL (references the snuba-api service's private domain). |
| `VROOM` | web | http://vroom.railway.internal:8085 | Vroom (profiling) URL — not deployed in the errors-only profile; harmless default. |
| `SENTRY_VERSION` | web | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `COMPOSE_PROFILES` | web | errors-only | Upstream feature profile — errors-only mirrors getsentry/self-hosted's errors-only deployment. |
| `SENTRY_REDIS_HOST` | web | - | Redis host (references the redis service's private domain). |
| `SENTRY_URL_PREFIX` | web | - | Public URL of this Sentry install (references the nginx service's public domain). Used for links, DSNs and CSRF checks. |
| `SENTRY_ADMIN_EMAIL` | web | admin@example.com | Login email for the initial Sentry admin user. The default works as a username (email delivery is disabled unless SMTP is configured) — change it here before deploying, or later in Sentry itself. The generated password is in this service's SENTRY_ADMIN_PASSWORD variable. |
| `SENTRY_POSTGRES_HOST` | web | - | Postgres host (references the postgres service's private domain). |
| `SENTRY_ADMIN_PASSWORD` | web | (secret) | Password for the initial Sentry admin user — generated at deploy time. |
| `SENTRY_MEMCACHED_ADDR` | web | - | Memcached address (references the memcached service's private domain). |
| `SENTRY_REDIS_PASSWORD` | web | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_SYMBOLICATOR_URL` | web | - | Symbolicator URL (references the symbolicator service's private domain). |
| `SENTRY_POSTGRES_PASSWORD` | web | (secret) | Postgres password (references ${{postgres.POSTGRES_PASSWORD}}). |
| `SENTRY_SYSTEM_SECRET_KEY` | web | (secret) | Sentry's signing secret — generated at deploy time; all sentry services reference this value. Rotating it invalidates sessions. |
| `SENTRY_BOOTSTRAP_ON_START` | web | 1 | Runs the idempotent bootstrap before serving: waits for backing services, verifies object storage, runs sentry upgrade (migrations + Kafka topics), ensures the admin user. |
| `SENTRY_PROFILES_S3_BUCKET` | web | - | S3 bucket name for profiling data (profiles store) — references the project bucket. |
| `SENTRY_PROFILES_S3_PREFIX` | web | profiles | Key prefix isolating profiling data (profiles store) within the shared bucket. |
| `SENTRY_PROFILES_S3_REGION` | web | - | S3 region for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_BUCKET` | web | - | S3 bucket name for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_FILESTORE_S3_PREFIX` | web | filestore | Key prefix isolating uploads and file assets (filestore) within the shared bucket. |
| `SENTRY_FILESTORE_S3_REGION` | web | - | S3 region for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_BUCKET` | web | - | S3 bucket name for event payloads (nodestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_PREFIX` | web | nodestore | Key prefix isolating event payloads (nodestore) within the shared bucket. |
| `SENTRY_NODESTORE_S3_REGION` | web | - | S3 region for event payloads (nodestore) — references the project bucket. |
| `LAUNCHPAD_RPC_SHARED_SECRET` | web | (secret) | Shared secret for the launchpad RPC (feature-complete profile) — generated at deploy time. |
| `SENTRY_EVENT_RETENTION_DAYS` | web | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SENTRY_PROFILES_S3_ENDPOINT` | web | - | S3 endpoint for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_ENDPOINT` | web | - | S3 endpoint for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_ENDPOINT` | web | - | S3 endpoint for event payloads (nodestore) — references the project bucket. |
| `SENTRY_PROFILES_S3_ACCESS_KEY` | web | - | S3 access key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_SECRET_KEY` | web | (secret) | S3 secret key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_ACCESS_KEY` | web | - | S3 access key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_SECRET_KEY` | web | (secret) | S3 secret key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_KAFKA_BOOTSTRAP_SERVERS` | web | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `SENTRY_NODESTORE_S3_ACCESS_KEY` | web | - | S3 access key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_NODESTORE_S3_SECRET_KEY` | web | (secret) | S3 secret key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_ADDRESSING_STYLE` | web | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_FILESTORE_S3_ADDRESSING_STYLE` | web | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_NODESTORE_S3_ADDRESSING_STYLE` | web | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_VERSION` | symbolicator | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SYMBOLICATOR_STATSD_ADDR` | symbolicator | 127.0.0.1:8125 | StatsD sink for symbolicator metrics — loopback no-op by default. |
| `REDIS_HOST` | snuba-subscription-consumer-eap-items | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-subscription-consumer-eap-items | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-subscription-consumer-eap-items | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-subscription-consumer-eap-items | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-subscription-consumer-eap-items | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-subscription-consumer-eap-items | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-subscription-consumer-eap-items | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-subscription-consumer-eap-items | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-subscription-consumer-eap-items | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-subscription-consumer-eap-items | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-subscription-consumer-eap-items | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `CLUSTER_ID` | kafka | MkU3OEVBNTcwNTJENDM2Qk | Fixed KRaft cluster id from upstream self-hosted — do not change after first boot. |
| `KAFKA_NODE_ID` | kafka | 1001 | Fixed broker node id (upstream default). |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/kraft-logs | Kafka data directory — a subdirectory of the volume, because the volume mount root contains lost+found (which kafka rejects). |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://127.0.0.1:29092,EXTERNAL://[::]:9092,CONTROLLER://127.0.0.1:29093 | Bind addresses: loopback broker+controller, plus EXTERNAL on [::]:9092 for the private network (IPv6). |
| `KAFKA_LOG4J_LOGGERS` | kafka | kafka.cluster=WARN,kafka.controller=WARN,kafka.coordinator=WARN,kafka.log=WARN,kafka.server=WARN,state.change.logger=WARN | Per-component log levels (upstream default: WARN). |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller | KRaft mode: this single node acts as both broker and controller (upstream self-hosted default). |
| `KAFKA_MAX_REQUEST_SIZE` | kafka | 50000000 | Max request size (50 MB, matches KAFKA_MESSAGE_MAX_BYTES). |
| `KAFKA_MESSAGE_MAX_BYTES` | kafka | 50000000 | Max message size (50 MB, upstream default — large events/attachments). |
| `KAFKA_LOG4J_ROOT_LOGLEVEL` | kafka | WARN | Root log level (upstream default: WARN). |
| `KAFKA_LOG_RETENTION_HOURS` | kafka | 24 | Kafka topic retention. Lower to shrink the kafka volume; events already consumed are not needed again. |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | - | Addresses advertised to clients — EXTERNAL uses this service's Railway private domain. |
| `KAFKA_TOOLS_LOG4J_LOGLEVEL` | kafka | WARN | CLI tools log level (upstream default: WARN). |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1001@127.0.0.1:29093 | Single-node KRaft controller quorum (loopback). |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER | Listener name used for the KRaft controller. |
| `CONFLUENT_SUPPORT_METRICS_ENABLE` | kafka | false | Disables Confluent phone-home metrics. |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT | Listener used for inter-broker traffic (single node). |
| `KAFKA_OFFSETS_TOPIC_NUM_PARTITIONS` | kafka | 1 | Partitions for the consumer-offsets topic (upstream default). |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT | All listeners are PLAINTEXT — traffic stays on Railway's private network. |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 | Replication factor 1 — single-broker deployment. |
| `SENTRY_VERSION` | clickhouse | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `MAX_MEMORY_USAGE_RATIO` | clickhouse | 0.3 | Caps ClickHouse memory at this fraction of container memory (upstream default 0.3). |
| `REDIS_HOST` | snuba-outcomes-billing-consumer | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-outcomes-billing-consumer | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-outcomes-billing-consumer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-outcomes-billing-consumer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-outcomes-billing-consumer | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-outcomes-billing-consumer | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-outcomes-billing-consumer | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-outcomes-billing-consumer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-outcomes-billing-consumer | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-outcomes-billing-consumer | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-outcomes-billing-consumer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `REDIS_HOST` | snuba-outcomes-consumer | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-outcomes-consumer | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-outcomes-consumer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-outcomes-consumer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-outcomes-consumer | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-outcomes-consumer | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-outcomes-consumer | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-outcomes-consumer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-outcomes-consumer | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-outcomes-consumer | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-outcomes-consumer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SNUBA` | attachments-consumer | - | Snuba API URL (references the snuba-api service's private domain). |
| `VROOM` | attachments-consumer | http://vroom.railway.internal:8085 | Vroom (profiling) URL — not deployed in the errors-only profile; harmless default. |
| `SENTRY_VERSION` | attachments-consumer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `COMPOSE_PROFILES` | attachments-consumer | errors-only | Upstream feature profile — errors-only mirrors getsentry/self-hosted's errors-only deployment. |
| `SENTRY_REDIS_HOST` | attachments-consumer | - | Redis host (references the redis service's private domain). |
| `SENTRY_URL_PREFIX` | attachments-consumer | - | Public URL of this Sentry install (references the nginx service's public domain). Used for links, DSNs and CSRF checks. |
| `SENTRY_POSTGRES_HOST` | attachments-consumer | - | Postgres host (references the postgres service's private domain). |
| `SENTRY_MEMCACHED_ADDR` | attachments-consumer | - | Memcached address (references the memcached service's private domain). |
| `SENTRY_REDIS_PASSWORD` | attachments-consumer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_SYMBOLICATOR_URL` | attachments-consumer | - | Symbolicator URL (references the symbolicator service's private domain). |
| `SENTRY_POSTGRES_PASSWORD` | attachments-consumer | (secret) | Postgres password (references ${{postgres.POSTGRES_PASSWORD}}). |
| `SENTRY_SYSTEM_SECRET_KEY` | attachments-consumer | (secret) | Sentry's signing secret (references ${{web.SENTRY_SYSTEM_SECRET_KEY}}). |
| `SENTRY_PROFILES_S3_BUCKET` | attachments-consumer | - | S3 bucket name for profiling data (profiles store) — references the project bucket. |
| `SENTRY_PROFILES_S3_PREFIX` | attachments-consumer | profiles | Key prefix isolating profiling data (profiles store) within the shared bucket. |
| `SENTRY_PROFILES_S3_REGION` | attachments-consumer | - | S3 region for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_BUCKET` | attachments-consumer | - | S3 bucket name for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_FILESTORE_S3_PREFIX` | attachments-consumer | filestore | Key prefix isolating uploads and file assets (filestore) within the shared bucket. |
| `SENTRY_FILESTORE_S3_REGION` | attachments-consumer | - | S3 region for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_BUCKET` | attachments-consumer | - | S3 bucket name for event payloads (nodestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_PREFIX` | attachments-consumer | nodestore | Key prefix isolating event payloads (nodestore) within the shared bucket. |
| `SENTRY_NODESTORE_S3_REGION` | attachments-consumer | - | S3 region for event payloads (nodestore) — references the project bucket. |
| `LAUNCHPAD_RPC_SHARED_SECRET` | attachments-consumer | (secret) | Launchpad RPC shared secret (references ${{web.LAUNCHPAD_RPC_SHARED_SECRET}}). |
| `SENTRY_EVENT_RETENTION_DAYS` | attachments-consumer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SENTRY_PROFILES_S3_ENDPOINT` | attachments-consumer | - | S3 endpoint for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_ENDPOINT` | attachments-consumer | - | S3 endpoint for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_ENDPOINT` | attachments-consumer | - | S3 endpoint for event payloads (nodestore) — references the project bucket. |
| `SENTRY_PROFILES_S3_ACCESS_KEY` | attachments-consumer | - | S3 access key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_SECRET_KEY` | attachments-consumer | (secret) | S3 secret key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_ACCESS_KEY` | attachments-consumer | - | S3 access key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_SECRET_KEY` | attachments-consumer | (secret) | S3 secret key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_KAFKA_BOOTSTRAP_SERVERS` | attachments-consumer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `SENTRY_NODESTORE_S3_ACCESS_KEY` | attachments-consumer | - | S3 access key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_NODESTORE_S3_SECRET_KEY` | attachments-consumer | (secret) | S3 secret key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_ADDRESSING_STYLE` | attachments-consumer | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_FILESTORE_S3_ADDRESSING_STYLE` | attachments-consumer | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_NODESTORE_S3_ADDRESSING_STYLE` | attachments-consumer | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SNUBA` | post-process-forwarder-errors | - | Snuba API URL (references the snuba-api service's private domain). |
| `VROOM` | post-process-forwarder-errors | http://vroom.railway.internal:8085 | Vroom (profiling) URL — not deployed in the errors-only profile; harmless default. |
| `SENTRY_VERSION` | post-process-forwarder-errors | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `COMPOSE_PROFILES` | post-process-forwarder-errors | errors-only | Upstream feature profile — errors-only mirrors getsentry/self-hosted's errors-only deployment. |
| `SENTRY_REDIS_HOST` | post-process-forwarder-errors | - | Redis host (references the redis service's private domain). |
| `SENTRY_URL_PREFIX` | post-process-forwarder-errors | - | Public URL of this Sentry install (references the nginx service's public domain). Used for links, DSNs and CSRF checks. |
| `SENTRY_POSTGRES_HOST` | post-process-forwarder-errors | - | Postgres host (references the postgres service's private domain). |
| `SENTRY_MEMCACHED_ADDR` | post-process-forwarder-errors | - | Memcached address (references the memcached service's private domain). |
| `SENTRY_REDIS_PASSWORD` | post-process-forwarder-errors | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_SYMBOLICATOR_URL` | post-process-forwarder-errors | - | Symbolicator URL (references the symbolicator service's private domain). |
| `SENTRY_POSTGRES_PASSWORD` | post-process-forwarder-errors | (secret) | Postgres password (references ${{postgres.POSTGRES_PASSWORD}}). |
| `SENTRY_SYSTEM_SECRET_KEY` | post-process-forwarder-errors | (secret) | Sentry's signing secret (references ${{web.SENTRY_SYSTEM_SECRET_KEY}}). |
| `SENTRY_PROFILES_S3_BUCKET` | post-process-forwarder-errors | - | S3 bucket name for profiling data (profiles store) — references the project bucket. |
| `SENTRY_PROFILES_S3_PREFIX` | post-process-forwarder-errors | profiles | Key prefix isolating profiling data (profiles store) within the shared bucket. |
| `SENTRY_PROFILES_S3_REGION` | post-process-forwarder-errors | - | S3 region for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_BUCKET` | post-process-forwarder-errors | - | S3 bucket name for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_FILESTORE_S3_PREFIX` | post-process-forwarder-errors | filestore | Key prefix isolating uploads and file assets (filestore) within the shared bucket. |
| `SENTRY_FILESTORE_S3_REGION` | post-process-forwarder-errors | - | S3 region for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_BUCKET` | post-process-forwarder-errors | - | S3 bucket name for event payloads (nodestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_PREFIX` | post-process-forwarder-errors | nodestore | Key prefix isolating event payloads (nodestore) within the shared bucket. |
| `SENTRY_NODESTORE_S3_REGION` | post-process-forwarder-errors | - | S3 region for event payloads (nodestore) — references the project bucket. |
| `LAUNCHPAD_RPC_SHARED_SECRET` | post-process-forwarder-errors | (secret) | Launchpad RPC shared secret (references ${{web.LAUNCHPAD_RPC_SHARED_SECRET}}). |
| `SENTRY_EVENT_RETENTION_DAYS` | post-process-forwarder-errors | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SENTRY_PROFILES_S3_ENDPOINT` | post-process-forwarder-errors | - | S3 endpoint for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_ENDPOINT` | post-process-forwarder-errors | - | S3 endpoint for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_ENDPOINT` | post-process-forwarder-errors | - | S3 endpoint for event payloads (nodestore) — references the project bucket. |
| `SENTRY_PROFILES_S3_ACCESS_KEY` | post-process-forwarder-errors | - | S3 access key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_SECRET_KEY` | post-process-forwarder-errors | (secret) | S3 secret key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_ACCESS_KEY` | post-process-forwarder-errors | - | S3 access key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_SECRET_KEY` | post-process-forwarder-errors | (secret) | S3 secret key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_KAFKA_BOOTSTRAP_SERVERS` | post-process-forwarder-errors | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `SENTRY_NODESTORE_S3_ACCESS_KEY` | post-process-forwarder-errors | - | S3 access key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_NODESTORE_S3_SECRET_KEY` | post-process-forwarder-errors | (secret) | S3 secret key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_ADDRESSING_STYLE` | post-process-forwarder-errors | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_FILESTORE_S3_ADDRESSING_STYLE` | post-process-forwarder-errors | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_NODESTORE_S3_ADDRESSING_STYLE` | post-process-forwarder-errors | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_VERSION` | relay | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `RELAY_REDIS_HOST` | relay | - | Redis host (references the redis service's private domain). |
| `RELAY_STATSD_ADDR` | relay | 127.0.0.1:8125 | StatsD sink for relay metrics — loopback no-op by default. |
| `RELAY_UPSTREAM_HOST` | relay | - | Sentry web upstream (references the web service's private domain). |
| `RELAY_REDIS_PASSWORD` | relay | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `RELAY_KAFKA_BOOTSTRAP_SERVERS` | relay | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `REDIS_HOST` | snuba-api | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-api | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-api | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-api | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-api | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-api | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-api | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-api | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-api | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-api | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-api | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SNUBA` | taskscheduler | - | Snuba API URL (references the snuba-api service's private domain). |
| `VROOM` | taskscheduler | http://vroom.railway.internal:8085 | Vroom (profiling) URL — not deployed in the errors-only profile; harmless default. |
| `SENTRY_VERSION` | taskscheduler | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `COMPOSE_PROFILES` | taskscheduler | errors-only | Upstream feature profile — errors-only mirrors getsentry/self-hosted's errors-only deployment. |
| `SENTRY_REDIS_HOST` | taskscheduler | - | Redis host (references the redis service's private domain). |
| `SENTRY_URL_PREFIX` | taskscheduler | - | Public URL of this Sentry install (references the nginx service's public domain). Used for links, DSNs and CSRF checks. |
| `SENTRY_POSTGRES_HOST` | taskscheduler | - | Postgres host (references the postgres service's private domain). |
| `SENTRY_MEMCACHED_ADDR` | taskscheduler | - | Memcached address (references the memcached service's private domain). |
| `SENTRY_REDIS_PASSWORD` | taskscheduler | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_SYMBOLICATOR_URL` | taskscheduler | - | Symbolicator URL (references the symbolicator service's private domain). |
| `SENTRY_POSTGRES_PASSWORD` | taskscheduler | (secret) | Postgres password (references ${{postgres.POSTGRES_PASSWORD}}). |
| `SENTRY_SYSTEM_SECRET_KEY` | taskscheduler | (secret) | Sentry's signing secret (references ${{web.SENTRY_SYSTEM_SECRET_KEY}}). |
| `SENTRY_PROFILES_S3_BUCKET` | taskscheduler | - | S3 bucket name for profiling data (profiles store) — references the project bucket. |
| `SENTRY_PROFILES_S3_PREFIX` | taskscheduler | profiles | Key prefix isolating profiling data (profiles store) within the shared bucket. |
| `SENTRY_PROFILES_S3_REGION` | taskscheduler | - | S3 region for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_BUCKET` | taskscheduler | - | S3 bucket name for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_FILESTORE_S3_PREFIX` | taskscheduler | filestore | Key prefix isolating uploads and file assets (filestore) within the shared bucket. |
| `SENTRY_FILESTORE_S3_REGION` | taskscheduler | - | S3 region for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_BUCKET` | taskscheduler | - | S3 bucket name for event payloads (nodestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_PREFIX` | taskscheduler | nodestore | Key prefix isolating event payloads (nodestore) within the shared bucket. |
| `SENTRY_NODESTORE_S3_REGION` | taskscheduler | - | S3 region for event payloads (nodestore) — references the project bucket. |
| `LAUNCHPAD_RPC_SHARED_SECRET` | taskscheduler | (secret) | Launchpad RPC shared secret (references ${{web.LAUNCHPAD_RPC_SHARED_SECRET}}). |
| `SENTRY_EVENT_RETENTION_DAYS` | taskscheduler | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SENTRY_PROFILES_S3_ENDPOINT` | taskscheduler | - | S3 endpoint for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_ENDPOINT` | taskscheduler | - | S3 endpoint for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_ENDPOINT` | taskscheduler | - | S3 endpoint for event payloads (nodestore) — references the project bucket. |
| `SENTRY_PROFILES_S3_ACCESS_KEY` | taskscheduler | - | S3 access key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_SECRET_KEY` | taskscheduler | (secret) | S3 secret key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_ACCESS_KEY` | taskscheduler | - | S3 access key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_SECRET_KEY` | taskscheduler | (secret) | S3 secret key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_KAFKA_BOOTSTRAP_SERVERS` | taskscheduler | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `SENTRY_NODESTORE_S3_ACCESS_KEY` | taskscheduler | - | S3 access key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_NODESTORE_S3_SECRET_KEY` | taskscheduler | (secret) | S3 secret key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_ADDRESSING_STYLE` | taskscheduler | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_FILESTORE_S3_ADDRESSING_STYLE` | taskscheduler | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_NODESTORE_S3_ADDRESSING_STYLE` | taskscheduler | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `REDIS_HOST` | snuba-errors-consumer | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-errors-consumer | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-errors-consumer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-errors-consumer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-errors-consumer | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-errors-consumer | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-errors-consumer | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-errors-consumer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-errors-consumer | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-errors-consumer | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-errors-consumer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `POSTGRES_DB` | postgres | postgres | Database created on first boot; Sentry stores its relational data here. |
| `DATABASE_URL` | postgres | - | Standard Railway connection string for this database (private network). |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password — generated at deploy time. Other services reference it as ${{postgres.POSTGRES_PASSWORD}}. |
| `PORT` | nginx | 80 | Port Railway probes for healthchecks and routes the domain to — must match nginx's listen port (80). |
| `SENTRY_VERSION` | nginx | nightly | Sentry version for the whole stack: 'nightly' tracks upstream master; a release tag like '26.7.2' pins that upstream release. Every other service references this value. Change + redeploy to upgrade. |
| `SNUBA` | taskworker | - | Snuba API URL (references the snuba-api service's private domain). |
| `VROOM` | taskworker | http://vroom.railway.internal:8085 | Vroom (profiling) URL — not deployed in the errors-only profile; harmless default. |
| `SENTRY_VERSION` | taskworker | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `COMPOSE_PROFILES` | taskworker | errors-only | Upstream feature profile — errors-only mirrors getsentry/self-hosted's errors-only deployment. |
| `SENTRY_REDIS_HOST` | taskworker | - | Redis host (references the redis service's private domain). |
| `SENTRY_URL_PREFIX` | taskworker | - | Public URL of this Sentry install (references the nginx service's public domain). Used for links, DSNs and CSRF checks. |
| `SENTRY_POSTGRES_HOST` | taskworker | - | Postgres host (references the postgres service's private domain). |
| `SENTRY_MEMCACHED_ADDR` | taskworker | - | Memcached address (references the memcached service's private domain). |
| `SENTRY_REDIS_PASSWORD` | taskworker | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_SYMBOLICATOR_URL` | taskworker | - | Symbolicator URL (references the symbolicator service's private domain). |
| `SENTRY_POSTGRES_PASSWORD` | taskworker | (secret) | Postgres password (references ${{postgres.POSTGRES_PASSWORD}}). |
| `SENTRY_SYSTEM_SECRET_KEY` | taskworker | (secret) | Sentry's signing secret (references ${{web.SENTRY_SYSTEM_SECRET_KEY}}). |
| `SENTRY_PROFILES_S3_BUCKET` | taskworker | - | S3 bucket name for profiling data (profiles store) — references the project bucket. |
| `SENTRY_PROFILES_S3_PREFIX` | taskworker | profiles | Key prefix isolating profiling data (profiles store) within the shared bucket. |
| `SENTRY_PROFILES_S3_REGION` | taskworker | - | S3 region for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_BUCKET` | taskworker | - | S3 bucket name for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_FILESTORE_S3_PREFIX` | taskworker | filestore | Key prefix isolating uploads and file assets (filestore) within the shared bucket. |
| `SENTRY_FILESTORE_S3_REGION` | taskworker | - | S3 region for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_BUCKET` | taskworker | - | S3 bucket name for event payloads (nodestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_PREFIX` | taskworker | nodestore | Key prefix isolating event payloads (nodestore) within the shared bucket. |
| `SENTRY_NODESTORE_S3_REGION` | taskworker | - | S3 region for event payloads (nodestore) — references the project bucket. |
| `LAUNCHPAD_RPC_SHARED_SECRET` | taskworker | (secret) | Launchpad RPC shared secret (references ${{web.LAUNCHPAD_RPC_SHARED_SECRET}}). |
| `SENTRY_EVENT_RETENTION_DAYS` | taskworker | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SENTRY_PROFILES_S3_ENDPOINT` | taskworker | - | S3 endpoint for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_ENDPOINT` | taskworker | - | S3 endpoint for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_ENDPOINT` | taskworker | - | S3 endpoint for event payloads (nodestore) — references the project bucket. |
| `SENTRY_PROFILES_S3_ACCESS_KEY` | taskworker | - | S3 access key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_SECRET_KEY` | taskworker | (secret) | S3 secret key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_ACCESS_KEY` | taskworker | - | S3 access key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_SECRET_KEY` | taskworker | (secret) | S3 secret key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_KAFKA_BOOTSTRAP_SERVERS` | taskworker | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `SENTRY_NODESTORE_S3_ACCESS_KEY` | taskworker | - | S3 access key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_NODESTORE_S3_SECRET_KEY` | taskworker | (secret) | S3 secret key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_ADDRESSING_STYLE` | taskworker | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_FILESTORE_S3_ADDRESSING_STYLE` | taskworker | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_NODESTORE_S3_ADDRESSING_STYLE` | taskworker | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SNUBA` | events-consumer | - | Snuba API URL (references the snuba-api service's private domain). |
| `VROOM` | events-consumer | http://vroom.railway.internal:8085 | Vroom (profiling) URL — not deployed in the errors-only profile; harmless default. |
| `SENTRY_VERSION` | events-consumer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `COMPOSE_PROFILES` | events-consumer | errors-only | Upstream feature profile — errors-only mirrors getsentry/self-hosted's errors-only deployment. |
| `SENTRY_REDIS_HOST` | events-consumer | - | Redis host (references the redis service's private domain). |
| `SENTRY_URL_PREFIX` | events-consumer | - | Public URL of this Sentry install (references the nginx service's public domain). Used for links, DSNs and CSRF checks. |
| `SENTRY_POSTGRES_HOST` | events-consumer | - | Postgres host (references the postgres service's private domain). |
| `SENTRY_MEMCACHED_ADDR` | events-consumer | - | Memcached address (references the memcached service's private domain). |
| `SENTRY_REDIS_PASSWORD` | events-consumer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_SYMBOLICATOR_URL` | events-consumer | - | Symbolicator URL (references the symbolicator service's private domain). |
| `SENTRY_POSTGRES_PASSWORD` | events-consumer | (secret) | Postgres password (references ${{postgres.POSTGRES_PASSWORD}}). |
| `SENTRY_SYSTEM_SECRET_KEY` | events-consumer | (secret) | Sentry's signing secret (references ${{web.SENTRY_SYSTEM_SECRET_KEY}}). |
| `SENTRY_PROFILES_S3_BUCKET` | events-consumer | - | S3 bucket name for profiling data (profiles store) — references the project bucket. |
| `SENTRY_PROFILES_S3_PREFIX` | events-consumer | profiles | Key prefix isolating profiling data (profiles store) within the shared bucket. |
| `SENTRY_PROFILES_S3_REGION` | events-consumer | - | S3 region for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_BUCKET` | events-consumer | - | S3 bucket name for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_FILESTORE_S3_PREFIX` | events-consumer | filestore | Key prefix isolating uploads and file assets (filestore) within the shared bucket. |
| `SENTRY_FILESTORE_S3_REGION` | events-consumer | - | S3 region for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_BUCKET` | events-consumer | - | S3 bucket name for event payloads (nodestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_PREFIX` | events-consumer | nodestore | Key prefix isolating event payloads (nodestore) within the shared bucket. |
| `SENTRY_NODESTORE_S3_REGION` | events-consumer | - | S3 region for event payloads (nodestore) — references the project bucket. |
| `LAUNCHPAD_RPC_SHARED_SECRET` | events-consumer | (secret) | Launchpad RPC shared secret (references ${{web.LAUNCHPAD_RPC_SHARED_SECRET}}). |
| `SENTRY_EVENT_RETENTION_DAYS` | events-consumer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `SENTRY_PROFILES_S3_ENDPOINT` | events-consumer | - | S3 endpoint for profiling data (profiles store) — references the project bucket. |
| `SENTRY_FILESTORE_S3_ENDPOINT` | events-consumer | - | S3 endpoint for uploads and file assets (filestore) — references the project bucket. |
| `SENTRY_NODESTORE_S3_ENDPOINT` | events-consumer | - | S3 endpoint for event payloads (nodestore) — references the project bucket. |
| `SENTRY_PROFILES_S3_ACCESS_KEY` | events-consumer | - | S3 access key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_SECRET_KEY` | events-consumer | (secret) | S3 secret key for profiling data (profiles store) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_ACCESS_KEY` | events-consumer | - | S3 access key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_FILESTORE_S3_SECRET_KEY` | events-consumer | (secret) | S3 secret key for uploads and file assets (filestore) — references the project bucket's credentials. |
| `SENTRY_KAFKA_BOOTSTRAP_SERVERS` | events-consumer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `SENTRY_NODESTORE_S3_ACCESS_KEY` | events-consumer | - | S3 access key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_NODESTORE_S3_SECRET_KEY` | events-consumer | (secret) | S3 secret key for event payloads (nodestore) — references the project bucket's credentials. |
| `SENTRY_PROFILES_S3_ADDRESSING_STYLE` | events-consumer | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_FILESTORE_S3_ADDRESSING_STYLE` | events-consumer | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_NODESTORE_S3_ADDRESSING_STYLE` | events-consumer | virtual | S3 addressing style — Railway buckets use virtual-host style. |
| `SENTRY_VERSION` | taskbroker | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `TASKBROKER_DB_PATH` | taskbroker | /opt/sqlite/taskbroker-activations.sqlite | SQLite path for in-flight task activations — persisted on this service's volume. |
| `TASKBROKER_STATSD_ADDR` | taskbroker | 127.0.0.1:8125 | StatsD sink for taskbroker metrics — loopback no-op by default. |
| `TASKBROKER_KAFKA_CLUSTERS__DEFAULT__ADDRESS` | taskbroker | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `REDISHOST` | redis | - | Redis host (this service's Railway private domain). |
| `REDISPORT` | redis | 6379 | Redis port. |
| `REDISUSER` | redis | default | Redis ACL user (default). |
| `REDIS_URL` | redis | - | Standard Railway connection string for this Redis (private network). |
| `REDISPASSWORD` | redis | (secret) | Redis password (references REDIS_PASSWORD). |
| `REDIS_PASSWORD` | redis | (secret) | Redis password — generated at deploy time. Other services reference it as ${{redis.REDIS_PASSWORD}}. |
| `REDIS_HOST` | snuba-replacer | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-replacer | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-replacer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-replacer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-replacer | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-replacer | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-replacer | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-replacer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-replacer | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-replacer | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-replacer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `REDIS_HOST` | snuba-subscription-consumer-events | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-subscription-consumer-events | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-subscription-consumer-events | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-subscription-consumer-events | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-subscription-consumer-events | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-subscription-consumer-events | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-subscription-consumer-events | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-subscription-consumer-events | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-subscription-consumer-events | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-subscription-consumer-events | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-subscription-consumer-events | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |
| `REDIS_HOST` | snuba-group-attributes-consumer | - | Redis host (references the redis service's private domain). |
| `REDIS_PORT` | snuba-group-attributes-consumer | 6379 | Redis port. |
| `REDIS_PASSWORD` | snuba-group-attributes-consumer | (secret) | Redis password (references ${{redis.REDIS_PASSWORD}}). |
| `SENTRY_VERSION` | snuba-group-attributes-consumer | - | Sentry version (references ${{nginx.SENTRY_VERSION}} — change it there to upgrade the stack). |
| `SNUBA_SETTINGS` | snuba-group-attributes-consumer | self_hosted | Snuba settings profile — self_hosted matches upstream. |
| `CLICKHOUSE_HOST` | snuba-group-attributes-consumer | - | ClickHouse host (references the clickhouse service's private domain). |
| `CLICKHOUSE_PORT` | snuba-group-attributes-consumer | 9000 | ClickHouse native protocol port. |
| `DEFAULT_BROKERS` | snuba-group-attributes-consumer | - | Kafka bootstrap servers (references the kafka service's private domain). |
| `UWSGI_MAX_REQUESTS` | snuba-group-attributes-consumer | 10000 | Recycle uwsgi workers after this many requests (upstream default). |
| `UWSGI_DISABLE_LOGGING` | snuba-group-attributes-consumer | true | Silence per-request uwsgi logs (upstream default). |
| `SENTRY_EVENT_RETENTION_DAYS` | snuba-group-attributes-consumer | 90 | How long Sentry keeps event data; also drives the object-storage lifecycle rule for event payloads. |

## Configuration

- **Start command:** `/railway/entrypoint.sh run web`
- **Start command:** `/railway-entrypoint.sh subscriptions-scheduler-executor --dataset events_analytics_platform --entity eap_items --auto-offset-reset=latest --no-strict-offset-reset --consumer-group=snuba-eap-items-subscriptions-consumers --followed-consumer-group=eap_items_group --schedule-ttl=60 --stale-threshold-seconds=900`
- **Volume:** `/var/lib/kafka/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/railway-entrypoint.sh rust-consumer --storage outcomes_raw --consumer-group snuba-consumers --auto-offset-reset=earliest --max-batch-time-ms 750 --no-strict-offset-reset --raw-events-topic outcomes-billing`
- **Start command:** `/railway-entrypoint.sh rust-consumer --storage outcomes_raw --consumer-group snuba-consumers --auto-offset-reset=earliest --max-batch-time-ms 750 --no-strict-offset-reset`
- **Start command:** `/railway/entrypoint.sh run consumer ingest-attachments --consumer-group ingest-consumer`
- **Start command:** `/railway/entrypoint.sh run consumer --no-strict-offset-reset post-process-forwarder-errors --consumer-group post-process-forwarder --synchronize-commit-log-topic=snuba-commit-log --synchronize-commit-group=snuba-consumers`
- **Volume:** `/work/.relay`
- **Start command:** `/railway-entrypoint.sh bootstrap-then-api`
- **Start command:** `/railway/entrypoint.sh run taskworker-scheduler`
- **Start command:** `/railway-entrypoint.sh rust-consumer --storage errors --consumer-group snuba-consumers --auto-offset-reset=latest --max-batch-time-ms 750 --no-strict-offset-reset`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `memcached -I 1M`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/railway/entrypoint.sh run taskworker --concurrency=4 --rpc-host=taskbroker.railway.internal:50051 --max-child-task-count=10000`
- **Start command:** `/railway/entrypoint.sh run consumer ingest-events --consumer-group ingest-consumer`
- **Volume:** `/opt/sqlite`
- **Start command:** `/bin/sh -c "rm -rf /data/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --maxmemory 0 --maxmemory-policy volatile-lru --save 60 1 --dir /data"`
- **Volume:** `/data`
- **Start command:** `/railway-entrypoint.sh replacer --storage errors --auto-offset-reset=latest --no-strict-offset-reset`
- **Start command:** `/railway-entrypoint.sh subscriptions-scheduler-executor --dataset events --entity events --auto-offset-reset=latest --no-strict-offset-reset --consumer-group=snuba-events-subscriptions-consumers --followed-consumer-group=snuba-consumers --schedule-ttl=60 --stale-threshold-seconds=900`
- **Start command:** `/railway-entrypoint.sh rust-consumer --storage group_attributes --consumer-group snuba-group-attributes-consumers --auto-offset-reset=latest --max-batch-time-ms 750 --no-strict-offset-reset`

**Category:** Observability · **Languages:** Python, TypeScript, Dockerfile, Shell, Awk

[View on Railway →](https://railway.com/deploy/sentry-errors-only-mode)
