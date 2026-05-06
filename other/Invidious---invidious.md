# Deploy Invidious on Railway

Privacy-respecting front-end for YouTube. Self-hosted, no ads, no tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invidious)

## About

Invidious is a privacy-respecting, open-source front-end for YouTube. It lets you watch and search videos without ads, tracking, JavaScript, or a Google account. This template provisions a complete stack — front-end, companion stream extractor, and Postgres database — ready to deploy in one
  click.

  ## About Hosting Invidious

  Self-hosting Invidious gives you a private alternative to YouTube's site, with no telemetry sent to Google. Subscriptions, watch history, and playlists live in your own database. This template deploys three services on Railway's private network: the Invidious web app, an invidious-companion
  sidecar that handles video stream extraction, and a Postgres database with persistent storage. Railway auto-injects fresh secrets and resolves cross-service references at deploy time, so each new template instance gets unique credentials with no manual setup. Most users will need to add YouTube
   cookies on the Companion service after first deploy — see Implementation Details below.

  ## Common Use Cases

  - A personal, ad-free YouTube viewing instance accessible from any device
  - A shared instance for family or friends to browse without Google sign-ins
  - Privacy-respecting research and content discovery without leaving a Google footprint
  - An API backend for embedding YouTube content into your own applications

  ## Dependencies for Invidious Hosting

  - A PostgreSQL 16 database for user accounts, subscriptions, and watch history
  - An invidious-companion sidecar service for video stream extraction
  - Optionally, YouTube cookies from a logged-in burner Google account, required for video playback when YouTube blocks the Railway egress IP from validating proof-of-origin tokens

  ### Deployment Dependencies

  - [Invidious](https://github.com/iv-org/invidious) — upstream project
  - [Invidious Companion](https://github.com/iv-org/invidious-companion) — stream extractor
  - [Invidious docs](https://docs.invidious.io/), including [YouTube errors explained](https://docs.invidious.io/youtube-errors-explained/) for diagnosing playback failures
  - [yt-dlp cookie export guide](https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies) — safe procedure for exporting YouTube cookies into Companion's `YOUTUBE_SESSION_COOKIES`

  ### Implementation Details

  The three services communicate over Railway's private IPv6 network — neither Postgres nor Companion is publicly exposed. Companion's API is reached via path-prefixed URLs (`http://companion.railway.internal:8282/companion`); Invidious's `INVIDIOUS_CONFIG` YAML wires this automatically. All
  shared secrets — `HMAC_KEY`, `INVIDIOUS_COMPANION_KEY`, and `POSTGRES_PASSWORD` — are auto-generated per deploy via `${{secret(N)}}` template functions. Companion's `SERVER_SECRET_KEY` references `${{Invidious.INVIDIOUS_COMPANION_KEY}}`, so the two services share a key without it being stored
  twice.

  If watch pages return *"Companion is starting. Please wait until a valid potoken is found"*, YouTube has rate-limited Railway's egress IP. Set `YOUTUBE_SESSION_COOKIES` on the Companion service using a cookie string from a logged-in burner Google account (see the yt-dlp guide linked above).
  Alternatively, set `PROXY=http://user:pass@host:port` if you have a residential proxy.

  ## Why Deploy Invidious on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Invidious on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Companion | `quay.io/invidious/invidious-companion:latest` | Worker |
| Postgres | `postgres:16-alpine` | Database |
| Invidious | `quay.io/invidious/invidious:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Companion | 8282 | Port Companion listens on (referenced from Invidious config) |
| `SERVER_SECRET_KEY` | Companion | (secret) | Shared secret with Invidious. Must reference Invidious's variable, NOT be independently generated. |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot. Static. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection string for clients that expect a single URL. Composed from references — auto-updates if the password is regenerated. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name. Static; matches the upstream Postgres image's default convention. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated Postgres password. Sealed at deploy time. Referenced by PGPASSWORD and DATABASE_URL — do not change after first deploy or existing connections will break. |
| `PORT` | Invidious | 3000 | Port Invidious listens on (also referenced from INVIDIOUS_CONFIG). |
| `HMAC_KEY` | Invidious | - | Auto-generated HMAC secret used to sign user session cookies. Do NOT change after first deploy — all signed-in sessions will be invalidated. |
| `INVIDIOUS_CONFIG` | Invidious | - | Full Invidious config in YAML. Database credentials, companion wiring, and domain are all references — leave them alone. |
| `INVIDIOUS_COMPANION_KEY` | Invidious | - | Auto-generated shared secret authenticating the Invidious↔Companion link. Companion.SERVER_SECRET_KEY references this value. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/feed/popular`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/invidious)
