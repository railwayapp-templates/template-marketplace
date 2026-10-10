# Deploy tiko on Railway

Open-source infinite canvas for your tasks: live cards from your tracker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tiko)

## About

tiko is an open-source infinite canvas for your tasks. Tasks from your tracker become live cards that you arrange with sticky notes, frames, arrows, a Gantt and timers, the way you think about the work. Cards keep their status, assignee and priority in sync with the tracker.

The template runs two services from the released images: `api` (FastAPI, SQLite on a volume at `/app/data`) and `web` (nginx with the React app, the only public service). The admin password and the key that encrypts tracker tokens are generated on deploy. Open the `web` URL and sign in as `admin` with `TIKO_PASSWORD` from the `api` service's Variables. A fresh instance opens with demo tasks, so you can try it before connecting a tracker in Settings. Invite your team from Settings → People.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/tiko-run/tiko-web:latest` | Web service |
| api | `ghcr.io/tiko-run/tiko-api:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `TIKO_PASSWORD` | (secret) |
| `TIKO_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tiko)
