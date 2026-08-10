# Deploy Lightdash BI on Railway

Self-hosted Lightdash BI with PostgreSQL and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightdash-bi)

## About

Run Lightdash 1.107.0 with private PostgreSQL and Railway object storage.

Lightdash is an open-source business intelligence application built around dbt semantic models. This Railway template runs the application, its metadata database, and S3-compatible result storage as one private graph.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lightdash PostgreSQL | `pgvector/pgvector:pg17@sha256:7ae6051efd0e60444282c27c7e141af07f322ce033300e727a49c3dd11075e38` | Database |
| Lightdash | `lightdash/lightdash:1.107.0@sha256:cc706d16ad1345676dbe3f19b6aa4e07dc4169ca419df13bebbb5cd20b2b14d4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Lightdash PostgreSQL | lightdash | - |
| `POSTGRES_USER` | Lightdash PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Lightdash PostgreSQL | (secret) | Generated password for Lightdash metadata. |
| `PORT` | Lightdash | 8080 | - |
| `S3_BUCKET` | Lightdash | - | Railway Bucket for query results and file assets. |
| `TRUST_PROXY` | Lightdash | true | - |
| `S3_SECRET_KEY` | Lightdash | (secret) | - |
| `SECURE_COOKIES` | Lightdash | true | - |
| `HEADWAY_ENABLED` | Lightdash | false | - |
| `LIGHTDASH_SECRET` | Lightdash | (secret) | Generated session and encryption secret. |
| `SCHEDULER_ENABLED` | Lightdash | false | - |
| `S3_FORCE_PATH_STYLE` | Lightdash | false | - |
| `LIGHTDASH_INSTALL_ID` | Lightdash | railway-template | - |
| `LIGHTDASH_INSTALL_TYPE` | Lightdash | docker_image | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/lightdash-bi)
