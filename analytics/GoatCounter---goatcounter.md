# Deploy GoatCounter on Railway

GoatCounter is an open source web analytics platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/goatcounter)

## About

Hosting Goatcounter involves running the Goatcounter server application alongside a database, most commonly PostgreSQL. The service exposes a web interface for analytics dashboards and administration, as well as an endpoint for collecting page view data. On Railway, deployment typically includes a single web service for Goatcounter, a managed Postgres database, and environment variables to configure database connections, site domains, and authentication. Railway handles networking, SSL, scaling, and restarts, making Goatcounter easy to operate with minimal infrastructure overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| goatcounter | `arp242/goatcounter:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/goatcounter)
