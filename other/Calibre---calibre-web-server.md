# Deploy Calibre on Railway

Web app for reading and managing your own e-book collection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calibre-web-server)

## About

Calibre-Web is an open-source web app that turns a Calibre e-book database into a browsable, searchable online library. It gives you a reading interface for EPUB, PDF, CBZ, MOBI and audiobook files, per-user permissions, metadata editing, an OPDS feed, Kobo sync and one-click sending to a Kindle. It suits anyone whose books live in laptop folders rather than in an app they can reach from a phone or an e-ink reader.

Deploy Calibre-Web on Railway and you get a working library on first boot rather than a setup screen. `calibre-web` runs the app and mounts a persistent volume at `/config` holding the library, the user database, uploaded files and covers. `mailpit` is a private SMTP server the app sends through, so *Send to E-Reader*, magic-link sign-in and e-mail registration work immediately rather than waiting on an external mail provider. Only the two web interfaces are public.

![Diagram of the Calibre-Web and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787628815/calibre-web-architecture.png)

Calibre-Web reads the same `metadata.db` format the Calibre desktop program writes, so an existing collection can be lifted onto the volume as-is. Self-hosting pays off as soon as more than one person or device needs the same books: a household sharing a collection, a group circulating papers, or one reader who wants their library on a phone without syncing files by hand.

Key features:

- In-browser reading for EPUB, PDF, comic archives, plain text and audiobooks
- Per-user accounts with permissions for upload, download, edit and delete
- Metadata editing, custom columns, shelves and advanced search filters
- OPDS catalogue that KOReader, Moon+ Reader and similar apps subscribe to
- LDAP, Google and GitHub sign-in, plus reverse-proxy header auth

The architecture is deliberately small: Calibre-Web keeps users and settings in SQLite and the books on disk, so there is no database service to run or tune. Mailpit is the only companion, and exists because several features are mail-driven.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| calibre-web | [gridalpha/calibre-web-railway](https://github.com/gridalpha/calibre-web-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Username and password for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `TZ` | calibre-web | Etc/UTC | Container timezone |
| `PGID` | calibre-web | 911 | Group id the app runs as |
| `PORT` | calibre-web | 8083 | HTTP port the app listens on |
| `PUID` | calibre-web | 911 | User id the app runs as |
| `SMTP_FROM` | calibre-web | - | Sender address on outgoing mail |
| `SMTP_HOST` | calibre-web | - | Private mail server hostname |
| `SMTP_PORT` | calibre-web | 1025 | Mail server SMTP port |
| `SECRET_KEY` | calibre-web | (secret) | Session cookie signing key |
| `ADMIN_PASSWORD` | calibre-web | (secret) | Password for the admin account |
| `CALIBRE_LIBRARY_DIR` | calibre-web | /config/library | Calibre library path on the volume |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/calibre-web-server)
