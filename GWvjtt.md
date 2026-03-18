# Deploy PostgreSQL to Meilisearch Sync on Railway

A quick setup for syncing data from PostgreSQL to Meilisearch

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GWvjtt)

## About

### Railway Template: Meilisync Integration

This template provides a streamlined setup for integrating PostgreSQL with a Meilisearch instance using Meilisync for data synchronization. It is designed for straightforward configuration, enabling a quick connection between a PostgreSQL database and Meilisearch without extra dependencies like an admin-dashboard or Redis for progress tracking.

### Key Features:
- **Configurable Setup**: Modify the configuration file located at `/sync/config.yml` in GitHub to adjust synchronization parameters for specific data and indexing needs.
- **Indexing with Meilisearch**: Ensures that the target index is created and synchronized in the connected Meilisearch service or instance using [Meilisync](https://github.com/long2ice/meilisync)
- **Database Compatibility**: Includes PostgreSQL pre-requisites, based on Railways PostgreSQL 16 with SSL Template
- **Bring Your Own Meilisearch Instance**: This template requires an existing Meilisearch instance, so users will need to connect their own service.

### Setup Instructions:
1. **Configure**: Follow the setup instructions from [Meilisync's GitHub repository](https://github.com/long2ice/meilisync) to configure and verify the setup.

2. **Verify**: Ensure that the required table exists in PostgreSQL and that `/sync/config.yml` is correctly configured for synchronization requirements. You might get a strange error & service crash if this is not done.

### Additional Information

For more details on using templates and deploying services on Railway, see [Railway's Documentation](https://docs.railway.app/reference/templates). To modify the `config.yml` file for Meilisync, consider **ejecting the repository** under settings.

This template is a straightforward setup for synchronizing PostgreSQL data with Meilisearch while utilizing Railway’s deployment infrastructure. Hope you enjoy!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres DB | [nMessage/Meilisync-on-railway](https://github.com/nMessage/Meilisync-on-railway) (root: /postgresql_wal2json) | Database |
| Meilisync-on-railway | [nMessage/Meilisync-on-railway](https://github.com/nMessage/Meilisync-on-railway) (root: /sync) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres DB | - | The name of the DATABASE you are using. |
| `DATABASE_URL` | Postgres DB | - | URL to connect to Postgres database for services within the project |
| `POSTGRES_USER` | Postgres DB | (secret) | Generator for DB username |
| `POSTGRES_PASSWORD` | Postgres DB | (secret) | Generator for DB Password |
| `DATABASE_PUBLIC_URL` | Postgres DB | - | Public URL to connect to this Postgres database |
| `PK_1` | Meilisync-on-railway | - | ID Key of TABLE_1 |
| `DEBUG` | Meilisync-on-railway | false | true/false Toggle for debug |
| `INDEX_1` | Meilisync-on-railway | - | The name of Meilisearch index. (https://www.meilisearch.com/docs/reference/api/indexes) |
| `TABLE_1` | Meilisync-on-railway | - | The PostgeSQL Table (or View) of data to sync into Meilisearch INDEX_1 |
| `POSTGRES_DB` | Meilisync-on-railway | - | The name of the database you are syncing from |
| `POSTGRES_HOST` | Meilisync-on-railway | - | The host/Domain of the DB to sync from |
| `POSTGRES_PORT` | Meilisync-on-railway | - | Port the DB is accessable on |
| `POSTGRES_USER` | Meilisync-on-railway | (secret) | DB User for DB access |
| `MEILISERCH_URL` | Meilisync-on-railway | - | The URL of the Meilisearch Instansce. |
| `POSTGRES_PASSWORD` | Meilisync-on-railway | (secret) | DB password for DB access |
| `MEILISERCH_ADMIN_API_KEY` | Meilisync-on-railway | (secret) | The ADMIN key of your Meilisearch service |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/GWvjtt)
