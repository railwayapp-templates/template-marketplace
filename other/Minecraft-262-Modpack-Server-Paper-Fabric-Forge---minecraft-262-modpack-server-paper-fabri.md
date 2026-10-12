# Deploy Minecraft 26.2 Modpack Server (Paper, Fabric, Forge) on Railway

Vanilla, plugin or modded servers in one click, with auto-backups and RCON.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-262-modpack-server-paper-fabri)

## About

Run your own Minecraft Java Edition server on Railway: vanilla, Paper with plugins, Fabric, Forge or a full Modrinth/CurseForge modpack. The world lives on a persistent volume, backups go to a Railway Bucket every few hours, and a password-protected web console lets you run commands from the browser.

A Minecraft server is a single Java process that needs a fixed amount of memory, a reachable TCP port, durable storage for the world and a clean shutdown so chunks are saved. This community template builds on the widely used `itzg/minecraft-server` image (pinned), which downloads the server type and version you choose on first start. It adds three things for Railway: a TCP proxy for players, automatic backups that pause world saves through RCON and stream compressed archives to a Railway Bucket, and a small web console that talks to the server over the private network. You must accept Mojang's EULA yourself when deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Console | [baranberkay96/minecraft-modpack-railway](https://github.com/baranberkay96/minecraft-modpack-railway) (branch: main) (root: /services/console) | Web service |
| Minecraft | [baranberkay96/minecraft-modpack-railway](https://github.com/baranberkay96/minecraft-modpack-railway) (branch: main) (root: /services/minecraft) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Console | 8080 | Port Caddy listens on; the public domain targets it. |
| `RCON_PASSWORD` | Console | (secret) | Server-side console password, added by the proxy; never sent to the browser. |
| `CONSOLE_PASSWORD` | Console | (secret) | Web console login password (generated). Minimum 12 characters. |
| `CONSOLE_USERNAME` | Console | (secret) | Web console login username. |
| `MC_CONSOLE_UPSTREAM` | Console | - | Private-network address of the Minecraft WebSocket console. |
| `TZ` | Minecraft | UTC | Server time zone (log timestamps, scheduled tasks). |
| `EULA` | Minecraft | - | REQUIRED. Set to TRUE only if you accept the Minecraft EULA (https://aka.ms/MinecraftEULA). The server refuses to start otherwise. |
| `MODE` | Minecraft | survival | Default game mode: survival, creative, adventure or spectator. |
| `MOTD` | Minecraft | A Minecraft server on Railway | Message shown in the multiplayer server list. |
| `TYPE` | Minecraft | PAPER | Server type: VANILLA, PAPER (plugins), FABRIC, FORGE, NEOFORGE, MODRINTH (modpack) or AUTO_CURSEFORGE (modpack). |
| `MEMORY` | Minecraft | 3G | Java heap (initial and max). 3G suits a small Paper server; modpacks usually need 6G-8G. |
| `CF_SLUG` | Minecraft | - | With TYPE=AUTO_CURSEFORGE: modpack slug (e.g. all-the-mods-8), or use CF_PAGE_URL. |
| `VERSION` | Minecraft | 26.2 | Minecraft version. 26.2 has stable Paper, Fabric and Forge builds. For modpacks use the pack's version or LATEST. |
| `RCON_PORT` | Minecraft | 25575 | RCON port, reachable only on the private network. |
| `DIFFICULTY` | Minecraft | normal | peaceful, easy, normal or hard. |
| `ENABLE_RCON` | Minecraft | true | Enable RCON (needed for safe backups and the web console). |
| `MAX_PLAYERS` | Minecraft | 20 | Maximum concurrent players. |
| `ONLINE_MODE` | Minecraft | TRUE | Verify players against Mojang accounts. Keep TRUE on a public address. |
| `MC_IMAGE_TAG` | Minecraft | 2026.10.0-java25 | Build arg: itzg/minecraft-server tag. Use an Ubuntu-based -javaNN tag (e.g. 2026.10.0-java21) for older modpacks. |
| `BACKUP_PREFIX` | Minecraft | minecraft | Folder (key prefix) inside the bucket. |
| `RCON_PASSWORD` | Minecraft | (secret) | RCON password (also the WebSocket console password). Generated; letters and digits only. |
| `STOP_DURATION` | Minecraft | 60 | Seconds the server gets to save and stop when the container is stopped. |
| `VIEW_DISTANCE` | Minecraft | 10 | Chunk view distance. Lower it to save RAM and CPU. |
| `BACKUP_ENABLED` | Minecraft | true | Automatic world backups to the Railway Bucket. |
| `RESTORE_BACKUP` | Minecraft | - | Set to a backup file name (or 'latest') and redeploy to restore it once before the server starts. Current data is moved to /data/.pre-restore-<time>. |
| `BACKUP_S3_BUCKET` | Minecraft | - | Backup bucket name. |
| `BACKUP_S3_REGION` | Minecraft | - | Backup bucket region. |
| `ENABLE_WHITELIST` | Minecraft | false | Only allow players on the whitelist. |
| `MODRINTH_MODPACK` | Minecraft | - | With TYPE=MODRINTH: modpack slug, project ID or page URL (e.g. https://modrinth.com/modpack/cobblemon-fabric). |
| `USE_MEOWICE_FLAGS` | Minecraft | true | Use MeowIce's tuned G1GC JVM flags (Aikar's flags updated for Java 17+). |
| `WEBSOCKET_ADDRESS` | Minecraft | :8080 | Listen address of the WebSocket console (all interfaces, IPv4 and IPv6). |
| `WEBSOCKET_CONSOLE` | Minecraft | true | Expose the server console over WebSocket for the Console service (private network only). |
| `BACKUP_S3_ENDPOINT` | Minecraft | - | Backup bucket S3 endpoint. |
| `SIMULATION_DISTANCE` | Minecraft | 8 | Chunk simulation distance. |
| `BACKUP_INTERVAL_HOURS` | Minecraft | 6 | Hours between backups. |
| `BACKUP_RETENTION_DAYS` | Minecraft | 7 | Backups older than this are deleted from the bucket. |
| `BACKUP_S3_ACCESS_KEY_ID` | Minecraft | - | Backup bucket access key. |
| `WEBSOCKET_ALLOWED_ORIGINS` | Minecraft | - | Browser origin allowed to use the console. Add your custom console domain here (comma-separated) if you set one. |
| `BACKUP_S3_SECRET_ACCESS_KEY` | Minecraft | (secret) | Backup bucket secret key. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other · **Tags:** minecraft, game-server, paper, fabric, forge · **Languages:** Shell, JavaScript, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/minecraft-262-modpack-server-paper-fabri)
