# Deploy OpenObserve | Open Source Datadog Alternative on Railway

Self-hosted logs, metrics & traces with data in object storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openobserve-object-storage)

## About

OpenObserve is an open-source observability platform for logs, metrics, traces and
front-end monitoring — a simpler, far cheaper alternative to Datadog, Splunk and
Elasticsearch, claiming roughly 140x lower storage costs thanks to a columnar,
object-storage-backed design. This template runs it the way it is meant to run in
production: a single binary with its bulk data in a managed object-storage bucket.

This deploys OpenObserve `v0.92.0` (pinned) as one service in single-node mode, and —
unlike the other OpenObserve templates in the marketplace — points its storage backend
at a **Railway object-storage bucket** instead of a local disk. That is the whole point
of OpenObserve: the ingested parquet data and its full-text index live in the bucket
(`ZO_LOCAL_MODE_STORAGE=s3`), which is cheap and grows without bumping into a volume
size limit. A small attached volume keeps only what must be local — the SQLite metadata
(users, orgs, stream schemas, dashboards, alerts) and the transient write-ahead log.

The image is distroless, so everything is configured through `ZO_*` environment
variables — there is no start command to maintain. The admin password is generated for
you and already satisfies OpenObserve's strength policy (upper, lower, digit and a
special character), so there is nothing to fill in before deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenObserve | `openobserve/openobserve:v0.92.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5080 | HTTP port OpenObserve listens on; Railway routes traffic and health checks here. |
| `ZO_WEB_URL` | - | Public base URL used for share links and alert callbacks. |
| `ZO_DATA_DIR` | /data/ | Local directory on the attached volume: SQLite metadata + write-ahead log only. Bulk data goes to object storage. |
| `ZO_HTTP_PORT` | 5080 | OpenObserve's own HTTP listener port; keep it equal to PORT. |
| `ZO_TELEMETRY` | false | Disable anonymous usage telemetry to OpenObserve. |
| `ZO_LOCAL_MODE` | true | Single-node mode: no external etcd/NATS/Postgres required. |
| `ZO_S3_PROVIDER` | s3 | Object-storage provider flavour; 's3' matches Railway's S3-compatible bucket. |
| `ZO_S3_ACCESS_KEY` | - | Object-storage access key (wired automatically from the bucket). |
| `ZO_S3_SECRET_KEY` | (secret) | Object-storage secret key (wired automatically from the bucket). |
| `ZO_S3_SERVER_URL` | - | Object-storage S3 endpoint (wired automatically from the bucket). |
| `ZO_S3_BUCKET_NAME` | - | Object-storage bucket name (wired automatically from the bucket). |
| `ZO_S3_REGION_NAME` | - | Object-storage bucket region (wired automatically from the bucket). |
| `ZO_ROOT_USER_EMAIL` | admin@example.com | Login email for the initial admin user, created on first boot. Change it before the first deploy if you like. |
| `ZO_LOCAL_MODE_STORAGE` | s3 | Store ingested data (parquet + full-text index) in the object-storage bucket instead of the local disk. This is what keeps storage cheap and unbounded. |
| `ZO_ROOT_USER_PASSWORD` | (secret) | Password for the initial admin user. OpenObserve requires upper, lower, digit and a special character; this generator guarantees all four. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openobserve-object-storage)
