# Deploy duplicati-template on Railway

Encrypted, scheduled backups of your Railway volumes to your own bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/duplicati-template)

## About

Deploying gives you a working Duplicati server in about two minutes: one service, one persistent volume at `/data`, the UI at `https://.up.railway.app`, and a login password generated at deploy time. Nothing else is required — the demo source data and local backup destination are created automatically on first boot, so you can prove the full backup → restore cycle before attaching any cloud storage. Jobs, schedules, and retention live in the config database on the volume and survive redeploys and restarts.

Hosting Duplicati yourself means your data and your encryption keys never touch a third-party backup service. This template runs the official `duplicati/duplicati` image pinned to the stable `2.4.0.0` release, so behavior matches upstream documentation. The web UI is served on the service port and protected by a per-deployment generated password; unauthenticated API calls are rejected. The config database is encrypted at rest with the generated `SETTINGS_ENCRYPTION_KEY`. Railway attaches one volume per service, mounted here at `/data`, with `/source` and `/backups` exposed as persistent paths on that volume; data you place under `/source` (via `railway ssh` or pushes from other services) is backed up on schedule with client-side AES-256. Cost is roughly $5/month for the service plus storage; the demo footprint is a few megabytes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| duplicati | [lNamelessl/duplicati-railway-template](https://github.com/lNamelessl/duplicati-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DUPLICATI__WEBSERVICE_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/duplicati-template)
