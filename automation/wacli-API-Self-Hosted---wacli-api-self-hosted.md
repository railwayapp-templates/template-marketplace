# Deploy wacli API (Self-Hosted) on Railway

Self-host wacli with a FastAPI API, token auth and persistent sessions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wacli-api-self-hosted)

## About

wacli API adds a FastAPI HTTP API to the wacli WhatsApp client. This template includes token authentication, a public HTTPS domain, persistent session storage, and continuous sync after you link your phone.

The template deploys one service with FastAPI and wacli, plus a persistent `/data` volume. Your linked-device session and synced messages survive redeployments. The API and sync worker run together, so no separate database or API service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wacli | `ghcr.io/hosmelq/railway-wacli-api-template:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | IANA time zone for the service, such as UTC or America/Managua. |
| `PORT` | 8080 | HTTP port for the API, public domain and healthcheck. Keep this at 8080 unless the domain target port is also updated. |
| `API_TOKEN` | (secret) | Generated bearer token for the HTTP API. Send it in Authorization: Bearer <API_TOKEN>. Change this variable and redeploy to rotate access. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/wacli-api-self-hosted)
