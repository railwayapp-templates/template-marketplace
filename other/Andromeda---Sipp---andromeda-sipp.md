# Deploy Andromeda - Sipp on Railway

A minimal code sharing web server + CLI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-sipp)

## About

Andromeda - Sipp is a self-hosted code-sharing service (pastebin) written in Go. The `sipp server` subcommand runs a web server with an admin panel, JSON API, and syntax highlighting via Chroma. The same binary also ships a Bubble Tea TUI and a CLI uploader for posting snippets to a remote instance.

Hosting Andromeda - Sipp means running `sipp server`, a single Go binary that serves the web UI and JSON API over HTTP. State lives in a SQLite file, so deployment needs only a persistent volume plus environment variables (API key, base URL, port, content size cap). Syntax highlighting renders server-side with Chroma. On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sipp | `ghcr.io/stevedylandev/andromeda/sipp` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SIPP_API_KEY` | (secret) | API key to access Sipp from the /admin page or through the Sipp CLI |
| `SIPP_AUTH_ENDPOINTS` | api_delete,api_list | Comma-separated list of endpoints requiring auth: api_list, api_create, api_get, api_delete, all, or none (defaults to api_delete,api_list) |
| `SIPP_MAX_CONTENT_SIZE` | 512000 | Maximum snippet content size in bytes (defaults to 512000 / 500 KB) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-sipp)
