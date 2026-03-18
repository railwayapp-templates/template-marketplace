# Deploy Metube on Railway

Web GUI for youtube-dl with playlist support.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metube-1)

## About

MeTube is an open-source, self-hosted web GUI for the powerful **yt-dlp** command-line tool. It allows users to download videos and audio from YouTube and thousands of other sites through a clean, responsive web interface. It simplifies media management by supporting playlist downloads, quality selection, and background processing.

Hosting MeTube involves deploying a containerized application (Docker) that manages a local file system for storage. When hosting on a platform like **Railway**, you typically connect your GitHub repository or use a pre-configured Docker image. The deployment requires a persistent storage volume if you want to keep your downloads after a restart, as cloud platforms often use ephemeral file systems. Once deployed, MeTube runs as a web server that communicates with YouTube's servers to fetch metadata and stream file data directly to your designated storage path, accessible via a unique URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| alexta69/metube:latest | `ghcr.io/alexta69/metube:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/downloads`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/metube-1)
