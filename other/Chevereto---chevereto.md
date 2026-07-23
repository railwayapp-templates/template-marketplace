# Deploy Chevereto on Railway

Self-hosted image & video sharing — your own Imgur with albums and users.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chevereto)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/chevereto?utm_medium=integration&utm_source=button&utm_campaign=chevereto)

[Chevereto](https://chevereto.com/) is a self-hosted image and video sharing platform — your own Imgur: drag-and-drop uploads, albums, tags, user accounts, moderation tools, and direct hotlink URLs, running on your own domain with your own rules. This template deploys the free open-source edition (Chevereto V4, AGPLv3).

This template runs Chevereto as two Railway services: the Chevereto app (PHP, listening on port 8080) and MySQL 8. Uploaded media persists on a volume mounted at `/var/www/html/images`; the database lives on its own volume. Upload limits are preconfigured to 2 GB per file. On first visit, Chevereto's built-in installer asks you to create the admin account — no CLI needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chevereto | [nomideusz/chevereto-railway](https://github.com/nomideusz/chevereto-railway) | Web service |
| mysql | `mysql:8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | chevereto | 8080 | Port for Railway healthcheck probing. Do not change. |
| `CHEVERETO_HTTPS` | chevereto | 1 | Keep 1 — Railway serves HTTPS. |
| `CHEVERETO_DB_HOST` | chevereto | - | Wired automatically to the mysql service. Don't change. |
| `CHEVERETO_DB_NAME` | chevereto | chevereto | Don't change. |
| `CHEVERETO_DB_PASS` | chevereto | - | Wired automatically to the mysql service. Don't change. |
| `CHEVERETO_DB_PORT` | chevereto | 3306 | Don't change. |
| `CHEVERETO_DB_USER` | chevereto | (secret) | Don't change. |
| `CHEVERETO_HOSTNAME` | chevereto | - | Public domain wired automatically. Don't change. |
| `CHEVERETO_MAX_POST_SIZE` | chevereto | 2G | Max upload request size. |
| `CHEVERETO_MAX_UPLOAD_FILE_SIZE` | chevereto | 2G | Max single file size. |
| `MYSQL_USER` | mysql | (secret) | Don't change. |
| `MYSQL_DATABASE` | mysql | chevereto | Don't change. |
| `MYSQL_PASSWORD` | mysql | (secret) | Database password. Auto generated. |
| `MYSQL_RANDOM_ROOT_PASSWORD` | mysql | (secret) | Don't change. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/images`
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/chevereto)
