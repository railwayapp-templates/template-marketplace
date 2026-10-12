# Deploy mailstead on Railway

Self-hosted Resend webmail for small teams. Django app with /data volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mailstead)

## About

Mailstead is a self-hosted webmail portal for small teams. [Resend](https://resend.com) sends and receives mail; Mailstead stores messages and provides the browser UI on a single Railway service with a persistent volume.

Mailstead runs as a single Docker service with a **persistent volume at `/data`** (SQLite database and mail blobs). A background worker process handles inbound webhooks, outbound sends, and scheduled jobs. Attach a Railway public domain; `PUBLIC_URL` is set from `RAILWAY_PUBLIC_DOMAIN`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailstead | [mabounassif/mailstead](https://github.com/mabounassif/mailstead) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |
| `RESEND_API_KEY` | (secret) |
| `BOOTSTRAP_TOKEN` | (secret) |

## Configuration

- **Start command:** `python -m mailstead.run`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/mailstead)
