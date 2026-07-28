# Deploy LubeLogger on Railway

Self-hosted vehicle maintenance, fuel mileage, reminders, and records.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lubelogger)

## About

LubeLogger is an open-source, self-hosted vehicle maintenance and fuel mileage
tracker. It records service, repairs, upgrades, fuel, odometer readings, taxes,
reminders, supplies, inspections, equipment, notes, documents, and recurring
plans, giving individuals and households a durable history of vehicle condition,
costs, and upcoming work.

This community template runs LubeLogger 1.7.0 from the official digest-pinned
container image. Railway provides a public HTTPS endpoint on port `8080`, checks
the built-in `/health` endpoint, and mounts one persistent volume at `/App/data`
for LiteDB, settings, uploads, themes, translations, and ASP.NET data-protection
keys. The public URL is derived from Railway automatically, so deployment has no
credential prompts. LubeLogger starts without authentication by default: open the
Settings page immediately after deployment, enable authentication, and create the
root account before storing private vehicle data. This template is independently
maintained and is not affiliated with or endorsed by Hargata Softworks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LubeLogger | `ghcr.io/hargata/lubelogger:v1.7.0@sha256:01bdb486af71e641c3ae41499e0412a21f2e04fa31b25c5c6531b42c112938e5` | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/App/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/lubelogger)
