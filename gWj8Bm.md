# Deploy Nitropage with Postgres on Railway

A self-hosted visual website builder and CMS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gWj8Bm)

## About

Nitropage is an entirely free and open source, extensible visual website builder based on SolidStart, offering a growing library of versatile building blocks.

Features:

- Page revisions
- Element presets
- Reusable layouts
- Focal point image cropping
- Self and CDN hosted fonts
- Atom (RSS) feeds
- Support for multiple projects

Learn more at:<br>
https://nitropage.org

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nitropage | `nitropage/nitropage` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NP_AUTH_PASSWORD` | Nitropage | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/admin`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/gWj8Bm)
