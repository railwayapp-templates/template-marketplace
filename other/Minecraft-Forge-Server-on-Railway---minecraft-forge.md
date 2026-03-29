# Deploy Minecraft Forge Server on Railway on Railway

Self Host Minecraft Server. Run RLCraft, ATM, or any Forge modpack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-forge)

## About

Self-host a fully modded Minecraft Java Edition server using Minecraft Forge — the most established mod-loading framework in Minecraft history, powering iconic modpacks like RLCraft, All The Mods, and Pixelmon. 

Deploy Minecraft Forge on Railway in one click using the `itzg/minecraft-server` Docker image, with Aikar's GC flags, persistent world data, and a Railway TCP proxy pre-configured so players can connect the moment the server is live.

Minecraft Forge is a modding framework for Minecraft Java Edition that has been the foundation of large-scale mod development since 2011. It provides a rich API layer that lets mod developers hook into nearly every part of the game — adding new biomes, dimensions, items, mobs, and full gameplay overhauls. Key features:

- Largest mod ecosystem in Minecraft — thousands of mods on CurseForge and Modrinth
- Supports complex, multi-hundred-mod kitchen-sink modpacks (e.g. ATM, SkyFactory, FTB)
- Automatic Forge installer download and version management via `itzg/minecraft-server`
- Persistent world data and mod storage via the `/data` volume
- RCON support for remote server console access
- Aikar's JVM flags (`USE_AIKAR_FLAGS=true`) for GC-optimised performance at scale

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Minecraft Forge | `itzg/minecraft-server:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container timezone setting |
| `EULA` | - | Set to "TRUE" to accept Minecraft server EULA |
| `MODS` | - | (Optional) Comma separated mod download URLs |
| `TYPE` | FORGE | Server modloader type Forge |
| `MEMORY` | 4G | Allocated RAM for server |
| `FORGE_VERSION` | latest | Forge version to install |
| `USE_AIKAR_FLAGS` | true | Enable optimized JVM flags |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-forge)
