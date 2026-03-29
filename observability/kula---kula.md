# Deploy kula on Railway

Kula is a lightweight self-hosted Linux monitoring dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kula)

## About

Kula is a lightweight, self-contained Linux server monitoring tool. It collects metrics from `/proc` and `/sys`, stores them in a local ring-buffer engine, and serves a real-time dashboard plus health endpoints. Hosting Kula on Railway gives you a public HTTPS dashboard with minimal setup — no external database or complex infrastructure required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kula | `c0m4r/kula:0.13.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 27960 |
| `KULA_PORT` | 27960 |
| `KULA_LISTEN` | 0.0.0.0 |
| `KULA_DIRECTORY` | /app/data |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/kula)
