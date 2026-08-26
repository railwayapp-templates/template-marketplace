# Deploy InfluxDB on Railway

Time-series database for storing and charting metrics and sensor data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/influxdb3)

## About

InfluxDB is the time-series database most teams reach for first when they need to store metrics, sensor readings or any other stream of timestamped measurements and query it back quickly. InfluxDB 3 Core is the open-source engine in that family — a Rust rewrite on Apache Arrow, DataFusion and Parquet that answers SQL and InfluxQL over HTTP and accepts writes from Telegraf's 400-plus input plugins as well as from any HTTP client. It solves what relational databases handle badly: millions of narrow, append-only rows you almost always query by time range.

Deploy InfluxDB on Railway and you get three services wired together rather than a bare container. `influxdb` runs InfluxDB 3 Core and publishes a token-authenticated HTTP API on its own domain, so Telegraf agents, Grafana and application clients can write and query from anywhere. Its catalog, write-ahead log and Parquet files live in a Railway object storage bucket — the architecture InfluxDB 3 was designed around, so storage grows without a disk quota. `explorer` runs InfluxDB 3 Explorer, InfluxData's official web UI, pre-connected over the private network; because it ships no login of its own it stays private, and `gateway`, a small Caddy service, takes the public domain and puts HTTP basic auth in front.

![InfluxDB, Explorer and Caddy gateway services online in one Railway project](https://res.cloudinary.com/rroe4rtk/image/upload/v1787653697/influxdb-architecture.png)

InfluxDB 3 Core stores every measurement as a timestamped, tagged row and persists it as Parquet — which is why it reads well from object storage and stays open to any Arrow-aware tool. Self-hosting makes sense when telemetry volume makes a metered cloud plan unpredictable, when data residency matters, or when the database should sit on the same private network as the services producing the data.

- SQL and InfluxQL over HTTP, plus Flight SQL for Arrow clients
- Line protocol writes compatible with InfluxDB 1.x and 2.x clients and with Telegraf
- Last-value and distinct-value caches for sub-10 ms lookups on recent data
- A Python processing engine for triggers that transform or downsample data in place
- Per-database and per-table retention, with soft deletes and a grace period

The template splits that into three roles. `influxdb` is the database and the only service holding your data. `explorer` is a separate upstream product — a Node application with a small SQLite volume for saved queries and dashboards — that talks to the database server-side, so your browser never needs a route to the API. `gateway` is a stock Caddy image terminating the public domain, checking basic auth and proxying to Explorer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| influxdb | [gridalpha/influxdb3-railway](https://github.com/gridalpha/influxdb3-railway) | Web service |
| gateway | [gridalpha/influxdb3-railway](https://github.com/gridalpha/influxdb3-railway) | Web service |
| explorer | [gridalpha/influxdb3-railway](https://github.com/gridalpha/influxdb3-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | influxdb | 8181 | Health-check port, matches the HTTP bind |
| `AWS_ENDPOINT` | influxdb | - | S3-compatible endpoint URL |
| `INFLUXDB3_BUCKET` | influxdb | - | Object storage bucket name |
| `AWS_ACCESS_KEY_ID` | influxdb | - | Bucket access key |
| `INFLUXDB3_NODE_ID` | influxdb | node0 | Object store path prefix, keep stable |
| `AWS_DEFAULT_REGION` | influxdb | us-east-1 | Signing region only |
| `INFLUXDB3_LOG_FILTER` | influxdb | info | Log verbosity |
| `AWS_SECRET_ACCESS_KEY` | influxdb | (secret) | Bucket secret key |
| `INFLUXDB3_ADMIN_TOKEN` | influxdb | (secret) | Operator token, adopted on first boot only |
| `INFLUXDB3_OBJECT_STORE` | influxdb | s3 | Storage backend |
| `INFLUXDB3_DISABLE_AUTHZ` | influxdb | health,ping | Routes the health prober may reach |
| `INFLUXDB3_HTTP_BIND_ADDR` | influxdb | [::]:8181 | Dual-stack listen address |
| `INFLUXDB3_QUERY_FILE_LIMIT` | influxdb | 432 | Parquet files one query may read |
| `GATEWAY_PASSWORD` | gateway | (secret) | Basic-auth password, hashed at boot |
| `GATEWAY_USERNAME` | gateway | (secret) | Basic-auth user for the Explorer UI |
| `EXPLORER_UPSTREAM` | gateway | - | Explorer's private address |
| `PORT` | explorer | 8888 | Node backend port, not the nginx port |
| `DATABASE_URL` | explorer | /db/sqlite.db | Explorer's own SQLite file on the volume |
| `INFLUXDB3_HOST` | explorer | - | Private database URL |
| `INFLUXDB3_DATABASE` | explorer | mydb | Database pre-selected in the UI |
| `SESSION_SECRET_KEY` | explorer | (secret) | Signs Explorer browser sessions |
| `INFLUXDB3_ADMIN_TOKEN` | explorer | (secret) | Token for the pre-set connection |
| `INFLUXDB3_SERVER_NAME` | explorer | InfluxDB 3 Core | Connection label shown in the UI |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/influxdb3`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/api/sessions`
- **Volume:** `/db`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/influxdb3)
