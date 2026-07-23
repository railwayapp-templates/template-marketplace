# Deploy Evolution API (WhatsApp REST API) on Railway

Self-hosted WhatsApp REST API with Postgres + Redis. Hardened defaults.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-whatsapp-rest-api)

## About

Self-host Evolution API in one click — an open-source WhatsApp REST API with no per-message Meta fees. Create instances, scan a QR code, and start sending and receiving WhatsApp messages via HTTP within minutes, with Postgres persistence and an authenticated Redis cache included.

Evolution API exposes WhatsApp as a clean REST API: create an instance, pair it with a phone via QR code (Baileys mode) or connect the official WhatsApp Cloud API, then send messages, media, and receive webhooks. This template pins the current stable release (v2.3.7 — deliberately not the 2.4 RC line) and ships hardened: a 48-character master API key is generated per deploy, session data persists in Postgres and on a volume so your WhatsApp pairing survives redeploys, Redis caching is enabled with authentication, and telemetry is off. Databases are private-only — nothing but the API itself is exposed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:7.4.9-alpine` | Database |
| evolution-api | `evoapicloud/evolution-api:v2.3.7` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | evolution | Database name created on first boot. |
| `DATABASE_URL` | Postgres | - | Connection string used by Evolution API over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | Database user for Evolution API. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password (used by the start command and Evolution API cache URI). |
| `LANGUAGE` | evolution-api | en | Default language. |
| `SERVER_URL` | evolution-api | - | Public URL of this Evolution API instance. |
| `CACHE_REDIS_URI` | evolution-api | - | Authenticated Redis connection over private networking. |
| `DATABASE_PROVIDER` | evolution-api | postgresql | Database engine (PostgreSQL). |
| `TELEMETRY_ENABLED` | evolution-api | false | Disable telemetry. |
| `CACHE_REDIS_ENABLED` | evolution-api | true | Enable Redis cache (recommended). |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | Auto-generated master API key. This key controls your entire WhatsApp API - keep it secret. Use it as the apikey header and to log into the Manager UI. |
| `CACHE_REDIS_PREFIX_KEY` | evolution-api | evolution | Key prefix for cache entries. |
| `DATABASE_CONNECTION_URI` | evolution-api | - | Postgres connection string over private networking. |
| `WA_BUSINESS_TOKEN_WEBHOOK` | evolution-api | (secret) | Auto-generated webhook verification token for official WhatsApp Cloud API mode. |
| `DATABASE_CONNECTION_CLIENT_NAME` | evolution-api | evolution | Client name tag for DB connections. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 ::'`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Other

[View on Railway →](https://railway.com/deploy/evolution-api-whatsapp-rest-api)
