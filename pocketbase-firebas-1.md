# Deploy PocketBase — Open Source Firebase & Supabase Alternative on Railway

Self-host PocketBase: Realtime DB, Auth & Storage on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pocketbase-firebas-1)

## About

PocketBase is an open-source backend-as-a-service packed into a single Go binary — it gives you a realtime SQLite database, built-in authentication (email/password + OAuth2), file storage, access rules, and an admin dashboard, all without running a separate database server or managing multiple containers. Self-host PocketBase on Railway in seconds: this template ships a production-ready Alpine-based Docker image running PocketBase v0.36.6, with a persistent volume for your data and a randomly generated encryption key pre-wired — one-click deploy, no config needed.

PocketBase is a self-contained Go backend that embeds SQLite — the entire server, API, and admin UI compile into a ~15 MB binary. There's no separate database process, no container orchestration, and no complex configuration. The REST-ish API and JavaScript/Dart SDKs make it easy to hook into any frontend.

Key features:
- **Realtime subscriptions** — SSE-based live updates on collection changes
- **Built-in auth** — email/password, OAuth2 (Google, GitHub, GitLab, Facebook), and API key support
- **File storage** — local or S3-compatible; thumbnails generated on the fly
- **Admin dashboard** — schema builder, data editor, log viewer, and settings UI
- **Extendable** — add custom routes and hooks via Go or the JS VM plugin
- **Single binary** — runs anywhere: VPS, Raspberry Pi, Railway, or your laptop

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PocketBase | [praveen-ks-2001/pocketbase-railway-template](https://github.com/praveen-ks-2001/pocketbase-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8090 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/pocketbase-firebas-1)
