# Deploy lakeFS on Railway

A lakeFS server for git-like object versioning

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lakefs)

## About

lakeFS is an open-source data version control system that provides Git-like branching and versioning for object storage. It enables data teams to safely experiment with data, create reproducible analyses, and maintain data quality through isolated branches and commits.

Railway provides an ideal environment for hosting lakeFS with its integrated PostgreSQL databases and S3-compatible bucket storage. The platform handles SSL termination, persistent volumes, and private networking between services automatically. This template deploys a production-ready lakeFS instance backed by PostgreSQL for metadata storage and Railway’s bucket service for object data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lakeFS | `treeverse/lakefs:1.76.0` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lakeFS | 8000 | Port for Railway's proxy routing |
| `LAKEFS_DATABASE_TYPE` | lakeFS | postgres | Database backend type |
| `LAKEFS_LOGGING_LEVEL` | lakeFS | INFO | Log verbosity level |
| `LAKEFS_LISTEN_ADDRESS` | lakeFS | 0.0.0.0:8000 | Server bind address and port |
| `LAKEFS_BLOCKSTORE_TYPE` | lakeFS | s3 | Object storage backend type |
| `LAKEFS_BLOCKSTORE_S3_REGION` | lakeFS | - | Storage region |
| `LAKEFS_BLOCKSTORE_S3_ENDPOINT` | lakeFS | - | S3-compatible endpoint URL |
| `LAKEFS_AUTH_ENCRYPT_SECRET_KEY` | lakeFS | (secret) | Encryption key for auth tokens (auto-generated) |
| `LAKEFS_BLOCKSTORE_S3_FORCE_PATH_STYLE` | lakeFS | true | Use path-style URLs for S3 compatibility |
| `LAKEFS_DATABASE_POSTGRES_CONNECTION_STRING` | lakeFS | - | Connection string to PostgreSQL (uses private networking) |
| `LAKEFS_BLOCKSTORE_S3_CREDENTIALS_ACCESS_KEY_ID` | lakeFS | (secret) | Bucket access key |
| `LAKEFS_BLOCKSTORE_S3_CREDENTIALS_SECRET_ACCESS_KEY` | lakeFS | (secret) | Bucket secret key |
| `POSTGRES_DB` | postgres | lakefs | Default database created when image is started. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/lakefs)
