# Deploy Kept Notes on Railway

Self-hosted Google-Keep-like app with reminders, shared notes & mobile apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kept-notes)

## About

Kept is a self-hosted notes app built for quick capture: text notes, checklists, images, drawings, links, attachments, labels, colors, and reminders. It aims to keep the lightweight feel of Google Keep while storing your data on your own server.

Open-source sticky notes - read more at https://github.com/ericerkz/kept

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kept | `ghcr.io/ericerkz/kept:latest` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6767 | port for Kept.  |
| `NODE_ENV` | production | environment type |
| `SQLITE_PATH` | /app/data/kept.sqlite | location for kept db |
| `KEPT_CORS_ALLOW_ALL` | 1 | cors origins enablement |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6767
- **Volume:** `/app/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/kept-notes)
