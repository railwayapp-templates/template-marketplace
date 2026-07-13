# Deploy Zipline (Open-Source File Sharing & URL Shortener Platform) on Railway

Zipline [Jul ’26] (Simple File Hosting & Link Shortening Tool) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zipline-1)

## About

Zipline is a free, open-source file-sharing and URL-shortening platform available on GitHub. It’s designed to make uploading, sharing, and managing files lightning-fast while keeping privacy and simplicity in mind. Whether you’re looking to share screenshots, documents, or short links, Zipline is your self-hosted alternative to tools like Bitly, Dropbox, and Google Drive - giving you complete control over your data.

Self-hosting Zipline means you maintain full control over your uploaded files, configurations, and short links, with zero third-party interference. With Zipline, you can host your own file-sharing and link-shortening service with complete ownership and flexibility. By deploying Zipline on Railway, you can take advantage of its managed infrastructure, ensuring fast performance, automated scaling, and minimal downtime - all while maintaining complete data sovereignty.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zipline | `diced/zipline:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CORE_PORT` | zipline | 3000 | - |
| `CORE_SECRET` | zipline | (secret) | - |
| `DATASOURCE_TYPE` | zipline | local | Change to S3 if using S3 |
| `DATASOURCE_LOCAL_DIRECTORY` | zipline | ./uploads | - |
| `DATASOURCE_S3_SECRET_ACCESS_KEY` | zipline | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/zipline-1)
