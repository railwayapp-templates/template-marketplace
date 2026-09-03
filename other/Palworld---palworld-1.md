# Deploy Palworld on Railway

Palworld Dedicated Server — one-click deploy with 10GB+ volume, backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/palworld-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/palworld)

Palworld Dedicated Server — one-click deploy with persistent volume, REST API, automated backups, and zero-downtime updates. Powered by [thijsvanloef/palworld-server-docker](https://github.com/thijsvanloef/palworld-server-docker).

After deploying, open Palworld → Multiplayer → Enter Server Address: `:8211`

This template runs a single Palworld dedicated server wrapped around the upstream Docker image. Game data persists on a Railway volume mounted at `/palworld` — saves, configs, and backups survive deploys and restarts.

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

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Server timezone for backup schedules. |
| `PLAYERS` | 16 | Maximum number of players allowed to connect simultaneously (1-32). Each player slot consumes additional memory. |
| `COMMUNITY` | true | Show this server in the public server browser. |
| `PUBLIC_IP` | - | Public IP address. Leave empty for auto-detection. |
| `PUBLIC_PORT` | - | Public port. Leave empty to use the default game port. |
| `SERVER_NAME` | My Palworld Server | Name shown in the Palworld server browser. |
| `RCON_ENABLED` | false | Enable remote console (RCON) access. |
| `ADMIN_PASSWORD` | (secret) | REQUIRED. Admin password for RCON and REST API access. Auto-generated per deployment. |
| `BACKUP_ENABLED` | true | Enable automated world backups to the persistent volume. |
| `OLD_BACKUP_DAYS` | 30 | Number of days to keep backups before deletion. |
| `SERVER_PASSWORD` | (secret) | Optional password required to join the server. Leave empty for a public server. |
| `DELETE_OLD_BACKUPS` | false | Automatically delete backups older than OLD_BACKUP_DAYS. |

## Configuration

- **Volume:** `/palworld`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/palworld-1)
