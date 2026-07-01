# Deploy arcane on Railway

Docker management UI with modern web browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arcane)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/BV1O-V)

> **Canonical code:** `BV1O-V` — deploy URL: https://railway.app/template/BV1O-V

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-arcane/main/og-image.svg)

Arcane is a modern, web-based Docker management interface. Manage containers, images, volumes, and networks from a clean UI — deploy it on Railway in minutes.

Arcane runs as a single container with SQLite for persistence. Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures. No external database is required — everything runs in one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arcane | `ghcr.io/getarcaneapp/manager:v2.2.0` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JWT_SECRET` | (secret) |

**Category:** Other

[View on Railway →](https://railway.com/deploy/arcane)
