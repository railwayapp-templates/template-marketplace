# Deploy Self-Hosted Sentry: Error Tracking (Lean); error-tracking, monitoring, observability, apm. on Railway

Run your own Sentry for error tracking. Lean, private, Postgres-backed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-sentry-error-tracking-lean)

## About

Self-Hosted Sentry: Error Tracking (Lean) gives you a private Sentry installation for monitoring application errors across web, mobile, and backend services.

This errors-only deployment includes exception capture, issue grouping, event search, project management, and alert rules. It runs as 12 services connected through Railway's private network, backed by PostgreSQL and ClickHouse, without requiring external object storage.

&gt; This is an unofficial community template and is not affiliated with or endorsed by Sentry. Review Sentry's current license terms before using it commercially. This template is intended for operating Sentry for your own applications, not for offering Sentry as a hosted service to third parties.

Self-hosted Sentry is a distributed application rather than a single container. It requires separate services for event ingestion, background processing, querying, storage, caching, and application management.

This template deploys the required components on Railway's private network:

* PostgreSQL for Sentry application data and event payloads
* ClickHouse for searchable event data and analytics
* Kafka for the event-processing pipeline
* Redis and Memcached for queues and caching
* Relay for receiving and validating events
* Snuba for querying ClickHouse
* Sentry web, worker, and task-processing services
* nginx as the only publicly accessible gateway

The gateway routes SDK ingestion requests to Relay and browser traffic to the Sentry web application. All remaining services communicate internally through Railway's private network.

