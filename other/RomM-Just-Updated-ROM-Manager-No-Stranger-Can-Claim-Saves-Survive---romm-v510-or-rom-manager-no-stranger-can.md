# Deploy RomM | (Just Updated) ROM Manager No Stranger Can Claim, Saves Survive on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/romm-v510-or-rom-manager-no-stranger-can)

## About

RomM is a self-hosted ROM manager and player: it scans your game library, pulls
metadata and artwork, tracks saves and save states, and plays supported systems
straight in the browser.

This template ships RomM 5.1.0 with the admin account already created, so the
instance is never claimable by a stranger, and with every file RomM generates —
saves, states, covers, config — on the persistent volume.

Two services: the RomM app (web UI, REST API, job queue and an embedded valkey)
on a public domain, and MariaDB on private networking. The app keeps all of its
durable state under one directory, `/romm` — `library/` for ROMs, `assets/` for
saves and states, `resources/` for covers and screenshots, plus its config,
cache and the valkey snapshot, which this image relocates onto the same volume
because Railway mounts one volume per service.

The admin account is created during boot, before the web server accepts its
first request, from the generated `ROMM_ADMIN_PASSWORD`. Log in as `admin` with
that value from the Variables tab. This matters because a stock RomM with no
admin lets any anonymous caller create one over the API; the container also
refuses to start if that password is left empty. The auth routes are rate
limited to 10 requests a minute per client, keyed on the real client address
behind Railway's proxy — upstream has no login throttle at all.

The release tag is pinned. RomM applies database migrations forward on every
start and never downgrades, so tracking `latest` would turn each redeploy into an
unrequested upgrade.

After deploying: log in, upload or sync ROMs under `/romm/library`, and run a
scan. Metadata providers (IGDB, MobyGames, SteamGridDB, RetroAchievements,
ScreenScraper) are optional and take credentials you add later; Hasheous is
enabled by default and needs no key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `ghcr.io/bon5co/romm-railway-mariadb:11.4` | Database |
| romm | `ghcr.io/bon5co/romm-railway:5.1.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `ROMM_ADMIN_PASSWORD` | romm | (secret) |
| `ROMM_AUTH_SECRET_KEY` | romm | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/romm`

**Category:** Other

[View on Railway →](https://railway.com/deploy/romm-v510-or-rom-manager-no-stranger-can)
