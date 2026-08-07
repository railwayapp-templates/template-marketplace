# Deploy AzuraCast v0.23.7 | Web Radio Whose Admin Account Cannot Be Claimed on Railway

Self-hosted internet radio: Icecast, Liquidsoap, playlists, live DJ, stats.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/azuracast-v0237-or-web-radio-whose-admin)

## About

AzuraCast is a self-hosted web radio station in one package: Icecast for the stream,
Liquidsoap for automated playlists and scheduling, a browser-based WebDJ for live shows, media
management, podcasts, listener analytics and a full REST API. It is the open-source answer to
paying a hosted radio provider per listener.

This template deploys it as **one service on a volume**, with the administrator account
created during boot instead of being left for whoever finds the URL first.

**AzuraCast's setup wizard authenticates nobody.** On a fresh install
`App\Controller\Frontend\SetupController::registerAction` serves `GET /setup/register` and
accepts its POST from any caller at all, for as long as the `users` table is empty — and the
account it creates carries the Super Administrator role. That is the correct design for a box
on your own LAN. On Railway the public HTTPS URL exists the moment the deploy goes healthy,
which is normally minutes before the deployer opens the page, and the station, its media
library, its stream keys and its listener data sit behind that window. Reproduced against the
stock image: anonymous `GET /setup/register` → **200** with a usable CSRF token, anonymous
POST → **302**, and `azuracast:account:list` then shows one Super Administrator nobody
deployed.

This template seeds the account from `AZURACAST_ADMIN_PASSWORD` after the database migrations
and **before nginx starts**, so there is no interval where the site answers and the account
does not exist — polled every three seconds from container start, the first response
`/setup/register` ever gives is **403**, in the same second `/api/status` first returns 200.
Deployed with an empty password the container refuses to start rather than publishing a
claimable instance.

**Ten volumes folded onto one.** The upstream image declares the MariaDB data directory,
station media, backups, uploads and six storage directories as separate Docker volumes.
Railway attaches exactly one per service, so all ten are relocated onto the mount at `/data`
before any service starts, and their ownership is repaired — Railway mounts volumes as uid 0
and none of these services run as root. Verified across a redeploy: the seeded password still
logs in, the settings and the station media are still there, and the second boot reports the
existing account instead of re-seeding.

**Pinned, and built here rather than on your build minutes.** This deploys a prebuilt
`ghcr.io/bon5co/azuracast-railway` image pinned to AzuraCast 0.23.7. AzuraCast's database
migrations are one-way, so a template that builds `FROM ghcr.io/azuracast/azuracast:latest`
hands every future redeploy an unrequested version upgrade with no way back — and charges the
deployer for rebuilding a ~4 GB image each time.

**Pool sizes come from the container, not from a constant.** Upstream fixes php-fpm at 20
workers with a 256M memory limit each, and InnoDB's buffer pool at 128M, whatever the service
is running on. Both are computed from `/sys/fs/cgroup` at boot — in a 2 GiB container that is
`php_fpm_max_children=4 innodb_buffer_pool_size=307M` — and both stay overridable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| azuracast | `ghcr.io/bon5co/azuracast-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AZURACAST_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/azuracast-v0237-or-web-radio-whose-admin)
