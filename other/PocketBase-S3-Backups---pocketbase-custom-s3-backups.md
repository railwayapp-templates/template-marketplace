# Deploy PocketBase S3 Backups on Railway

[Jun'26] PocketBase with Litestream backups to your own S3 bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-custom-s3-backups)

## About

PocketBase is a lightweight, open-source backend packed into a single Go binary. It includes a realtime database, built-in authentication, file storage, access rules, and an elegant admin UI. It exposes REST and realtime APIs, supports schema migrations and JavaScript hooks, and is suitable for shipping MVPs, internal tools, and small-to-medium applications quickly.

This Railway template deploys PocketBase with persistent storage and optional Litestream backups to your own S3-compatible bucket. You can deploy it in one click, run PocketBase immediately, and add your S3-compatible backup configuration before or after deployment.

Hosting PocketBase is simple: run the single binary in a container, expose the HTTP port, and persist the data directory.

This template is designed to:

* Run PocketBase inside a container
* Honor Railway’s provided `PORT`
* Store PocketBase data in persistent storage
* Optionally use Litestream to back up the PocketBase database to S3-compatible storage
* Start PocketBase even when S3 backup variables are not configured yet

After the first successful deploy, open your Railway-generated domain and visit:

```txt
https://your-app.up.railway.app/_/
```

Use this page to create your PocketBase superuser account.

If you see a login screen instead of the registration page, check the Railway deployment logs. PocketBase may print a one-time installer or setup link during first initialization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocketbase | [codestorm-official/pocketbase-s3-backups](https://github.com/codestorm-official/pocketbase-s3-backups) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `DATA_DIR` | /data |
| `PB_VERSION` | 0.39.4 |
| `LITESTREAM_DB_PATH` | /data/data.db |
| `LITESTREAM_ENABLED` | true |
| `LITESTREAM_REPLICA_PATH` | pocketbase/data.db |
| `LITESTREAM_FORCE_PATH_STYLE` | true |
| `LITESTREAM_RESTORE_ON_START` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-custom-s3-backups)
