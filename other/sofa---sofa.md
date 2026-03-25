# Deploy sofa on Railway

🍿 Self-hosted movie and TV show scrobbler for web, iOS, and Android

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sofa)

## About

Sofa is a self-hosted movie and TV show tracking app. It lets you build a personal library, track what you've watched, discover new titles, and manage your watchlist — all backed by TMDB data. It ships as a single Docker container with a web UI, REST API, and optional mobile app.

Sofa runs as a single container: a Bun-powered Hono API server that also serves the built SPA frontend on port 3000. It uses an embedded SQLite database stored on a persistent volume at `/data`, so there's no external database to configure. On startup it automatically runs any pending database migrations. You'll need a free TMDB API token for movie/TV metadata and a secret for authentication. Optionally, you can configure OIDC/SSO for single sign-on. The container includes a built-in health check endpoint at `/api/health`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sofa | `ghcr.io/jakejarvis/sofa:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Default listening port for Hono |
| `LOG_LEVEL` | info | Optional log level |
| `BETTER_AUTH_URL` | - | Required, set to public domain |
| `BETTER_AUTH_SECRET` | (secret) | Required, generate with `bunx @better-auth/cli secret` or `openssl rand -base64 32` |
| `TMDB_API_READ_ACCESS_TOKEN` | (secret) | Required, see https://sofa.watch/docs/configuration#required-variables |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sofa)
