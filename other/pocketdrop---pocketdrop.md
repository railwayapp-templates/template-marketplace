# Deploy pocketdrop on Railway

Private drop zone for text, links and files between your devices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketdrop)

## About

PocketDrop is a private drop zone for moving text, links and files between your own devices. Share something from any Android app and it appears instantly on your laptop, or paste and drag things into the page on your laptop and pick them up on your phone. Drops disappear on their own after first use or a time you choose.

PocketDrop is a single small Rust binary that serves the web app, keeps a live connection to every open page and stores drops as plain files on a volume. This template builds it from the Dockerfile, attaches a volume at `/data`, adds a health check and generates the passphrase, session secret and API token for you. After the deploy, open the service's **Variables** tab to read your `PASSPHRASE`, then open the public URL and log in. On Android, install the site as an app from Chrome so PocketDrop shows up in the share menu.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketdrop | [lendev4/pocketdrop](https://github.com/lendev4/pocketdrop) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_TOKEN` | (secret) |
| `DEFAULT_EXPIRY` | once |
| `SESSION_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Rust, JavaScript, CSS, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketdrop)
