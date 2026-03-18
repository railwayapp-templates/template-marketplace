# Deploy FossFLOW on Railway

Deploy and Host FossFLOW with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fossflow)

## About

FossFLOW is an open-source isometric diagramming application built as a PWA on top of React and the FossFLOW (Isoflow-derived) rendering engine. It runs entirely in the browser, supports offline operation, and provides a full tooling environment for constructing 3D-style infrastructure diagrams, complete with autosave, icon import, and connector logic.

Deploying FossFLOW involves hosting a static frontend plus an optional server-side storage layer. The application itself is compiled to a static bundle, but the container image also exposes storage functionality when enabled, allowing diagrams to persist across devices. Railway’s container deployment model maps cleanly to FossFLOW’s architecture: you run the published Docker image, expose port 80, and optionally mount persistent storage. No external database is required. Configuration is handled via environment variables, primarily toggling server-side storage and defining filesystem paths.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FossFLOW | `stnsmith/fossflow:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Server port to run and connect to FossFLOW. |
| `ENABLE_SERVER_STORAGE` | true | Enable server storage for diagrams |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/fossflow)
