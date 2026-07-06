# Deploy PocketBase S3 Backups - Railway Bucket on Railway

[Jul'26] PocketBase with Litestream backups to Railway Bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-s3-backups)

## About

PocketBase is a lightweight, open-source backend packed into a single Go binary. It includes a realtime database, built-in authentication, file storage, access rules, and an elegant admin UI. It exposes REST and realtime APIs, supports schema migrations and JavaScript hooks, and is suitable for shipping MVPs, internal tools, and small-to-medium applications quickly.

This Railway template deploys PocketBase with persistent storage and Litestream backups to Railway Bucket. You can deploy it in one click, let Railway provision the required resources, and start using PocketBase from your generated service URL.

![img](https://i.imgur.com/W0DL6tG.png)

Hosting PocketBase is simple: run the single binary in a container, expose the HTTP port, and persist the data directory.

This template is designed to:

* Run PocketBase inside a container
* Honor Railway’s provided `PORT`
* Store PocketBase data in persistent storage
* Use Litestream to back up the PocketBase database to Railway Bucket
* Start automatically after deployment

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
| `LITESTREAM_RESTORE_ON_START` | false |
| `LITESTREAM_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-s3-backups)
