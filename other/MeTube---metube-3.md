# Deploy MeTube on Railway

A self-hosted video downloader powered by yt-dlp.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metube-3)

## About

MeTube is a self-hosted web interface for downloading videos and audio using `yt-dlp`. It supports a wide range of media platforms and provides a clean browser-based experience for managing downloads, playlists, channels, subtitles, formats, and output preferences without relying on third-party downloader websites.

Hosting MeTube gives you a private, browser-based media downloader that you control.

Instead of depending on public download websites, MeTube lets you manage video and audio downloads from your own hosted instance. It supports individual URLs, playlists, channels, subscriptions, format selection, subtitles, audio extraction, and other `yt-dlp` capabilities.

Deploying MeTube on Railway simplifies hosting by handling the underlying infrastructure, networking, storage, and application runtime while keeping the service easy to access from a browser.

![Metube](https://raw.githubusercontent.com/alexta69/metube/master/screenshot.gif)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metube | `ghcr.io/alexta69/metube:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8081 | Port used by the MeTube web interface |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/downloads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/metube-3)
