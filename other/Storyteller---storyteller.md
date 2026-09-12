# Deploy Storyteller on Railway

Ebook + audiobook alignment: self-hosted Whispersync-style read-along

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/storyteller)

## About

Storyteller turns an ebook plus its audiobook into a read-along book: it transcribes the narration,
aligns every sentence with the text, and produces EPUB 3 books with synchronised highlighting. Read
in the Storyteller iOS/Android apps or the web reader, switch between reading and listening, and
never lose your place. It is the self-hosted alternative to Kindle/Audible Whispersync and
immersion reading, for books you own. This is a community-maintained template, not affiliated with
the Storyteller project.

One Railway service, `storyteller`, runs the official Storyteller image
(`registry.gitlab.com/storyteller-platform/storyteller:web-v2.14.21`) through a thin wrapper
(`ghcr.io/youssefsiam38/storyteller-railway`, version-specific tag with recorded digest). The
wrapper creates the administrator from generated variables **before** the service is exposed, so
Storyteller's normal "create admin account" first-run page is never reachable by strangers. The
service gets the public HTTPS domain and one volume at `/data` for the SQLite database, uploads,
and the aligned library. The healthcheck is Storyteller's own `/api/health`, which reports ready
only when the database and the Readium helper are up. Schema migrations run automatically at
start. Single replica; a few seconds of downtime on redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storyteller | `ghcr.io/youssefsiam38/storyteller-railway:1.0.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8001 | Port Storyteller listens on. Leave at 8001. |
| `APP_READY_TIMEOUT` | 300 | Wrapper: seconds to wait for the loopback instance during the first-boot admin bootstrap. |
| `STORYTELLER_WEB_URL` | - | Seeds the Web URL setting while it is empty (from the Railway domain). Edit it in Settings afterwards, e.g. for a custom domain. |
| `STORYTELLER_LOG_LEVEL` | info | error, warn, info, debug, or trace. |
| `STORYTELLER_ADMIN_NAME` | Administrator | Display name of the administrator. |
| `STORYTELLER_SECRET_KEY` | (secret) | Signs auth tokens and encrypts stored provider credentials. Generated per deployment; changing it later logs everyone out. |
| `STORYTELLER_ADMIN_EMAIL` | - | Your email address for the administrator account (used for password reset and account linking). |
| `STORYTELLER_LIBRARY_NAME` | My Library | Seeds the library name while it is empty. |
| `STORYTELLER_ADMIN_PASSWORD` | (secret) | Administrator password created on first boot. Reveal it here to sign in the first time, then change it in the app. |
| `STORYTELLER_ADMIN_USERNAME` | (secret) | Administrator username created on first boot, before the service is public. Ignored once a user exists. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/storyteller)
