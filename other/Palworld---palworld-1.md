# Deploy Palworld on Railway

Palworld Dedicated Server — 50GB volume, backups, playit.gg UDP tunnel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/palworld-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/palworld-1)

Palworld Dedicated Server — one-click deploy with persistent volume, REST API, automated backups, and zero-downtime updates. Includes a bundled [playit.gg](https://playit.gg) tunnel agent so players can connect over UDP (Railway's public network is TCP/HTTP only). Powered by [thijsvanloef/palworld-server-docker](https://github.com/thijsvanloef/palworld-server-docker).

After deploying and completing the [playit.gg setup](#connecting-players-udp-via-playitgg), open Palworld → Multiplayer → enter the playit.gg allocation address as the server address.

This template runs the Palworld dedicated server wrapped around the upstream Docker image. Game data persists on a Railway volume mounted at `/palworld` — saves, configs, and backups survive deploys and restarts.

The entrypoint runs as root on boot to chown the Railway volume (root-owned by default) to the `steam` user, then drops privileges before launching the server. Railway uses the REST API on port `8212` for healthchecks since the game port (`8211`) is UDP and Railway doesn't support UDP healthchecks.

Key environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `ADMIN_PASSWORD` | *auto-generated* | RCON/REST API admin password — visible in the service's Variables tab after deploy |
| `PLAYERS` | `16` | Max simultaneous players (1-32) |
| `SERVER_NAME` | `My Palworld Server` | Displayed in the server browser |
| `SERVER_PASSWORD` | *(empty)* | Set to make the server private |
| `COMMUNITY` | `true` | Show in public server browser |
| `RCON_ENABLED` | `false` | Enable remote console |
| `BACKUP_ENABLED` | `true` | Auto-backup world saves |
| `TZ` | `UTC` | Server timezone |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| palworld | [INAPP-Mobile/palworld](https://github.com/INAPP-Mobile/palworld) | Database |
| playit | `ghcr.io/playit-cloud/playit-agent:1.0.8` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | palworld | UTC | Server timezone for backup schedules. |
| `PLAYERS` | palworld | 16 | Maximum number of players allowed to connect simultaneously (1-32). Each player slot consumes additional memory. |
| `COMMUNITY` | palworld | true | Show this server in the public server browser. |
| `PUBLIC_IP` | palworld | - | Public IP address. Leave empty for auto-detection. |
| `PUBLIC_PORT` | palworld | - | Public port. Leave empty to use the default game port. |
| `SERVER_NAME` | palworld | My Palworld Server | Name shown in the Palworld server browser. |
| `RCON_ENABLED` | palworld | false | Enable remote console (RCON) access. |
| `ADMIN_PASSWORD` | palworld | (secret) | REQUIRED. Admin password for RCON and REST API access. Auto-generated per deployment. |
| `BACKUP_ENABLED` | palworld | true | Enable automated world backups to the persistent volume. |
| `OLD_BACKUP_DAYS` | palworld | 30 | Number of days to keep backups before deletion. |
| `SERVER_PASSWORD` | palworld | (secret) | Optional password required to join the server. Leave empty for a public server. |
| `DELETE_OLD_BACKUPS` | palworld | false | Automatically delete backups older than OLD_BACKUP_DAYS. |
| `SECRET_KEY` | playit | (secret) | REQUIRED. Playit.gg agent secret key. Create a free account at playit.gg, then Account → Agents → Add Agent → copy the secret key. After deploy, configure the tunnel in the playit.gg dashboard: type UDP, local address palworld.railway.internal, local port 8211. |

## Configuration

- **Volume:** `/palworld`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/palworld-1)
