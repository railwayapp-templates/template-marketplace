# Deploy Andromeda - Library on Railway

A minimal books management app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-library)

## About

Andromeda - Library is a self-hosted personal book tracker written in Go. Search titles through Google Books, add them to your collection, and browse your library through a web UI and JSON API, all backed by a single SQLite database.

Hosting Andromeda - Library means running a single Go binary that serves the public library and admin interface over HTTP. State lives in a SQLite file, so deployment needs only a persistent volume plus environment variables (admin password, base URL, port). Book search proxies to the Google Books API; an API key is optional but raises rate limits. On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| library | `ghcr.io/stevedylandev/andromeda/library` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BASE_URL` | http://localhost:3000 | Hosted URL for complete canonical RSS links |
| `COOKIE_SECURE` | true | Enable HTTPS Secure cookies |
| `ADMIN_PASSWORD` | (secret) | Password to access the admin dashboard for adding books |
| `GOOGLE_BOOKS_API_KEY` | (secret) | Google Books API Key to help prevent rate limiting |
| `LIBRARY_DISPLAY_MODE` | inline | Change the display of books to either one big list (`inline`) or split into navigation items (`nav`) |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-library)
