# Deploy Webhook Inspector + Postgres on Railway

Self-hosted webhook.site: capture & replay webhooks. Postgres included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webhook-inspector-postgres)

## About

webhook-inspector is a self-hosted webhook tester, debugger, and replay tool — an open-source alternative to webhook.site and RequestBin. It generates unique capture URLs, records every incoming HTTP request (headers, body, query, source IP) in PostgreSQL, streams them to a live UI in real time, and lets you replay any request to a target of your choice.

Hosting webhook-inspector means running one small Node.js (Fastify) web service backed by a single PostgreSQL database — no Redis, queues, or extra services. The app builds from a multi-stage Dockerfile, runs its schema migration automatically on boot, and serves both the API and the bundled web UI on a single port. Live updates use Server-Sent Events, so it works behind standard proxies without WebSocket configuration. You point any webhook source (Stripe, GitHub, n8n, etc.) at your capture URL, watch requests arrive instantly, inspect the raw payloads, and replay them. An auto-cleanup job prunes old requests on a configurable retention window, keeping the database tidy without manual maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| webhook-inspector | [Kjudeh/self-hosted-webhook-inspector](https://github.com/Kjudeh/self-hosted-webhook-inspector) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | webhook-inspector | 3000 |
| `RETENTION_HOURS` | webhook-inspector | 168 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** TypeScript, CSS, HTML, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/webhook-inspector-postgres)
