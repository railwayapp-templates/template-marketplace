# Deploy Tunecamp on Railway

Template for Tunecamp a self-hosted music streaming platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tunecamp)

## About

Tunecamp is a decentralized, self-hosted music streaming platform designed for independent artists and record labels. It features a modern web interface, Subsonic API compatibility for mobile apps, built-in HLS live streaming, and decentralized federation via ActivityPub and Zen signaling, allowing you to control and monetize your catalog.

Deploying Tunecamp on Railway is fast and secure. The template sets up a Node.js-based environment using the official Dockerfile. It automates container building, environment configuration, and exposes the app on port 1970. To ensure your database and music catalog persist across redeployments, the template mounts a persistent volume to the `/data` directory. You will configure critical environment variables like `TUNECAMP_JWT_SECRET` for secure authentication, and direct your media uploads to the persistent `/data/music` directory. Optional features like Telegram bots, Stripe payments, and Base network crypto transactions can be enabled instantly via variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scobru/tunecamp | `scobru/tunecamp` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1970 | Percorsi di memorizzazione (reindirizzati all'interno del volume montato su /data) |
| `TUNECAMP_PORT` | 1970 | - |
| `TUNECAMP_DB_PATH` | /data/tunecamp.db | - |
| `TUNECAMP_MUSIC_DIR` | /data/music | - |
| `TUNECAMP_SITE_NAME` | Il Mio TuneCamp | Server di segnalazione Zen per far scoprire la tua istanza nella rete TuneCamp |
| `TUNECAMP_ZEN_PEERS` | wss://delay.scobrudot.dev/zen | - |
| `TUNECAMP_ADMIN_PASS` | admin | Rete e Federazione (ActivityPub) |
| `TUNECAMP_ADMIN_USER` | (secret) | - |
| `TUNECAMP_JWT_SECRET` | (secret) | Credenziali Admin iniziali (modifica con le tue preferenze) |
| `TUNECAMP_DOWNLOAD_DIR` | /data/music/downloads | Sicurezza (sostituisci con una stringa casuale robusta) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tunecamp)
