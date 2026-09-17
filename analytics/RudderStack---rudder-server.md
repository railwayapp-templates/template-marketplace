# Deploy RudderStack on Railway

Customer data platform that collects app events into your warehouse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rudder-server)

## About

Deploy RudderStack to collect clickstream events from your websites, apps and servers and land them in a data warehouse you own. RudderStack is an open-source, warehouse-first customer data platform and the best-known self-hosted Segment alternative: its HTTP API and SDKs speak the same `identify` / `track` / `page` / `screen` / `group` calls, so existing instrumentation keeps working once you change the endpoint and write key. Teams self-host it when analytics data is too sensitive or too high-volume to send through a vendor.

This template runs the whole open-source stack. **rudder-server** is the public gateway: it authenticates events against a write key, queues them in **Postgres**, hands each to **rudder-transformer** for destination-specific shaping, writes batched load files to the **rudder-storage** bucket, and loads them into **warehouse-db**, a second Postgres that becomes your event warehouse. **statsd-exporter** exposes the pipeline's metrics in Prometheus format. Only rudder-server gets a public domain.

![Diagram of the RudderStack services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789570213/rudderstack-architecture.webp)

A customer data platform sits between the places events happen and the places they are analysed. RudderStack inverts the usual model: the warehouse is the primary destination and every other tool is downstream of it. Self-hosted, events never leave your infrastructure and there is no per-event pricing.

Key features:

- Segment-compatible HTTP API and SDKs for web, iOS, Android, React Native, Node, Python, Go, Java and Ruby
- Warehouse-first loading into Postgres, Snowflake, BigQuery, Redshift and ClickHouse
- 200+ event-stream destinations, plus a JavaScript framework for transforming events in flight
- A durable retry layer, so a destination outage loses no events

The architecture mirrors how RudderStack splits work internally. rudder-server holds the gateway, processor, router and warehouse scheduler in one process — the shape upstream's own Helm chart deploys. Postgres is not the warehouse: it is the durable job queue, holding every event until every destination has accepted it. rudder-transformer is separate because destination logic changes far more often than the core server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rudder-transformer | `rudderstack/rudder-transformer:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| statsd-exporter | `prom/statsd-exporter:latest` | Worker |
| rudder-server | [gridalpha/rudderstack-railway](https://github.com/gridalpha/rudderstack-railway) | Web service |
| warehouse-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rudder-transformer | 9090 | Transformer HTTP port |
| `LOG_LEVEL` | rudder-transformer | info | Transformer log level |
| `NUM_PROCS` | rudder-transformer | 2 | Worker processes |
| `NODE_OPTIONS` | rudder-transformer | --max-old-space-size=1536 | Heap ceiling per process |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | statsd-exporter | 9102 | Prometheus metrics port |
| `PORT` | rudder-server | 8080 | Gateway HTTP port |
| `GO_ENV` | rudder-server | production | Runtime mode |
| `LOG_LEVEL` | rudder-server | INFO | Server log level |
| `INSTANCE_ID` | rudder-server | railway | Node identifier in metrics |
| `JOBS_DB_HOST` | rudder-server | - | Job queue host |
| `JOBS_DB_PORT` | rudder-server | - | Job queue port |
| `JOBS_DB_USER` | rudder-server | (secret) | Job queue user |
| `RUDDER_TMPDIR` | rudder-server | /rudder-tmp | Scratch space on the volume |
| `JOBS_DB_DB_NAME` | rudder-server | - | Job queue database |
| `JOBS_DB_PASSWORD` | rudder-server | (secret) | Job queue password |
| `JOBS_DB_SSL_MODE` | rudder-server | require | Encrypt without verifying |
| `RUDDER_WRITE_KEY` | rudder-server | - | Write key every SDK sends |
| `STATSD_SERVER_URL` | rudder-server | - | Metrics sink |
| `CONFIG_BACKEND_URL` | rudder-server | http://127.0.0.1:1 | Control plane unused in file mode |
| `DEST_TRANSFORM_URL` | rudder-server | - | Transformer service URL |
| `RUDDER_BUCKET_NAME` | rudder-server | - | Staging and load file bucket |
| `RUDDER_WEBHOOK_URL` | rudder-server | - | Optional extra webhook destination |
| `RUDDER_WORKSPACE_ID` | rudder-server | railway | Workspace id stamped on events |
| `RUDDER_WAREHOUSE_HOST` | rudder-server | - | Warehouse host |
| `RUDDER_WAREHOUSE_PORT` | rudder-server | - | Warehouse port |
| `RUDDER_WAREHOUSE_USER` | rudder-server | (secret) | Warehouse user |
| `RUDDER_BUCKET_ENDPOINT` | rudder-server | - | Bucket endpoint |
| `RSERVER_PROFILER_ENABLED` | rudder-server | false | Disable the pprof listener |
| `RUDDER_WAREHOUSE_DB_NAME` | rudder-server | - | Warehouse database |
| `RUDDER_WAREHOUSE_PASSWORD` | rudder-server | (secret) | Warehouse password |
| `RUDDER_WAREHOUSE_SSL_MODE` | rudder-server | require | Encrypt without verifying |
| `RUDDER_WAREHOUSE_NAMESPACE` | rudder-server | rudder_events | Schema the event tables use |
| `RUDDER_BUCKET_ACCESS_KEY_ID` | rudder-server | - | Bucket access key |
| `RUDDER_BUCKET_SECRET_ACCESS_KEY` | rudder-server | (secret) | Bucket secret key |
| `RUDDER_WAREHOUSE_SYNC_FREQUENCY` | rudder-server | 5 | Minutes between warehouse loads |
| `RSERVER_DIAGNOSTICS_ENABLE_DIAGNOSTICS` | rudder-server | false | Disable upstream usage telemetry |
| `RSERVER_GATEWAY_WEBHOOK_SOURCE_LIST_FOR_PARSING_PARAMS` | rudder-server | Shopify | Required by upstream |
| `POSTGRES_DB` | warehouse-db | railway | Database created on first boot |
| `DATABASE_URL` | warehouse-db | - | Private connection string |
| `POSTGRES_USER` | warehouse-db | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | warehouse-db | (secret) | Superuser password, read by the server |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rudder-tmp`

**Category:** Analytics · **Languages:** Shell, Dockerfile, jq

[View on Railway →](https://railway.com/deploy/rudder-server)
