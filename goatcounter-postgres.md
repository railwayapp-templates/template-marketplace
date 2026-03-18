# Deploy GoatCounter + Postgres on Railway

GoatCounter is an open source web analytics platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/goatcounter-postgres)

## About

Hosting Goatcounter involves running the Goatcounter server application alongside a database, most commonly PostgreSQL. The service exposes a web interface for analytics dashboards and administration, as well as an endpoint for collecting page view data. On Railway, deployment typically includes a single web service for Goatcounter, a managed Postgres database, and environment variables to configure database connections, site domains, and authentication. Railway handles networking, SSL, scaling, and restarts, making Goatcounter easy to operate with minimal infrastructure overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| goatcounter | `arp242/goatcounter:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/goatcounter-postgres)
