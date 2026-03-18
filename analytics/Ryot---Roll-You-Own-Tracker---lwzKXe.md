# Deploy Ryot - Roll You Own Tracker! on Railway

Track all facets of your life!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lwzKXe)

## About

Imagine you have a special notebook where you can write down all the media you have
consumed, like books you've read, shows you have watched, video games you have played or
workouts you have done. Now, imagine that instead of a physical notebook, you have a
special tool on your computer or phone that lets you keep track of all these digitally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| App | `ghcr.io/ignisda/ryot` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | App | Europe/Amsterdam | - |
| `SERVER_ADMIN_ACCESS_TOKEN` | App | (secret) | This can be used for admin access to your server. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/lwzKXe)
