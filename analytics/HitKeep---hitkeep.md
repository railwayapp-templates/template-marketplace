# Deploy HitKeep on Railway

Self-hosted, privacy-friendly web analytics on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hitkeep)

## About

HitKeep is privacy-first web analytics for people who want useful website analytics without relying on third-party analytics services. It provides dashboards for website traffic and events while keeping the analytics infrastructure under your control. HitKeep runs as a single self-hosted application and does not require a separate PostgreSQL, Redis, Kafka, or ClickHouse deployment for its core analytics functionality.

This template deploys HitKeep as a single Docker service on Railway using the current HitKeep release. A persistent Railway volume is attached so your analytics data survives redeployments. The template automatically generates HitKeep's authentication secret and configures the application to use its Railway public domain. A readiness health check is included so Railway can determine when the service is ready to receive traffic. After deployment, open the generated public URL and create your HitKeep administrator account. You can then add your website and install HitKeep's tracking script.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HitKeep | `pascalebeier/hitkeep:2.13.18` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HITKEEP_DB_PATH` | /var/lib/hitkeep/data/hitkeep.db | Path to HitKeep's SQLite control database on the persistent volume. |
| `HITKEEP_DATA_PATH` | /var/lib/hitkeep/data | Persistent directory where HitKeep stores tenant analytics databases. |
| `HITKEEP_JWT_SECRET` | (secret) | Secret used to sign HitKeep authentication tokens. A secure value is generated automatically. |
| `HITKEEP_PUBLIC_URL` | - | Public HTTPS URL where this HitKeep instance is accessible. Set automatically from the Railway public domain. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/hitkeep/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/hitkeep)
