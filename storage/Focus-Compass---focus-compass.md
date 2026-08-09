# Deploy Focus Compass on Railway

Sync server for Focus Compass — Visual map for multi-project work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/focus-compass)

## About

Focus Compass is a private-first visual workspace for people managing several projects at once. It places projects on a flexible map, keeps each card centered on the next meaningful step, works offline, and turns project notes into AI-ready context—helping founders, freelancers, and indie hackers regain clarity without another heavyweight task manager.

Hosting Focus Compass on Railway deploys the open-source Focus Compass Sync Server as a single stateful Docker service. The server uses Hocuspocus and Yjs for conflict-free WebSocket synchronization and SQLite for persistence. Railway provides the public HTTPS/WSS endpoint, TLS, health checks, logs, and restarts, while a mounted volume keeps workspace data and authentication files across redeployments. After deployment, open the generated Railway URL, create the master connection link during first-time setup, and paste it into Focus Compass. No separate database or Focus Compass account is required. The app remains offline-first; the server is used only when synchronization is enabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Focus Compass Sync Server | `ghcr.io/focus-compass/focus-compass-sync-server:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/app/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/focus-compass)
