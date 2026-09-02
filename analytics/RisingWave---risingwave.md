# Deploy RisingWave on Railway

RisingWave streaming DB on Railway: meta, compute, compactor, frontend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/risingwave)

## About

RisingWave is an open-source streaming database that keeps SQL materialized views continuously up to date as events arrive. You write ordinary `CREATE MATERIALIZED VIEW` statements over Kafka topics, database change streams or tables you insert into, and it maintains the results incrementally rather than recomputing them per query. It speaks the PostgreSQL wire protocol, so any psql client, BI tool or driver can read those results — no new SDK, no Java operators.

Self-host RisingWave on Railway as a real distributed cluster rather than one all-in-one container. This template runs the four roles as separate services — meta, compute, compactor and frontend — alongside managed PostgreSQL for cluster metadata, an object storage bucket for streaming state, Prometheus scraping every role, and a Caddy gateway putting HTTP basic authentication in front of the dashboard. SQL clients reach the frontend over a TCP proxy; everything else stays private.

![Diagram of the seven RisingWave services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788265868/risingwave-architecture.png)

RisingWave separates compute from storage. Streaming state lives in object storage in a log-structured format called Hummock, cluster metadata lives in a SQL database, and the nodes doing the work hold only caches — which is why a node can be replaced without losing anything.

- PostgreSQL-compatible SQL surface, including `psql`, JDBC and most BI tools
- Incrementally maintained materialized views over streams and tables
- Connectors for Kafka, Redpanda, Pulsar, Kinesis, MySQL and PostgreSQL CDC, and S3
- Sinks back out to Kafka, Iceberg, PostgreSQL, Redis and object storage
- Sub-second freshness and second-scale recovery, since checkpoints sit in object storage
- A dashboard for cluster health, catalog browsing and job inspection

