# Deploy Minecraft Server | Paper Java Edition with Persistent World on Railway

Paper Minecraft Java server with a persistent world and safe redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-java-server)

## About

A Minecraft Java Edition server running Paper, the fast, plugin-compatible server most communities use. Deploy it, copy one address into Minecraft, and play with your friends — no port forwarding, no machine running at home.

This template runs the widely used [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server) image with Paper 26.3 on Java 25. The world, plugins, configs and logs live on a persistent Railway volume mounted at `/data`, and players connect through a Railway TCP proxy.

What it does differently from a bare container:

- **Your world survives redeploys.** Railway's default is to kill a container the instant it is told to stop, which can cut a world save in half. This template gives the server a 90-second drain window and a 60-second save budget, so every redeploy and restart ends with all dimensions saved to disk. Verified: the same world (same seed) came back across repeated redeploys.
- **No surprise upgrades.** Both the server image and the Minecraft version are pinned. A redeploy never moves your world to a newer game version, which matters because a world cannot be downgraded and plugins break between versions. You raise `VERSION` when you decide to.
- **Secure by default.** `ONLINE_MODE` is on, so every player is verified with Mojang and nobody can join under someone else's name. RCON stays inside the container and is not exposed to the internet.
- **Nothing to fill in.** Every variable has a working default; the deploy screen asks for nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Minecraft | `itzg/minecraft-server:2026.10.0-java25` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone for logs and scheduled tasks, e.g. Europe/Berlin |
| `OPS` | - | Comma-separated Minecraft usernames to make server operators (admins) on start, e.g. your own name |
| `EULA` | TRUE | Minecraft End User License Agreement. The server will not start without it; deploying this template means you accept https://aka.ms/MinecraftEULA |
| `MOTD` | A Minecraft server on Railway | Message shown under the server name in the multiplayer list |
| `TYPE` | PAPER | Server software. PAPER is a high-performance, plugin-compatible fork of vanilla. Other values: VANILLA, FABRIC, FORGE, NEOFORGE, PURPUR — see the itzg/minecraft-server docs |
| `MEMORY` | 2G | Java heap size. The whole container uses roughly this plus ~0.7 GB and is billed for it all the time. 2G suits up to ~10 players; use 4G for more players or heavy plugins |
| `VERSION` | 26.3 | Minecraft version, pinned so a redeploy never upgrades your world by surprise. Worlds can be upgraded but never downgraded — back up /data before raising it |
| `WHITELIST` | - | Comma-separated usernames allowed to join. Setting it turns the whitelist on; leave empty for an open server |
| `DIFFICULTY` | normal | peaceful, easy, normal or hard |
| `MAX_PLAYERS` | 20 | Maximum number of players online at once |
| `ONLINE_MODE` | TRUE | Verify every player against Mojang's servers. Keep TRUE: with FALSE anyone can join under any name, including an operator's |
| `STOP_DURATION` | 60 | Seconds the server is given to save the world and exit on shutdown |
| `CONNECT_ADDRESS` | - | The address players enter in Minecraft (Multiplayer → Add Server). Read-only: assigned by Railway's TCP proxy |
| `USE_AIKAR_FLAGS` | true | Aikar's garbage-collector tuning, recommended by Paper for smooth tick times |
| `ENABLE_ROLLING_LOGS` | true | Rotate and compress logs so they do not fill the volume |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-java-server)
