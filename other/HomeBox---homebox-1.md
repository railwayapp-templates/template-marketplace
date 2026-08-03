# Deploy HomeBox on Railway

Home inventory and asset tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homebox-1)

## About

HomeBox is a self-hosted inventory and organization system for the home user. It helps you catalog items, locations, tags, photos, documents, warranties, purchases, and maintenance details through a fast, responsive web interface. Its portable SQLite-backed design keeps household inventory data on infrastructure controlled by the deployer.

Hosting HomeBox on Railway uses one immutable HomeBox 0.26.2 container, one persistent volume mounted at `/data/`, and a Railway HTTPS service domain targeting port `7745`. The service keeps its SQLite database, uploaded images, and other application state on the volume. Railway checks `/` for readiness and restarts the container after failures. The API-key pepper is generated at deployment time rather than copied from a source installation. HomeBox is intended to run as one stateful instance; keep the volume backed up and avoid replicas that share it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HomeBox | `ghcr.io/sysadminsmedia/homebox:0.26.2@sha256:b1ad7e3c63f732a5f6daa466e8116be4f545b3b120383a64dcb62beb00a660cc` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7745 |
| `HBOX_LOG_LEVEL` | info |
| `HBOX_LOG_FORMAT` | text |
| `HBOX_AUTH_API_KEY_PEPPER` | (secret) |
| `HBOX_WEB_MAX_UPLOAD_SIZE` | 10 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homebox-1)
