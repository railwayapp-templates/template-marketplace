# Deploy Terraria Dedicated Server on Railway

Self-host a persistent terraria TShock server using Docker Image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/terraria-dedicated-server)

## About

**Terraria Dedicated Server** is the official multiplayer server for the Terraria sandbox game. It allows players to host a persistent world, invite others to join online, and customize gameplay using server configuration and plugins such as TShock.

This Railway template deploys a fully functional Terraria Dedicated Server using Docker, with support for persistent storage, configuration files, logs, and plugins. The server runs in headless mode and exposes a TCP endpoint via Railway’s TCP Proxy, allowing players to connect securely from anywhere.

The template is designed to work with a single persistent volume, ensuring that worlds, TShock configuration, plugins, and logs are preserved across restarts and redeployments. No manual server setup is required: worlds can be auto-generated, and common server settings are configurable through environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Terraria-Selfhost | [XavTo/Terraria-Selfhost](https://github.com/XavTo/Terraria-Selfhost) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MOTD` | - | Message of the Day shown to players on join. |
| `PASSWORD` | (secret) | Leave empty to allow public access. |
| `MAXPLAYERS` | 8 | Maximum number of players allowed on the server. |
| `WORLD_SIZE` | 2 | World size to use when the world does not exist yet. 1 = Small, 2 = Medium, 3 = Large" |
| `WORLD_FILENAME` | world.wld | World file name. |

## Configuration

- **TCP Proxies:** 7777
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/terraria-dedicated-server)
