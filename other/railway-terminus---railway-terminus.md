# Deploy railway-terminus on Railway

Display the status of your Railway services on a TRMNL e-ink dispay

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-terminus)

## About

Display the status of your Railway services on a TRMNL e-ink dispay

Railway is a deployment platform and TRMNL is a customizable e-ink dashboard display. Now my TRMNL displays the status of my Railway deployments.

TRMNL is great for keeping an eye on things without getting distracted. I wanted a quick way to know what was happening and if I needed to pay attention to any changes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-terminus | [mikaylathompson/railway-terminus](https://github.com/mikaylathompson/railway-terminus) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISPLAY_TIMEZONE` | - | Timezone for timestamp displays, like "America/New_York" |
| `TERMINUS_AUTH_TOKEN` | (secret) | - |
| `TERMINUS_LOGS_ENV_ID` | - | environment id for logs display |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-terminus)
