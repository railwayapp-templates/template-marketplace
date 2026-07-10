# Deploy MediaCMS on Railway

Self-hosted video platform: uploads, transcoding, HLS, playlists, users.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mediacms)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/mediacms?utm_medium=integration&utm_source=button&utm_campaign=mediacms)

[MediaCMS](https://mediacms.io/) is a modern, open-source video and media platform: upload videos, transcode them automatically to multiple resolutions with HLS adaptive streaming, organize with playlists, categories and tags, and manage users — a self-hosted alternative to hosted video platforms, built on Django and React.

This template runs MediaCMS as three Railway services: the main all-in-one container (web UI, API, nginx, and the celery transcoding workers sharing one volume for media files — no shared-storage juggling), PostgreSQL, and Redis as the task broker. On first boot it runs database migrations and creates your admin account from the `ADMIN_PASSWORD` variable (username `admin`). Videos transcode on CPU via ffmpeg with progressive MP4 and HLS output. Media files persist on the attached volume; scale the volume with your library.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mediacms | [nomideusz/mediacms-railway](https://github.com/nomideusz/mediacms-railway) (root: /mediacms) | Web service |
| postgres | [nomideusz/mediacms-railway](https://github.com/nomideusz/mediacms-railway) (root: /postgres) | Database |
| redis | `redis:alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY` | mediacms | (secret) | Default secret key. Auto generated. |
| `FRONTEND_HOST` | mediacms | - | Public domain wired automatically. Don't change. |
| `POSTGRES_HOST` | mediacms | - |  Wired automatically to the postgresql service. Don't change. |
| `ADMIN_PASSWORD` | mediacms | (secret) | Use this password to sign in. |
| `REDIS_LOCATION` | mediacms | - | Wired automatically to the redis service. Don't change. |
| `POSTGRES_PASSWORD` | mediacms | (secret) |  Wired automatically to the postgresql service. Don't change. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Default Postgres password. Auto generated. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/mediacms.io/mediacms/media_files`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `redis-server --save "" --appendonly no`
- **Volume:** `/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mediacms)
