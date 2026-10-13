# Deploy Seerr on Railway

Self-hosted media request manager for Jellyfin, Plex & Emby

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seerr-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/seerr-1)

Seerr is the community successor to Overseerr and Jellyseerr: an open-source media request and discovery manager for Jellyfin, Plex, and Emby. Search for movies and shows, request them, manage approvals, and get notified — all from one clean self-hosted web interface.

This template deploys Seerr as a single Railway service from a pinned upstream image (`seerr/seerr` v3.5.0). The app is a lightweight Node.js server with an embedded SQLite database — no external database service needed. A 1 GB Railway volume mounted at `/app/config` holds the database and all settings, so everything survives redeploys and restarts. Railway assigns a public HTTPS URL on deploy; open it and run the setup wizard to create your admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Seerr | [mc9max/seerr](https://github.com/mc9max/seerr) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/seerr-1)
