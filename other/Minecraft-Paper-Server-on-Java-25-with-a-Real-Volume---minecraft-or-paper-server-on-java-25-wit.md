# Deploy Minecraft | Paper Server on Java 25 with a Real Volume on Railway

Minecraft on Railway: a real volume, current Java, Trial plan or above

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-or-paper-server-on-java-25-wit)

## About

A Paper server on the official itzg image, with a persistent volume for the world and a TCP proxy so players can connect with a normal Minecraft client.

The world, the player data, the plugins and server.properties all live in /data. This template mounts a volume there, which is the difference between a server and a demo: without one, every redeploy hands your players a freshly generated world and wipes their inventories.

The image is pinned, and pinned to a Java 25 build on purpose. Paper 26.1 and newer refuse to start on Java 21 - a server left on an older Java tag crashes on boot the first time it pulls a current Paper build.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Minecraft | `itzg/minecraft-server:2026.7.2-java25` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EULA` | TRUE | Accepts the Mojang EULA (https://aka.ms/MinecraftEULA) on your behalf. The server only starts on TRUE - any other value leaves a green deploy with a stopped server. |
| `MOTD` | A Minecraft server on Railway | - |
| `TYPE` | PAPER | - |
| `MEMORY` | 512M | Java heap size. 512M fits the Trial plan's 1 GB per service; raise it to 2G or more on Hobby for a bigger world or more players. |
| `VERSION` | LATEST | - |
| `DIFFICULTY` | normal | - |
| `MAX_PLAYERS` | 20 | - |
| `RCON_PASSWORD` | (secret) | - |
| `USE_AIKAR_FLAGS` | false | Aikar's JVM flags. Tuned for heaps of 4G and up - leave off at 512M. Turn on together with a larger MEMORY. |
| `ENABLE_ROLLING_LOGS` | true | - |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-or-paper-server-on-java-25-wit)
