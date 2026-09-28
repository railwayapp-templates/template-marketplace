# Deploy snappymail-template on Railway

Fast webmail client for your existing IMAP/SMTP mail — one-click deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snappymail-template)

## About

Deploy SnappyMail to Railway with one click. The template provisions a single webmail service built from the pinned official SnappyMail image, attaches a persistent volume at `/var/lib/snappymail`, and generates a public domain on port 8888. The admin password is generated per deployment (variable `SNAPPYMAIL_ADMIN_PASSWORD`) and seeded into the app on first boot, so the admin panel at `/?admin` is usable immediately with the password from the Variables tab.

Hosting SnappyMail yourself means your mail credentials and messages pass through your own infrastructure instead of a third-party webmail host. The template runs one service (nginx + PHP-FPM under supervisord, ~512 MB RAM is plenty) with one volume for config, contacts, filters and cache. SnappyMail is a client: it stores settings and session data locally but fetches mail live over IMAP and sends over SMTP, so storage needs stay small (1 GB volume is comfortable).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snappymail | [lNamelessl/snappymail-railway-template](https://github.com/lNamelessl/snappymail-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SNAPPYMAIL_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/snappymail`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/snappymail-template)
