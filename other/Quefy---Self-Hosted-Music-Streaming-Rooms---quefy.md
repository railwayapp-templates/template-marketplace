# Deploy Quefy - Self-Hosted Music Streaming Rooms on Railway

Multi-user YouTube, Spotify, and SoundCloud audio streaming rooms.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quefy)

## About

Quefy is a self-hosted, multi-user audio streaming platform that lets users create shared listening rooms for YouTube, Spotify, and SoundCloud. Built with Docker support, it provides synchronized playback, real-time collaboration, optional Spotify integration, and persistent storage for uploaded authentication cookies, making it ideal for private music streaming communities.

Hosting Quefy on Railway provides a fast and reliable way to deploy your own collaborative music streaming platform without managing infrastructure. Railway automatically handles HTTPS, networking, deployments, and scaling while running the official Docker image. Quefy supports synchronized playback across multiple users, persistent storage for uploaded YouTube and SoundCloud cookies, and optional Spotify Premium integration through OAuth credentials. With Railway Volumes, your uploaded cookies and application data remain persistent across deployments, making it suitable for both personal and community-hosted listening rooms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snoozyman/quefy:b0e6bf9 | `snoozyman/quefy:b0e6bf9` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `SPOTIFY_MARKET` | US | - |
| `SPOTIFY_CLIENT_ID` | - | https://developer.spotify.com/dashboard |
| `SPOTIFY_CLIENT_SECRET` | (secret) | Obtain Client secret here.https://developer.spotify.com/dashboard |

## Configuration

- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/quefy)
