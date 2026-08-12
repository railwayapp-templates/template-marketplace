# Deploy WAHA | (Just Updated) Self-Hosted WhatsApp API, No Chromium, Media Survives Redeploys on Railway

Self-hosted WhatsApp REST API - no Chromium, media survives redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha-or-just-updated-self-hosted-whatsap)

## About

WAHA (WhatsApp HTTP API) turns a WhatsApp account into a REST API and a webhook stream: send and
receive messages, files, reactions and presence, manage multiple sessions, and drive it all from
n8n, Make, or your own backend. It ships a dashboard and a Swagger UI, and no Meta Business
approval is involved — you pair the number by scanning a QR code.

This deployment runs the **NOWEB engine**, which speaks to WhatsApp over a websocket instead of
driving a headless Chromium, and keeps **both** the session store and the received media on a
Railway volume.

Hosting WAHA means running one container that holds a live WhatsApp connection, storing its
authentication state so the QR code does not have to be scanned again, and storing the media files
it downloads from incoming messages. Three details decide whether a WAHA host behaves on a
platform that redeploys containers routinely:

- **Which engine runs.** The default WEBJS engine launches a real Chromium per session. Measured on
  one host with a single unpaired session (`--memory 2g --cpus 2`): **535 MiB** resident with WEBJS
  against **342 MiB** on the browserless NOWEB image. Railway bills memory by the hour, so this is
  the deploy's standing cost.
- **Where the files go.** WAHA keeps sessions under `WAHA_LOCAL_STORE_BASE_DIR` and downloaded media
  under `WHATSAPP_FILES_FOLDER`. They are two different settings and both default to a path inside
  the image, so a volume mounted for one of them does not cover the other. Here both live under the
  `/local` volume.
- **What URL the webhooks carry.** Every incoming file event contains a `media.url` built from
  `WAHA_BASE_URL`. If that points at an internal address, the automation on the other end cannot
  fetch the picture your customer just sent. This deployment derives it from the Railway public
  domain at boot.

The API key, the dashboard password and the Swagger password are generated per deployment, so the
API, the dashboard and the docs are all closed to strangers from the first request — only
`/ping` answers without credentials, because that is the healthcheck.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| waha | `ghcr.io/bon5co/waha-railway:2026.7.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WAHA_API_KEY` | (secret) |
| `WAHA_DASHBOARD_PASSWORD` | (secret) |
| `WHATSAPP_SWAGGER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/local`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/waha-or-just-updated-self-hosted-whatsap)
