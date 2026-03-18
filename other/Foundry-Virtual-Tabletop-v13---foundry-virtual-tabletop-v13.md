# Deploy Foundry Virtual Tabletop v13 on Railway

Deploy Foundry VTT v13 server instantly, ready for epic TTRPG adventures!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/foundry-virtual-tabletop-v13)

## About

Foundry Virtual Tabletop (VTT) v13 is a powerful, self-hosted virtual tabletop platform for running tabletop role-playing games like Dungeons & Dragons online. It offers dynamic lighting, fog of war, rich character sheets, integrated audio/video, and extensive mod support through community modules and systems. Perfect for game masters and players wanting immersive, customizable digital campaigns.

![](https://r2.foundryvtt.com/website-uploads-public/screen/user_671/v13-stable-release-banner-2025-04-29.webp)

Hosting Foundry VTT v13 involves running the official Node.js application in a Docker container with persistent storage for worlds, assets, and user data. The felddy/foundryvtt Docker image automates installation and updates using your licensed FoundryVTT.com account credentials. On Railway, deployment is simplified with managed persistent volumes and automatic HTTPS proxying. Key steps include providing your Foundry credentials for auto-download/licensing, setting a strong admin key, and applying minor configuration tweaks (like running as root) to ensure compatibility with Railway’s volume permissions. Once deployed, your server is accessible instantly via a custom Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| foundryvtt | `felddy/foundryvtt:13` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | America/New_York | Sets server timezone for correct timestamps in logs and sessions |
| `FOUNDRY_PASSWORD` | (secret) | Your FoundryVTT.com password (required for auto-download) |
| `FOUNDRY_USERNAME` | (secret) | Your FoundryVTT.com username (required for auto-download) |
| `FOUNDRY_ADMIN_KEY` | - | Strong admin password for your Foundry instance (highly recommended) |
| `FOUNDRY_PROXY_SSL` | true | Enables HTTPS awareness behind Railway's proxy |
| `FOUNDRY_PROXY_PORT` | 443 | Tells Foundry to expect traffic on port 443 (Railway's external port) |
| `CONTAINER_PRESERVE_CONFIG` | true | Prevents overwriting options.json on restarts |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/foundry-virtual-tabletop-v13)
