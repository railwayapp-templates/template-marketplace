# Deploy WhatsApp Group Monitor on Railway

Tracks user activity in WhatsApp groups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-group-monitor)

## About

WhatsApp Group Monitor is a self-hosted tool that connects to WhatsApp as a linked device and passively tracks group activity — messages, reactions, polls, events, and member changes. It provides a web dashboard with per-group and per-member activity reports. No WhatsApp Business account required.

WhatsApp Group Monitor runs as a single Node.js process that maintains a persistent WebSocket connection to WhatsApp using the Baileys library. It requires a persistent volume to store the WhatsApp authentication state and SQLite database. On Railway, you deploy from the GitHub repo, add a volume at `/app/data`, and set the admin password. The Dockerfile handles the build. After deployment, open the web panel, scan a QR code with WhatsApp to link the device, and the monitor starts tracking all groups the account is in. The service auto-reconnects on restart and catches up on missed messages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whatsapp-group-monitor | [marinaglancy/whatsapp-group-monitor](https://github.com/marinaglancy/whatsapp-group-monitor) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | warn | Logging verbosity: debug, info, warn, or error |
| `ADMIN_PASSWORD` | (secret) | Password for web access |
| `ADMIN_USERNAME` | (secret) | Username for web access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-group-monitor)
