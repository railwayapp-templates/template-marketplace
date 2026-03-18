# Deploy Casdoor on Railway

A UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/OJXBP4)

## About

As an authentication platform, Casdoor implements the authentication by communicating with providers and users. Integrates with several identity providers.
This template deploys a Postgres instance and a Casdoor Docker image and links both in a simple way.

You can access your instance at the URL generated after deploys by using credentials:
admin
123

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| casdoor | `casbin/casdoor:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | casdoor | 8000 | Default http port for ui |
| `driverName` | casdoor | postgres | database type |
| `dataSourceName` | casdoor | - | Database Config string |
| `POSTGRES_DB` | Postgres | railway | default db name |
| `DATABASE_URL` | Postgres | - | default database connection string |
| `POSTGRES_USER` | Postgres | (secret) | default postgres user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Default postgres password |
| `DATABASE_PRIVATE_URL` | Postgres | - | default private connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/OJXBP4)
