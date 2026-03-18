# Deploy Raytha CMS on Railway

A lightweight and powerful self hosted CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/raytha-cms)

## About

Raytha is a lightweight, fast, and self-hosted CMS for people who like to spin up sites quickly. Create pages, posts, and custom content without fuss. Tweak templates within the platform and publish instantly. It’s simple, flexible, and easy to host anywhere, perfect for blogs, small to medium sites, and anyone who likes to tinker and build.

Hosting Raytha CMS is straightforward. Run a single Docker container, connect it to a PostgreSQL database, and attach a volume for file uploads. If you want password reset emails, add your SMTP credentials. That’s it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| raythahq/raytha | `raythahq/raytha` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_HOST` | raythahq/raytha | - | SMTP email for password reset, magic link etc. |
| `SMTP_PORT` | raythahq/raytha | - | SMTP email for password reset, magic link etc. |
| `SMTP_PASSWORD` | raythahq/raytha | (secret) | SMTP email for password reset, magic link etc. |
| `SMTP_USERNAME` | raythahq/raytha | (secret) | SMTP email for password reset, magic link etc. |
| `SMTP_FROM_NAME` | raythahq/raytha | - | SMTP email,  optional, if you want to always use this value regardless of what is specified in org settings. |
| `SMTP_FROM_ADDRESS` | raythahq/raytha | - | SMTP email, optional, if you want to always use this value regardless of what is specified in org settings. |
| `FILE_STORAGE_PROVIDER` | raythahq/raytha | Local | Valid options are: Local, AzureBlob, S3 |
| `APPLY_PENDING_MIGRATIONS` | raythahq/raytha | true | Update the database automatically when deploying |
| `FILE_STORAGE_MAX_FILE_SIZE` | raythahq/raytha | 100000000 | In Bytes, 100 mb default |
| `FILE_STORAGE_LOCAL_DIRECTORY` | raythahq/raytha | /data/user-uploads | Location in the attached volume to store the file uploads |
| `FILE_STORAGE_ALLOWED_MIMETYPES` | raythahq/raytha | text/*,image/*,video/*,audio/*,application/pdf | Allowed file types via comma separated mime types. Can use wildcard like image/*,video/* |
| `ConnectionStrings__DefaultConnection` | raythahq/raytha | - | Postgres connection |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/raytha-cms)
