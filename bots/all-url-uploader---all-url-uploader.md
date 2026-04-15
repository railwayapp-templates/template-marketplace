# Deploy all-url-uploader on Railway

Upload direct links and supported media sources back to Telegram.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/all-url-uploader)

## About

all-url-uploader is a Telegram bot that accepts direct file URLs and supported media links, downloads them with the appropriate tool, and uploads the result back to Telegram. It supports `yt-dlp` sources, quick audio and video downloads, format selection, and per-user custom thumbnails for a smoother media-sharing workflow.

Hosting all-url-uploader on Railway is simple because the project already includes a production-ready Dockerfile. Railway can build the container, run the bot process, and manage the environment variables needed for Telegram authentication and runtime configuration. To deploy it, you connect the repository, let Railway build from the root, and provide values like `BOT_TOKEN` and `OWNER_ID`. The container also includes `ffmpeg`, Python 3.11, `uv`, and `yt-dlp`, which are required for supported media downloads and processing. Once deployed, Railway gives you an easy way to monitor logs, redeploy updates, and keep the bot running without managing servers manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| All-Url-Uploader | [kalanakt/All-Url-Uploader](https://github.com/kalanakt/All-Url-Uploader) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |
| `CHUNK_SIZE` | 128 |
| `DOWNLOAD_LOCATION` | ./DOWNLOADS |
| `PROCESS_MAX_TIMEOUT` | 3700 |

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/all-url-uploader)
