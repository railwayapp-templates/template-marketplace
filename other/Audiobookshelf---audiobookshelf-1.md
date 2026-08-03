# Deploy Audiobookshelf on Railway

Self-hosted audiobook and podcast server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/audiobookshelf-1)

## About

Audiobookshelf is an open-source, self-hosted audiobook and podcast server. It streams audio, tracks listening progress for multiple users, manages libraries, fetches metadata and cover art, supports podcast downloads, and provides web, PWA, and mobile clients. This draft uses the immutable Audiobookshelf 2.36.0 container image.

Hosting Audiobookshelf requires one public HTTP container and durable storage for its configuration and metadata. This template uses the official GHCR image pinned to the Audiobookshelf 2.36.0 digest, exposes HTTP on port 80, and checks `/` for readiness. Railway supplies HTTPS through the generated service domain and restarts failed deployments up to ten times. The requested `CONFIG_PATH`, `METADATA_PATH`, and UID/GID defaults are safe literals. Audio and podcast library storage is intentionally not included in this contract; add and persist media storage according to the collection's size and backup needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Audiobookshelf | `ghcr.io/advplyr/audiobookshelf:2.36.0@sha256:180acad33d69c99ed208676465d8edcb268fa46967735579a7810859885b1a8e` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `CONFIG_PATH` | /home/node/config |
| `METADATA_PATH` | /home/node/metadata |
| `AUDIOBOOKSHELF_GID` | 1000 |
| `AUDIOBOOKSHELF_UID` | 1000 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/audiobookshelf-1)
