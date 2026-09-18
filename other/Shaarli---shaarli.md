# Deploy Shaarli on Railway

Personal bookmark manager that stores links, tags and notes in one file

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shaarli)

## About

Shaarli is a personal, minimalist bookmarking service: you save a link with tags and a note, and it goes onto a page you own. It began as a Delicious clone and kept that shape — one stream of links, public or private, with full-text search, per-tag Atom feeds and a daily digest. Developers self-host Shaarli because it needs no database, sends no telemetry, has no accounts beyond your own, and keeps the whole archive in one file you can copy anywhere.

This template runs Shaarli as one Railway service, `shaarli`, built from the [gridalpha/shaarli-railway](https://github.com/gridalpha/shaarli-railway) repository on top of the official `ghcr.io/shaarli/shaarli:release` image. The container bundles nginx and PHP-FPM, and a volume at `/var/www/shaarli/data` holds your bookmarks, the configuration and the thumbnail cache, so everything survives redeploys. Deploy Shaarli with a username and a password and the administrator account already exists when the URL comes up — no setup wizard sits open on the public internet for whoever finds it first.

![The single Shaarli service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789655123/shaarli-architecture.webp)

Shaarli solves a narrow problem completely: keeping your own links, with your own words attached, somewhere that will still be there in ten years. It is single-user by design — no teams, no invitations, no permissions, just you, a list, and a page others can read if you let them.

- A URL, a title, an unlimited-length description and as many tags as you like
- Any entry public or private, or a note with no URL at all
- Full-text search across titles, descriptions and URLs, plus tag filtering
- Per-tag Atom and RSS feeds, a daily digest, and a picture wall of thumbnails
- Markdown descriptions, a plugin and theme system, and a REST API for third-party clients
- Import and export as a standard Netscape bookmark file
- `utm_source` and similar tracking parameters stripped from saved URLs

There is no database service here because Shaarli does not use one. Every bookmark lives in a single PHP datastore file, written once and read many times, which the operating system keeps in cache — instances run with tens of thousands of entries this way. That is the whole architecture: one container serving nginx and PHP, one volume holding the file, and one replica, since the file has a single writer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shaarli | [gridalpha/shaarli-railway](https://github.com/gridalpha/shaarli-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port nginx serves on |
| `SHAARLI_TITLE` | Shaarli | Title shown in the header and feeds |
| `SHAARLI_LANGUAGE` | auto | auto, de, en, fr, jp, ru, zh_CN |
| `SHAARLI_PASSWORD` | (secret) | First administrator's password, minimum 8 characters |
| `SHAARLI_TIMEZONE` | UTC | Any tz database name |
| `SHAARLI_USERNAME` | (secret) | Administrator login name |
| `SHAARLI_BAN_AFTER` | 4 | Failed logins before lockout |
| `SHAARLI_ENABLE_API` | true | REST API for mobile and browser clients |
| `SHAARLI_FORCE_LOGIN` | (secret) | true hides everything from anonymous visitors |
| `SHAARLI_BAN_DURATION` | 1800 | Lockout length in seconds |
| `SHAARLI_CHECK_UPDATES` | true | Notify the administrator of new releases |
| `SHAARLI_THUMBNAILS_MODE` | all | all, common or none |
| `SHAARLI_DEFAULT_PRIVATE_LINKS` | false | true marks new bookmarks private |
| `SHAARLI_SESSION_PROTECTION_DISABLED` | false | Escape hatch; leave off |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/shaarli/data`

**Category:** Other · **Languages:** PHP, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/shaarli)
