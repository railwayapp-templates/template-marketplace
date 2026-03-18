# Deploy podfetch on Railway

PodFetch is a self-hosted podcast manager built with Rust and React.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/podfetch-template)

## About

[PodFetch](https://github.com/SamTV12345/PodFetch) is an open-source, self-hosted podcast manager for downloading, organizing, and streaming podcasts in the browser. It is built with a Rust backend and React UI, and supports gPodder workflows.

This Railway template uses the official Docker image `samuel19982/podfetch:latest` and runs PodFetch as a single service. It stores application data with SQLite and keeps media files on persistent volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| podfetch | `samuel19982/podfetch:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `BASIC_AUTH` | false |
| `DATABASE_URL` | sqlite:///app/podcasts/podcast.db |
| `PODFETCH_FOLDER` | podcasts |
| `POLLING_INTERVAL` | 60 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/podcasts`

**Category:** Other

[View on Railway →](https://railway.com/template/podfetch-template)
