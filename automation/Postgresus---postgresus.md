# Deploy Postgresus on Railway

Automated Postgre backups, with multiple storage options and notifications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresus)

## About

**Postgresus** is a self‑hosted PostgreSQL backup, monitoring, and alerting tool. It automates scheduled database dumps, verifies your backups’ integrity, and pushes them to your favorite storage (S3, Google Drive, Dropbox, or local). Simple Docker‑based deployment, secure storage, and flexible alerts make Postgresus a go‑to safety net for your Postgres databases.

Hosting Postgresus on Railway means running an always‑on service that connects to your Postgres database, performs backups on a configured schedule, and sends alerts when things go wrong. Railway manages the heavy lifting — uptime, scaling, and networking — while you just configure schedules, destinations, and webhook notifications. You can deploy via Railway’s Docker deployment feature with minimal config; once deployed, Postgresus runs continuously, keeping your backups safe and accessible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgresus | `rostislavdugin/postgresus:latest` | Database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/postgresus-data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/postgresus)
