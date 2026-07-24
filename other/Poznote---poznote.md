# Deploy Poznote on Railway

Poznote is a note-taking and documentation platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/poznote)

## About

Poznote is a self-hosted note-taking and documentation platform. It combines rich-text and Markdown notes, Excalidraw drawings, task lists, and file attachments with full-text search, folders, and tags. It supports multiple users, OIDC/SSO login, a REST API, an MCP server for AI assistants, and built-in backup and export.

Poznote ships as a single multi-arch Docker image (`ghcr.io/timothepoznanski/poznote`) built on PHP 8 and SQLite, so there is no separate database server to run. The container serves the web app on port 80 and stores everything, including the SQLite database, note files, and attachments, under `/var/www/html/data`. Hosting it means running that image, attaching a persistent volume to the data directory so your notes survive redeploys, and exposing the HTTP port. Configuration is optional and handled through environment variables (OIDC client credentials, settings-page password) or the admin UI. A health endpoint at `/api/health` makes uptime checks straightforward.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timothepoznanski/poznote:latest | `ghcr.io/timothepoznanski/poznote:latest` | Database |

## Configuration

- **Volume:** `/var/www/html/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/poznote)
