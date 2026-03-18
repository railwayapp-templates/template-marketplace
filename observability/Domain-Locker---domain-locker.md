# Deploy Domain Locker on Railway

The Central Hub for all your Domain Names

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/domain-locker)

## About

Domain Locker is a comprehensive domain name portfolio management platform that provides complete visibility of your domain assets in one central location. It automatically fetches and analyzes domain data, monitors SSL certificates, DNS records, registrars, and hosts, while sending configurable alerts for expirations and configuration changes. Built with Angular and TypeScript, it offers detailed analytics, security insights, and performance tracking for your entire domain portfolio.

Hosting Domain Locker involves deploying a full-stack application consisting of an Angular frontend with Analog+Nitro, TypeScript API endpoints, and a PostgreSQL database. The deployment requires setting up automated cron jobs to periodically update domain data, monitor website uptime, check for expirations, and trigger notifications. Domain Locker fetches real-time data from external APIs for WHOIS information, DNS records, and SSL certificates, storing this data in PostgreSQL for historical tracking and analysis. The platform is designed to run in containers and requires proper configuration of database connections, authentication services, and notification channels (email, SMS, webhooks) to provide comprehensive domain monitoring and management capabilities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| domainlocker | [lissy93/domain-locker](https://github.com/lissy93/domain-locker) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DL_PG_USER` | domainlocker | (secret) | - |
| `DL_ENV_TYPE` | domainlocker | selfHosted | - |
| `DL_PG_PASSWORD` | domainlocker | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** TypeScript, HTML, SCSS, PLpgSQL, Shell, CSS, Dockerfile, JavaScript, Smarty

[View on Railway →](https://railway.com/template/domain-locker)
