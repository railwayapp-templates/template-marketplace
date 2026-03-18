# Deploy Peekaping + Postgres on Railway

Open Source & Self-Hosted uptime monitoring tool (with postgres)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/peekaping-postgres)

## About

On Railway, you deploy Peekaping as a containerized service and attach a database (PostgreSQL is a great fit). Peekaping’s new architecture can run as a single bundled image (simplest) or as microservices (API, worker, producer, ingester) for scale. You’ll configure env vars (DB connection, base URL, SMTP or chat-webhooks), expose the web UI, and optionally add Redis if you go microservices. Railway handles HTTPS, scaling, and restarts. After deploy, create monitors (HTTP, TCP, Ping, DNS, gRPC, Docker, Postgres, Redis, etc.), set alert channels (Email, Slack, Telegram, PagerDuty, Ntfy, Gotify, etc.), and publish a public status page.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Peekaping + Postgres | `0xfurai/peekaping-bundle-postgres:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DB_NAME` | railway |
| `DB_USER` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/peekaping-postgres)
