# Deploy AsoBeast on Railway

Open-source ASO keyword rank tracker for the App Store and Google Play

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/asobeast)

## About

[AsoBeast](https://asobeast.com) is an open-source App Store Optimization (ASO) tool for the Apple App Store and Google Play. It tracks your keyword rankings every day down to position 200, watches competitors' listings and reviews, and turns that history into a to-do list ranked by impact.

AsoBeast runs as four services: a PostgreSQL 18 database, a Redis 8 queue, a NestJS API and a Next.js web app. The API reads public App Store and Google Play data on a daily schedule, keeps ranking history in Postgres and runs its jobs through Redis. Only the web app is public; it reaches the API over Railway's private network. Secrets are generated at deploy time, and the API runs its database migrations on first boot. Open the web domain and create the owner account, after which registration closes automatically. Email alerts and AI summaries stay off until you add their variables, and webhooks are set up inside the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18-alpine` | Database |
| web | `ghcr.io/asobeast/asobeast-web:1` | Web service |
| Redis | `redis:8-alpine` | Database |
| api | `ghcr.io/asobeast/asobeast-api:1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | asobeast | Database name for AsoBeast. Keep asobeast. |
| `POSTGRES_USER` | Postgres | (secret) | 	Database user AsoBeast connects as. Keep asobeast. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | 	Database password, generated at deploy. No need to change it. |
| `PORT` | web | 3000 | Port the web app listens on. Keep 3000, matching the public domain target port. |
| `HOSTNAME` | web | :: | Address the web app binds to. Keep :: to listen on IPv4 and IPv6. |
| `TRUST_PROXY` | web | 1 | 	Proxies in front of the web app. Keep 1 for Railway's edge proxy. |
| `API_INTERNAL_URL` | web | - | 	Private address of the API service. Set automatically. |
| `PORT` | api | 4000 | Port the API listens on inside the private network. Keep 4000. |
| `NODE_ENV` | api | production | Runtime mode. Keep production. |
| `LOG_LEVEL` | api | log | Log verbosity: error, warn, log, debug or verbose. Keep log. |
| `REDIS_HOST` | api | - | 	Private hostname of the Redis service. Set automatically. |
| `REDIS_PORT` | api | 6379 | 	Redis port. Keep 6379. |
| `AUTH_SECRET` | api | (secret) | 	Secret that signs sign-in sessions, generated at deploy. Changing it signs everyone out. |
| `TRUST_PROXY` | api | 1 | 	Proxies in front of the API. Keep 1, because the web service forwards requests to it. |
| `DATABASE_URL` | api | - | 	Connection string to the Postgres service over the private network. Built automatically. |
| `WEB_PUBLIC_URL` | api | - | 	Public address of the web service, used in alert links and account recovery. Set automatically. |
| `DEFAULT_COUNTRY` | api | us | Home store country used when an imported store link has none, as a two-letter code such as us, gb or de. |
| `AUTH_COOKIE_SECURE` | api | true | Send session cookies over HTTPS only. Keep true on Railway domains. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `redis-server --maxmemory 192mb --maxmemory-policy noeviction`
- **Volume:** `/data`
- **Healthcheck:** `/health`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/asobeast)
