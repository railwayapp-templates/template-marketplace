# Deploy Minecraft-Server (Java edition) on Railway

Ready-to-Deploy Minecraft Server (java edition)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-server-jav)

## About

Minecraft is a popular sandbox game, it's cooperative and therefor needs a server to handle all the multiplayer logic. This is this server, it allows players to join and play together in shared worlds.

**This is a server for the Java Edition**

Running this Minecraft server involves launching a Java application that handles player connections, world data, and the overall game state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| itzg/minecraft-server | `itzg/minecraft-server` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `EULA` | true |
| `SEED` | 123456789123456789 |
| `VERSION` | 1.21.4 |
| `ONLINE_MODE` | FALSE |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-server-jav)
