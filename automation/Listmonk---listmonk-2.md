# Deploy Listmonk on Railway

Self-hosted newsletter & mailing list manager — own your data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-2)

## About

listmonk is a high-performance, self-hosted newsletter and mailing list manager. It ships with a modern web UI, subscriber management, templated campaigns, analytics, and a REST API — giving you full ownership of your audience data without relying on third-party email platforms.

Hosting listmonk requires running its Go-based application server alongside a PostgreSQL database. listmonk stores all subscriber data, campaign content, and analytics in Postgres, so a reliable, persistent database is essential. On Railway, both services are provisioned and networked automatically. The app reads its database connection and SMTP credentials from environment variables at startup. You'll also need to configure an external SMTP provider (such as Amazon SES, Postmark, or SendGrid) for actual email delivery — listmonk handles the scheduling and templating, but delegates sending to your chosen provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| listmonk | [Amritasha/listmonk](https://github.com/Amritasha/listmonk) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | listmonk | 9000 | - |
| `LISTMONK_SECRET` | listmonk | (secret) | Run "openssl rand -hex 16" to get key |
| `LISTMONK_ADMIN_USER` | listmonk | (secret) | - |
| `LISTMONK_ADMIN_PASSWORD` | listmonk | (secret) | Admin pwd |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/listmonk-2)
