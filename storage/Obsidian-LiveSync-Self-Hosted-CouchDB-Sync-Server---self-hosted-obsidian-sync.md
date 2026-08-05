# Deploy Obsidian LiveSync — Self-Hosted CouchDB Sync Server on Railway

Self-host Obsidian sync — private CouchDB for LiveSync, mobile ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-obsidian-sync)

## About

This template deploys a CouchDB server pre-configured for the Obsidian Self-hosted LiveSync plugin — the fiddly part of self-hosting Obsidian sync, done for you. Instead of hand-writing CouchDB's CORS, auth, and request-size settings (and debugging why mobile won't connect), you get a working sync backend with the exact configuration LiveSync needs, plus automatic HTTPS so mobile Obsidian works out of the box. Own your notes, sync across every device in real time, end-to-end encrypted.

---

Self-hosting Obsidian sync is really about one thing: configuring CouchDB correctly. That's where every DIY attempt gets stuck, and it's what this template solves.

**The CouchDB config is pre-baked — including the settings everyone gets wrong.** LiveSync needs CouchDB tuned with specific settings: `single_node=true`, `require_valid_user=true` on both `[chttpd]` and `[chttpd_auth]`, a large `max_http_request_size` for bulk syncs, a raised `max_document_size` for attachments, and — the part that trips up almost everyone — a precise `[cors]` block. This template ships all of it correct, so the plugin connects on the first try instead of failing with cryptic errors.

**The CORS origins are the number-one gotcha — and they're set right.** LiveSync connects from the Obsidian app, so CouchDB's CORS must allow the exact origins `app://obsidian.md` and `capacitor://localhost`, with `credentials=true` and specific headers and methods. The `capacitor://localhost` origin is what makes **mobile** Obsidian work, and it's the single most common thing people forget — leaving mobile sync mysteriously broken. This template includes it, so desktop and mobile both connect.

**Automatic HTTPS means mobile sync just works.** Mobile Obsidian requires a valid SSL certificate, which normally forces a reverse proxy, Cloudflare Tunnel, or Let's Encrypt by hand. Railway provides automatic HTTPS on your domain, so mobile connects securely with zero extra setup — one of the biggest advantages of hosting here.

**Set your admin credentials and create the database.** `COUCHDB_USER` and `COUCHDB_PASSWORD` create the admin on first boot — use a strong password. After deploy, create a database (commonly `obsidian-livesync`) to point the plugin at, then use LiveSync's Setup URI to clone the config to your other devices.

**Your notes persist on the volume.** All synced data lives in CouchDB's data directory on a persistent volume, so it survives redeploys. Because it holds your entire vault, back it up, and compact the database periodically to reclaim space from CouchDB's revision history.

Typical cost: **~$5/month** on Railway for the single CouchDB service. CouchDB and the LiveSync plugin are both free and open source — a one-time setup versus Obsidian Sync's ongoing subscription.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Obsidian Livesync | [BURNI80/obsidian-livesync-railway](https://github.com/BURNI80/obsidian-livesync-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `COUCHDB_USER` | (secret) |
| `COUCHDB_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/opt/couchdb/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/self-hosted-obsidian-sync)
