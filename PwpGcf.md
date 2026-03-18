# Deploy Cap on Railway

The open source Loom alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/PwpGcf)

## About

## Cap Web

This template allows you to one-click deploy your own instance of Cap Web, for upload videos to via Cap Desktop.

When logging in, a magic link will be printed to the server container's Deploy Logs. To get this sent to you via email instead, you'll need to sign up for [Resend](https://resend.com), connect a domain, create an API key, then set that domain as the server container's `RESEND_FROM_DOMAIN` variable, and set `RESEND_API_KEY` to the generated API key. More auth and email options will be available in the future.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| MinIO | `minio/minio` | Database |
| Cap Web | `ghcr.io/capsoftware/cap-web:latest` | Web service |
| capsoftware/cap-media-server:latest | `ghcr.io/capsoftware/cap-media-server:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `MINIO_ROOT_USER` | MinIO | (secret) | - |
| `MINIO_PUBLIC_PORT` | MinIO | 443 | - |
| `MINIO_PRIVATE_PORT` | MinIO | 9000 | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |
| `DOCKER_BUILD` | Cap Web | true | - |
| `S3_PATH_STYLE` | Cap Web | true | - |
| `CAP_AWS_BUCKET` | Cap Web | capso | - |
| `CAP_AWS_REGION` | Cap Web | us-east-1 | - |
| `NEXTAUTH_SECRET` | Cap Web | (secret) | - |
| `CAP_AWS_SECRET_KEY` | Cap Web | (secret) | - |
| `PORT` | capsoftware/cap-media-server:latest | 3456 | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/PwpGcf)
