# Deploy Andromeda - Jotts on Railway

A minimal markdown note taking app written in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-jotts)

## About

Andromeda - Jotts is a self-hosted minimal markdown notes app written in Go. The `jotts server` mode serves a password-protected web UI plus an optional JSON API; the same binary also ships a Bubble Tea TUI editor and a CLI uploader. Notes are stored in a single SQLite database.

Hosting Andromeda - Jotts means running `jotts server`, a single Go binary that serves the web UI and JSON API over HTTP. State lives in a SQLite file, so deployment needs only a persistent volume plus environment variables (login password, port, optional API key). Markdown renders server-side with goldmark; all templates and assets are embedded, and the build is pure-Go SQLite (no CGO). On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jotts | `ghcr.io/stevedylandev/andromeda/jotts` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `COOKIE_SECURE` | true | Use secure cookies |
| `JOTTS_API_KEY` | (secret) | Optional API key to access notes from Jotts TUI |
| `JOTTS_PASSWORD` | (secret) | Password you would like to login with |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-jotts)
