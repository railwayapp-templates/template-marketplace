# Deploy Tramevia Dock on Railway

Unified chat, alerts & overlays for OBS: Twitch, Kick, YouTube, TikTok

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tramevia-dock)

## About

Tramevia Dock is a self-hosted multistream control room for OBS. It merges the chat and events of Twitch, Kick, YouTube and TikTok into one place, edits titles, categories and tags on every platform at once, and serves OBS docks plus live overlays (chat, alerts, viewer count).

Tramevia Dock runs as a single Docker container with its data (accounts, encrypted credentials, settings) in a SQLite file on a volume mounted at /data. This template sets everything up: the image, the volume, the public HTTPS domain, the healthcheck and nightly automatic updates. You only choose a dashboard password, then sign in and follow the setup wizard to connect your channels.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tramevia-dock | `ghcr.io/tramevia/tramevia-dock:1.3.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8787 | Port the app listens on. Keep 8787. |
| `TOKEN_KEY` | (secret) | Encryption key for connected accounts, generated automatically. Keep it. |
| `ADMIN_PASSWORD` | (secret) | Mot de passe du tableau de bord (12 caractères minimum) / Dashboard password (12+ characters) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/tramevia-dock)
