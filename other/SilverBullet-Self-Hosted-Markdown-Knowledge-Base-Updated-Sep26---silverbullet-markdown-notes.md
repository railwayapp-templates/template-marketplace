# Deploy SilverBullet — Self-Hosted Markdown Knowledge Base [Updated Sep'26] on Railway

Self-host SilverBullet — Markdown notes & queryable second brain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/silverbullet-markdown-notes)

## About

SilverBullet is an open-source, Markdown-based note-taking app and personal knowledge base — a self-hosted "second brain" where every page is a plain `.md` file you fully own. It combines a live-preview editor, wiki-style links, and an indexed object database that lets you query your notes like a database, extended with embedded Lua scripting for custom workflows. Because notes are just Markdown on a volume, there's no proprietary format, no lock-in, and no per-seat pricing. This template deploys SilverBullet with a persistent volume for your notes and single-user auth — a private, portable knowledge base in minutes.

---

SilverBullet is refreshingly simple, and two specifics make it work correctly and keep your notes safe — both handled here.

**Every page is a Markdown file on the `/space` volume — persist it.** SilverBullet's whole philosophy is that your notes outlive the tool: each page is a plain `.md` file under `/space`, with no database to lock them in. This template mounts a persistent volume there, so your entire knowledge base survives redeploys — and upgrades are just an image-tag bump that never touches your data. Miss the volume and your notes vanish on redeploy; mount it, and they're portable, greppable text you can back up anywhere.

**HTTPS is required — and Railway provides it automatically.** This is the key technical point: SilverBullet relies on the browser's service worker (for offline sync) and clipboard APIs, which browsers only enable over a secure connection — over plain HTTP, the app doesn't work properly. Railway serves your instance over automatic HTTPS out of the box, so sync and the full editor work immediately — a genuine platform advantage over a bare VPS.

**Single-user auth via `SB_USER`.** SilverBullet uses simple basic authentication for one user: `SB_USER` in the form `username:password` sets your login. This template generates strong credentials, which you'll find in the Variables tab and can change by updating `SB_USER` and redeploying. Note it's single-user by design — one shared credential, ideal for a personal knowledge base or a small team sharing one login, rather than multi-account access.

**Your Markdown is a database, and it's a PWA.** SilverBullet parses every page into objects — tasks, tags, headers, links, front matter — and holds them in an index the editor queries live, so a directory of text files behaves like a queryable database, with embedded Lua for custom queries and automations. It's also a progressive web app, so once deployed you use it from any browser and install it on your phone with offline support — a personal wiki, daily journal, project planner, or second brain.

Typical cost: **~$5/month** on Railway for the single lightweight service and volume. SilverBullet is MIT-licensed and free, versus per-seat or subscription note apps.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| silverbullet | `ghcr.io/silverbulletmd/silverbullet` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP port served and health-checked |
| `SB_FOLDER` | /data/space | Server root, one level below the volume |
| `SB_SPACE_NAME` | My Space | Name of the first space, bound at / |
| `SB_ADMIN_PASSWORD` | (secret) | First administrator account password |
| `SB_ADMIN_USERNAME` | (secret) | First administrator account username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/silverbullet-markdown-notes)
