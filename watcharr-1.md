# Deploy watcharr on Railway

A self-hosted, open-source media tracker for movies, TV shows and games.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/watcharr-1)

## About

[Watcharr](https://github.com/sbondCo/Watcharr) is a self-hosted, open-source media tracking application for movies, TV shows, anime, and optionally video games. It features a modern SvelteKit frontend with a Go (Gin) backend, TMDB-powered search and metadata, watch status tracking with ratings and thoughts, activity feeds, user follows, and integrations with Jellyfin, Plex, Sonarr, and Radarr.

Watcharr runs as a single Docker container with two internal processes: a Go binary serving the API and reverse-proxying to an internal Node.js SvelteKit frontend. It uses SQLite for storage — no external database is required. All persistent data (database, config, images, logs) lives under a single `/data` volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| watcharr | `ghcr.io/sbondco/watcharr:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3080 |
| `WATCHARR_DATA` | /data |

## Configuration

- **Start command:** `sh -c 'unset PORT && exec /watcharr'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/watcharr-1)
