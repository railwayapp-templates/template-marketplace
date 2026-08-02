# Deploy Pocketbase Standalone [Aug 26] on Railway

Open source backend — SQLite, REST API, auth, admin UI · Updated Aug 26

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-standalone)

## About

Railway provides a modern, streamlined platform for deploying web applications and databases. This template bundles **PocketBase** — the open source backend in a single binary (SQLite database, REST API, auth, file storage and admin UI) — configured to run out of the box with a persistent volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [marco-quintella/pocketbase-standalone](https://github.com/marco-quintella/pocketbase-standalone) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PB_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb_data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pocketbase-standalone)
