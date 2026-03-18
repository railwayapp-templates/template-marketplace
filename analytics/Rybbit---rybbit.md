# Deploy Rybbit on Railway

Privacy-focused, intuitive web analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rybbit)

## About

Rybbit is a next-generation, open-source, lightweight, and cookieless web analytics platform that serves as a privacy-friendly alternative to Google Analytics. It's designed to be 10x more intuitive while providing all key web analytics metrics including sessions, unique users, pageviews, bounce rate, and session duration.

Rybbit Analytics is a self-hostable web and product analytics solution that provides privacy-friendly, cookieless web analytics with a focus on usability and comprehensive insights. Setting up this template requires no configuration and can be deployed in a few clicks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:25.4` | Database |
| Backend | [FraglyG/rybbit](https://github.com/FraglyG/rybbit) | Web service |
| Client | [FraglyG/rybbit](https://github.com/FraglyG/rybbit) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | ClickHouse | 8123 |
| `PUBLIC_PORT` | ClickHouse | 443 |
| `CLICKHOUSE_DB` | ClickHouse | railway |
| `CLICKHOUSE_USER` | ClickHouse | (secret) |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) |
| `MODE` | Backend | server |
| `PORT` | Backend | 3001 |
| `NODE_ENV` | Backend | production |
| `POSTGRES_USER` | Backend | (secret) |
| `DISABLE_SIGNUP` | Backend | false |
| `CLICKHOUSE_USER` | Backend | (secret) |
| `POSTGRES_PASSWORD` | Backend | (secret) |
| `BETTER_AUTH_SECRET` | Backend | (secret) |
| `CLICKHOUSE_PASSWORD` | Backend | (secret) |
| `MODE` | Client | client |
| `NODE_ENV` | Client | production |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, HTML, Shell

[View on Railway →](https://railway.com/deploy/rybbit)
