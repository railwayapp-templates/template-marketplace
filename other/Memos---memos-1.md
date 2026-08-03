# Deploy Memos on Railway

Privacy-first, lightweight note-taking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-1)

## About

Memos is an open-source, self-hosted note-taking application for quickly capturing and organizing Markdown notes. It keeps data under the operator's control while providing sharing, search, REST and gRPC APIs, and integrations such as the official web clipper. This template runs the pinned Memos 0.30.0 container with durable Railway storage.

Hosting Memos on Railway requires one public application service and one persistent volume. The service runs the immutable `neosmemo/memos:0.30.0` image on port `5230`, while Railway provides HTTPS routing and checks `/` for readiness. The volume mounted at `/var/opt/memos` retains Memos' SQLite database and uploaded application state across redeploys. `MEMOS_MODE=prod` and `MEMOS_PORT=5230` select the production server and listener; `PORT=5230` keeps Railway's proxy and health probe aligned with that listener. No external database or supporting service is required for this single-instance deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Memos | `neosmemo/memos:0.30.0@sha256:71a5b4738d1bed96e92112004054f0888e92791b64eb78afd79077c96e6f9327` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5230 |
| `MEMOS_MODE` | prod |
| `MEMOS_PORT` | 5230 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Other

[View on Railway →](https://railway.com/deploy/memos-1)
