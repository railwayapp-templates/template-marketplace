# Deploy pgMaps on Railway

Manage maps and GIS data in PostgreSQL databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgmaps)

## About

Open-source tool for managing maps and geospatial data in PostGIS-enabled PostgreSQL databases

It is required that your set three environment variables:
POSTGRES_URL:	Your PostgreSQL connection string. By default, the app will create up to four tables in the public schema (_pgmaps_basemaps, _pgmaps_connections, _pgmaps_folders, _pgmaps_maps) to store its own data.

APP_PASSWORD:	Password protecting the app. Without it, anyone with the URL could obtain read/write access to your PostgreSQL database.

DSN_ENCRYPTION_KEY:	32-byte hex key used to encrypt saved connection strings at rest. Generate with openssl rand -hex 32.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg-maps | `nogurtmon1/pg-maps:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Port the app listens on. |
| `APP_PASSWORD` | (secret) | Password protecting the app. Without it, anyone with the URL could obtain read/write access to your PostgreSQL database. |
| `POSTGRES_URL` | - | Your PostgreSQL connection string. By default, the app will create up to four tables in the public schema (_pgmaps_basemaps, _pgmaps_connections, _pgmaps_folders, _pgmaps_maps) to store its own data. |
| `DSN_ENCRYPTION_KEY` | - | 32-byte hex key used to encrypt saved connection strings. Generate with openssl rand -hex 32. |

**Category:** Other

[View on Railway →](https://railway.com/deploy/pgmaps)
