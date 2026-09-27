# Deploy Interval on Railway

Self-hosted Interval Server for internal tools, with PostgreSQL and MinIO

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tFqAVW)

## About

Interval is a way to build internal tools from backend code alone: you write actions with the Node or Python SDK, and Interval Server renders the forms, tables and approval flows for your team, no frontend to build. Interval was acquired by Meter in 2023 and its server was released as open source under the MIT license. This template runs that server on Railway with PostgreSQL and a MinIO service for file uploads.

Interval Server is a Node.js application that needs a PostgreSQL database. The template builds it from a repository that adds a Dockerfile to the upstream server, serves it on a public domain with a health check on `/health-check/`, and generates the three secrets the server requires: `SECRET` for password encryption, `WSS_API_SECRET` for communication between Interval's own services, and `AUTH_COOKIE_SECRET` for session cookies. `APP_URL` is set to the public domain and `DATABASE_URL` references the **Interval Postgres** service over the private network.

Email is optional and goes through Postmark: leave `POSTMARK_API_KEY` empty and Interval simply does not send invitations or notifications. The **Interval Uploads Storage** service is a MinIO instance on a volume; connect it to Interval by setting the `S3_*` variables described in the README when you start using file inputs.

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
