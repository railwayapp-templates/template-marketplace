# Deploy PgDog on Railway

PostgreSQL proxy that pools connections and splits reads from writes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgdog-pooler)

## About

Deploy PgDog and you get a PostgreSQL proxy that understands SQL. Written in Rust, it pools thousands of client connections onto a handful of server ones, parses every statement with PostgreSQL's own parser, and routes it: writes and explicit transactions to the primary, plain `SELECT`s to a replica. Teams reach for it when a serverless runtime or a large worker fleet exhausts `max_connections`, when read traffic outgrows one machine, or when a database has to be sharded — PgDog splits a cluster across shards and reassembles cross-shard results in memory.

Self-host PgDog on Railway and the whole read-scaling shape is wired up for you. The `pgdog` service is the only endpoint anything talks to, published on a TCP proxy so `psql` and any driver reach it from outside the project. Behind it, `postgres` runs PostgreSQL 18 as the primary and `postgres-replica` is a hot standby that clones itself with `pg_basebackup` on first boot, then streams WAL through a physical replication slot. `pgweb` gives you a browser SQL console pointed at the pooler. Neither database is reachable from the internet.

![Diagram of the PgDog, PostgreSQL primary, replica and pgweb services](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789478835/postgresql-pgdog-architecture.webp)

PgDog sits between your application and PostgreSQL and speaks the PostgreSQL wire protocol on both sides, so no client library changes. Comparing PgDog vs PgBouncer: PgBouncer only multiplexes sockets, while PgDog parses each query with `pg_raw_parse`, the real PostgreSQL parser. That is what lets it tell a write from a read, extract a sharding key, and replay `SET` statements correctly while sharing one server connection between clients.

Key capabilities:

- Transaction and session pooling, with `SET` statements and startup options replayed correctly
- Layer-7 load balancing over a primary and any number of replicas: round-robin, random or least-active-connections
- Automatic read/write split at one endpoint, plus per-query opt-in with `SET pgdog.role`
- Health checks that pull a failing database out of rotation, and lag bans that stop a stale replica serving reads
- Sharding by hash, list or range, with cross-shard `SELECT`, `INSERT`, `UPDATE`, `COPY` and two-phase commit
- A PgBouncer-compatible admin database, OpenMetrics and OpenTelemetry export

