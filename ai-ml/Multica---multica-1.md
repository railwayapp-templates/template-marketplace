# Deploy Multica on Railway

AI teammates on one board: humans + agents, chat, squads, analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-1)

## About

Multica is a self-hosted AI team workspace: issue boards, agent squads, chat with connected agents, GitHub PR tracking, routines, and usage analytics — one place to run a human + AI team.

This template layers deployment wrappers over the pinned official Multica images: the Go backend runs migrations at boot, and the Next.js frontend forwards API, auth, uploads and WebSockets to the backend over Railway's private network. PostgreSQL 17 and uploads each have a persistent volume. The frontend wrapper rewires Next.js's build-time proxy configuration to the runtime private backend origin; merely setting `REMOTE_API_URL` on the official image is insufficient.

`DATABASE_URL` and the frontend proxy target reference the private database/backend domains. `FRONTEND_ORIGIN` references the frontend's HTTPS domain for Secure cookies and invitation links. The manifest requests generated secrets, but if the existing marketplace card prompts for blank secrets, generate strong unique values; publication of these defaults is being verified separately. After login, create your workspace to become its owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `wotonews/multica:v0.3.29-2` | Web service |
| frontend | `wotonews/multica-web:v0.3.29-1` | Web service |
| postgres | `wotonews/postgres:v17.11-3` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | backend | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-1)
