# Deploy Dittofeed with workers and blob storage on Railway

Deploy and host Dittofeed, the messaging Automation for All.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dittofeed-1)

## About

Dittofeed is an open-source customer engagement platform that lets you create, manage, and automate marketing campaigns using event triggers, segmentation, and multi-channel delivery. Built for developers and product teams, it provides a powerful, self-hosted alternative to Customer.io and Braze.

This Railway starter template provisions three core services: `dittofeed-lite`, `dittofeed-admin-cli`, and `dittofeed-worker`. To complete your setup, you’ll need to configure two shared environment variables across all three services:

- `PASSWORD`: The login credential for accessing the admin UI. Choose a strong value.  
- `SECRET_KEY`: Used internally for encryption. Generate a secure value and reuse it across all services.

```bash
openssl rand -base64 32
```

All three services must use the same values for these environment variables. Once deployed, you’ll have access to the Dittofeed UI and can begin integrating your app events, creating audiences, and building automation flows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio-cli | `minio/mc` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| blob-storage | `minio/minio:latest` | Database |
| temporal | `temporalio/auto-setup` | Web service |
| dittofeed-worker | `dittofeed/dittofeed-worker` | Worker |
| clickhouse-server | `clickhouse/clickhouse-server:24` | Database |
| dittofeed-lite | `dittofeed/dittofeed-lite` | Web service |
| dittofeed-admin-cli | `dittofeed/dittofeed-admin-cli` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MC_SECRET_KEY` | minio-cli | (secret) | - |
| `MINIO_ROOT_USER` | minio-cli | (secret) | - |
| `MINIO_ROOT_PASSWORD` | minio-cli | (secret) | - |
| `POSTGRES_DB` | postgres | railway | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `MINIO_ROOT_USER` | blob-storage | (secret) | - |
| `MINIO_PUBLIC_PORT` | blob-storage | 443 | - |
| `MINIO_PRIVATE_PORT` | blob-storage | 9000 | - |
| `MINIO_ROOT_PASSWORD` | blob-storage | (secret) | - |
| `DB` | temporal | postgres12_pgx | - |
| `POSTGRES_USER` | temporal | (secret) | - |
| `PORT` | dittofeed-worker | 3001 | - |
| `API_HOST` | dittofeed-worker | 0.0.0.0 | - |
| `NODE_ENV` | dittofeed-worker | production | - |
| `PASSWORD` | dittofeed-worker | (secret) | Same password as in dittofeed-lite (check instructions there) |
| `LOG_CONFIG` | dittofeed-worker | true | - |
| `SECRET_KEY` | dittofeed-worker | (secret) | Same secret key as in dittofeed-lite (check instructions there) |
| `WRITE_MODE` | dittofeed-worker | ch-async | - |
| `DATABASE_USER` | dittofeed-worker | (secret) | - |
| `WORKSPACE_NAME` | dittofeed-worker | Default | - |
| `CLICKHOUSE_USER` | dittofeed-worker | (secret) | - |
| `DATABASE_PASSWORD` | dittofeed-worker | (secret) | - |
| `BLOB_STORAGE_BUCKET` | dittofeed-worker | dittofeed | - |
| `BLOB_STORAGE_REGION` | dittofeed-worker | us-east-1 | - |
| `CLICKHOUSE_PASSWORD` | dittofeed-worker | (secret) | - |
| `ENABLE_BLOB_STORAGE` | dittofeed-worker | true | - |
| `BLOB_STORAGE_SECRET_ACCESS_KEY` | dittofeed-worker | (secret) | - |
| `PORT` | clickhouse-server | 8123 | - |
| `PUBLIC_PORT` | clickhouse-server | 443 | - |
| `CLICKHOUSE_DB` | clickhouse-server | dittofeed | - |
| `CLICKHOUSE_USER` | clickhouse-server | (secret) | - |
| `CLICKHOUSE_PASSWORD` | clickhouse-server | (secret) | - |
| `PORT` | dittofeed-lite | 3000 | - |
| `API_HOST` | dittofeed-lite | 0.0.0.0 | - |
| `HOSTNAME` | dittofeed-lite | 0.0.0.0 | - |
| `NODE_ENV` | dittofeed-lite | production | - |
| `PASSWORD` | dittofeed-lite | (secret) | Fill in a password for authenticating into Dittofeed UI |
| `AUTH_MODE` | dittofeed-lite | single-tenant | - |
| `BOOTSTRAP` | dittofeed-lite | false | - |
| `LOG_CONFIG` | dittofeed-lite | true | - |
| `SECRET_KEY` | dittofeed-lite | (secret) | Generate your secret key using bash command "openssl rand -base64 32" |
| `WRITE_MODE` | dittofeed-lite | ch-async | - |
| `DATABASE_USER` | dittofeed-lite | (secret) | - |
| `WORKSPACE_NAME` | dittofeed-lite | Default | - |
| `CLICKHOUSE_USER` | dittofeed-lite | (secret) | - |
| `BOOTSTRAP_EVENTS` | dittofeed-lite | false | - |
| `DATABASE_PASSWORD` | dittofeed-lite | (secret) | - |
| `BLOB_STORAGE_BUCKET` | dittofeed-lite | dittofeed | - |
| `BLOB_STORAGE_REGION` | dittofeed-lite | us-east-1 | - |
| `CLICKHOUSE_PASSWORD` | dittofeed-lite | (secret) | - |
| `ENABLE_BLOB_STORAGE` | dittofeed-lite | true | - |
| `SESSION_COOKIE_SECURE` | dittofeed-lite | true | - |
| `BLOB_STORAGE_SECRET_ACCESS_KEY` | dittofeed-lite | (secret) | - |
| `NODE_ENV` | dittofeed-admin-cli | production | - |
| `PASSWORD` | dittofeed-admin-cli | (secret) | Same password as in dittofeed-lite (check instructions there) |
| `AUTH_MODE` | dittofeed-admin-cli | single-tenant | - |
| `SECRET_KEY` | dittofeed-admin-cli | (secret) | Same secret key as in dittofeed-lite (check instructions there) |
| `DATABASE_USER` | dittofeed-admin-cli | (secret) | - |
| `WORKSPACE_NAME` | dittofeed-admin-cli | Default | - |
| `CLICKHOUSE_USER` | dittofeed-admin-cli | (secret) | - |
| `DATABASE_PASSWORD` | dittofeed-admin-cli | (secret) | - |
| `CLICKHOUSE_PASSWORD` | dittofeed-admin-cli | (secret) | - |

## Configuration

- **Start command:** `sh -c 'mc alias set minio "$MC_HOST_local" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" && (mc stat minio/dittofeed || mc mb minio/dittofeed) && tail -f /dev/null'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `node --max-old-space-size=824 ./packages/lite/dist/scripts/startLite.js --workspace-name="$WORKSPACE_NAME"`
- **Start command:** `sh -c 'BOOTSTRAP_WORKER=true BOOTSTRAP_EVENTS=true yarn admin bootstrap --workspace-name="$WORKSPACE_NAME" && echo "Admin bootstrap finished."'`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/dittofeed-1)
