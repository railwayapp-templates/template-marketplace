# Deploy Quickwit on Railway

Search engine for logs and traces that stores indexes in a bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quickwit)

## About

Quickwit is an open-source search engine for observability data — the high-volume, write-once, read-rarely logs and traces that make Elasticsearch clusters expensive. Written in Rust on tantivy, it decouples compute from storage: indexes live as immutable "splits" in an S3-compatible bucket, and stateless searchers read only the bytes a query needs. That drops the replicated hot-disk tier which dominates a log stack's cost, while keeping a real inverted index behind it. It speaks the Elasticsearch search API, ingests OpenTelemetry natively, and is a Jaeger backend.

Self-host Quickwit on Railway with the full distributed topology, not one all-in-one node. This template deploys five Quickwit services — searcher, indexer, control plane, metastore and janitor — each running one role of the same pinned image and finding the others by gossip over Railway's private network. Managed PostgreSQL backs the metastore, an object storage bucket holds every index split, and a Caddy gateway takes the public domain and adds the authentication Quickwit does not ship. Each role then scales and restarts independently, as upstream's own Kubernetes chart lays it out.

![Quickwit cluster services and Postgres metastore on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788306379/quickwit-architecture.png)

Logs and traces are a different workload from the documents Elasticsearch was designed around: they arrive constantly, are almost never updated, and are usually read once during an incident. Quickwit writes them into immutable splits on object storage and keeps only metadata in a database, so retention is a bucket lifecycle question rather than a disk provisioning one.

- Full-text search and aggregations, including percentiles and histograms
- Elasticsearch-compatible `_search` API, so existing clients and dashboards work
- Native OpenTelemetry ingest, a Jaeger gRPC backend and a Grafana data source
- Schemaless or strictly mapped indexing, with per-index retention policies

