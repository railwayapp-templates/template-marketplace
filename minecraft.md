# Deploy Minecraft Server [Updated Mar ’26] (Open-Source Game Hosting Platform) on Railway

Minecraft Server [Mar ’26] (Host Multiplayer Worlds & Mods) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/minecraft)

## About

Minecraft is one of the most popular sandbox games ever created, allowing players to build, explore, and survive in a world limited only by their imagination. Hosting your own Minecraft server lets you take full control over the gameplay experience, including mods, plugins, worlds, and community management. By self-hosting a Minecraft server on Railway, you can enjoy powerful hosting, easy scalability, and a simplified setup process - all without the hassle of managing infrastructure manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minecraft-railway | [Shinyduo/minecraft-railway](https://github.com/Shinyduo/minecraft-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GID` | 1000 | - |
| `PVP` | true | - |
| `UID` | 1000 | - |
| `EULA` | - | By changing the setting above to TRUE you are indicating your agreement to our EULA (https://aka.ms/MinecraftEULA). |
| `MODE` | survival | - |
| `MOTD` | Welcome to Railway Minecraft! | - |
| `TYPE` | PAPER | - |
| `DEBUG` | false | - |
| `LEVEL` | world | - |
| `MEMORY` | 2G | - |
| `VERSION` | 1.21.1 | - |
| `RCON_PORT` | 25575 | - |
| `DIFFICULTY` | normal | - |
| `QUERY_PORT` | 25565 | - |
| `ENABLE_RCON` | FALSE | - |
| `MAX_PLAYERS` | 20 | - |
| `ONLINE_MODE` | TRUE | - |
| `ALLOW_NETHER` | TRUE | - |
| `ENABLE_QUERY` | TRUE | - |
| `RCON_PASSWORD` | (secret) | - |
| `VIEW_DISTANCE` | 10 | - |
| `USE_AIKAR_FLAGS` | TRUE | - |
| `ENABLE_AUTOPAUSE` | FALSE | - |
| `ENABLE_WHITELIST` | FALSE | - |
| `MAX_BUILD_HEIGHT` | 256 | - |
| `SPAWN_PROTECTION` | 16 | - |
| `AUTOPAUSE_TIMEOUT_KN` | 120 | - |
| `ENABLE_COMMAND_BLOCK` | FALSE | - |
| `AUTOPAUSE_TIMEOUT_EST` | 3600 | - |
| `AUTOPAUSE_TIMEOUT_INIT` | 600 | - |
| `ENFORCE_SECURE_PROFILE` | TRUE | - |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/minecraft)
