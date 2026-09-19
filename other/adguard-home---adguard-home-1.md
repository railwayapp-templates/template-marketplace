# Deploy adguard-home on Railway

Private ad-blocking DNS-over-HTTPS - encrypted DNS for devices anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adguard-home-1)

## About

Deploying this template provisions one Railway service built from the pinned `adguard/adguardhome:v0.107.79` image plus the template's entrypoint wrapper, and one persistent volume mounted at `/data` (AdGuard Home's config directory `/data/conf` and working data `/data/work` both live there, so filters, query log, and statistics persist across deploys). The service exposes a single HTTP port (3000) behind a Railway-generated public domain: the admin UI and the DoH endpoint share that one HTTPS URL, with TLS terminated by Railway's proxy. The healthcheck targets `/install.html`, which answers 200 both before setup (wizard) and after, so a fresh deploy is healthy immediately while you complete the wizard. No external databases or third-party services are involved.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| adguard-home | [lNamelessl/adguard-home-railway-template](https://github.com/lNamelessl/adguard-home-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/adguard-home-1)
