# Deploy Beszel on Railway

Beszel 0.20 lightweight server and Docker monitoring hub with alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beszel-1)

## About

Beszel is a lightweight server monitoring platform. A small agent on each machine reports CPU, memory, disk, network, temperatures, GPU and per-container Docker stats to a central hub, which keeps history, draws charts, shares dashboards with users and sends alerts through email, Slack, Discord, Telegram, ntfy and more.

This template deploys the Beszel hub v0.20.0 from the official image with its PocketBase database on a Railway volume. The first user and superuser are created from environment variables, and public sign-up stays off. Agents on your servers connect outbound to the hub over WebSocket on the Railway domain, so no inbound ports are needed on the monitored machines. Add a system in the web UI, or use the universal token, and run the agent command it shows. The hub is tiny and fits the Hobby plan. Monitored machines only make outbound connections to the hub, which suits servers behind NAT or firewalls.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beszel | `henrygd/beszel:0.20.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8090 |
| `USER_EMAIL` | admin@example.com |
| `USER_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/beszel serve --http=[::]:8090`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/beszel_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/beszel-1)