Each job lives in one service. `pgdog` holds no state and owns the public endpoint, TLS and pool configuration. `postgres` is the single writer, its cluster on a volume. `postgres-replica` is a read-only hot standby on its own volume, provisioned from the primary with a least-privilege `replicator` role. `pgweb` is a console you can delete.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-replica | [gridalpha/postgresql-railway](https://github.com/gridalpha/postgresql-railway) | Database |
| pgdog | [gridalpha/pgdog-railway](https://github.com/gridalpha/pgdog-railway) | TCP service |
| postgres | [gridalpha/postgresql-railway](https://github.com/gridalpha/postgresql-railway) | Database |
| pgweb | `sosedoff/pgweb:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | postgres-replica | 8080 | Port Railway health-checks |
| `POSTGRES_DB` | postgres-replica | - | Same database name |
| `LOG_TO_STDOUT` | postgres-replica | true | Server log to stdout, not stderr |
| `POSTGRES_HOST` | postgres-replica | postgres-replica.railway.internal | Private hostname published for peers |
| `POSTGRES_PORT` | postgres-replica | 5432 | PostgreSQL listener port |
| `POSTGRES_USER` | postgres-replica | (secret) | Same superuser as the primary |
| `POSTGRES_PASSWORD` | postgres-replica | (secret) | Same superuser password |
| `POSTGRES_REPLICATION_SLOT` | postgres-replica | - | Physical slot to follow |
| `POSTGRES_REPLICATION_USER` | postgres-replica | (secret) | Replication role name |
| `POSTGRES_REPLICATE_FROM_HOST` | postgres-replica | - | Makes this service a standby |
| `POSTGRES_REPLICATE_FROM_PORT` | postgres-replica | - | Primary port to clone from |
| `POSTGRES_REPLICATION_PASSWORD` | postgres-replica | (secret) | Replication role password |
| `POSTGRES_BASEBACKUP_WAIT_SECONDS` | postgres-replica | 900 | Wait for the primary before failing |
| `PORT` | pgdog | 8080 | Port Railway health-checks |
| `PGDOG_HOST` | pgdog | [::] | Dual-stack client listener bind |
| `PGDOG_PORT` | pgdog | 6432 | Client listener port |
| `DATABASE_URL` | pgdog | - | Private connection string |
| `PGDOG_DB_NAME` | pgdog | railway | Database name clients connect to |
| `PGDOG_WORKERS` | pgdog | 8 | Tokio worker threads |
| `PGDOG_CLIENT_USER` | pgdog | (secret) | User clients present to PgDog |
| `PGDOG_POOLER_MODE` | pgdog | transaction | transaction or session pooling |
| `PGDOG_SERVER_USER` | pgdog | (secret) | Role PgDog connects as |
| `PGDOG_PRIMARY_HOST` | pgdog | - | Primary private hostname |
| `PGDOG_PRIMARY_PORT` | pgdog | - | Primary port |
| `PGDOG_REPLICA_PORT` | pgdog | 5432 | Port for replicas without one |
| `DATABASE_PUBLIC_URL` | pgdog | - | Public connection string |
| `PGDOG_MIN_POOL_SIZE` | pgdog | 1 | Warm connections kept open |
| `PGDOG_REPLICA_HOSTS` | pgdog | - | Comma-separated replica hosts |
| `PGDOG_ADMIN_PASSWORD` | pgdog | (secret) | Unlocks the admin console database |
| `PGDOG_SERVER_DB_NAME` | pgdog | - | Database name on PostgreSQL |
| `PGDOG_CLIENT_PASSWORD` | pgdog | (secret) | Password clients present to PgDog |
| `PGDOG_LSN_CHECK_DELAY` | pgdog | 0 | Enables replication lag monitoring |
| `PGDOG_SERVER_PASSWORD` | pgdog | (secret) | Password PgDog connects with |
| `PGDOG_CONNECT_ATTEMPTS` | pgdog | 3 | Backend connection retries |
| `PGDOG_HEALTHCHECK_PORT` | pgdog | 8080 | HTTP health endpoint port |
| `PGDOG_OPENMETRICS_HOST` | pgdog | [::] | Metrics listener bind |
| `PGDOG_OPENMETRICS_PORT` | pgdog | 9090 | Prometheus metrics port |
| `PGDOG_READ_WRITE_SPLIT` | pgdog | include_primary | Reads use replicas and primary |
| `PGDOG_DEFAULT_POOL_SIZE` | pgdog | 25 | Server connections per node |
| `PGDOG_LSN_CHECK_INTERVAL` | pgdog | 5000 | Lag check interval in ms |
| `PGDOG_BAN_REPLICA_LAG_BYTES` | pgdog | 33554432 | Lag past which reads stop |
| `PGDOG_CONNECT_ATTEMPT_DELAY` | pgdog | 2000 | Delay between retries in ms |
| `PGDOG_OPENMETRICS_NAMESPACE` | pgdog | pgdog_ | Metric name prefix |
| `PGDOG_LOAD_BALANCING_STRATEGY` | pgdog | round_robin | Read distribution strategy |
| `PORT` | postgres | 8080 | Port Railway health-checks |
| `POSTGRES_DB` | postgres | railway | Database created on first boot |
| `DATABASE_URL` | postgres | - | Direct primary connection string |
| `LOG_TO_STDOUT` | postgres | true | Server log to stdout, not stderr |
| `POSTGRES_HOST` | postgres | postgres.railway.internal | Private hostname published for peers |
| `POSTGRES_PORT` | postgres | 5432 | PostgreSQL listener port |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password |
| `POSTGRES_REPLICATION_SLOT` | postgres | railway_standby | Physical slot the standby follows |
| `POSTGRES_REPLICATION_USER` | postgres | (secret) | Physical replication role |
| `POSTGRES_REPLICATION_PASSWORD` | postgres | (secret) | Replication role password |
| `POSTGRES_MAX_SLOT_WAL_KEEP_SIZE` | postgres | 1GB | WAL a stalled slot may pin |
| `PORT` | pgweb | 9090 | Anonymous metrics listener, health-checked |
| `PGWEB_AUTH_PASS` | pgweb | - | HTTP basic auth password |
| `PGWEB_AUTH_USER` | pgweb | (secret) | HTTP basic auth username |
| `PGWEB_DATABASE_URL` | pgweb | - | Console connects through PgDog |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6432
- **Start command:** `/bin/sh -c 'exec /usr/bin/pgweb --bind=0.0.0.0 --listen=8081 --skip-open --lock-session --open-retry=60 --open-retry-delay=5 --metrics --metrics-addr=:9090 --metrics-path=/metrics --auth-user="$PGWEB_AUTH_USER" --auth-pass="$PGWEB_AUTH_PASS"'`
- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pgdog-pooler)
