# Deploy TrailBase (Firebase Alternative) on Railway

Single-binary Firebase alternative: SQLite, auth, realtime, admin UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trailbase-firebase-alternative)

## About

TrailBase is a blazing-fast, open-source Firebase alternative that ships as a single executable: SQLite database, REST + realtime APIs, authentication (email + OAuth), file storage, a type-safe admin dashboard, and V8-powered JS/TS endpoints — all in one sub-100MB container.

This template deploys the official `trailbase/trailbase` image (pinned to 0.31.0) with a persistent Railway volume mounted at /app/traildepot, so your SQLite data, uploads, and config survive redeploys. A public HTTPS domain is generated automatically on port 4000. First boot auto-creates an admin account — open your service's **Deploy Logs** to copy the generated `admin@localhost` password, then log in at `https:///_/admin/` and change it. Total footprint is tiny (tens of MB of RAM idle), making this one of the cheapest 24/7 backends you can run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trailbase | `trailbase/trailbase:0.31.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/traildepot`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/trailbase-firebase-alternative)
