# Deploy keen-green on Railway

Self-hosted video & photo vault — save, stream, and browse media.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keen-green)

## About

Media Vault is a self-hosted video and photo server you deploy in one click. Save videos from links, upload photos and videos straight from your phone, then stream and browse everything from a clean mobile-friendly gallery.

**What it does**
- Save videos from any link (YouTube, TikTok, Instagram, X, Twitch, direct MP4s) with live progress, speed, and ETA
- Upload photos and videos from your device (up to 500 MB per file)
- Stream video with seeking — range-request playback that starts instantly and scrubs smoothly
- Photo gallery with All / Photos / Videos tabs, lightbox viewer, and one-tap downloads
- Persistent library on a Railway volume — your media survives redeploys
- Storage meter so you always know how much space is left
- Permanent delete for anything you remove
- Optional `MEDIA_TOKEN` password lock for private libraries

**How it works**
One service (Node.js + Express) with a mounted volume at `/data`. Downloads run through yt-dlp, uploads through a multipart endpoint, and playback uses HTTP range streaming. No database needed — the library index is a JSON file on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| media-vault | [RandyN31son/media-vault](https://github.com/RandyN31son/media-vault) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MEDIA_DIR` | /data/media | Directory on the persistent volume where uploaded and downloaded media files are stored |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/keen-green)
