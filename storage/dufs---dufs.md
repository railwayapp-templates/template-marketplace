# Deploy dufs on Railway

Dufs is a lightweight self-hosted file server with a web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dufs)

## About

[Dufs](https://github.com/sigoden/dufs) is a single-binary file server written in Rust. It serves files through a browser UI, supports uploads, WebDAV, resumable transfers, search, and optional access control. On Railway, the clean deployment model is to run the official Docker image `sigoden/dufs:latest` as a single service and mount a persistent volume at `/data` so uploaded files survive redeployments.

This template mirrors the Docker Compose pattern `dufs /data -A` by setting `DUFS_SERVE_PATH=/data` and `DUFS_ALLOW_ALL=true`. That means the deployed service is publicly writable unless you change the defaults.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dufs | `sigoden/dufs:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `DUFS_BIND` | 0.0.0.0 |
| `DUFS_ALLOW_ALL` | true |
| `DUFS_SERVE_PATH` | /data |

## Configuration

- **Healthcheck:** `/__dufs__/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dufs)
