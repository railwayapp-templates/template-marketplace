# Deploy Interval on Railway

The simplest way to build internal tools without building UIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tFqAVW)

## About

# Build internal tools with just backend code

Interval generates full web apps just from backend Node.js code. If you love writing code but hate building UIs, you'll love building with Interval.

And all of your important data are keep secure in your own infrastructure.

Best of all, Interval is fully [open-source](https://github.com/interval/server), giving you complete transparency through code auditing.

# Getting started
See [getting started guide](https://interval.com/docs/getting-started) from Interval's docs.

# FAQ

## How much does it cost to run a Interval instance?
As Railway charges per usage it highly depends on your traffic, for me it costs about 5-7$ per month for about five users

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Interval Uploads Storage | `minio/minio:latest` | Database |
| Interval Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Interval | [ThallesP/interval-on-railway](https://github.com/ThallesP/interval-on-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | Interval Uploads Storage | (secret) | - |
| `MINIO_PUBLIC_PORT` | Interval Uploads Storage | 443 | - |
| `MINIO_PRIVATE_PORT` | Interval Uploads Storage | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Interval Uploads Storage | (secret) | - |
| `POSTGRES_DB` | Interval Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Interval Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Interval Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Interval Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Interval Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET` | Interval | (secret) | A secret that you must provide for use in encrypting passwords. Any string is valid for this value, but you should use something secure! |
| `APP_URL` | Interval | - | The URL where your Interval Server instance is running |
| `EMAIL_FROM` | Interval | - | From which email will be sent the emails. format: Some Name <some@domain.com> |
| `DATABASE_URL` | Interval | - | The Postgres connection string |
| `WSS_API_SECRET` | Interval | (secret) | A secret that you must provide. It is used internally by Interval Server for communication between Interval services. Any string is valid for this value, but you should use something secure! |
| `POSTMARK_API_KEY` | Interval | (secret) | Used for sending application emails. Create an account at postmarkapp.com |
| `AUTH_COOKIE_SECRET` | Interval | (secret) | A secret that you must provide for use in encrypting session cookies. Any string at least 32 characters in length is valid for this value, but you should use something secure! |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p $RAILWAY_VOLUME_MOUNT_PATH/interval-uploads && minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health-check/`

**Category:** Other · **Languages:** TypeScript, SCSS, JavaScript, CSS, Handlebars, Shell, HTML, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/tFqAVW)
