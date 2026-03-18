# Deploy Readeck on Railway

📚 A simple web application for read-it-later and bookmarking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/readeck)

## About

**Readeck** is a self-hosted “read later” and bookmarking application that saves the readable content of web pages you love.  

Think of it as your personal reading vault — collect, organize, and preserve articles, images, and videos in one elegant interface.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Readeck | `ghcr.io/yunanwg/readeck` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `READECK_LOG_LEVEL` | Readeck | info | Defines the application log level. Can be error, warn, info, debug |
| `READECK_LOG_FORMAT` | Readeck | text | Easier to read log format |
| `READECK_SERVER_HOST` | Readeck | 0.0.0.0 | The IP address on which Readeck listens |
| `READECK_SERVER_PORT` | Readeck | 8080 | - |
| `READECK_SERVER_PREFIX` | Readeck | / | Optional, the URL prefix of Readeck |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/readeck`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/readeck)
