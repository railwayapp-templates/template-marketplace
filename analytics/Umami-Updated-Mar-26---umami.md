# Deploy Umami [Updated Mar ’26] on Railway

Umami [Mar ’26] (Track Website Visits & Performance) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami)

## About

Umami is a lightweight, open-source web analytics platform designed for simplicity, speed, and privacy. Unlike traditional analytics tools, Umami focuses on providing essential insights without tracking personal data, making it a perfect alternative to Google Analytics. It is available on GitHub, supported by a dedicated developer community, and can be self-hosted effortlessly on modern cloud platforms such as Railway.

Self-hosting Umami allows you to keep all your analytics data completely under your control, eliminating third-party involvement. With Umami analytics, you can track website visits, user behavior, and conversion goals while preserving privacy and security. Railway’s streamlined deployment process makes it easy to set up, scale, and manage your Umami instance without worrying about server configurations, backups, or security patches. This ensures your data stays secure while you focus on making informed business decisions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| umami | `umamisoftware/umami:postgresql-latest` | Database |
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `HOSTNAME` | umami | :: |
| `APP_SECRET` | umami | (secret) |
| `DATABASE_TYPE` | umami | postgres |
| `UMAMI_ADMIN_PASSWORD` | umami | (secret) |
| `UMAMI_ADMIN_USERNAME` | umami | (secret) |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami | 1 |
| `VALKEY_PORT` | Valkey | 6379 |
| `VALKEY_USER` | Valkey | (secret) |
| `VALKEY_PASSWORD` | Valkey | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami)
