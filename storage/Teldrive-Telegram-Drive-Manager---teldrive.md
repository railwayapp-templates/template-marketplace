# Deploy Teldrive — Telegram Drive Manager on Railway

A self-hosted Telegram-powered cloud storage and file manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teldrive)

## About

Teldrive is a self-hosted cloud storage and file management platform powered by Telegram. It allows you to store, organize, upload, download, and manage files using Telegram as the underlying storage layer while providing a dedicated web interface and API.

This template deploys Teldrive on Railway using the official Teldrive container image together with Railway PostgreSQL.

Teldrive runs as a public HTTP service while PostgreSQL remains accessible only through Railway's private networking. PostgreSQL stores application data and metadata required by Teldrive.

To connect Teldrive to Telegram, you must provide your own Telegram API credentials generated from `my.telegram.org`.

The template intentionally keeps the deployment lightweight and does not include Redis or additional storage services unless they are required for a specific workload.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Teldrive | `ghcr.io/tgdrive/teldrive:1.8.3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TELDRIVE_TG_APP_ID` | Teldrive | - | Telegram API application ID from my.telegram.org |
| `TELDRIVE_JWT_SECRET` | Teldrive | (secret) | Secret used to sign authentication tokens |
| `TELDRIVE_SERVER_PORT` | Teldrive | 8080 | HTTP listening port |
| `TELDRIVE_TG_APP_HASH` | Teldrive | - | Telegram API application hash from my.telegram.org |
| `TELDRIVE_DB_DATA_SOURCE` | Teldrive | - | PostgreSQL database connection URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/teldrive)
