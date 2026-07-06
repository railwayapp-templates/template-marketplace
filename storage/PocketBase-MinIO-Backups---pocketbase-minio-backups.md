# Deploy PocketBase MinIO Backups on Railway

[Jul'26] PocketBase with Litestream backups to self-hosted MinIO.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-minio-backups)

## About

PocketBase is a lightweight, open-source backend with a realtime database, authentication, file storage, access rules, REST API, realtime API, and admin dashboard.

This Railway template deploys **PocketBase with Litestream backups to MinIO**.

It includes four services:

* **PocketBase** — the backend application
* **Bucket** — the MinIO S3-compatible storage service
* **MinIO Console** — the web UI for inspecting buckets and backups
* **Bucket Init** — a helper service that creates the default backup bucket automatically

The goal is simple: run PocketBase quickly, keep its live data persistent, and replicate the PocketBase database to MinIO using Litestream.

This template hosts PocketBase together with a self-hosted S3-compatible backup target.

PocketBase stores the live app data in a persistent volume. Litestream runs inside the PocketBase service and watches the PocketBase database file. MinIO stores the replicated backup objects. MinIO Console gives you a browser-based dashboard to check whether the backup bucket and objects exist. Bucket Init prepares the default bucket so Litestream can start writing backups without manual setup.

The services work together like this:

```txt
PocketBase
├─ Runs the backend app
├─ Stores live data in /data
└─ Runs Litestream

Litestream
├─ Watches /data/data.db
└─ Replicates the database to MinIO

Bucket
├─ Runs MinIO S3-compatible API
└─ Stores backup objects

Bucket Init
├─ Waits until MinIO is ready
└─ Creates the default backup bucket

MinIO Console
├─ Provides the web dashboard
└─ Lets you inspect buckets and backup objects
```

Backup flow:

```txt
PocketBase /data/data.db
      ↓
Litestream
      ↓
MinIO Bucket
      ↓
pocketbase/data.db
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Init | `minio/mc` | Database |
| Pocketbase | [codestorm-official/pocketbase-s3-backups](https://github.com/codestorm-official/pocketbase-s3-backups) | Web service |
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Database |
| MinIO Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MINIO_BUCKET` | Init | pocketbase-backups |
| `MINIO_ROOT_USER` | Init | (secret) |
| `MINIO_ROOT_PASSWORD` | Init | (secret) |
| `PORT` | Pocketbase | 8080 |
| `DATA_DIR` | Pocketbase | /data |
| `PB_VERSION` | Pocketbase | 0.39.4 |
| `LITESTREAM_REGION` | Pocketbase | us-east-1 |
| `LITESTREAM_DB_PATH` | Pocketbase | /data/data.db |
| `LITESTREAM_ENABLED` | Pocketbase | true |
| `LITESTREAM_REPLICA_PATH` | Pocketbase | pocketbase/data.db |
| `LITESTREAM_WAIT_FOR_BUCKET` | Pocketbase | true |
| `LITESTREAM_FORCE_PATH_STYLE` | Pocketbase | true |
| `LITESTREAM_RESTORE_ON_START` | Pocketbase | false |
| `LITESTREAM_SECRET_ACCESS_KEY` | Pocketbase | (secret) |
| `MINIO_ROOT_USER` | Bucket | (secret) |
| `MINIO_PUBLIC_PORT` | Bucket | 443 |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 |
| `MINIO_STS_DURATION` | Bucket | 1h |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) |
| `PORT` | MinIO Console | 9090 |
| `PASSWORD` | MinIO Console | (secret) |
| `USERNAME` | MinIO Console | (secret) |

## Configuration

- **Start command:** `sh -c "echo Waiting for MinIO endpoint: $MINIO_ENDPOINT; until mc alias set local $MINIO_ENDPOINT $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD; do echo MinIO alias not ready yet...; sleep 3; done; until mc admin info local >/dev/null 2>&1; do echo MinIO server not ready yet...; sleep 3; done; until mc mb --ignore-existing local/$MINIO_BUCKET; do echo Bucket create failed, retrying...; sleep 3; done; echo Bucket ready: $MINIO_BUCKET; tail -f /dev/null"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-minio-backups)
