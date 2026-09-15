# Deploy calert on Railway

Alertmanager webhook bridge that posts alerts to Google Chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calert)

## About

[calert](https://github.com/mr-karan/calert) forwards Prometheus Alertmanager webhook alerts to Google Chat (and similar providers). It is a single lightweight Go binary with TOML or environment-based configuration.

This template deploys `ghcr.io/mr-karan/calert:v2.4.0` on port 6000. Provider settings use `CALERT_` environment variables (`app.address` → `CALERT_APP__ADDRESS`). A demo provider ships with `dry_run=true` so the service starts without a real Google Chat webhook; replace the endpoint and set `dry_run=false` when you are ready. Point Alertmanager's webhook receiver at your Railway public URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calert | `ghcr.io/mr-karan/calert:v2.4.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/calert)
