# Deploy OpenObserve on Railway

Datadog alternative. Observability (logs, metrics, traces), HA cluster

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-observe)

## About

OpenObserve is an open source observability platform that keeps logs, metrics, traces and real user monitoring data in one place. It writes everything to S3-compatible object storage as compressed Parquet instead of a hot search index, which is how it reaches roughly 140x lower storage cost than Elasticsearch-backed stacks. Teams reach for it as a Datadog, Splunk or Grafana-stack replacement when observability bills outgrow their value.

Deploy OpenObserve on Railway in its full high-availability shape rather than as a single container. This template runs the five node roles as separate services — router, ingester, querier, compactor and scheduler — backed by NATS for coordination, PostgreSQL for metadata and an object storage bucket for Parquet. You get a working cluster with a public URL and an admin account on first boot, so you can self-host OpenObserve without Helm charts or hand-wired node discovery.

![OpenObserve Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786743602/2508ffce-d9fe-436a-a9ba-2a492d891586.png)

OpenObserve is a single Rust binary whose behaviour changes with the role you give it, which is what makes a real cluster practical to run. Self-host it when per-GB SaaS pricing gets painful, or when telemetry cannot leave your own infrastructure.

Key features:

- Logs, metrics, traces and RUM in one platform, no separate Loki/Tempo/Prometheus
- SQL query engine over Parquet, plus PromQL for metrics
- Dashboards, scheduled and real-time alerts, and reports
- Ingest pipelines with VRL transforms for redaction and enrichment
- OpenTelemetry-native, plus Fluent Bit, Vector and Prometheus remote write

