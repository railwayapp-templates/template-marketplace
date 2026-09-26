# Deploy Minecraft Server (Paper) on Railway

Paper Minecraft server with the world on a volume and a ready address

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-server-p-1)

## About

This template runs a Minecraft Java server on [Paper](https://papermc.io), using [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server), a Docker image with over 400 million pulls. The world is stored on a Railway volume, and the address your friends type into Minecraft is ready in the Variables tab.

I made it because the Minecraft templates on Railway are old or unreliable: 30 of them share a few hundred deploys a quarter, the busiest has a health score of 73, and several others are below 35. This one tracks the itzg image's `stable` tag, so new Minecraft and Paper versions work without a template update.

The deploy form asks for one thing: type `TRUE` in `EULA` to accept the [Minecraft EULA](https://aka.ms/MinecraftEULA). The server doesn't start without it.

When the deploy is done, copy `SERVER_ADDRESS` from the Variables tab of the `minecraft` service (it looks like `something.proxy.rlwy.net:12345`). In Minecraft, open Multiplayer, Add Server, and paste it.

In my test the first boot took 26 seconds, including downloading Paper and generating a new world. After a redeploy it came back in 8 seconds and loaded the same world from the volume. A Server List Ping (what the Multiplayer screen sends) answered in about half a second with the version and player count.

An empty server used 0.86 GB of RAM in my test, which is about $9 a month at Railway's RAM price. The heap starts at 512 MB and grows up to `MAX_MEMORY` (2 GB by default) as players load chunks, so the bill follows how much the server is used.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minecraft | `itzg/minecraft-server:stable` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone for logs |
| `OPS` | - | Optional: your Minecraft username, made an operator on first start |
| `EULA` | - | Type TRUE to accept the Minecraft EULA (https://aka.ms/MinecraftEULA). The server won't start without it. |
| `MOTD` | A Minecraft server on Railway | Message shown in the server list |
| `TYPE` | PAPER | Server type: PAPER, VANILLA, FABRIC, FORGE, PURPUR and more (see itzg docs) |
| `VERSION` | LATEST | Minecraft version, e.g. LATEST or 1.21.8 |
| `WHITELIST` | - | Comma-separated usernames allowed when the whitelist is on |
| `DIFFICULTY` | normal | peaceful, easy, normal or hard |
| `MAX_MEMORY` | 2G | Heap limit. 2G is enough for a few friends; use 700M on Railway's trial (1 GB RAM cap) |
| `INIT_MEMORY` | 512M | Heap at start. Kept low so an empty server uses less RAM |
| `MAX_PLAYERS` | 10 | Player slots |
| `ONLINE_MODE` | TRUE | Check accounts against Mojang. Keep TRUE unless you know why not |
| `RCON_PASSWORD` | (secret) | Password for rcon-cli (open a shell with railway ssh, then run rcon-cli) |
| `VIEW_DISTANCE` | 10 | Chunks sent to players. Lower it if the server lags |
| `SERVER_ADDRESS` | - | Paste this into Minecraft: Multiplayer > Add Server |
| `ENABLE_WHITELIST` | FALSE | Set TRUE and fill WHITELIST to keep strangers out |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other · **Tags:** minecraft, paper, game-server, java

[View on Railway →](https://railway.com/deploy/minecraft-server-p-1)
