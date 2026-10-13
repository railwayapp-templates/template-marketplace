# Deploy Eaglercraft on Railway

Host a Minecraft server for Eaglercraft browser clients.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eaglercraft)

## About

Eaglercraft is Minecraft you can play in a web browser. This template hosts a Paper 1.12.2 world with EaglerXServer. Friends can join using an Eaglercraft client in a compatible browser, including Chrome on a Chromebook. A Java client is not required.

This template runs `ghcr.io/railbi/eaglercraft-railway:1.1.1` and stores the world, plugin config, and player data in a Railway volume at `/data`. After deploy, wait for the landing page, open an [Eaglercraft 1.12.2](https://eaglercraft.com/mc/1.12.2/) client, and Direct Connect to `wss://<your-domain>` with no path. Allocate at least 2 GB of RAM to the service. With 1 GB, the Java process runs out of memory during startup. Register in chat with `/register <password> <password>` (AuthMe, offline mode).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eaglercraft-railway | `ghcr.io/railbi/eaglercraft-railway:1.1.1` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/eaglercraft)
