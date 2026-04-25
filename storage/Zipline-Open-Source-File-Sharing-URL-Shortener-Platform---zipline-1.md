# Deploy Zipline (Open-Source File Sharing & URL Shortener Platform) on Railway

Zipline [May ’26] (Simple File Hosting & Link Shortening Tool) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zipline-1)

## About

Zipline is a free, open-source file-sharing and URL-shortening platform available on GitHub. It’s designed to make uploading, sharing, and managing files lightning-fast while keeping privacy and simplicity in mind. Whether you’re looking to share screenshots, documents, or short links, Zipline is your self-hosted alternative to tools like Bitly, Dropbox, and Google Drive - giving you complete control over your data.

Self-hosting Zipline means you maintain full control over your uploaded files, configurations, and short links, with zero third-party interference. With Zipline, you can host your own file-sharing and link-shortening service with complete ownership and flexibility. By deploying Zipline on Railway, you can take advantage of its managed infrastructure, ensuring fast performance, automated scaling, and minimal downtime - all while maintaining complete data sovereignty.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zipline | `diced/zipline:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CORE_PORT` | zipline | 3000 | - |
| `CORE_SECRET` | zipline | (secret) | - |
| `DATASOURCE_TYPE` | zipline | local | Change to S3 if using S3 |
| `DATASOURCE_LOCAL_DIRECTORY` | zipline | ./uploads | - |
| `DATASOURCE_S3_SECRET_ACCESS_KEY` | zipline | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/zipline-1)
