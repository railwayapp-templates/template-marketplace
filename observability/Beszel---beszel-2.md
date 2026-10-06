# Deploy Beszel on Railway

Lightweight server monitoring hub: CPU, memory, disk, Docker stats, alerts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beszel-2)

## About

[Beszel](https://github.com/henrygd/beszel) is a lightweight server monitoring platform. A small agent on each machine reports CPU, memory, disk, network, temperature, GPU and per-container Docker stats to the hub, which keeps history and sends alerts.

This template runs the hub, the official `henrygd/beszel` image (built on PocketBase), as one service with a volume for its database. The hub is the web UI and the API. The agents run on your own servers and connect to it.

Your account is created on first start from `USER_EMAIL` and `USER_PASSWORD`, so you can log in right away, with no setup page that anyone could claim first. The same account is also the PocketBase superuser (`/_/`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Beszel | `henrygd/beszel:0.21.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8090 |
| `USER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/beszel_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/beszel-2)
