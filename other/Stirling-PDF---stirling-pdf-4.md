# Deploy Stirling PDF on Railway

Private PDF editor. AI processing, OCR, classification, compression,...

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-4)

## About

![Stirling PDF editor UI](https://framerusercontent.com/images/7VBFPZlo4MqQiSnTP2NkNPpR9L0.png)

Stirling PDF is a self-hosted, web-based PDF toolkit. Merge, split, convert, OCR, compress, rotate, and edit PDFs in the browser without sending files to a third-party cloud. Everything runs on your own Railway service with optional login and persistent storage.

![Search tools — Sign, OCR, Merge and 57 more](https://framerusercontent.com/images/3iURCdjeneHnAxYVDKwcZn5Z9g.png)

This template runs the official Docker Hub image (`stirlingtools/stirling-pdf`) as a single Railway service with a public HTTP domain. A volume mounted at `/stirling-data` keeps configs, logs, custom files, pipelines, and storage across redeploys. Login is enabled by default with an auto-generated admin password. Frontend and backend URLs are wired to your Railway public domain. A healthcheck on `/api/v1/info/status` keeps the service healthy.

**How to log in after deploy:** open your service’s public URL, then use the credentials from the Stirling PDF service → **Variables** tab in Railway:

- Username: `SECURITY_INITIALLOGIN_USERNAME` (default `admin`)
- Password: `SECURITY_INITIALLOGIN_PASSWORD` (auto-generated via `${{secret()}}` on each new deploy)

Copy those values from Variables, sign in, and change the password in Stirling if you want a custom one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Stirling PDF | `stirlingtools/stirling-pdf:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `UI_APPNAME` | Stirling PDF | Display name in the Stirling PDF UI |
| `METRICS_ENABLED` | true | Expose Prometheus-style metrics endpoint |
| `UI_APPNAMENAVBAR` | Stirling PDF | Short name shown in the navbar |
| `SYSTEM_BACKENDURL` | - | Public backend URL — follows this service’s Railway domain |
| `STIRLING_BASE_PATH` | /stirling-data | Persistent data root (must match the volume mount path) |
| `SYSTEM_FRONTENDURL` | - | Public frontend URL — follows this service’s Railway domain |
| `SYSTEM_MAXFILESIZE` | 100 | Max upload size in MB |
| `UI_HOMEDESCRIPTION` | Self-hosted PDF toolkit — merge, split, OCR, convert, and more | Tagline on the home screen |
| `SECURITY_ENABLELOGIN` | (secret) | Require login before using tools |
| `SYSTEM_DEFAULTLOCALE` | en-US | Default UI locale (e.g. en-US, nl-BE, fr-FR) |
| `SYSTEM_GOOGLEVISIBILITY` | false | Allow search engines to index the public URL (usually leave false) |
| `DISABLE_ADDITIONAL_FEATURES` | false | Set true to turn off extra/optional Stirling features |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) | Initial admin password — auto-generated per deploy; find it in Variables after deploy |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) | Initial admin username (change after first login if you want) |

## Configuration

- **Start command:** `/bin/bash -c 'mkdir -p /stirling-data/configs /stirling-data/logs /stirling-data/customFiles /stirling-data/pipeline /stirling-data/storage && chown -R 1000:1000 /stirling-data 2>/dev/null; exec tini -- /scripts/init.sh'`
- **Healthcheck:** `/api/v1/info/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/stirling-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirling-pdf-4)
