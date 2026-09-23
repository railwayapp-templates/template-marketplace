# Deploy FFmpeg Lite on Railway

Self-hosted FFmpeg REST API: upload, convert, download on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ffmpeg-lite)

## About

FFmpeg Lite runs as a single container on Railway. Media persists on a Railway volume at `/data`. The API listens on port 8080 (mapped to your Railway public domain).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ffmpeg-lite | `ghcr.io/mc9max/ffmpeg-lite:v7.1.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | API port. Railway maps this to the public domain. |
| `DATA_DIR` | /data | Media directory. Must match the volume mount path. |
| `JOB_TIMEOUT_MS` | 1800000 | Per-job timeout in milliseconds before the process is killed (30 min default). |
| `MAX_CONCURRENT` | 2 | Max simultaneous conversion jobs. Returns 429 when saturated. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ffmpeg-lite)
