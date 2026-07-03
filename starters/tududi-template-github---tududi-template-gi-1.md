# Deploy tududi-template-github on Railway

Calm task management system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tududi-template-gi-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/tududi)

![Tududi OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-tududi/main/og-image.svg)

Tududi is a calm, open-source task management system for organizing life and work. Deploy it on Railway to capture, organize, and track your tasks with a clean, distraction-free interface.

Tududi runs as a single Docker container on port 9292. Railway provides compute, TLS at the edge, and a public URL. Data is stored in `/usr/src/app/tududi_db` — add a Railway Volume there for persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tududi-template-github | [INAPP-Mobile/railway-tududi](https://github.com/INAPP-Mobile/railway-tududi) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TUDUDI_USER_PASSWORD` | (secret) |
| `TUDUDI_SESSION_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/tududi-template-gi-1)
