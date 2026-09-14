# Deploy sqlite3-railway-template on Railway

SQLite on persistent storage with a web manager UI - one-click deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlite3-railway-template)

## About

Deploying and hosting SQLite on Railway gives you a lightweight, zero-administration
database whose files live on a persistent Railway volume, administered through the
bundled sqlite-web manager UI. The template provisions one service built from this
repository's pinned Dockerfile (`python:3.12-slim-bookworm`, sqlite-web 0.8.1, gevent
26.8.0) and one volume mounted at `/data`. The manager UI is password-protected with a
secret Railway generates at deploy time (`SQLITE_WEB_PASSWORD`), the service healthchecks
on an unauthenticated `/health` endpoint, and it restarts on failure (10 retries). Set
`SQLITE_DATABASES` to a comma-separated list of names to have additional empty database
files created at boot; all existing `*.db`/`*.sqlite`/`*.sqlite3` files on the volume are
browsable in the UI's dataset selector.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sqlite3 | [lNamelessl/sqlite3-railway-template](https://github.com/lNamelessl/sqlite3-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SQLITE_WEB_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sqlite3-railway-template)
