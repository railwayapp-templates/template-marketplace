# Deploy Chibisafe on Railway

File and image sharing with a web dashboard and persistent upload storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chibisafe)

## About

File and image sharing with a web dashboard and persistent upload storage.

| Service | Access | Persistent storage |
| --- | --- | --- |
| web | Private | None |
| chibisafe | Public HTTPS | /data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `chibisafe/chibisafe:v6.5.5@sha256:836467a50792b08c29d90e32447a1480208723751e8a0f7ecd7ede17fe393ea3` | Worker |
| chibisafe | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_API_URL` | web | - | Base api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `HOST` | chibisafe | 0.0.0.0 | HTTP bind address. Keep 0.0.0.0 so Railway can reach the service. |
| `PORT` | chibisafe | 8000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `HOSTNAME` | chibisafe | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `WEB_HOST` | chibisafe | - | Web host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_PASSWORD` | chibisafe | (secret) | Generated admin password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/chibisafe)
