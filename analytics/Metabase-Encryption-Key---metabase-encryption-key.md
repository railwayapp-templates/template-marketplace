# Deploy Metabase Encryption Key on Railway

stable MB_ENCRYPTION_SECRET_KEY on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-encryption-key)

## About

`MB_ENCRYPTION_SECRET_KEY` is one environment variable that quietly guards every warehouse password Metabase stores. Set it once, before the first data source, and nobody thinks about it again. Change it on a whim and Monday starts with every dashboard throwing connection errors. This template is about keeping that key boring.

Metabase keeps the connection details for every database you add inside its own application database. With a key set, those fields are encrypted with AES256 + SHA512 when saved and decrypted on the fly when a query runs. Without a key, anyone holding a `pg_dump` of the app DB holds your Snowflake and Postgres credentials in plain text.

The trap on Railway is human, not technical. A teammate tidying variables clicks regenerate, someone duplicates the project for staging and gets a fresh key, or a backup gets restored into a new project that never had the old value. In every case the dashboards and questions survive, but each saved connection has to be re-entered in Admin until the original key comes back.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-encryption-key)
