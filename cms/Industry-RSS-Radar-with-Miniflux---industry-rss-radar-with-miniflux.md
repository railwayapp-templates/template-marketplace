# Deploy Industry RSS Radar with Miniflux on Railway

Private RSS research radar with Postgres, admin login and feed cleanup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/industry-rss-radar-with-miniflux)

## About

Private RSS research radar with Postgres, admin login and feed cleanup.

Analysts and founders following niche vendors, standards and publications.

Sign in as operator with ADMIN_PASSWORD from Railway variables. Import an OPML list, create categories for competitors and industry topics, then configure per-feed filters and saved searches in your research workflow.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | None; container state is disposable | HTTPS domain |
| Postgres | /var/lib/postgresql/data | Private network only |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres@sha256:b0f9560a2de083e2cc7382e75f808c7381a32852a7ec49117deedb300e552b24` | Database |
| App | `miniflux/miniflux@sha256:49d7b60987616387c306a8023087b31f2c9b7b21288b523026cb04058e8b6dbb` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | app |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `TZ` | App | Etc/UTC |
| `PORT` | App | 8080 |
| `LISTEN_ADDR` | App | 0.0.0.0:8080 |
| `CREATE_ADMIN` | App | 1 |
| `ADMIN_PASSWORD` | App | (secret) |
| `ADMIN_USERNAME` | App | (secret) |
| `RUN_MIGRATIONS` | App | 1 |
| `CLEANUP_ARCHIVE_READ_DAYS` | App | 90 |
| `CLEANUP_ARCHIVE_UNREAD_DAYS` | App | 180 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/industry-rss-radar-with-miniflux)
