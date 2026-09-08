# Deploy Nextcloud Mini on Railway

Private file sync, sharing and collaboration you host yourself

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-mini)

## About

Nextcloud is the open-source platform behind millions of private clouds: file sync and share, plus calendar, contacts, notes, photos and collaborative editing, all on hardware you control. People run it to get Google Drive behaviour without handing a third party their family photos or client contracts. Nextcloud Mini deploys that software in its smallest honest shape.

Deploy Nextcloud with this template and you get one Railway service, `nextcloud`, built from the official `nextcloud:34-apache` image. A single volume at `/var/www/html` holds the application, your configuration, the user data directory and an SQLite database, so there is no database service to provision or pay for. Apache serves the web interface and WebDAV on port 80 behind Railway's HTTPS edge, and Nextcloud's job runner is supervised in the same container — so file scanning, previews and trash cleanup run in the recommended `cron` mode rather than the browser-triggered fallback most single-container setups settle for.

![Diagram of the single Nextcloud service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788749542/nextcloud-mini-architecture.png)

Nextcloud Hub is a productivity suite, not a file locker. Self-hosting makes sense when the data is sensitive, when per-seat storage pricing stops adding up, or when you want the files somewhere you can point at.

Key features:

- File sync and share with versioning, a trash bin, and share links with passwords and expiry dates
- Calendar, contacts and tasks over open CalDAV/CardDAV, so standard clients work
- Collaborative Markdown and rich-text editing in the browser
- Photos, with albums and a timeline built from your uploads
- Server-side encryption, two-factor authentication and per-share permissions
- An app store covering notes, bookmarks, RSS, forms and project boards

The architecture is deliberately flat: one service running Apache with `mod_php`, the Nextcloud application and a `cron` daemon under a process supervisor, and one volume holding every piece of mutable state — nothing to keep in version lockstep, nothing that can drift.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextcloud | [gridalpha/nextcloud-mini-railway](https://github.com/gridalpha/nextcloud-mini-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Apache listening port, also health-checked |
| `OVERWRITEHOST` | - | Host used in generated links |
| `OVERWRITECLIURL` | - | Base URL for background jobs |
| `TRUSTED_PROXIES` | 100.64.0.0/10 fd00::/8 | Railway edge ranges |
| `PHP_MEMORY_LIMIT` | 512M | PHP memory ceiling |
| `PHP_UPLOAD_LIMIT` | 10G | Maximum single upload size |
| `APACHE_BODY_LIMIT` | 1073741824 | Apache request body limit |
| `OVERWRITEPROTOCOL` | https | Scheme used in generated links |
| `NEXTCLOUD_ADMIN_USER` | (secret) | First administrator account name |
| `FORWARDED_FOR_HEADERS` | HTTP_X_FORWARDED_FOR | Header carrying the real client IP |
| `NEXTCLOUD_ADMIN_PASSWORD` | (secret) | First administrator password |
| `NEXTCLOUD_TRUSTED_DOMAINS` | - | Host Nextcloud will answer for |
| `NEXTCLOUD_DEFAULT_PHONE_REGION` | US | Region for phone number parsing |
| `NEXTCLOUD_MAINTENANCE_WINDOW_START` | 1 | UTC hour for heavy background jobs |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nextcloud-mini)
