# Deploy Directus with S3, Postgres, Redis, and Auto Backups on Railway

Deploy Directus CMS with Postgres, Redis, and Auto Backups in one click!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/directus-with-postgres-redis-and-auto-ba)

## About

A one-click Railway deployment that gives you everything you need to run Directus CMS in production — including PostgreSQL for data storage, Redis for caching, and automated backups to S3-compatible storage for database and storage.

Directus enables you to design and build a REST + GraphQL API in minutes and enables anyone to author content, manage media, and visualize data. Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default. This is done so that there are no egress fees for the database. If you want to enable access from outside of the private network you can go to the databases settings page to enable TCP proxying and enter the internal port 5432. The TCP proxy can be again removed at any point to close off external access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis-3fkr | `redis:8.2.1` | Database |
| Directus | `directus/directus` | Web service |
| S3 Storage Backup | [elianrichard/rclone-s3-backups](https://github.com/elianrichard/rclone-s3-backups) | Worker |
| Postgres Backup | [railwayapp-templates/postgres-s3-backups](https://github.com/railwayapp-templates/postgres-s3-backups) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis-3fkr | 6379 | - |
| `REDISUSER` | Redis-3fkr | default | - |
| `REDIS_URL` | Redis-3fkr | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis-3fkr | (secret) | - |
| `REDIS_PASSWORD` | Redis-3fkr | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis-3fkr | - | Connection string for connecting to redis externally |
| `SECRET` | Directus | (secret) | Secret for Directus App, will be auto generated if empty. |
| `DB_USER` | Directus | (secret) | - |
| `CACHE_TTL` | Directus | 6 hrs | - |
| `DB_CLIENT` | Directus | postgres | - |
| `PUBLIC_URL` | Directus | - | Directus Public URL access, can be filled later |
| `ADMIN_EMAIL` | Directus | - | Initial admin email login |
| `CORS_ORIGIN` | Directus | true | - |
| `DB_PASSWORD` | Directus | (secret) | - |
| `CORS_ENABLED` | Directus | true | - |
| `REDIS_FAMILY` | Directus | 6 | - |
| `CACHE_ENABLED` | Directus | true | - |
| `REDIS_ENABLED` | Directus | true | - |
| `ADMIN_PASSWORD` | Directus | (secret) | Initial admin password |
| `REDIS_PASSWORD` | Directus | (secret) | - |
| `REDIS_USERNAME` | Directus | (secret) | - |
| `CACHE_AUTO_PURGE` | Directus | true | - |
| `STORAGE_LOCATIONS` | Directus | s3 | - |
| `STORAGE_S3_DRIVER` | Directus | s3 | - |
| `STORAGE_S3_SECRET` | Directus | (secret) | - |
| `RUN_ON_STARTUP` | S3 Storage Backup | - | Run a backup on startup of this application |
| `SINGLE_SHOT_MODE` | S3 Storage Backup | - | Set to true if you want to handle CRON directly from Railway |
| `ORIGIN_S3_ENDPOINT` | S3 Storage Backup | - | Make sure to include protocol https:// |
| `ORIGIN_S3_PROVIDER` | S3 Storage Backup | - | The S3 origin provider you want to use. Supported providers: https://rclone.org/#providers |
| `BACKUP_CRON_SCHEDULE` | S3 Storage Backup | - | The cron schedule to run the backup on. This only works if Single Shot Mode is not enabled. |
| `DESTINATION_S3_REGION` | S3 Storage Backup | auto | - |
| `ADDITIONAL_RCLONE_FLAGS` | S3 Storage Backup | - | Additional flags to pass to rclone. Example: '--transfers 4 --checkers 8'. Read more https://rclone.org/commands |
| `DESTINATION_S3_PROVIDER` | S3 Storage Backup | - | The S3 destination provider you want to use. Supported providers: https://rclone.org/#providers |
| `ORIGIN_S3_SECRET_ACCESS_KEY` | S3 Storage Backup | (secret) | - |
| `DESTINATION_S3_SECRET_ACCESS_KEY` | S3 Storage Backup | (secret) | - |
| `AWS_S3_ENDPOINT` | Postgres Backup | - | Make sure to include protocol https:// |
| `BUCKET_SUBFOLDER` | Postgres Backup | db_backup | - |
| `AWS_SECRET_ACCESS_KEY` | Postgres Backup | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Postgres Backup | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/template/directus-with-postgres-redis-and-auto-ba)
