# Deploy MeTube on Railway

Web UI for downloading videos from YouTube and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metube-2)

## About

MeTube is an open-source, self-hosted web interface for downloading video and audio from YouTube and dozens of other sites supported by yt-dlp. It provides browser-based download management, format selection, playlists, subscriptions, and metadata options while keeping downloaded files in storage controlled by the deployer.

Hosting MeTube requires one public container and one persistent volume. This template runs the digest-pinned MeTube `2026.07.27` image, exposes its HTTP listener on port `8081` through a Railway HTTPS service domain, and mounts `/downloads` for downloaded media and MeTube state. Railway checks `/` for readiness. The template sets `DELETE_FILE_ON_TRASHCAN=true` as requested and keeps the service at one replica because downloads are local to the mounted volume. MeTube does not provide authentication by design, so protect the public domain with an authenticating reverse proxy or another trusted access boundary. Use the service only for content you are authorized to download.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MeTube | `ghcr.io/alexta69/metube:2026.07.27@sha256:b6e945b63df6357bc16c7bfcb1b4479856b2087f6d8a5e59f0d3f4996a707e12` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |
| `DELETE_FILE_ON_TRASHCAN` | true |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/downloads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/metube-2)
