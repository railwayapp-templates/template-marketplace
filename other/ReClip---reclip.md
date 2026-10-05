# Deploy ReClip on Railway

A self-hosted, open-source video and audio downloader with a clean web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reclip)

## About

ReClip is a lightweight, self-hosted video and audio downloader with a clean web interface. It uses `yt-dlp` and `ffmpeg` to download media from YouTube, TikTok, Instagram, X/Twitter, Reddit, Facebook, Vimeo, SoundCloud, and 1000+ other supported websites.

https://github-production-user-asset-6210df.s3.amazonaws.com/88895948/571685270-419d3e50-c933-444b-8cab-a9724986ba05.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20261005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261005T040914Z&X-Amz-Expires=300&X-Amz-Signature=bff17e0d6dc5dc65217cfa5f15ac68469d02c9ebc8846e69dbae44dcad6ef940&X-Amz-SignedHeaders=host&response-content-type=video%2Fmp4

Hosting ReClip gives you your own browser-based media downloader without relying on third-party download websites filled with ads, trackers, or usage restrictions.

ReClip provides a simple interface for downloading videos or extracting audio, selecting output quality, processing multiple URLs, and avoiding duplicate entries. It is designed to remain lightweight, with a minimal Python backend and a straightforward web interface.

Running ReClip on Railway removes the need to manually maintain a server, install runtime dependencies, or configure the underlying hosting environment.

![ReClip](https://github.com/averygan/reclip/raw/main/assets/preview-mp3.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| reclip | [averygan/reclip](https://github.com/averygan/reclip) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8899 | Port used by the ReClip web interface |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/downloads`

**Category:** Other · **Languages:** HTML, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/reclip)
