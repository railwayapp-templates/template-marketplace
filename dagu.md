# Deploy dagu on Railway

Deploy and Host dagu with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dagu)

## About

Dagu is a self-contained workflow engine written in Go with an embedded TypeScript/React Web UI. It uses file-based storage (no external database required) and runs as a single binary via `dagu start-all`, which launches the web server, scheduler, and coordinator together. The Docker image is `ghcr.io/dagu-org/dagu:latest` from GHCR.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dagu | `ghcr.io/dagu-org/dagu:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `DAGU_HOME` | /data/dagu |
| `DAGU_HOST` | 0.0.0.0 |
| `DAGU_PORT` | 8080 |
| `DAGU_AUTH_MODE` | basic |
| `DAGU_AUTH_BASIC_PASSWORD` | (secret) |
| `DAGU_AUTH_BASIC_USERNAME` | (secret) |

## Configuration

- **Start command:** `dagu start-all`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/dagu`

**Category:** Automation

[View on Railway →](https://railway.com/template/dagu)
