# Deploy nuz-dash on Railway

Deploy and Host nuz-dash with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cool-keen)

## About

Nuz-Dash is a multiplayer Pokemon Nuzlocke platform: play GB/GBA/NDS games in the
browser, let the tracker log encounters straight from the game's memory, and watch
your friends' runs live in a shared lobby. No accounts — invite links are all it
takes. BYO ROM: each runner's legally-dumped game loads straight from their own
browser and never touches the server.

Nuz-Dash is a single lightweight Node.js service, deployed from a Dockerfile —
Railway builds the client and boots the server automatically. All state (lobbies,
runners, attempts, save backups) lives as files on one attached volume, so there
is no database to provision. **ROM files are not part of that state**: by default
the server is ROM-clean — it stores only a SHA-256 fingerprint of the lobby's
game, and every runner supplies their own copy in their browser, where it boots
into the emulator locally. (Classic hosted-ROM mode exists for private groups,
as an explicit admin opt-in behind a typed confirmation.)

The template ships with the volume mounted at `/data` and a randomly generated
`ADMIN_TOKEN` that protects the built-in admin dashboard at `/admin` (HTTP basic
auth, user `admin`, plus mandatory authenticator-app 2FA — you'll enroll with a
QR code on your first login). After deploying, open your instance's URL, create
a lobby, register your game (BYO ROM — you pick the file, only its fingerprint
is stored), and share the invite link — each friend gets their own secret link
with their run history, saves, and controller settings, and the address bar
swaps it for a streamer-safe decoy URL while they play.

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
