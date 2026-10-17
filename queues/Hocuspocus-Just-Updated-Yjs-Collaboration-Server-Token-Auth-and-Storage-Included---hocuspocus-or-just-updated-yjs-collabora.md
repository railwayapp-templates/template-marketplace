# Deploy Hocuspocus | (Just Updated) Yjs Collaboration Server, Token Auth and Storage Included on Railway

Yjs realtime collaboration server, token auth and storage generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hocuspocus-or-just-updated-yjs-collabora)

## About

Hocuspocus is the open-source Yjs collaboration backend from the Tiptap team. This template deploys a ready-to-use Hocuspocus 4.7 server: editors and agents connect over WebSocket, sync Yjs documents in real time, and documents persist on a volume. The access token is generated for you, so nothing needs filling in.

The image is a small wrapper (source: github.com/bon5co/hocuspocus-railway) around the official `@hocuspocus/server` package, pinned by digest. It adds what a hosted server needs: token authentication on every connection, SQLite persistence of each document under `/data`, and a `/health` endpoint. It runs as a single process.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hocuspocus | `ghcr.io/bon5co/hocuspocus-railway:4.7.1@sha256:8a9258879297d3487c36fdc28fa44727613de31418b945e75b0f0abf5240c368` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOCUSPOCUS_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/hocuspocus-or-just-updated-yjs-collabora)
