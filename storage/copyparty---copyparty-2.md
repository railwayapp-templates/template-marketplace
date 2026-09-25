# Deploy copyparty on Railway

copyparty 1.20: file server with uploads, WebDAV, search and media.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/copyparty-2)

## About

copyparty is a portable file server written in Python. It serves a fast web UI for browsing, uploading with resumable chunked transfers, and downloading folders as zip or tar, and also speaks WebDAV, FTP and SFTP. It indexes files for search and can read media tags, thumbnails and music metadata.

This template runs the official `copyparty/ac:1.20.24` image with a config file written at start from Railway variables. One admin account from `COPYPARTY_ADMIN_USER` and a generated `COPYPARTY_ADMIN_PASSWORD` gets full access to the shared root; anonymous visitors get nothing (401). Files live on a Railway volume at `/w`, and the search index and media tags (`e2dsa`, `e2ts`) are built there too, so uploads survive redeploys. The Railway proxy is trusted for client IPs. The image is small and fits the Hobby plan; storage is the main cost, so size the volume to your files. Add more accounts or folders by editing the start command.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| copyparty | `copyparty/ac:1.20.24` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3923 |
| `COPYPARTY_NAME` | copyparty |
| `COPYPARTY_ADMIN_USER` | (secret) |
| `COPYPARTY_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'mkdir -p /cfg /w && printf "[global]\n  i: ::\n  p: %s\n  no-crt\n  rproxy: 1\n  xff-src: lan\n  e2dsa\n  e2ts\n  name: %s\n\n[accounts]\n  %s: %s\n\n[/]\n  /w\n  accs:\n    A: %s\n" "$PORT" "$COPYPARTY_NAME" "$COPYPARTY_ADMIN_USER" "$COPYPARTY_ADMIN_PASSWORD" "$COPYPARTY_ADMIN_USER" > /cfg/railway.conf && exec /usr/bin/python3 -m copyparty -c /cfg/railway.conf'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/w`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/copyparty-2)
