# Deploy Varve on Railway

Experimental Rust time-series database with DuckDB SQL and S3 recovery.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/varve)

## About

Time settles into layers. Varve is an experimental Rust time-series database with DuckDB SQL, bounded group-commit ingestion, continuous numeric aggregates, tiered Parquet storage and asynchronous S3 WAL/checkpoints.

This template deploys one Varve service, one persistent `/data` volume and a dedicated `objects` bucket. The service owns the public HTTPS domain and WebSocket endpoint at `/v1/ws`. It generates an operator API token; there is no default username/password or web administration console. Obtain the token from `VARVE_API_TOKEN` in the service variables, then create a table using a client or the operator API.

`/health` is liveness. `/ready` is a nonblocking storage-state check and may briefly return 503 during normal mutex contention; clients should use bounded readiness acquisition, not treat every busy sample as a crash. Browser clients require exact origins in `VARVE_WS_ORIGINS` and are for trusted operator frontends—never embed the operator token in a public app.

A local acknowledgment is **not an S3 acknowledgment**. Do not deploy irreplaceable data without independent backups and a tested restore plan. No automatic failover or multi-replica database ownership is implemented.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| varve | [monotykamary/railway-template-varve](https://github.com/monotykamary/railway-template-varve) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Service port. Keep 8080 to match the public domain target. |
| `VARVE_USE_S3` | true | Keep true to publish asynchronous recovery state to the dedicated bucket. |
| `VARVE_DATA_DIR` | /data/varve | Database directory on the persistent volume. Keep /data/varve. |
| `VARVE_API_TOKEN` | (secret) | Generated operator token for HTTPS and WebSocket clients. Grants database-wide access; keep private. |
| `VARVE_S3_BUCKET` | - | Dedicated bucket name from the objects resource. Preserve this reference. |
| `VARVE_S3_PREFIX` | varve | Single-writer recovery namespace within the dedicated bucket. Do not share with another active database. |
| `VARVE_S3_REGION` | auto | Signing region for Railway object storage; keep auto. |
| `VARVE_WS_ORIGINS` | - | Optional comma-separated exact browser origins, such as https://app.example.com. Empty rejects browser origins; no wildcard. |
| `AWS_ACCESS_KEY_ID` | - | Bucket-generated access key reference; do not copy validation credentials. |
| `VARVE_S3_ENDPOINT` | - | S3-compatible endpoint supplied by the objects resource. |
| `VARVE_REQUIRE_VOLUME` | 1 | Keep 1 to refuse startup without a mounted /data volume. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Bucket-generated secret key reference; preserve the reference and keep private. |
| `VARVE_HTTP_REQUEST_QUEUE` | 64 | Bounded shared application request admission capacity. |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/varve)
