# Deploy Pigeon Pod on Railway

Listen to YouTube. Anywhere.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pigeon-pod)

## About

**PigeonPod** is a self-hosted YouTube-to-podcast application that converts YouTube channels or playlists into podcast feeds. It supports automatic syncing of new uploads, backfilling historical content, media downloads, and secure RSS feeds compatible with standard podcast players.

Hosting PigeonPod on Railway involves deploying a single container and attaching a persistent volume to store the SQLite database, downloaded media files, and cover images. After deployment, users must log in to the web UI, change the default credentials, and configure required application settings. A **YouTube Data API v3 key is mandatory** for the application to function and must be created and added manually by the user in the settings page. Proper base URL configuration is also required to ensure generated podcast feeds work correctly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pigeon Pod | `ghcr.io/aizhimou/pigeon-pod:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SPRING_DATASOURCE_URL` | jdbc:sqlite:/data/pigeon-pod.db |
| `PIGEON_AUDIO_FILE_PATH` | /data/audio/ |
| `PIGEON_COVER_FILE_PATH` | /data/cover/ |
| `PIGEON_VIDEO_FILE_PATH` | /data/video/ |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pigeon-pod)
