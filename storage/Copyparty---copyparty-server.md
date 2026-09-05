# Deploy Copyparty on Railway

File server with a web browser UI, resumable uploads and WebDAV

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/copyparty-server)

## About

copyparty is an open-source file server that fits in a single Python file and still does the work of a small cloud drive: a web file browser with image and video thumbnails, chunked uploads that resume after a dropped connection, expiring share links, a searchable media index, and a WebDAV endpoint you can mount as a network drive. It is MIT-licensed, from [github.com/9001/copyparty](https://github.com/9001/copyparty), and people reach for it when Nextcloud is more platform than they wanted.

Self-host copyparty on Railway and you get one service, `copyparty`, built from the `copyparty/ac` image and backed by a persistent volume at `/data`. Everything the server keeps — files, the search index, thumbnails, share records and sessions — lives there, so redeploys leave your data and your links intact. Deploy copyparty with a username and password and the account is created at first boot; nothing is readable without signing in.

![Diagram of the single copyparty service and its Railway volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788520920/copyparty-architecture.png)

copyparty solves the problem of moving files between people and machines when a shared drive is too much and email attachments are too little. Everything is served from an ordinary directory tree, so what you upload in the browser is what a WebDAV client sees, and a backup of the volume is a plain folder of files, not an opaque blob store.

Key features:

- **Resumable chunked uploads**, with duplicate detection so a file uploaded twice costs the space of one
- **Thumbnails and a media player** for images, video and audio, from the FFmpeg and Pillow in the `ac` image
- **Search** by filename, path, size, date or extracted media tags such as resolution and codec
- **Expiring share links** with their own password and permissions, created from the browser
- **WebDAV** on the same URL, so the server doubles as a mountable network drive
- **Per-folder accounts and permissions**, including a get-only mode that serves files by name without exposing listings

The deployment is deliberately one service: copyparty is a single multi-threaded process serving a filesystem, and its search index is a SQLite file beside your data, so there is no database, cache or worker tier to run alongside it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| copyparty | [gridalpha/copyparty-railway](https://github.com/gridalpha/copyparty-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3923 | HTTP port the server listens on |
| `CP_DF` | 256m | Refuse uploads below this free space |
| `CP_PASSWORD` | (secret) | Primary account password, required |
| `CP_USERNAME` | (secret) | Primary account, holds admin rights |
| `CP_SERVER_NAME` | copyparty | Name shown in the web UI |

## Configuration

- **Healthcheck:** `/healthz/ok`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Smarty, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/copyparty-server)