How the services fit together: the **router** is the only public one, forwarding writes to the ingester and reads to the querier. The **ingester** buffers data in a write-ahead log on its volume, converts it to Parquet and uploads it. The **querier** reads that Parquet back, caching hot files on disk. The **compactor** merges small files and applies retention; the **scheduler** evaluates alerts and reports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ingester | [gridalpha/openobserve-railway](https://github.com/gridalpha/openobserve-railway) | Database |
| scheduler | [gridalpha/openobserve-railway](https://github.com/gridalpha/openobserve-railway) | Database |
| router | [gridalpha/openobserve-railway](https://github.com/gridalpha/openobserve-railway) | Web service |
| compactor | [gridalpha/openobserve-railway](https://github.com/gridalpha/openobserve-railway) | Database |
| nats | `nats:2.14-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| querier | [gridalpha/openobserve-railway](https://github.com/gridalpha/openobserve-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ingester | 5080 | HTTP port used for health checks |
| `ZO_WEB_URL` | ingester | - | Public URL for links and alerts |
| `ZO_NATS_ADDR` | ingester | nats.railway.internal:4222 | Cluster coordinator address |
| `ZO_NATS_USER` | ingester | (secret) | NATS username |
| `ZO_NODE_ROLE` | ingester | ingester | Accepts writes, builds Parquet |
| `ZO_TELEMETRY` | ingester | false | Disable anonymous usage reporting |
| `ZO_LOCAL_MODE` | ingester | false | Enable cluster mode |
| `ZO_META_STORE` | ingester | postgres | Cluster metadata backend |
| `ZO_S3_PROVIDER` | ingester | s3 | Object storage provider type |
| `ZO_NATS_PASSWORD` | ingester | (secret) | NATS password |
| `ZO_NATS_REPLICAS` | ingester | 1 | JetStream replicas, single node |
| `ZO_S3_ACCESS_KEY` | ingester | - | Bucket access key |
| `ZO_S3_SECRET_KEY` | ingester | (secret) | Bucket secret key |
| `ZO_S3_SERVER_URL` | ingester | - | Bucket endpoint with scheme |
| `ZO_S3_BUCKET_NAME` | ingester | - | Bucket name |
| `ZO_S3_REGION_NAME` | ingester | - | Bucket region |
| `ZO_ROOT_USER_EMAIL` | ingester | - | First admin account email |
| `ZO_META_POSTGRES_DSN` | ingester | - | Metadata database connection |
| `ZO_NATS_V211_SUPPORT` | ingester | true | Faster dead-node detection |
| `ZO_COOKIE_SECURE_ONLY` | ingester | true | HTTPS-only session cookies |
| `ZO_NATS_EVENT_STORAGE` | ingester | file | Durable JetStream event storage |
| `ZO_ROOT_USER_PASSWORD` | ingester | (secret) | Admin password |
| `ZO_DISK_CACHE_MAX_SIZE` | ingester | 2048 | Disk cache ceiling in MB |
| `ZO_INTERNAL_GRPC_TOKEN` | ingester | (secret) | Shared internal gRPC token |
| `PORT` | scheduler | 5080 | HTTP port used for health checks |
| `ZO_WEB_URL` | scheduler | - | Public URL for links and alerts |
| `ZO_NATS_ADDR` | scheduler | nats.railway.internal:4222 | Cluster coordinator address |
| `ZO_NATS_USER` | scheduler | (secret) | NATS username |
| `ZO_NODE_ROLE` | scheduler | alertmanager | Runs alerts, reports, scheduled jobs |
| `ZO_TELEMETRY` | scheduler | false | Disable anonymous usage reporting |
| `ZO_LOCAL_MODE` | scheduler | false | Enable cluster mode |
| `ZO_META_STORE` | scheduler | postgres | Cluster metadata backend |
| `ZO_S3_PROVIDER` | scheduler | s3 | Object storage provider type |
| `ZO_NATS_PASSWORD` | scheduler | (secret) | NATS password |
| `ZO_NATS_REPLICAS` | scheduler | 1 | JetStream replicas, single node |
| `ZO_S3_ACCESS_KEY` | scheduler | - | Bucket access key |
| `ZO_S3_SECRET_KEY` | scheduler | (secret) | Bucket secret key |
| `ZO_S3_SERVER_URL` | scheduler | - | Bucket endpoint with scheme |
| `ZO_S3_BUCKET_NAME` | scheduler | - | Bucket name |
| `ZO_S3_REGION_NAME` | scheduler | - | Bucket region |
| `ZO_ROOT_USER_EMAIL` | scheduler | - | First admin account email |
| `ZO_META_POSTGRES_DSN` | scheduler | - | Metadata database connection |
| `ZO_NATS_V211_SUPPORT` | scheduler | true | Faster dead-node detection |
| `ZO_COOKIE_SECURE_ONLY` | scheduler | true | HTTPS-only session cookies |
| `ZO_NATS_EVENT_STORAGE` | scheduler | file | Durable JetStream event storage |
| `ZO_ROOT_USER_PASSWORD` | scheduler | (secret) | Admin password |
| `ZO_DISK_CACHE_MAX_SIZE` | scheduler | 2048 | Disk cache ceiling in MB |
| `ZO_INTERNAL_GRPC_TOKEN` | scheduler | (secret) | Shared internal gRPC token |
| `PORT` | router | 5080 | HTTP port used for health checks |
| `ZO_WEB_URL` | router | - | Public URL for links and alerts |
| `ZO_NATS_ADDR` | router | nats.railway.internal:4222 | Cluster coordinator address |
| `ZO_NATS_USER` | router | (secret) | NATS username |
| `ZO_NODE_ROLE` | router | router | Serves UI, dispatches traffic |
| `ZO_TELEMETRY` | router | false | Disable anonymous usage reporting |
| `ZO_LOCAL_MODE` | router | false | Enable cluster mode |
| `ZO_META_STORE` | router | postgres | Cluster metadata backend |
| `ZO_S3_PROVIDER` | router | s3 | Object storage provider type |
| `ZO_NATS_PASSWORD` | router | (secret) | NATS password |
| `ZO_NATS_REPLICAS` | router | 1 | JetStream replicas, single node |
| `ZO_S3_ACCESS_KEY` | router | - | Bucket access key |
| `ZO_S3_SECRET_KEY` | router | (secret) | Bucket secret key |
| `ZO_S3_SERVER_URL` | router | - | Bucket endpoint with scheme |
| `ZO_S3_BUCKET_NAME` | router | - | Bucket name |
| `ZO_S3_REGION_NAME` | router | - | Bucket region |
| `ZO_ROOT_USER_EMAIL` | router | admin@example.com | First admin account email |
| `ZO_META_POSTGRES_DSN` | router | - | Metadata database connection |
| `ZO_NATS_V211_SUPPORT` | router | true | Faster dead-node detection |
| `ZO_COOKIE_SECURE_ONLY` | router | true | HTTPS-only session cookies |
| `ZO_NATS_EVENT_STORAGE` | router | file | Durable JetStream event storage |
| `ZO_ROOT_USER_PASSWORD` | router | (secret) | Admin password, meets strength policy |
| `ZO_DISK_CACHE_MAX_SIZE` | router | 2048 | Disk cache ceiling in MB |
| `ZO_INTERNAL_GRPC_TOKEN` | router | (secret) | Shared token for internal gRPC |
| `PORT` | compactor | 5080 | HTTP port used for health checks |
| `ZO_WEB_URL` | compactor | - | Public URL for links and alerts |
| `ZO_NATS_ADDR` | compactor | nats.railway.internal:4222 | Cluster coordinator address |
| `ZO_NATS_USER` | compactor | (secret) | NATS username |
| `ZO_NODE_ROLE` | compactor | compactor | Merges files, applies retention |
| `ZO_TELEMETRY` | compactor | false | Disable anonymous usage reporting |
| `ZO_LOCAL_MODE` | compactor | false | Enable cluster mode |
| `ZO_META_STORE` | compactor | postgres | Cluster metadata backend |
| `ZO_S3_PROVIDER` | compactor | s3 | Object storage provider type |
| `ZO_NATS_PASSWORD` | compactor | (secret) | NATS password |
| `ZO_NATS_REPLICAS` | compactor | 1 | JetStream replicas, single node |
| `ZO_S3_ACCESS_KEY` | compactor | - | Bucket access key |
| `ZO_S3_SECRET_KEY` | compactor | (secret) | Bucket secret key |
| `ZO_S3_SERVER_URL` | compactor | - | Bucket endpoint with scheme |
| `ZO_S3_BUCKET_NAME` | compactor | - | Bucket name |
| `ZO_S3_REGION_NAME` | compactor | - | Bucket region |
| `ZO_ROOT_USER_EMAIL` | compactor | - | First admin account email |
| `ZO_META_POSTGRES_DSN` | compactor | - | Metadata database connection |
| `ZO_NATS_V211_SUPPORT` | compactor | true | Faster dead-node detection |
| `ZO_COOKIE_SECURE_ONLY` | compactor | true | HTTPS-only session cookies |
| `ZO_NATS_EVENT_STORAGE` | compactor | file | Durable JetStream event storage |
| `ZO_ROOT_USER_PASSWORD` | compactor | (secret) | Admin password |
| `ZO_DISK_CACHE_MAX_SIZE` | compactor | 2048 | Disk cache ceiling in MB |
| `ZO_INTERNAL_GRPC_TOKEN` | compactor | (secret) | Shared internal gRPC token |
| `PORT` | nats | 8222 | Monitoring port used for health checks |
| `NATS_USER` | nats | (secret) | Username OpenObserve nodes connect with |
| `NATS_PASSWORD` | nats | (secret) | Password for the NATS user |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | querier | 5080 | HTTP port used for health checks |
| `ZO_WEB_URL` | querier | - | Public URL for links and alerts |
| `ZO_NATS_ADDR` | querier | nats.railway.internal:4222 | Cluster coordinator address |
| `ZO_NATS_USER` | querier | (secret) | NATS username |
| `ZO_NODE_ROLE` | querier | querier | Executes queries, caches files |
| `ZO_TELEMETRY` | querier | false | Disable anonymous usage reporting |
| `ZO_LOCAL_MODE` | querier | false | Enable cluster mode |
| `ZO_META_STORE` | querier | postgres | Cluster metadata backend |
| `ZO_S3_PROVIDER` | querier | s3 | Object storage provider type |
| `ZO_NATS_PASSWORD` | querier | (secret) | NATS password |
| `ZO_NATS_REPLICAS` | querier | 1 | JetStream replicas, single node |
| `ZO_S3_ACCESS_KEY` | querier | - | Bucket access key |
| `ZO_S3_SECRET_KEY` | querier | (secret) | Bucket secret key |
| `ZO_S3_SERVER_URL` | querier | - | Bucket endpoint with scheme |
| `ZO_S3_BUCKET_NAME` | querier | - | Bucket name |
| `ZO_S3_REGION_NAME` | querier | - | Bucket region |
| `ZO_ROOT_USER_EMAIL` | querier | - | First admin account email |
| `ZO_META_POSTGRES_DSN` | querier | - | Metadata database connection |
| `ZO_NATS_V211_SUPPORT` | querier | true | Faster dead-node detection |
| `ZO_COOKIE_SECURE_ONLY` | querier | true | HTTPS-only session cookies |
| `ZO_NATS_EVENT_STORAGE` | querier | file | Durable JetStream event storage |
| `ZO_ROOT_USER_PASSWORD` | querier | (secret) | Admin password |
| `ZO_DISK_CACHE_MAX_SIZE` | querier | 2048 | Disk cache ceiling in MB |
| `ZO_INTERNAL_GRPC_TOKEN` | querier | (secret) | Shared internal gRPC token |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'printf "jetstream {\n  store_dir: \"/data\"\n  max_memory_store: 536870912\n  max_file_store: 3221225472\n}\n" > /tmp/jetstream.conf; exec docker-entrypoint.sh nats-server -c /tmp/jetstream.conf --port 4222 --http_port 8222 --user "$NATS_USER" --pass "$NATS_PASSWORD"'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-observe)
