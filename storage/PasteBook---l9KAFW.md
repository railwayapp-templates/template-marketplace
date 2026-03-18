# Deploy PasteBook on Railway

An easy on the eyes, lightning fast pastebin built with Svelte and Rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/l9KAFW)

## About

# PasteBook 
An easy on the eyes, portable, lightning fast pastebin written in Svelte and Rust.

### Variables
- `TITLE` - The title to be used around PasteBook.
- `DESCRIPTION` - The description to be used in embeds and on the home page of PasteBook.
- `DISABLE_NEW` - Disables the new paste page. API is still accessible.
- `FAVICON_URL` - The URL that the favicon will be provided with. 
- `MAX_PAYLOAD_SIZE` - The maximum paste size in megabytes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy | `ghcr.io/loudbooks/pastebook-caddy:latest` | Worker |
| PostgreSQL | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Frontend | `ghcr.io/loudbooks/pastebook-frontend:latest` | Worker |
| Backend | `ghcr.io/loudbooks/pastebook-backend:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Caddy | 80 |
| `BACKEND_PORT` | Caddy | 8080 |
| `FRONTEND_PORT` | Caddy | 3000 |
| `POSTGRES_DB` | PostgreSQL | pastebook |
| `POSTGRES_USER` | PostgreSQL | (secret) |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) |
| `HOST` | Frontend | :: |
| `PORT` | Frontend | 3000 |
| `TITLE` | Frontend | PasteBook |
| `DESCRIPTION` | Frontend | A portable, aesthetically pleasing, lightning fast pastebin build with Svelte and Rust. |
| `DISABLE_NEW` | Frontend | false |
| `MAX_PAYLOAD_SIZE` | Backend | 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/l9KAFW)
