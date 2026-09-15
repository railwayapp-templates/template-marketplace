# Deploy listmonk-messenger on Railway

Listmonk webhook companion for Twilio SES and Pinpoint

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-messenger)

## About

[listmonk-messenger](https://github.com/joeirimpan/listmonk-messenger) is a lightweight HTTP companion that accepts [listmonk](https://listmonk.app) webhooks and forwards messages to Twilio, AWS SES, or Pinpoint.

This template packages the `v1.0.0` Linux release. Config is rendered on start from environment variables. The demo boots with a Twilio messenger stub so `/health` stays green; replace `TWILIO_*` (or switch to SES/Pinpoint) with real credentials before sending campaigns.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| listmonk-messenger | `ghcr.io/joeirimpan/listmonk-messenger:v1.0.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SES_SECRET_KEY` | (secret) |
| `TWILIO_AUTH_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/listmonk-messenger)
