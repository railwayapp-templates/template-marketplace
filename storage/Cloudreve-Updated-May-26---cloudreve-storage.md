# Deploy Cloudreve [Updated May '26] on Railway

Cloudreve [May '26] (Cloud Storage, File Sharing & WebDAV) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudreve-storage)

## About

Cloudreve is an open-source, self-hosted file management and sharing system built in Go with a React frontend. It supports multiple cloud storage backends including local storage, S3-compatible APIs, OneDrive, Aliyun OSS, Tencent COS, and more — giving you a personal cloud drive with multi-user management, WebDAV access, and online file preview. Cloudreve is a self-hosted alternative to Google Drive, Dropbox, and Nextcloud.

Self hosting Cloudreve means your files, user data, and sharing configurations stay entirely on infrastructure you control. There is no dependency on cloud storage providers that may impose storage limits, privacy concerns, or subscription fees. With Railway, all infrastructure is handled automatically — PostgreSQL provisioning, Redis caching, persistent volumes for file storage, and networking run on each deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cloudreve | [Shinyduo/cloudreve-railway](https://github.com/Shinyduo/cloudreve-railway) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | cloudreve | 5212 | - |
| `AWS_SECRET_ACCESS_KEY` | cloudreve | (secret) | - |
| `CR_CONF_Database.Name` | cloudreve | railway | - |
| `CR_CONF_Database.Port` | cloudreve | 5432 | - |
| `CR_CONF_Database.Type` | cloudreve | postgres | - |
| `CR_CONF_Redis.Password` | cloudreve | (secret) | - |
| `CR_CONF_Database.Password` | cloudreve | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cloudreve/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/cloudreve-storage)