The role split matters when you scale. The **meta node** owns the catalog and schedules barriers. The **compute node** runs streaming operators and batch queries, and is where to add memory when views grow. The **compactor** merges storage files and scales with write volume. The **frontend** plans SQL and holds connections; stateless, so it is the safe place to add replicas.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | [gridalpha/risingwave-railway](https://github.com/gridalpha/risingwave-railway) (root: gateway) | Web service |
| compactor | `risingwavelabs/risingwave:v3.0.3` | Worker |
| prometheus | [gridalpha/risingwave-railway](https://github.com/gridalpha/risingwave-railway) (root: prometheus) | Database |
| frontend | [gridalpha/risingwave-railway](https://github.com/gridalpha/risingwave-railway) (root: risingwave) | TCP service |
| compute | `risingwavelabs/risingwave:v3.0.3` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| meta | `risingwavelabs/risingwave:v3.0.3` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dashboard | 8080 | Public HTTP listener |
| `DASHBOARD_PASSWORD` | dashboard | (secret) | Basic-auth password, hashed at boot |
| `DASHBOARD_UPSTREAM` | dashboard | - | Meta dashboard behind the gateway |
| `DASHBOARD_USERNAME` | dashboard | (secret) | Basic-auth username |
| `PORT` | compactor | 1260 | Port the health check probes |
| `AWS_REGION` | compactor | - | Bucket region |
| `RW_META_ADDR` | compactor | - | Meta node endpoint |
| `RUST_BACKTRACE` | compactor | 1 | Backtraces in crash logs |
| `RW_LISTEN_ADDR` | compactor | [::]:6660 | Compactor gRPC listener, dual-stack |
| `RW_S3_ENDPOINT` | compactor | - | Object storage endpoint |
| `ENABLE_TELEMETRY` | compactor | false | Upstream usage reporting |
| `AWS_ACCESS_KEY_ID` | compactor | - | Bucket access key |
| `RW_ADVERTISE_ADDR` | compactor | compactor.railway.internal:6660 | Address peers dial |
| `AWS_SECRET_ACCESS_KEY` | compactor | (secret) | Bucket secret key |
| `RW_IS_FORCE_PATH_STYLE` | compactor | true | Path-style S3 addressing |
| `RW_PROMETHEUS_LISTENER_ADDR` | compactor | [::]:1260 | Metrics listener |
| `PORT` | prometheus | 9500 | Port the health check probes |
| `PORT` | frontend | 2222 | Port the health check probes |
| `AWS_REGION` | frontend | - | Bucket region |
| `RW_META_ADDR` | frontend | - | Meta node endpoint |
| `RUST_BACKTRACE` | frontend | 1 | Backtraces in crash logs |
| `RW_LISTEN_ADDR` | frontend | 0.0.0.0:4566 | PostgreSQL wire protocol listener |
| `RW_PGWIRE_PORT` | frontend | 4566 | Port the boot script connects to |
| `RW_S3_ENDPOINT` | frontend | - | Object storage endpoint |
| `ENABLE_TELEMETRY` | frontend | false | Upstream usage reporting |
| `RW_ROOT_PASSWORD` | frontend | (secret) | Password for the root superuser |
| `AWS_ACCESS_KEY_ID` | frontend | - | Bucket access key |
| `RW_ADVERTISE_ADDR` | frontend | frontend.railway.internal:4566 | Address the meta node records |
| `AWS_SECRET_ACCESS_KEY` | frontend | (secret) | Bucket secret key |
| `RW_IS_FORCE_PATH_STYLE` | frontend | true | Path-style S3 addressing |
| `RW_PROMETHEUS_ENDPOINT` | frontend | - | Metrics source for catalog views |
| `RW_PROMETHEUS_LISTENER_ADDR` | frontend | [::]:2222 | Metrics listener |
| `RW_HEALTH_CHECK_LISTENER_ADDR` | frontend | [::]:6786 | Frontend RPC listener |
| `PORT` | compute | 1222 | Port the health check probes |
| `AWS_REGION` | compute | - | Bucket region |
| `RW_META_ADDR` | compute | - | Meta node endpoint |
| `RUST_BACKTRACE` | compute | 1 | Backtraces in crash logs |
| `RW_LISTEN_ADDR` | compute | [::]:5688 | Streaming gRPC listener, dual-stack |
| `RW_S3_ENDPOINT` | compute | - | Object storage endpoint |
| `ENABLE_TELEMETRY` | compute | false | Upstream usage reporting |
| `AWS_ACCESS_KEY_ID` | compute | - | Bucket access key |
| `RW_ADVERTISE_ADDR` | compute | compute.railway.internal:5688 | Address peers dial |
| `AWS_SECRET_ACCESS_KEY` | compute | (secret) | Bucket secret key |
| `RW_IS_FORCE_PATH_STYLE` | compute | true | Path-style S3 addressing |
| `RW_PROMETHEUS_LISTENER_ADDR` | compute | [::]:1222 | Metrics listener |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | meta | 1250 | Port the health check probes |
| `AWS_REGION` | meta | - | Bucket region |
| `RW_BACKEND` | meta | postgres | Metadata store backend |
| `RUST_BACKTRACE` | meta | 1 | Backtraces in crash logs |
| `RW_LISTEN_ADDR` | meta | [::]:5690 | Cluster gRPC listener, dual-stack |
| `RW_S3_ENDPOINT` | meta | - | Object storage endpoint |
| `RW_STATE_STORE` | meta | - | Streaming state store URL |
| `RW_SQL_DATABASE` | meta | - | Metadata database name |
| `RW_SQL_ENDPOINT` | meta | - | Metadata database host and port |
| `RW_SQL_PASSWORD` | meta | (secret) | Metadata database password |
| `RW_SQL_USERNAME` | meta | (secret) | Metadata database user |
| `ENABLE_TELEMETRY` | meta | false | Upstream usage reporting |
| `AWS_ACCESS_KEY_ID` | meta | - | Bucket access key |
| `RW_ADVERTISE_ADDR` | meta | meta.railway.internal:5690 | Address peers dial |
| `RW_DASHBOARD_HOST` | meta | [::]:5691 | Web dashboard listener |
| `RW_DATA_DIRECTORY` | meta | hummock_001 | Key prefix inside the bucket |
| `RW_SQL_URL_PARAMS` | meta | sslmode=disable | Private-network connection, no TLS |
| `RW_PROMETHEUS_HOST` | meta | [::]:1250 | Metrics listener |
| `AWS_SECRET_ACCESS_KEY` | meta | (secret) | Bucket secret key |
| `RW_IS_FORCE_PATH_STYLE` | meta | true | Path-style S3 addressing |
| `RW_PROMETHEUS_ENDPOINT` | meta | - | Metrics source for the dashboard |
| `RW_SECRET_STORE_PRIVATE_KEY_HEX` | meta | (secret) | Encrypts connector secrets at rest |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'case "$RW_META_ADDR" in ""|"http://:"*) RW_META_ADDR=http://meta.railway.internal:5690;; esac; export RW_META_ADDR; echo "rw-boot: meta at $RW_META_ADDR"; exec /risingwave/bin/risingwave compactor-node'`
- **Healthcheck:** `/metrics`
- **Start command:** `/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheus --web.listen-address=[::]:9500 --storage.tsdb.retention.time=15d --storage.tsdb.retention.size=4GB`
- **Volume:** `/prometheus`
- **Start command:** `/bin/sh -c 'case "$RW_META_ADDR" in ""|"http://:"*) RW_META_ADDR=http://meta.railway.internal:5690;; esac; export RW_META_ADDR; case "$RW_PROMETHEUS_ENDPOINT" in ""|"http://:"*) RW_PROMETHEUS_ENDPOINT=http://prometheus.railway.internal:9500;; esac; export RW_PROMETHEUS_ENDPOINT; echo "rw-boot: meta at $RW_META_ADDR, prometheus at $RW_PROMETHEUS_ENDPOINT"; exec /usr/local/bin/rw-frontend-entrypoint.sh'`
- **TCP Proxies:** 4566
- **Start command:** `/bin/sh -c 'case "$RW_META_ADDR" in ""|"http://:"*) RW_META_ADDR=http://meta.railway.internal:5690;; esac; export RW_META_ADDR; echo "rw-boot: meta at $RW_META_ADDR"; exec /risingwave/bin/risingwave compute-node'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'case "$RW_PROMETHEUS_ENDPOINT" in ""|"http://:"*) RW_PROMETHEUS_ENDPOINT=http://prometheus.railway.internal:9500;; esac; export RW_PROMETHEUS_ENDPOINT; exec /risingwave/bin/risingwave meta-node'`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/risingwave)
