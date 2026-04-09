# Deploy hermes-webui on Railway

One-click Hermes Web UI: secure access, persistent state, zero ops

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-webui)

## About

Hermes Web UI provides a browser interface for Hermes Agent. On Railway, it can run from a pinned GHCR image with public HTTPS routing, environment-based configuration, and persistent volume-backed state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-webui | `ghcr.io/nesquena/hermes-webui:0.38.5` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8787 |
| `HERMES_HOME` | /data/.hermes |
| `HERMES_WEBUI_HOST` | 0.0.0.0 |
| `HERMES_WEBUI_PORT` | 8787 |
| `HERMES_CONFIG_PATH` | /data/.hermes/config.yaml |
| `HERMES_WEBUI_PASSWORD` | (secret) |
| `HERMES_WEBUI_STATE_DIR` | /data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-webui)
