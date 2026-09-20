# Deploy Maloja Listening Statistics on Railway

Personal music scrobbling and listening statistics with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maloja-listening-statistics)

## About

Personal music scrobbling and listening statistics with persistent storage.

| Service | Access | Persistent storage |
| --- | --- | --- |
| maloja | Public HTTPS | /mljdata |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| maloja | `krateng/maloja:latest@sha256:1ccc7f4f78256242ada110efffe255617c974714455199c59a1fb0696ab23734` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 42010 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `MALOJA_NAME` | My listening history | Maloja name for maloja. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MALOJA_SKIP_SETUP` | true | Maloja skip setup for maloja. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MALOJA_DATA_DIRECTORY` | /mljdata | Maloja data directory for maloja. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MALOJA_FORCE_PASSWORD` | (secret) | Generated maloja force password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mljdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/maloja-listening-statistics)
