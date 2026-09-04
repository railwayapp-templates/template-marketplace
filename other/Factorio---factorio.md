# Deploy Factorio on Railway

Self-hosted Factorio headless server — 24/7 world, persistent saves, RCON

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/factorio)

## About

Deploy with one click. On first boot the container:

1. Mounts the persistent Railway volume at `/factorio` (saves, config, mods survive redeploys).
2. Generates a random **RCON password** and writes it to `/factorio/config/rconpw`.
3. Copies the default `server-settings.json`, `map-gen-settings.json`, and `map-settings.json` from the image.
4. Creates a new save if `GENERATE_NEW_SAVE=true` (otherwise loads the most recent save in `/factorio/saves`, or refuses to start if `LOAD_LATEST_SAVE=false`).
5. Starts the game on UDP 8080 (game traffic) and TCP 27015 (RCON admin). UDP 8080 is shared with the HTTP health server (socat listens on TCP 8080 — the two protocols coexist because they don't collide).

Players connect from Factorio's **Multiplayer → Connect to address** screen
using your Railway service's public address. The RCON port lets you run admin
commands from any RCON client (e.g. [rcon-cli](https://github.com/gorcon/rcon-cli)).

- **Single service**, official `factoriotools/factorio:2.0.77` image — no source build, 132 MB cold start plus ~700 KB for `socat` (used for the HTTP health server).
- **Persistent Railway volume** at `/factorio` (saves, mods, config, RCON password, logs).
- **Game port** UDP 8080 + **RCON port** TCP 27015. UDP 8080 is reachable directly at `.up.railway.app:8080/udp`; RCON is on the same host on TCP 27015 (use the Railway TCP proxy or run `rcon-cli` from a sidecar — see [Connecting](#connecting)).
- **Default resource**: 1 vCPU / 1 GB RAM. Factorio headless with 8–10 players runs fine in 512 MB; 1 GB is comfortable headroom.
- **HTTP healthcheck endpoint** at `GET /` (returns `200 ok`) so Railway's HTTP-only healthcheck can verify the container is up. Implemented as a tiny `socat` listener on the Railway-injected `PORT` (default 8080) — see `health.sh`.
- **Runs as root** so the upstream entrypoint can chown the Railway-managed volume to the `factorio` user, then drops to that user before exec.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| factorio | [INAPP-Mobile/factorio](https://github.com/INAPP-Mobile/factorio) | Web service |

## Configuration

- **Start command:** `/usr/local/bin/railway-entrypoint.sh`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/factorio`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/factorio)
