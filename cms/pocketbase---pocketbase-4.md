# Deploy pocketbase on Railway

Deploy PocketBase with a persistent Railway Volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-4)

## About

Deploy a self-hosted PocketBase instance on Railway with a pinned upstream
release, Dockerfile builds, a public HTTPS endpoint, and persistent storage for
SQLite data and uploaded files.

PocketBase is an open-source backend in one Go binary. It includes a SQLite
database, authentication, file storage, realtime subscriptions, a JavaScript
hooks system, migrations, and an admin UI.

This Railway template runs PocketBase from the official GitHub release artifact
and verifies the release checksum during the Docker build. The service listens
on Railway's injected `$PORT`, exposes `/api/health` for deployment
healthchecks, and mounts a Railway Volume at `/pb/pb_data` so PocketBase state
survives redeploys.

After deployment, open the generated Railway domain and visit `/_/` to create
the first PocketBase admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [yunyu950908/pocketbase-railway-template](https://github.com/yunyu950908/pocketbase-railway-template) | Web service |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** CMS · **Languages:** JavaScript, Shell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/pocketbase-4)
