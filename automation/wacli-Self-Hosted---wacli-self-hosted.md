# Deploy wacli (Self-Hosted) on Railway

Self-host wacli with persistent WhatsApp sessions and continuous sync.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wacli-self-hosted)

## About

wacli is a command-line WhatsApp client for syncing messages, searching local history, and sending text or media. This template includes a prebuilt image, persistent session storage, and continuous sync after you link your phone.

The template deploys one worker with a persistent `/data` volume. Your linked-device session, messages, and downloaded media survive redeployments. The worker waits for you to pair WhatsApp, then starts continuous sync automatically. No public domain or separate database is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wacli | `ghcr.io/hosmelq/railway-wacli-template:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | IANA time zone for the service, such as UTC or America/Managua. |

## Configuration

- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/wacli-self-hosted)
