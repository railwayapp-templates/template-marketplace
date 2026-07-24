# Deploy Minecraft Server (Paper) on Railway

Paper Minecraft server: persistent world, private RCON, pause-on-empty.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-server-paper)

## About

Minecraft Server (Paper) is a high-performance fork of the Minecraft Java server. This template deploys the battle-tested itzg/minecraft-server image running Paper with a persistent world volume, a TCP proxy for the game port, private RCON admin, whitelist/ops support, and pause-when-empty to cut idle costs.

Hosting Minecraft yourself normally means renting a VPS, installing Java, managing server JARs, and keeping the process alive. This template does it all on Railway: the Paper server runs from a pinned image (2026.7.0-java25), your world lives on a Railway volume mounted at /data, and players connect through a Railway TCP proxy on port 25565. RCON stays on the private network only. You must type TRUE in the EULA variable at deploy time to accept Mojang's EULA — the server will not start until you do. With PAUSE_WHEN_EMPTY_SECONDS set, the server pauses when nobody is online, so an empty server costs almost nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minecraft | `itzg/minecraft-server:2026.7.0-java25` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Container timezone. |
| `OPS` | - | Optional - your Minecraft username(s), comma-separated. Grants in-game operator/admin. |
| `EULA` | - | REQUIRED - Type TRUE to accept the Minecraft EULA (https://www.minecraft.net/en-us/eula). The server will not start until you do. We never accept it on your behalf. |
| `MOTD` | Powered by Railway | Server list message. |
| `TYPE` | PAPER | Server type: Paper - fast, plugin-compatible Minecraft server. |
| `MEMORY` | 2G | Java heap size. Keep below the plan memory limit. |
| `VERSION` | LATEST | Minecraft version. LATEST tracks the newest release; pin e.g. 1.21.8 if your players need a specific version. |
| `RCON_PORT` | 25575 | RCON port (kept private - do not proxy). |
| `WHITELIST` | - | Optional - comma-separated usernames allowed to join. Leave empty for a public server. |
| `DIFFICULTY` | normal | Game difficulty: peaceful, easy, normal, hard. |
| `ENABLE_RCON` | true | Enable RCON admin console (private networking only - never exposed). |
| `MAX_PLAYERS` | 10 | Max concurrent players. |
| `ONLINE_MODE` | TRUE | Verify players with Mojang (blocks cracked clients). |
| `RCON_PASSWORD` | (secret) | Auto-generated RCON admin password. |
| `VIEW_DISTANCE` | 8 | Chunk view distance - lower saves CPU/RAM. |
| `USE_AIKAR_FLAGS` | true | Tuned JVM GC flags for smoother performance. |
| `PAUSE_WHEN_EMPTY_SECONDS` | 120 | Pause the server when empty for this many seconds - cuts usage cost to near zero between sessions. |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-server-paper)
