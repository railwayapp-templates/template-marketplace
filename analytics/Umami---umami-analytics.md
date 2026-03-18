# Deploy Umami on Railway

An open source, privacy-focused alternative to Google Analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-analytics)

## About

Umami is a simple, fast, privacy-focused alternative to Google Analytics. It's an open-source web analytics platform that provides essential website metrics without compromising user privacy, tracking users across websites, or collecting personal data. Umami focuses on delivering clean, straightforward analytics while respecting visitor privacy and complying with GDPR, CCPA, and other privacy regulations.

Hosting Umami gives you access to a complete web analytics solution that tracks website visitors, page views, user behavior, and performance metrics without invasive tracking. Umami offers real-time analytics, custom event tracking, multiple website support, and detailed insights into user interactions. The platform excels at providing essential analytics data while maintaining user privacy, requiring no cookie banners, and storing data securely on your own infrastructure. Umami deployments benefit from Railway's SSL certificates and scalable hosting infrastructure for handling high-traffic websites. Railway provides database backup capabilities and monitoring tools to ensure your analytics data remains secure and accessible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | `umamisoftware/umami:postgresql-latest` | Database |
| Valkey | `valkey/valkey:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOSTNAME` | umami | :: | Listen on IPv6 |
| `HOST_URL` | umami | - | Host URL for umami |
| `HASH_SALT` | umami | - | A random string used to generate unique values. |
| `REDIS_URL` | umami | - | Umami supports a caching layer for improved performance. For example, when you send a request to the server, a website lookup must be done. The result can be cached in Redis for faster lookups in the future. |
| `APP_SECRET` | umami | (secret) | A random string used to generate unique values. |
| `DATABASE_URL` | umami | - | Private Postgres URL |
| `DATABASE_TYPE` | umami | postgres | The database type used with this template. |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami | 1 | Disable Prisma Client advisory lock. |
| `VALKEY_URL` | Valkey | - | Private database URL |
| `VALKEY_HOST` | Valkey | - | Private hostname |
| `VALKEY_PORT` | Valkey | 6379 | Private port |
| `VALKEY_USER` | Valkey | (secret) | Default username |
| `VALKEY_PASSWORD` | Valkey | (secret) | Authentication password |
| `VALKEY_PUBLIC_URL` | Valkey | - | Public database URL |
| `VALKEY_PUBLIC_HOST` | Valkey | - | Public hostname |
| `VALKEY_PUBLIC_PORT` | Valkey | - | Public port |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-analytics)
