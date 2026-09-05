# Deploy Cloudreve on Railway

Self-hosted cloud drive for storing, previewing and sharing files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudreve-drive)

## About

Cloudreve is an open-source, self-hosted cloud storage and file sharing system written in Go with a React front end. It gives a team what a commercial drive gives them — a folder tree, drag-and-drop uploads, in-browser previews, expiring share links, WebDAV mounts, per-user groups and quotas — while the files stay on infrastructure you control. Storage is pluggable: one interface over local disk, any S3-compatible bucket, OneDrive, Aliyun OSS, Tencent COS, Qiniu Kodo or Huawei OBS.

Deploy Cloudreve on Railway and three services come up wired together. `cloudreve` is the application, built from `gridalpha/cloudreve-railway` on top of the official `cloudreve/cloudreve` release, and the only service with a public URL. `Postgres` holds the metadata — users, groups, folders, share links, storage policies and settings. `Redis` backs the key-value cache. A 5 GB volume at `/cloudreve/data` is where the default storage policy writes uploads, thumbnails and the generated `conf.ini`. Traffic reaches the container on port 5212; the databases stay private.

![Cloudreve, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788517159/cloudreve-architecture.png)

Cloudreve suits a team that wants Dropbox-shaped behaviour without a per-seat bill or an outside processor holding the data. It is one Go binary serving a compiled React app, so the operational surface is a single process plus a database. Teams self-host it when file custody matters — legal, medical, engineering archives — or when they already own object storage and want a usable interface over it.

Key features:

- Pluggable storage: local disk, any S3-compatible API, OneDrive, OSS, COS, Kodo, OBS, KS3, Upyun
- Direct client-to-storage transfers, so large uploads bypass the app server
- Resumable, chunked, parallel uploads of files or folders
- Share links with expiry dates, view limits and optional passwords
- WebDAV across every backend, mounting natively on macOS, Windows and Linux
- In-browser preview and editing for text, Markdown, images and Office files
- Archive extraction, batch download, metadata search, groups, quotas and permissions

Each concern sits in its own Railway service. `cloudreve` owns the HTTP surface and the volume. `Postgres` is the system of record — losing it loses the folder tree even if the bytes survive. `Redis` caches rather than stores.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cloudreve | [gridalpha/cloudreve-railway](https://github.com/gridalpha/cloudreve-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | cloudreve | 5212 | HTTP listening port |
| `CR_ADMIN_EMAIL` | cloudreve | admin@example.com | Administrator login, change after first sign-in |
| `CR_CONF_Redis.DB` | cloudreve | 0 | Redis database index |
| `CR_ADMIN_PASSWORD` | cloudreve | (secret) | Administrator password, change after first sign-in |
| `CR_BOOTSTRAP_PORT` | cloudreve | 5399 | Loopback port used during setup |
| `CR_SKIP_BOOTSTRAP` | cloudreve | 0 | Set 1 to skip first-run setup |
| `CR_CONF_Redis.Server` | cloudreve | - | Redis host and port |
| `CR_CONF_Database.Type` | cloudreve | postgres | Database driver |
| `CR_CONF_Redis.Password` | cloudreve | (secret) | Redis auth password |
| `CR_SETTING_DEFAULT_siteURL` | cloudreve | - | Public base URL, seeded first boot |
| `CR_CONF_Database.DatabaseURL` | cloudreve | - | Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v4/site/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cloudreve/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cloudreve-drive)
