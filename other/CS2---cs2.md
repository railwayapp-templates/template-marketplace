# Deploy CS2 on Railway

CS2 Dedicated Server — 30GB+ volume, CSTV, playit.gg UDP tunnel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cs2)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/-U7Su3)

Counter-Strike 2 Dedicated Server — one-click deploy with persistent volume, CSTV support, and zero-downtime updates. Powered by [joedwards32/CS2](https://github.com/joedwards32/CS2).

After deploying and completing the [playit.gg setup](#connecting-players-udp-via-playitgg), open CS2 → Play → Community Server Browser → Add Server: `` (the IP:port playit.gg assigns).

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
| playit | `ghcr.io/playit-cloud/playit-agent:1.0.8` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TV_PW` | cs2 | changeme | SourceTV password |
| `CS2_IP` | cs2 | 0.0.0.0 | Bind IP |
| `CS2_LAN` | cs2 | 0 | LAN mode (0=Internet, 1=LAN) |
| `CS2_LOG` | cs2 | on | Enable logging |
| `TV_PORT` | cs2 | 27020 | SourceTV port |
| `CS2_PORT` | cs2 | 27015 | Game port |
| `TV_DELAY` | cs2 | 0 | Broadcast delay (seconds) |
| `TV_ENABLE` | cs2 | 0 | Enable SourceTV |
| `CS2_CHEATS` | cs2 | 0 | Enable cheats (0=off, 1=on) |
| `CS2_RCONPW` | cs2 | changeme | RCON password |
| `TV_MAXRATE` | cs2 | 0 | Max rate |
| `CS2_CFG_URL` | cs2 | - | Custom config URL (optional) |
| `SRCDS_TOKEN` | cs2 | (secret) | Steam Game Server Login Token (get from steamcommunity.com/dev/managegameservers) |
| `TV_RELAY_PW` | cs2 | changeme | SourceTV relay password |
| `CS2_GAMEMODE` | cs2 | 1 | Game mode |
| `CS2_GAMETYPE` | cs2 | 0 | Game type (0=Competitive, 1=Casual) |
| `CS2_LOG_ECHO` | cs2 | 0 | Log echo |
| `CS2_LOG_FILE` | cs2 | 0 | Log to file |
| `CS2_MAPGROUP` | cs2 | mg_active | Map group |
| `CS2_STARTMAP` | cs2 | de_inferno | Starting map |
| `CS2_GAMEALIAS` | cs2 | - | Game alias (optional) |
| `CS2_LOG_ITEMS` | cs2 | 0 | Log items |
| `CS2_LOG_MONEY` | cs2 | 0 | Log money |
| `CS2_RCON_PORT` | cs2 | - | RCON port (optional) |
| `TV_AUTORECORD` | cs2 | 0 | Auto-record demos |
| `TV_RELAYVOICE` | cs2 | 1 | Relay voice |
| `CS2_LOG_DETAIL` | cs2 | 0 | Log detail |
| `CS2_MAXPLAYERS` | cs2 | 10 | Max simultaneous players |
| `CS2_SERVERNAME` | cs2 | cs2 private server | Server hostname |
| `CS2_LOG_HTTP_URL` | cs2 | - | HTTP log URL (optional) |
| `CS2_ADDITIONAL_ARGS` | cs2 | - | Additional launch arguments (optional) |
| `CS2_DISCONNECT_KILLS` | cs2 | 0 | Disconnect kills |
| `CS2_SERVER_HIBERNATE` | cs2 | 0 | Hibernate when empty |
| `CS2_HOST_WORKSHOP_MAP` | cs2 | - | Workshop map ID (optional) |
| `CS2_HOST_WORKSHOP_COLLECTION` | cs2 | - | Workshop collection ID (optional) |
| `CS2_SERVER_DELTATICKS_ENFORCE` | cs2 | 2 | Delta ticks enforcement |
| `SECRET_KEY` | playit | (secret) | REQUIRED. Playit.gg agent secret key. Create a free account at playit.gg, then Account → Agents → Add Agent → copy the secret key. After deploy, configure the tunnel in the playit.gg dashboard: type UDP, local address cs2.railway.internal, local port 27015 (add a second UDP tunnel on port 27020 if CSTV is enabled). |

## Configuration

- **Volume:** `/home/steam/cs2-dedicated`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/cs2)
