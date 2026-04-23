# Deploy koodo-reader on Railway

Web EPUB/PDF reader with optional authenticated data sync service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/koodo-reader)

## About

Koodo Reader runs as a single Docker service on Railway using the upstream GHCR image pinned by immutable digest. This gives one-click web access with optional built-in file sync API support.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/koodo-reader/koodo-reader@sha256:90de3dd3d2c0150dee5b861ccdaa7aa508a020296244971e7344da0f69086fe8` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `SERVER_PASSWORD` | (secret) |
| `SERVER_USERNAME` | (secret) |
| `ENABLE_HTTP_SERVER` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/koodo-reader)
