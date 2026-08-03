# Deploy talivia on Railway

Revenue-first analytics with session replay and attribution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/talivia)

## About

Talivia runs as a Dockerized Next.js web application on Railway with a private, persistent PostgreSQL database and automatic HTTPS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.6-alpine` | Database |
| app | `xiaosong233/talivia-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres | talivia_oss |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | app | 3000 |
| `ADMIN_KEY` | app | admin |
| `ADMIN_USER` | app | (secret) |
| `APP_SECRET` | app | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/talivia)
