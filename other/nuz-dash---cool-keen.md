# Deploy nuz-dash on Railway

Deploy and Host nuz-dash with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cool-keen)

## About

Nuz-Dash is a multiplayer Pokemon Nuzlocke platform: play GB/GBA/NDS games in the
browser, let the tracker log encounters straight from the game's memory, and watch
your friends' runs live in a shared lobby. No accounts — invite links are all it
takes. Bring your own legally-dumped ROMs.

Nuz-Dash is a single lightweight Node.js service, deployed from a Dockerfile —
Railway builds the client and boots the server automatically. All state (lobbies,
runners, attempts, ROMs, save states) lives as files on one attached volume, so
there is no database to provision. The template ships with the volume mounted at
`/data` and a randomly generated `ADMIN_TOKEN` that protects the built-in admin
dashboard at `/admin` (HTTP basic auth, user `admin`). After deploying, open your
instance's URL, create a lobby, upload your ROM, and share the invite link — each
friend gets their own secret link with their run history, saves, and controller
settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nuz-dash | [tummyslyunopened/nuz-dash](https://github.com/tummyslyunopened/nuz-dash) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_TOKEN` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cool-keen)
