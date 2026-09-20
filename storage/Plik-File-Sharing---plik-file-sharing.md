# Deploy Plik File Sharing on Railway

Expiring file sharing with authenticated uploads and persistent metadata.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plik-file-sharing)

## About

Expiring file sharing with authenticated uploads and persistent metadata.

| Service | Access | Persistent storage |
| --- | --- | --- |
| plik | Public HTTPS | /data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plik | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `PLIKD_PLIK_DOMAIN` | - | Plikd plik domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PLIKD_MAX_FILE_SIZE_STR` | 100MB | Plikd max file size str for plik. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PLIKD_DEFAULT_ADMIN_LOGIN` | (secret) | Plikd default admin login for plik. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PLIKD_FEATURE_LOCAL_LOGIN` | (secret) | Plikd feature local login for plik. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PLIKD_DEFAULT_ADMIN_PASSWORD` | (secret) | Generated plikd default admin password. Keep private and preserve with backups. |
| `PLIKD_FEATURE_AUTHENTICATION` | forced | Plikd feature authentication for plik. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/plik-file-sharing)
