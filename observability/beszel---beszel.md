# Deploy beszel on Railway

Lightweight server monitoring with Docker stats, alerts, and GPU track

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beszel)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/beszel)

![Beszel OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-beszel/main/og-image.svg)

Beszel is a lightweight server monitoring platform with historical data, Docker stats, and alert functions. Deploy it on Railway in minutes to start monitoring your servers — no external database required.

Beszel runs as a single Docker container (hub) on port 8090. Railway provides compute, TLS at the edge, and a public URL. The hub stores all monitoring data at `/beszel_data` — add a Railway Volume there to persist metrics across restarts. Agents run on your monitored servers and stream data to the hub via WebSocket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beszel | `henrygd/beszel:0.18.7` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/beszel)
