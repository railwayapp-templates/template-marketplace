# Deploy Immich Drop on Railway

Web app for collecting photos/videos from anyone into your Immich server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/immich-drop)

## About

A tiny web app for collecting photos/videos into your **Immich** server.

Admin users log in to create public invite links; invite links are always public-by-URL. A public uploader page is optional and disabled by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Immich Drop | `ghcr.io/nasogaa/immich-drop:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `CHUNK_SIZE_MB` | 95 | - |
| `IMMICH_API_KEY` | (secret) | In your Immich, click on your profile -> Account Settings -> API Keys |
| `SESSION_SECRET` | (secret) | - |
| `IMMICH_BASE_URL` | - | Must include /api. For example: https://immich.example.com/api |
| `IMMICH_ALBUM_NAME` | - | Auto-add uploads from public uploader to this album (creates if needed) |
| `CHUNKED_UPLOADS_ENABLED` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/immich-drop)