The template also automates the initial Sentry, Snuba, ClickHouse, Kafka, and Relay setup. Stateful services use Railway Volumes so their data persists between deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memcached | `memcached:1.6.45-alpine` | Database |
| snuba-errors | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Worker |
| sentry-relay | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Worker |
| redis | `redis:6.2.20-alpine` | Database |
| sentry-taskbroker | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Database |
| kafka | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Database |
| clickhouse | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Database |
| postgres | `postgres:14.23-bookworm` | Database |
| snuba-api | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Worker |
| gateway | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Web service |
| sentry-workers | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Worker |
| sentry-web | [acewebs/sentry-railway](https://github.com/acewebs/sentry-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_HOST` | snuba-errors | - | Hostname of the Redis service Snuba uses for state/caches. |
| `SNUBA_SETTINGS` | snuba-errors | self_hosted | Snuba settings profile; self_hosted matches the single-node Sentry stack. |
| `CLICKHOUSE_HOST` | snuba-errors | - | Hostname of the ClickHouse service this consumer writes rows into. |
| `DEFAULT_BROKERS` | snuba-errors | - | Kafka bootstrap server (host:port) the consumer reads processed events from. |
| `CLICKHOUSE_PASSWORD` | snuba-errors | (secret) | ClickHouse default-user password; references the value generated on the clickhouse service. |
| `RELAY_CREDENTIALS_JSON` | sentry-relay | (secret) | Relay's matched keypair (secret+public+id); fixed template default, public_key must match sentry-web's whitelist. |
| `TASKBROKER_DB_PATH` | sentry-taskbroker | /opt/sqlite/taskbroker-activations.sqlite | Path (inside the volume) to taskbroker's SQLite activation store. |
| `TASKBROKER_KAFKA_CLUSTERS__DEFAULT__ADDRESS` | sentry-taskbroker | - | Kafka bootstrap address (host:port) taskbroker connects to. |
| `CLUSTER_ID` | kafka | MkU3OEVBNTcwNTJENDM2Qk | KRaft cluster identifier; a fixed constant (must stay invariant for the volume's life). |
| `KAFKA_NODE_ID` | kafka | 1001 | KRaft node id for this broker. |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/logs | Directory (inside the volume) for Kafka log segments. |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://0.0.0.0:29092,INTERNAL://0.0.0.0:9093,EXTERNAL://0.0.0.0:9092,CONTROLLER://0.0.0.0:29093 | Sockets Kafka binds locally (broker + controller listeners). |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller | KRaft roles this node runs (broker + controller). |
| `KAFKA_MAX_REQUEST_SIZE` | kafka | 50000000 | Max request size in bytes (raised for large event payloads). |
| `KAFKA_MESSAGE_MAX_BYTES` | kafka | 50000000 | Max message size in bytes (raised for large event payloads). |
| `KAFKA_LOG4J_ROOT_LOGLEVEL` | kafka | WARN | Kafka broker root log level. |
| `KAFKA_LOG_RETENTION_HOURS` | kafka | 24 | How long Kafka retains messages before deletion. |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | - | Addresses Kafka advertises to clients; self-references this service's private domain. |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1001@127.0.0.1:29093 | KRaft controller quorum (single node: this broker). |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | kafka | true | Allow Kafka to auto-create topics on first use. |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER | Listener name used for the KRaft controller. |
| `CONFLUENT_SUPPORT_METRICS_ENABLE` | kafka | false | Disable Confluent telemetry/metrics reporting. |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT | Listener used for inter-broker traffic. |
| `KAFKA_OFFSETS_TOPIC_NUM_PARTITIONS` | kafka | 1 | Partitions for the internal consumer-offsets topic (1 for single node). |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | PLAINTEXT:PLAINTEXT,INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT | Security protocol per listener (all PLAINTEXT on the private network). |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 | Replication factor for internal topics (1 for single node). |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for ClickHouse's default user; auto-generated per deploy, written into the server config via from_env and referenced by the Snuba services. |
| `MAX_MEMORY_USAGE_RATIO` | clickhouse | 0.3 | Fraction of container RAM ClickHouse may use for a single query (Altinity image tuning). |
| `POSTGRES_HOST_AUTH_METHOD` | postgres | trust | Auth mode for the stock image; trust = no password (safe: private network only). |
| `REDIS_HOST` | snuba-api | - | Hostname of the Redis service Snuba uses for state/caches. |
| `SNUBA_SETTINGS` | snuba-api | self_hosted | Snuba settings profile; self_hosted matches the single-node Sentry stack. |
| `CLICKHOUSE_HOST` | snuba-api | - | Hostname of the ClickHouse service Snuba queries. |
| `DEFAULT_BROKERS` | snuba-api | - | Kafka bootstrap server (host:port) Snuba consumers connect to. |
| `UWSGI_MAX_REQUESTS` | snuba-api | 10000 | Recycle each uWSGI worker after this many requests (memory-leak guard). |
| `CLICKHOUSE_PASSWORD` | snuba-api | (secret) | ClickHouse default-user password; references the value generated on the clickhouse service. |
| `UWSGI_DISABLE_LOGGING` | snuba-api | true | Silence per-request uWSGI access logs to reduce noise. |
| `SNUBA` | sentry-workers | - | URL of the Snuba API service (ClickHouse query layer). |
| `SENTRY_CONF` | sentry-workers | /etc/sentry | Directory holding sentry.conf.py / config.yml inside the image. |
| `SENTRY_SYSTEM_SECRET_KEY` | sentry-workers | (secret) | Django SECRET_KEY; references the value generated on sentry-web (must match). |
| `SENTRY_EVENT_RETENTION_DAYS` | sentry-workers | 90 | Days to retain events before the cleanup job deletes them. |
| `SNUBA` | sentry-web | - | URL of the Snuba API service (ClickHouse query layer). |
| `SENTRY_CONF` | sentry-web | /etc/sentry | Directory holding sentry.conf.py / config.yml inside the image. |
| `SENTRY_URL_PREFIX` | sentry-web | - | Public base URL; references the gateway's public domain (required for browser login/CSRF). |
| `SENTRY_SYSTEM_SECRET_KEY` | sentry-web | (secret) | Django SECRET_KEY; auto-generated per deploy, shared with sentry-workers. |
| `SENTRY_RELAY_WHITELIST_PK` | sentry-web | <relay public_key — matched pair with sentry-relay> | Relay's public key; must match the public_key in sentry-relay's RELAY_CREDENTIALS_JSON. Baked template default. |
| `SENTRY_EVENT_RETENTION_DAYS` | sentry-web | 90 | Days to retain events before the cleanup job deletes them. |

## Configuration

- **Volume:** `/opt/sqlite`
- **Volume:** `/var/lib/kafka/data`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Python, Dockerfile, Procfile, JavaScript

[View on Railway →](https://railway.com/deploy/self-hosted-sentry-error-tracking-lean)
