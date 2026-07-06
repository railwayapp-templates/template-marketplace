# Deploy vast-red on Railway

Route47 Admin Company Server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vast-red)

## About

Route47 Company Server is the self-hosted backend for the Route47 fleet apps. It stores your company's drivers, routes, live GPS heartbeats, proof-of-delivery photos, and geofences on infrastructure you own — Route47 never hosts or sees your fleet data.

Hosting Route47 Company Server means running one lightweight Docker service with a persistent volume. This template deploys the server, mounts a volume at `/data` (SQLite database + proof-of-delivery photos, so nothing is lost across restarts or updates), generates a unique admin API key for your deployment, and monitors a `/healthz` endpoint so the service restarts automatically if it ever crashes. After deploying, copy your public URL and admin key into the Route47 Admin App — driver onboarding then works through QR invite codes. Typical cost is a few dollars per month.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| route47-server | [sreeranj065/route47-server](https://github.com/sreeranj065/route47-server) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT ` | 4700 |
| `ROUTE47_ADMIN_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/vast-red)
