# Deploy Karakeep on Railway

Bookmark manager with AI tagging and full-page archive. Was Hoarder.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-2)

## About

# Karakeep

[Karakeep](https://karakeep.app/) (previously Hoarder) is a self-hostable bookmark-everything app: save links, notes, and images, and let AI tag them automatically. Full-text search, full-page archival, screenshots, browser extensions, and mobile apps included.

## What this template deploys

| Service | Purpose |
|---|---|
| `web` | The Karakeep app (public, with a persistent volume for your data) |
| `chrome` | Headless browser used to crawl, screenshot, and archive the pages you bookmark (private) |
| `meilisearch` | Full-text search engine (private, with a persistent volume) |

Secrets are generated automatically on deploy. No configuration is required — click deploy, wait for the three services to go green, and open the app.

## After deploying

1. Open the `web` service's public URL and **create your account** — the first signup is yours.
2. Recommended: add `DISABLE_SIGNUPS=true` to the `web` service afterwards so strangers can't register on your instance.
3. Optional: add `OPENAI_API_KEY` to the `web` service to enable AI auto-tagging ([cost notes](https://docs.karakeep.app/administration/openai)), or use [another AI provider](https://docs.karakeep.app/configuration/different-ai-providers).
4. Install the [mobile apps and browser extensions](https://docs.karakeep.app/using-karakeep/quick-sharing) for one-tap saving.

More options (full-page archival, inference languages, etc.): [environment variables reference](https://docs.karakeep.app/configuration/environment-variables).

## Updating

The `web` service tracks the `release` tag (latest stable). Redeploy the service to pull the newest version, or pin a specific version from the [releases list](https://github.com/karakeep-app/karakeep/pkgs/container/karakeep).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.41.0` | Database |
| web | `ghcr.io/karakeep-app/karakeep:release` | Web service |
| chrome | `zenika/alpine-chrome:124` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MEILI_NO_ANALYTICS` | meilisearch | true |
| `DATA_DIR` | web | /data |
| `NEXTAUTH_SECRET` | web | (secret) |

## Configuration

- **Volume:** `/meili_data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `chromium-browser --headless --no-sandbox --disable-gpu --disable-dev-shm-usage --remote-debugging-address=:: --remote-debugging-port=9222 --hide-scrollbars --disable-blink-features=AutomationControlled --window-size=1440,900`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/karakeep-2)
