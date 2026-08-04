# Deploy lakeFS data version control on Railway

Git-like data version control with PostgreSQL and Railway object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lakefs-data-version-control)

## About

lakeFS gives data lakes Git-like repositories, branches, commits, and merges while keeping object data in S3-compatible storage.

This template deploys lakeFS with a private PostgreSQL metadata database and a Railway Bucket blockstore. Generated administrator credentials are installed before the public revision starts, and persistent data stays outside the stateless lakeFS container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lakeFS PostgreSQL | `postgres:17-alpine@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` | Database |
| lakeFS | `treeverse/lakefs:1.84.1@sha256:26d9bf3669c102bc564c52d7712cbcee203a728ba20be808bb1292a46972237d` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | lakeFS PostgreSQL | lakefs | - |
| `POSTGRES_USER` | lakeFS PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | lakeFS PostgreSQL | (secret) | Generated password for the private lakeFS metadata database. |
| `PORT` | lakeFS | 8000 | - |
| `LAKEFS_DATABASE_TYPE` | lakeFS | postgres | - |
| `LAKEFS_STATS_ENABLED` | lakeFS | false | - |
| `LAKEFS_LISTEN_ADDRESS` | lakeFS | 0.0.0.0:8000 | - |
| `LAKEFS_LOGGING_FORMAT` | lakeFS | json | - |
| `LAKEFS_BLOCKSTORE_TYPE` | lakeFS | s3 | - |
| `LAKEFS_ADMIN_ACCESS_KEY_ID` | lakeFS | - | Generated access key for the administrator created before the public deployment starts. |
| `LAKEFS_BLOCKSTORE_S3_ENDPOINT` | lakeFS | - | S3-compatible Railway Bucket endpoint. |
| `LAKEFS_ADMIN_SECRET_ACCESS_KEY` | lakeFS | (secret) | Generated secret key for the initial lakeFS administrator. |
| `LAKEFS_AUTH_ENCRYPT_SECRET_KEY` | lakeFS | (secret) | Generated key that encrypts lakeFS authentication data; keep it stable across upgrades. |
| `LAKEFS_BLOCKSTORE_SIGNING_SECRET_KEY` | lakeFS | (secret) | Generated key used to sign physical-address tokens; keep it stable across upgrades. |
| `LAKEFS_BLOCKSTORE_S3_FORCE_PATH_STYLE` | lakeFS | true | - |
| `LAKEFS_BLOCKSTORE_DEFAULT_NAMESPACE_PREFIX` | lakeFS | - | Railway Bucket namespace suggested when creating repositories. |
| `LAKEFS_BLOCKSTORE_S3_DISCOVER_BUCKET_REGION` | lakeFS | false | - |
| `LAKEFS_BLOCKSTORE_S3_CREDENTIALS_ACCESS_KEY_ID` | lakeFS | (secret) | Railway Bucket access key. |
| `LAKEFS_BLOCKSTORE_S3_CREDENTIALS_SECRET_ACCESS_KEY` | lakeFS | (secret) | Railway Bucket secret key. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/app/lakefs run`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/lakefs-data-version-control)
