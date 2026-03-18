# Deploy idn-area API on Railway

Indonesia administrative area API 🇮🇩 built with Nest.js + Prisma

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/idn-area-api)

## About

**idn-area** API provides information on the **administrative areas of Indonesia**, from the province, regency, district, to village levels. It also provides island data since [version 1.1.0](https://github.com/fityannugroho/idn-area/releases/tag/v1.1.0).

Built with NestJS framework and writen in TypeScript. Prisma is used as the ORM to interact with any kind of databases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| idn-area | [fityannugroho/idn-area](https://github.com/fityannugroho/idn-area) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | idn-area | 3000 | - |
| `APP_ENV` | idn-area | prod | - |
| `APP_HOST` | idn-area | 0.0.0.0 | - |
| `DB_PASSWORD` | idn-area | (secret) | - |
| `DB_PROVIDER` | idn-area | postgresql | - |
| `DB_USERNAME` | idn-area | (secret) | - |
| `APP_THROTTLE_TTL` | idn-area | 60 | - |
| `APP_THROTTLE_LIMIT` | idn-area | 10 | - |
| `APP_ENABLE_THROTTLE` | idn-area | true | - |
| `NPM_CONFIG_UPDATE_NOTIFIER` | idn-area | false | - |
| `APP_PAGINATION_MAX_PAGE_SIZE` | idn-area | 100 | - |
| `APP_PAGINATION_DEFAULT_PAGE_SIZE` | idn-area | 10 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/idn-area-api)
