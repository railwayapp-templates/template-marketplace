# Deploy gowa on Railway

GOWA by aldinokemal: WhatsApp REST API with Postgres and secure defaults

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gowa)

## About

GOWA ([go-whatsapp-web-multidevice](https://github.com/aldinokemal/go-whatsapp-web-multidevice)) is a WhatsApp Web multi-device REST API written in Go. Link one or more WhatsApp numbers with a QR code, send messages and media over HTTP, and receive incoming messages on your own webhook.

> **Credits:** GOWA is created and maintained by [Aldino Kemal (@aldinokemal)](https://github.com/aldinokemal). All the credit for the software goes to him and the project's contributors. This is an unofficial community template that deploys his official Docker image, unmodified. If GOWA is useful to you, star [the repository](https://github.com/aldinokemal/go-whatsapp-web-multidevice) and report bugs or feature requests there.

This template runs the official GOWA image pinned to a specific version, backed by PostgreSQL for the WhatsApp session keys and a small volume for GOWA's local SQLite store (device registry, chat history, scheduled sends). A strong Basic Auth password and a webhook signing secret are generated for every deploy, the healthcheck runs on `/health`, and only patch releases update automatically. You pick up bug fixes without surprise breaking changes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gowa | `ghcr.io/aldinokemal/go-whatsapp-web-multidevice:v9.5.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | gowa | 3000 |
| `MCP_ENABLED` | gowa | false |
| `WHATSAPP_WEBHOOK_EVENTS` | gowa | message |
| `WHATSAPP_WEBHOOK_SECRET` | gowa | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storages`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/gowa)
