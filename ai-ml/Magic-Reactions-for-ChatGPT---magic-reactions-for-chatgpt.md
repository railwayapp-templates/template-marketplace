# Deploy Magic Reactions for ChatGPT on Railway

Private GIF and sticker reactions for ChatGPT, with OAuth and storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magic-reactions-for-chatgpt)

## About

Magic Reactions is a private ChatGPT app for saving, finding, and sending personal GIF and sticker reactions. It includes owner-only OAuth, a mobile-safe direct reaction tool, GIPHY fallback, and an admin panel for the private collection.

The template deploys one Node.js web service, Railway PostgreSQL for metadata and OAuth records, and one private Railway Bucket for image files. Storage links are short-lived and signed. Each deployment receives unique owner and OAuth secrets; the installer supplies only a GIPHY API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres Live | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Magic Reactions | [lauramarmun-prog/magic-reactions-chatgpt-template](https://github.com/lauramarmun-prog/magic-reactions-chatgpt-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres Live | railway | Database created when PostgreSQL initializes. |
| `DATABASE_URL` | Postgres Live | - | Complete private PostgreSQL connection string for application services. |
| `POSTGRES_USER` | Postgres Live | (secret) | PostgreSQL administrator username created at initialization. |
| `POSTGRES_PASSWORD` | Postgres Live | (secret) | Auto-generated PostgreSQL administrator password. |
| `PORT` | Magic Reactions | 8787 | Internal HTTP port used by the Node.js service. |
| `BUCKET` | Magic Reactions | - | Railway Bucket name used to store uploaded reaction images. |
| `REGION` | Magic Reactions | - | Railway Bucket region used by the S3-compatible client. |
| `ENDPOINT` | Magic Reactions | - | S3-compatible endpoint supplied by the Railway Bucket. |
| `NODE_ENV` | Magic Reactions | production | Runs the application with production defaults. |
| `OWNER_CODE` | Magic Reactions | - | Auto-generated private code used during owner OAuth authorization. |
| `DATABASE_URL` | Magic Reactions | - | PostgreSQL connection string supplied by Postgres Live. |
| `ACCESS_KEY_ID` | Magic Reactions | - | Access key supplied by the Railway Bucket. |
| `GIPHY_API_KEY` | Magic Reactions | (secret) | Your GIPHY developer API key for GIF and sticker search. |
| `STORAGE_DRIVER` | Magic Reactions | s3 | Selects the S3-compatible Railway Bucket storage adapter. |
| `DATABASE_DRIVER` | Magic Reactions | postgres | Selects the PostgreSQL database adapter. |
| `PUBLIC_BASE_URL` | Magic Reactions | - | Public HTTPS origin generated for the Magic Reactions service. |
| `SECRET_ACCESS_KEY` | Magic Reactions | (secret) | Secret access key supplied by the Railway Bucket. |
| `S3_FORCE_PATH_STYLE` | Magic Reactions | false | Uses virtual-hosted S3 requests for Railway Buckets. |
| `OAUTH_SIGNING_SECRET` | Magic Reactions | (secret) | Auto-generated secret used to sign OAuth access and refresh tokens. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/magic-reactions-for-chatgpt)
