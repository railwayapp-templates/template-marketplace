# Deploy PhotoPrism [Updated May ’26] on Railway

PhotoPrism [May ’26] (Google Photos alternative & RAW support) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/photoprism)

## About

PhotoPrism is a free, open-source photo management application designed to help you organize, browse, and share your photo collections privately. Built with modern technologies, it automatically indexes your images using AI, detects duplicates, and provides powerful search features. Available on the [PhotoPrism GitHub repository](https://github.com/photoprism/photoprism), it’s an open-source alternative to Google Photos, allowing you to host your images on your own server without compromising privacy.

You can self-host PhotoPrism using **Docker** or **Docker Compose** to keep all your photos, metadata, and configurations fully under your control. Unlike third-party services, PhotoPrism ensures that your library stays private and independent of corporate servers. Hosting it on **Railway** streamlines deployment, offering a hassle-free setup with managed Postgres or MariaDB support and persistent storage. In minutes, you can have your **PhotoPrism site** running with a modern web interface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| photoprism/photoprism | `photoprism/photoprism` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | photoprism/photoprism | 2342 | - |
| `PHOTOPRISM_STORAGE_PATH` | photoprism/photoprism | /data/images | - |
| `PHOTOPRISM_DATABASE_USER` | photoprism/photoprism | (secret) | - |
| `PHOTOPRISM_ADMIN_PASSWORD` | photoprism/photoprism | (secret) | Enter some Password which will be used to log you in |
| `PHOTOPRISM_ORIGINALS_PATH` | photoprism/photoprism | /data/originals | - |
| `PHOTOPRISM_DATABASE_DRIVER` | photoprism/photoprism | postgres | - |
| `PHOTOPRISM_DATABASE_PASSWORD` | photoprism/photoprism | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/photoprism)
