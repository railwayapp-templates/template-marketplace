# Deploy Whatsmiau on Railway

Deploy Whatsmiau on Railway. WhatsApp REST API. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/whatsmiau)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/G92IcM?referralCode=9uHSFr&utm_medium=integration&utm_source=template&utm_campaign=generic)

WhatsMiau is a lightweight WhatsApp REST API built with Go using the Whatsmeow library. Connect a personal WhatsApp account via HTTP endpoints without Meta's Business API approval. Send messages, manage groups, receive webhooks, and automate workflows—all through a simple REST interface. Compatible with Evolution API routes for easy migration.

Hosting WhatsMiau requires a PostgreSQL database for persistence (instances and data), Redis for session storage and caching, and a persistent volume for WhatsApp instance authentication data. The API listens on port 8080 and exposes REST endpoints for instance creation, QR code connection, messaging, and webhook configuration. Railway provisions all services and handles networking, SSL, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Whatsmiau | `impedr029/whatsmiau:v0.5.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Whatsmiau | 8080 | Port |
| `DB_URL` | Whatsmiau | - | Database connection URI |
| `API_KEY` | Whatsmiau | (secret) | Required: API key for authentication (use in header: apikey) |
| `REDIS_TLS` | Whatsmiau | false | Redis TLS enabled |
| `REDIS_URL` | Whatsmiau | - | Redis HOST + PORT |
| `DIALECT_DB` | Whatsmiau | postgres | Database provider |
| `REDIS_PASSWORD` | Whatsmiau | (secret) | Redis password |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/template/whatsmiau)
