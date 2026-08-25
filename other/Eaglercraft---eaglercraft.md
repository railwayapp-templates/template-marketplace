# Deploy Eaglercraft on Railway

Play Minecraft in the browser — one-click self-hosted server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eaglercraft)

## About

Eaglercraft is Minecraft you can play in a web browser. This template hosts a Paper 1.12.2 world with EaglerXServer so friends can join from Chrome, a Chromebook, or any device with a browser — no Java client required.

This template runs `ghcr.io/railbi/eaglercraft-railway:1.1.1` and stores the world, plugin config, and player data in a Railway volume at `/data`. After deploy, wait for the landing page, open an [Eaglercraft 1.12.2](https://eaglercraft.com/mc/1.12.2/) client, and Direct Connect to `wss://<your-domain>` with no path. Give the service at least 2 GB of RAM; 1 GB will OOM the JVM on boot. Register in chat with `/register <password> <password>` (AuthMe, offline mode).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eaglercraft-railway | `ghcr.io/railbi/eaglercraft-railway:1.1.1` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/eaglercraft)
