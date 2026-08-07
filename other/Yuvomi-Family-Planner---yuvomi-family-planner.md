# Deploy Yuvomi Family Planner on Railway

Family calendar, shopping list, meal planning, chores and budget.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yuvomi-family-planner)

## About

Yuvomi is a self-hosted family planner. Tasks, a shared calendar, shopping
lists, meal planning, a household budget, notes, contacts, pantry tracking and
chore rotas, all in one app, all on an instance you control. It is built for a
household rather than a company, so everything is shared by default and scoped
per family member where it matters.

Yuvomi is a single Node application backed by SQLite. There is no separate
database server, no cache and no worker process, so hosting it means running
one container with persistent storage attached and pointing a domain at it.

That simplicity is the appealing part and also the part that bites. The
database, the scheduled backups and any uploaded documents all want to live on
disk, and each of them defaults to a different path. Miss one and it silently
writes into the container instead, where the next redeploy erases it. This
template routes all three onto a single persistent volume, pins the port that
the healthcheck probes, and turns on database encryption with a key generated
for each deployment, so household health records and finances are not sitting
in a plaintext file.

The app also expects to sit behind something that terminates TLS, and needs to
be told so, otherwise session cookies and client IP addresses both come out
wrong.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Yuvomi | `ghcr.io/ulsklyc/yuvomi:1.86.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 3000 |
| `DB_PATH` | /data/yuvomi.db |
| `NODE_ENV` | production |
| `BACKUP_DIR` | /data/backups |
| `TRUST_PROXY` | 1 |
| `SESSION_SECRET` | (secret) |
| `SESSION_SECURE` | true |
| `DOCUMENT_STORAGE_LOCAL_PATH` | /data/documents |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yuvomi-family-planner)
