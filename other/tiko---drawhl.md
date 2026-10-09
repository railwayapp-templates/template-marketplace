# Deploy tiko on Railway

Open-source infinite canvas for your tasks: live cards from your tracker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drawhl)

## About

drawhl is an open-source infinite canvas for your tasks. Tasks from your tracker become live cards that you arrange with sticky notes, frames, arrows, a Gantt and timers, the way you think about the work. Cards keep their status, assignee and priority in sync with the tracker.

The template runs two services from the released images: `api` (FastAPI, SQLite on a volume at `/app/data`) and `web` (nginx with the React app, the only public service). The key that encrypts tracker tokens is generated on deploy. A fresh instance opens with demo tasks, so you can try it before connecting a tracker in Settings.

drawhl has no login yet. Anyone who knows the public URL can open your boards and use the connected tracker token, so keep the URL to yourself, or put the `web` domain behind an access proxy, until password protection ships.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/smacktur/drawhl-web:latest` | Web service |
| api | `ghcr.io/smacktur/drawhl-api:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | web | 3000 |
| `PORT` | api | 8000 |
| `DRAWHL_PASSWORD` | api | (secret) |
| `DRAWHL_SECRET_KEY` | api | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/drawhl)
