# Deploy AzuraCast on Railway

Self-hosted web radio: Icecast streams, playlists, live DJ, analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/azuracast)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/azuracast?utm_medium=integration&utm_source=button&utm_campaign=azuracast)

[AzuraCast](https://www.azuracast.com/) is a self-hosted, all-in-one web radio management suite: stream with Icecast, automate playlists with Liquidsoap, broadcast live from your browser with WebDJ, and track listener analytics — all from one dashboard.

AzuraCast normally expects a full Docker Compose stack with ~10 named volumes. This template adapts the official all-in-one image to Railway as a single service: a small init script relocates all persistent data (database, station media, uploads, backups) onto one Railway volume mounted at `/data`, the embedded MariaDB root password is auto-generated, and TLS is terminated by Railway's edge. First boot initializes the database and takes about a minute; after that you land on AzuraCast's setup wizard to create your admin account and first station.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| azuracast | [nomideusz/azuracast-railway](https://github.com/nomideusz/azuracast-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port AzuraCast listens on. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for the embedded MariaDB. Auto-generated — no need to change it. |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/azuracast)
