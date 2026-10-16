# Deploy Haven on Railway

Self-hosted Discord alternative with encrypted chat and no telemetry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/haven)

## About

![Haven Banner](https://github.com/ancsemi/Haven/raw/main/docs/img/haven-4-6-default.jpg)

Haven is a free, open-source, self-hosted alternative to Discord for private messaging and community chat. Deploy your own chat server on Railway to communicate with friends, teams, and online communities, with persistent storage and daily backups to help protect your data.

Deploy Haven on Railway to run your own chat server with a public URL. Haven supports text messaging, voice chat, screen sharing, file sharing, channels, direct messages, and community features.

This template includes persistent storage mounted at `/data` to retain application data across restarts and redeployments, along with daily backups for additional data protection. Railway handles HTTPS, so you can access your instance through its auto-generated domain. The web server listens on port `3000`. After deployment, register your account to get started. **The first user to register becomes the administrator**, so complete your initial registration before inviting others.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Haven | `ghcr.io/ancsemi/haven:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Web Server Port |
| `FORCE_HTTP` | true | Disables built-in SSL. Railway handles HTTPS. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/haven)
