# Deploy Multica on Railway

Multica: self-hosted AI team workspace with boards, chat, squads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-1)

## About

Multica is a self-hosted AI team workspace: issue boards, agent squads, chat with connected agents, GitHub PR tracking, routines, and usage analytics — one place to run a human + AI team.

This template deploys the official Multica images as a three-service stack: the Go backend (with database migrations running automatically at boot), the Next.js frontend (proxying API and WebSocket traffic to the backend over Railway's private network, so everything stays same-origin), and a bundled PostgreSQL 17 database with the extensions Multica needs already installed. Uploads live on a persistent volume; the database on its own.

Wire-up is automatic: `DATABASE_URL` is composed from the database service over the private network, `JWT_SECRET` and `POSTGRES_PASSWORD` are generated at deploy time, and the frontend's proxy target is a private-network reference. After deploying, generate a public domain on the `frontend` service and sign up — the first user owns the workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/multica-ai/multica-web:v0.3.29` | Worker |
| backend | `wotonews/multica:v0.3.29-1` | Database |
| postgres | `wotonews/postgres:v17.11-3` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | backend | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/app/data/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-1)
