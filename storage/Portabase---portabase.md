# Deploy Portabase on Railway

Backup & restore for PostgreSQL, MySQL, MariaDB, SQLite, MongoDB, Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portabase)

## About

Portabase is an open-source, self-hosted database backup and restore platform. It provides a central dashboard for managing backup operations across database instances, with support for engines including PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, Firebird, SQLite, MongoDB, Redis, and Valkey.

Hosting Portabase requires deploying its dashboard/server component and provisioning persistent storage for its application data and backup artifacts. On Railway, deploy the repository as a containerized service and attach a Railway Volume so configuration, metadata, and local backup files persist through redeployments. Configure Portabase through environment variables, including its public URL, authentication settings, and storage configuration. Once the dashboard is online, install and connect Portabase agents close to the database instances you intend to protect. Agents securely execute backup and restore operations, allowing the central Portabase service to manage schedules, retention, and recovery workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Portabase | `portabase/portabase:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Portabase | - | Database name for Portabase. Automatically provided by the Railway Postgres service. |
| `PROJECT_URL` | Portabase | - | Public URL of this Portabase deployment. Automatically generated from the Railway public domain. |
| `DATABASE_URL` | Portabase | - | PostgreSQL connection URL used by Portabase. Automatically provided by the Railway Postgres service. |
| `POSTGRES_HOST` | Portabase | - | Hostname of the Railway Postgres service. Automatically provided. |
| `POSTGRES_PORT` | Portabase | - | Port of the Railway Postgres service. Automatically provided. |
| `POSTGRES_USER` | Portabase | (secret) | Username for the Railway Postgres service. Automatically provided. |
| `PROJECT_SECRET` | Portabase | (secret) | Secure application secret used to protect Portabase sessions and internal data. Do not change after deployment. |
| `POSTGRES_PASSWORD` | Portabase | (secret) | Password for the Railway Postgres service. Automatically provided. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/portabase)
