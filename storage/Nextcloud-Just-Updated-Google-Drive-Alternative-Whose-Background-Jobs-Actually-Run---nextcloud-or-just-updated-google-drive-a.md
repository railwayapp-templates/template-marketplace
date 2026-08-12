# Deploy Nextcloud | (Just Updated) Google Drive Alternative Whose Background Jobs Actually Run on Railway

Google Drive alternative whose background jobs and login throttle work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-or-just-updated-google-drive-a)

## About

Nextcloud is a self-hosted file sync and collaboration platform — a private alternative to Google
Drive, Dropbox and Microsoft 365. Files sync to desktop and mobile clients over WebDAV, and the
same instance carries calendars, contacts, shared links, Nextcloud Talk and 300+ apps from its own
app store.

This deployment runs Nextcloud 34.0.2 on a volume with Postgres and Redis, and it fixes the three
things that decide whether a Nextcloud on a redeploying platform behaves: the background job
runner, the client IP behind the edge proxy, and the admin account.

Hosting Nextcloud means running a PHP application that keeps user data on disk, a database for
metadata, and a scheduler for the work that happens when nobody is looking. On Railway three
details matter more than they do on a VPS:

- **Background jobs.** A fresh install runs them in `ajax` mode — one job per page load. An
  instance driven by sync clients and WebDAV loads no pages, so trash and version expiry, share
  expiry, preview generation, activity mail and app updates never run. This deployment switches to
  `cron` mode and runs `cron.php` inside the app container every five minutes, so no second
  always-on service is billed for it.
- **The client address.** The container's peer is always the platform edge, so Nextcloud's
  brute-force protection collapses onto a single bucket. Measured on the stock image: eight failed
  logins from eight different clients recorded **0** attempts against each client and **8** against
  the proxy, with a 25-second delay applied to that one shared bucket — i.e. one attacker slows the
  login page for everybody and is never singled out. Here the client address is recovered from the
  first `X-Forwarded-For` hop, and the same probe records one attempt per client and none against
  the proxy.
- **The admin account.** It is created here from a generated secret before the URL serves a
  request, and re-applied on every boot, so rotating it is a redeploy rather than a support
  ticket.

The image is pinned to 34.0.2. Nextcloud only upgrades one major at a time and refuses to start
when the data directory is more than one major behind — on a tag that floats, a redeploy is an
unrequested upgrade and a long-idle instance is a container that will not boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextcloud | `ghcr.io/bon5co/nextcloud-railway:34.0.2` | Web service |
| postgres | `postgres:17.10-alpine` | Database |
| redis | `redis:7.4-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | nextcloud | (secret) |
| `NEXTCLOUD_ADMIN_PASSWORD` | nextcloud | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nextcloud-or-just-updated-google-drive-a)