The **searcher** answers queries, serves the web UI and routes ingest — it takes the gateway's normal traffic. The **indexer** builds splits, holds the write-ahead log on its volume, and is the one role serving the OpenTelemetry endpoints. The **control plane** assigns indexing work to indexers. The **metastore** alone talks to PostgreSQL, serving index, split and shard metadata over gRPC. The **janitor** applies retention, runs delete tasks and collects unreferenced splits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| janitor | [gridalpha/quickwit-railway](https://github.com/gridalpha/quickwit-railway) (root: quickwit) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metastore | [gridalpha/quickwit-railway](https://github.com/gridalpha/quickwit-railway) (root: quickwit) | Database |
| searcher | [gridalpha/quickwit-railway](https://github.com/gridalpha/quickwit-railway) (root: quickwit) | Database |
| gateway | [gridalpha/quickwit-railway](https://github.com/gridalpha/quickwit-railway) (root: gateway) | Web service |
| control-plane | [gridalpha/quickwit-railway](https://github.com/gridalpha/quickwit-railway) (root: quickwit) | Database |
| indexer | [gridalpha/quickwit-railway](https://github.com/gridalpha/quickwit-railway) (root: quickwit) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | janitor | 7280 | Port Railway health-checks |
| `RUST_LOG` | janitor | info,sqlx=warn | Log level |
| `PEER_ADDR` | janitor | janitor.railway.internal:7280 | Address peers dial this node on |
| `AWS_REGION` | janitor | - | Bucket region |
| `QW_NODE_ID` | janitor | janitor | Stable node identity across deploys |
| `QW_CLUSTER_ID` | janitor | quickwit-railway | Shared cluster identifier |
| `QW_PEER_SEEDS` | janitor | - | Cluster bootstrap seeds |
| `QW_S3_ENDPOINT` | janitor | - | Object storage endpoint |
| `AWS_ACCESS_KEY_ID` | janitor | - | Bucket access key |
| `QW_LISTEN_ADDRESS` | janitor | :: | Dual-stack bind for peers and prober |
| `QW_ENABLED_SERVICES` | janitor | janitor | Role this node runs |
| `QW_REST_LISTEN_PORT` | janitor | 7280 | Quickwit REST and gossip port |
| `AWS_SECRET_ACCESS_KEY` | janitor | (secret) | Bucket secret key |
| `QW_ENABLE_OTLP_ENDPOINT` | janitor | true | OpenTelemetry ingest routes |
| `QW_DEFAULT_INDEX_ROOT_URI` | janitor | - | Where new indexes are stored |
| `QW_ENABLE_JAEGER_ENDPOINT` | janitor | true | Jaeger gRPC query endpoint |
| `QW_S3_FORCE_PATH_STYLE_ACCESS` | janitor | true | Path-style S3 addressing |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | metastore | 7280 | Port Railway health-checks |
| `RUST_LOG` | metastore | info,sqlx=warn | Log level |
| `PEER_ADDR` | metastore | metastore.railway.internal:7280 | Address peers dial this node on |
| `AWS_REGION` | metastore | - | Bucket region |
| `QW_NODE_ID` | metastore | metastore | Stable node identity across deploys |
| `QW_CLUSTER_ID` | metastore | quickwit-railway | Shared cluster identifier |
| `QW_PEER_SEEDS` | metastore | - | Cluster bootstrap seed |
| `QW_S3_ENDPOINT` | metastore | - | Object storage endpoint |
| `QW_METASTORE_URI` | metastore | - | Metastore database |
| `AWS_ACCESS_KEY_ID` | metastore | - | Bucket access key |
| `QW_LISTEN_ADDRESS` | metastore | :: | Dual-stack bind for peers and prober |
| `QW_ENABLED_SERVICES` | metastore | metastore | Role this node runs |
| `QW_REST_LISTEN_PORT` | metastore | 7280 | Quickwit REST and gossip port |
| `AWS_SECRET_ACCESS_KEY` | metastore | (secret) | Bucket secret key |
| `QW_ENABLE_OTLP_ENDPOINT` | metastore | true | OpenTelemetry ingest routes |
| `QW_DEFAULT_INDEX_ROOT_URI` | metastore | - | Where new indexes are stored |
| `QW_ENABLE_JAEGER_ENDPOINT` | metastore | true | Jaeger gRPC query endpoint |
| `QW_S3_FORCE_PATH_STYLE_ACCESS` | metastore | true | Path-style S3 addressing |
| `PORT` | searcher | 7280 | Port Railway health-checks |
| `RUST_LOG` | searcher | info,sqlx=warn | Log level |
| `PEER_ADDR` | searcher | searcher.railway.internal:7280 | Address peers dial this node on |
| `AWS_REGION` | searcher | - | Bucket region |
| `QW_NODE_ID` | searcher | searcher | Stable node identity across deploys |
| `QW_CLUSTER_ID` | searcher | quickwit-railway | Shared cluster identifier |
| `QW_PEER_SEEDS` | searcher | - | Cluster bootstrap seeds |
| `QW_S3_ENDPOINT` | searcher | - | Object storage endpoint |
| `AWS_ACCESS_KEY_ID` | searcher | - | Bucket access key |
| `QW_LISTEN_ADDRESS` | searcher | :: | Dual-stack bind for peers and prober |
| `QW_ENABLED_SERVICES` | searcher | searcher | Role this node runs |
| `QW_REST_LISTEN_PORT` | searcher | 7280 | Quickwit REST and gossip port |
| `AWS_SECRET_ACCESS_KEY` | searcher | (secret) | Bucket secret key |
| `QW_ENABLE_OTLP_ENDPOINT` | searcher | true | OpenTelemetry ingest routes |
| `QW_DEFAULT_INDEX_ROOT_URI` | searcher | - | Where new indexes are stored |
| `QW_ENABLE_JAEGER_ENDPOINT` | searcher | true | Jaeger gRPC query endpoint |
| `QW_S3_FORCE_PATH_STYLE_ACCESS` | searcher | true | Path-style S3 addressing |
| `PORT` | gateway | 8080 | Caddy listening port |
| `GATEWAY_USER` | gateway | (secret) | HTTP basic auth username |
| `GATEWAY_PASSWORD` | gateway | (secret) | Browser password; change after deploy |
| `QUICKWIT_API_KEY` | gateway | (secret) | Bearer token for API and OTel clients |
| `QUICKWIT_UPSTREAM` | gateway | - | Node serving search and the UI |
| `QUICKWIT_INDEXER_UPSTREAM` | gateway | - | Node serving OTLP routes |
| `PORT` | control-plane | 7280 | Port Railway health-checks |
| `RUST_LOG` | control-plane | info,sqlx=warn | Log level |
| `PEER_ADDR` | control-plane | control-plane.railway.internal:7280 | Address peers dial this node on |
| `AWS_REGION` | control-plane | - | Bucket region |
| `QW_NODE_ID` | control-plane | control-plane | Stable node identity across deploys |
| `QW_CLUSTER_ID` | control-plane | quickwit-railway | Shared cluster identifier |
| `QW_PEER_SEEDS` | control-plane | - | Cluster bootstrap seed |
| `QW_S3_ENDPOINT` | control-plane | - | Object storage endpoint |
| `AWS_ACCESS_KEY_ID` | control-plane | - | Bucket access key |
| `QW_LISTEN_ADDRESS` | control-plane | :: | Dual-stack bind for peers and prober |
| `QW_ENABLED_SERVICES` | control-plane | control_plane | Role this node runs |
| `QW_REST_LISTEN_PORT` | control-plane | 7280 | Quickwit REST and gossip port |
| `AWS_SECRET_ACCESS_KEY` | control-plane | (secret) | Bucket secret key |
| `QW_ENABLE_OTLP_ENDPOINT` | control-plane | true | OpenTelemetry ingest routes |
| `QW_DEFAULT_INDEX_ROOT_URI` | control-plane | - | Where new indexes are stored |
| `QW_ENABLE_JAEGER_ENDPOINT` | control-plane | true | Jaeger gRPC query endpoint |
| `QW_S3_FORCE_PATH_STYLE_ACCESS` | control-plane | true | Path-style S3 addressing |
| `PORT` | indexer | 7280 | Port Railway health-checks |
| `RUST_LOG` | indexer | info,sqlx=warn | Log level |
| `PEER_ADDR` | indexer | indexer.railway.internal:7280 | Address peers dial this node on |
| `AWS_REGION` | indexer | - | Bucket region |
| `QW_NODE_ID` | indexer | indexer | Stable node identity across deploys |
| `QW_CLUSTER_ID` | indexer | quickwit-railway | Shared cluster identifier |
| `QW_PEER_SEEDS` | indexer | - | Cluster bootstrap seeds |
| `QW_S3_ENDPOINT` | indexer | - | Object storage endpoint |
| `AWS_ACCESS_KEY_ID` | indexer | - | Bucket access key |
| `QW_LISTEN_ADDRESS` | indexer | :: | Dual-stack bind for peers and prober |
| `QW_ENABLED_SERVICES` | indexer | indexer | Role this node runs |
| `QW_REST_LISTEN_PORT` | indexer | 7280 | Quickwit REST and gossip port |
| `AWS_SECRET_ACCESS_KEY` | indexer | (secret) | Bucket secret key |
| `QW_ENABLE_OTLP_ENDPOINT` | indexer | true | OpenTelemetry ingest routes |
| `QW_DEFAULT_INDEX_ROOT_URI` | indexer | - | Where new indexes are stored |
| `QW_ENABLE_JAEGER_ENDPOINT` | indexer | true | Jaeger gRPC query endpoint |
| `QW_S3_FORCE_PATH_STYLE_ACCESS` | indexer | true | Path-style S3 addressing |

## Configuration

- **Start command:** `/bin/sh -c 'A=$(grep -E "^fd" /proc/net/if_inet6 | head -1 | cut -d" " -f1 | sed -E "s/.{4}/&:/g;s/:$//"); if [ -n "$A" ]; then export QW_ADVERTISE_ADDRESS=$A; fi; echo "quickwit: advertising $QW_ADVERTISE_ADDRESS, services=$QW_ENABLED_SERVICES"; exec quickwit run'`
- **Healthcheck:** `/health/readyz`
- **Volume:** `/quickwit/qwdata`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/quickwit)
