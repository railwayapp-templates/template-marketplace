# Deploy Umami on Railway

Simple, fast, privacy-focused alternative to Google Analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-2)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/umami-2)

Umami is a simple, fast, privacy-focused alternative to Google Analytics. One-click deploy on Railway with a PostgreSQL companion database.

Umami provides a powerful analytics platform with:

- Real-time data and dashboard
- Unlimited websites and events
- Multiple language support
- Tracking code for websites
- REST API for data access
- PostgreSQL backend for reliability
- Docker-based deployment on any platform

Deploying on Railway means you get automatic HTTPS, persistent storage, and continuous updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| umami | `ghcr.io/umami-software/umami:postgresql-latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | umami | Initial database created on first boot. Must match the database name in Umami's DATABASE_URL. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. Umami connects with these credentials. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password. Default literal 'postgres' so a fresh marketplace deploy authenticates out of the box. Rotate this in the dashboard AND update the Umami DATABASE_URL to match before production. |
| `PORT` | umami | 3000 | Port Umami listens on (default: 3000). |
| `HASH_SALT` | umami | - | Secret salt used for hashing. Auto-generated random value. Rotate this in the dashboard before production. |
| `DATABASE_URL` | umami | postgresql://postgres:postgres@postgres.railway.internal:5432/umami | PostgreSQL connection string. Points at the sibling 'postgres' Railway service in this template. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-2)
