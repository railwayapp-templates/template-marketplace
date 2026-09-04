# Deploy CS2 on Railway

CS2 Dedicated Server — 30GB+ volume, CSTV, zero-downtime updates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cs2)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/-U7Su3)

Counter-Strike 2 Dedicated Server — one-click deploy with persistent volume, CSTV support, and zero-downtime updates. Powered by [joedwards32/CS2](https://github.com/joedwards32/CS2).

After deploying, open CS2 → Play → Community Server Browser → Add Server: `:27015`

This template runs a CS2 dedicated server wrapped around the upstream Docker image. Game data persists on a Railway volume mounted at `/home/steam/cs2-dedicated` — configs, maps, and logs survive deploys and restarts.

The entrypoint runs as root on boot to chown the Railway volume (root-owned by default) to the `steam` user, then drops privileges before launching the server. Railway uses TCP port `27015` for healthchecks since the game port is UDP and Railway doesn't support UDP healthchecks.

**Prerequisites:**
- A Steam Game Server Login Token from [steamcommunity.com/dev/managegameservers](https://steamcommunity.com/dev/managegameservers)

Key environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `SRCDS_TOKEN` | *required* | Steam Game Server Login Token |
| `CS2_SERVERNAME` | `cs2 private server` | Server hostname |
| `CS2_MAXPLAYERS` | `10` | Max simultaneous players |
| `CS2_RCONPW` | `changeme` | RCON password |
| `CS2_STARTMAP` | `de_inferno` | Starting map |
| `CS2_MAPGROUP` | `mg_active` | Map group |
| `CS2_GAMETYPE` | `0` | Game type (0=Classic, 1=Arms Race, 2=Demolition) |
| `CS2_GAMEMODE` | `1` | Game mode (0=Casual, 1=Competitive, 2=Wingman) |
| `CS2_CHEATS` | `0` | Enable cheats (0=off, 1=on) |
| `TV_ENABLE` | `0` | Enable CSTV/SourceTV (0=off, 1=on) |
| `TV_PORT` | `27020` | CSTV port |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cs2 | [INAPP-Mobile/cs2](https://github.com/INAPP-Mobile/cs2) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TV_PW` | changeme | SourceTV password |
| `CS2_IP` | 0.0.0.0 | Bind IP |
| `CS2_LAN` | 0 | LAN mode (0=Internet, 1=LAN) |
| `CS2_LOG` | on | Enable logging |
| `TV_PORT` | 27020 | SourceTV port |
| `CS2_PORT` | 27015 | Game port |
| `TV_DELAY` | 0 | Broadcast delay (seconds) |
| `TV_ENABLE` | 0 | Enable SourceTV |
| `CS2_CHEATS` | 0 | Enable cheats (0=off, 1=on) |
| `CS2_RCONPW` | changeme | RCON password |
| `TV_MAXRATE` | 0 | Max rate |
| `CS2_CFG_URL` | - | Custom config URL (optional) |
| `SRCDS_TOKEN` | (secret) | Steam Game Server Login Token (get from steamcommunity.com/dev/managegameservers) |
| `TV_RELAY_PW` | changeme | SourceTV relay password |
| `CS2_GAMEMODE` | 1 | Game mode |
| `CS2_GAMETYPE` | 0 | Game type (0=Competitive, 1=Casual) |
| `CS2_LOG_ECHO` | 0 | Log echo |
| `CS2_LOG_FILE` | 0 | Log to file |
| `CS2_MAPGROUP` | mg_active | Map group |
| `CS2_STARTMAP` | de_inferno | Starting map |
| `CS2_GAMEALIAS` | - | Game alias (optional) |
| `CS2_LOG_ITEMS` | 0 | Log items |
| `CS2_LOG_MONEY` | 0 | Log money |
| `CS2_RCON_PORT` | - | RCON port (optional) |
| `TV_AUTORECORD` | 0 | Auto-record demos |
| `TV_RELAYVOICE` | 1 | Relay voice |
| `CS2_LOG_DETAIL` | 0 | Log detail |
| `CS2_MAXPLAYERS` | 10 | Max simultaneous players |
| `CS2_SERVERNAME` | cs2 private server | Server hostname |
| `CS2_LOG_HTTP_URL` | - | HTTP log URL (optional) |
| `CS2_ADDITIONAL_ARGS` | - | Additional launch arguments (optional) |
| `CS2_DISCONNECT_KILLS` | 0 | Disconnect kills |
| `CS2_SERVER_HIBERNATE` | 0 | Hibernate when empty |
| `CS2_HOST_WORKSHOP_MAP` | - | Workshop map ID (optional) |
| `CS2_HOST_WORKSHOP_COLLECTION` | - | Workshop collection ID (optional) |
| `CS2_SERVER_DELTATICKS_ENFORCE` | 2 | Delta ticks enforcement |

## Configuration

- **Volume:** `/home/steam/cs2-dedicated`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/cs2)
