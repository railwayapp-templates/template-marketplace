# Deploy Terraria server on Railway

Self-host a persistent terraria TShock server using Docker Image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/terraria-dedicated-server)

## About

Persistent TShock multiplayer server for Terraria PC 1.4.5.8, with a public TCP proxy.

This server pins TShock 6.2.1 for **Terraria PC 1.4.5.8**. Clients must use the
matching game version. The container runs without interactive setup or a TTY.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Terraria-Selfhost | [XavTo/Terraria-Selfhost](https://github.com/XavTo/Terraria-Selfhost) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MOTD` | - | Message of the Day shown to players on join. |
| `PORT` | 8080 | Internal HTTP healthcheck port. |
| `PASSWORD` | (secret) | Leave empty to allow public access. |
| `MAXPLAYERS` | 8 | Maximum number of players allowed on the server. |
| `WORLD_SIZE` | 2 | World size to use when the world does not exist yet. 1 = Small, 2 = Medium, 3 = Large" |
| `SERVER_PORT` | 7777 | Internal Terraria game port; keep the TCP proxy target in sync. |
| `WORLD_FILENAME` | world.wld | World file name. |

## Configuration

- **Healthcheck:** `/health`
- **TCP Proxies:** 7777
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/terraria-dedicated-server)
