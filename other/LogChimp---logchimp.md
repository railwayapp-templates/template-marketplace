# Deploy LogChimp on Railway

Build better products with customer feedback

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logchimp)

## About

LogChimp is a software tool that complements your existing product management process by assisting every stakeholder in
understanding customer demands, prioritizing features, and rallying everyone around the roadmap.

You can purchase the license key to unlock enterprise features at [pilot.logchimp.app](https://pilot.logchimp.app)

LogChimp Theme is the UI of LogChimp, where your business customer can share their feedback. This template
automatically provisions LogChimp Theme and LogChimp APIs, along with PostgreSQL for data storage and
Valkey for caching on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DB Migrator | `ghcr.io/logchimp/logchimp/api:latest` | Worker |
| LogChimp API | `ghcr.io/logchimp/logchimp/api:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| LogChimp Theme | `ghcr.io/logchimp/logchimp/theme:latest` | Web service |
| Valkey | `ghcr.io/valkey-io/valkey:8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | DB Migrator | production | - |
| `LOGCHIMP_DB_SSL` | DB Migrator | false | - |
| `LOGCHIMP_DB_USER` | DB Migrator | (secret) | - |
| `LOGCHIMP_DB_PASSWORD` | DB Migrator | (secret) | - |
| `PORT` | LogChimp API | 8000 | - |
| `NODE_ENV` | LogChimp API | production | - |
| `LOGCHIMP_DB_SSL` | LogChimp API | false | - |
| `LOGCHIMP_DB_PORT` | LogChimp API | 5432 | - |
| `LOGCHIMP_DB_USER` | LogChimp API | (secret) | - |
| `LOGCHIMP_WEB_URL` | LogChimp API | - | The complete base URL for the web application including protocol. Essential for email links and integrations. |
| `LOGCHIMP_SECRET_KEY` | LogChimp API | (secret) | Secret key used for various cryptographic opearations like session handling, token generation. Should be long, random string. |
| `LOGCHIMP_DB_PASSWORD` | LogChimp API | (secret) | - |
| `LOGCHIMP_LICENSE_KEY` | LogChimp API | - | To enable enterprise-only features, add LogChimp license key. You can get your license key from https://pilot.logchimp.app |
| `LOGCHIMP_IS_SELF_HOSTED` | LogChimp API | true | - |
| `LOGCHIMP_SIGNATURE_TOKEN` | LogChimp API | (secret) | Signature token for the LogChimp License API. Along with license key, a signature token will be provide to you. This ensure you and only you can communicate with the LogChimp License API for your license key. |
| `LOGCHIMP_MACHINE_SIGNATURE` | LogChimp API | - | Unique identifier for your instance, used for licensing and authentication. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | LogChimp Theme | 3000 | - |
| `NODE_ENV` | LogChimp Theme | production | - |
| `VITE_IS_SELF_HOSTED` | LogChimp Theme | true | - |
| `VITE_SHOW_TELEMETRY_FORM` | LogChimp Theme | false | - |
| `VALKEY_PORT` | Valkey | 6379 | - |
| `VALKEY_USER` | Valkey | (secret) | - |
| `VALKEY_PASSWORD` | Valkey | (secret) | - |

## Configuration

- **Start command:** `scripts/migrate.sh`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/logchimp)
