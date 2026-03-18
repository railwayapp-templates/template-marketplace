# Deploy Calendar Sync on Railway

Two-way Google Calendar sync with real-time webhooks and filters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/calendar-sync)

## About

Calendar Sync is a production-ready web app that mirrors events between Google Calendars in one-way or two-way mode. It supports real-time webhook syncing, filtering by keywords/colors, configurable event-copy behavior (title, description, location, RSVP, privacy), and safe backfill controls to keep calendars aligned without manual copying.

Hosting Calendar Sync on Railway involves deploying the Node.js service, attaching a PostgreSQL database, and configuring Google OAuth + Calendar API credentials. Railway handles build, deploy, networking, and runtime management, while the app manages OAuth sessions, webhook subscriptions, and background sync logic. You’ll set environment variables for Google auth, app secrets, and public callback URLs, then authorize redirect URIs in Google Cloud. Once deployed, users can connect Google accounts, create sync rules, and run real-time updates with quota-aware retries and failure safeguards. Railway makes this straightforward with managed infrastructure and a single platform for app + database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| twoway-calsync | [samiabid/twoway-calsync](https://github.com/samiabid/twoway-calsync) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | POSTGRES_DB |
| `DATABASE_URL` | Postgres | - | DB URL |
| `POSTGRES_USER` | Postgres | (secret) | PG username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PG password |
| `DATABASE_PUBLIC_URL` | Postgres | - | PG DB public url |
| `NODE_ENV` | twoway-calsync | - | NODE_ENV |
| `PUBLIC_URL` | twoway-calsync | - | PUBLIC_URL |
| `DATABASE_URL` | twoway-calsync | - | DB URL |
| `SESSION_SECRET` | twoway-calsync | (secret) | Session secret |
| `TOKEN_ENCRYPTION_KEY` | twoway-calsync | (secret) | encryption key to protect OAuth credentials |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/calendar-sync)
