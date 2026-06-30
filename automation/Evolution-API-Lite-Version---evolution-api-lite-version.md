# Deploy Evolution API — Lite Version on Railway

[Jun'26] Low-cost WhatsApp REST API powered by Evolution API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-lite-version)

## About

Evolution API — Lite Version is a lightweight, API-only Evolution API deployment template for Railway. It runs Evolution API Lite with PostgreSQL and persistent volume storage, giving you a simple WhatsApp HTTP REST API backend without Redis and without the Manager UI. Use REST API endpoints directly to create instances, scan QR codes, check connection status, and send WhatsApp messages.

![Imgur](https://imgur.com/OnzfLuH.png)

Hosting Evolution API — Lite Version on Railway gives you a smaller and simpler Evolution API stack. This template is designed for users who want the lightest practical setup while still keeping PostgreSQL for database persistence and a mounted volume for instance/session files. Railway handles deployment, public domain setup, environment variables, networking, storage, and service management. Unlike the full Evolution API template, this Lite Version does not include the `/manager` dashboard. All instance management is done through REST API calls such as creating an instance, connecting WhatsApp with QR code, checking instance status, listing instances, and sending messages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evolution-api-lite | `atendai/evolution-api-lite` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | evolution-api-lite | 8080 | - |
| `DATABASE_PROVIDER` | evolution-api-lite | postgresql | - |
| `AUTHENTICATION_API_KEY` | evolution-api-lite | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-lite-version)
