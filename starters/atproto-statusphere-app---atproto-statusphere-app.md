# Deploy atproto statusphere app on Railway

A minimal demo of an end-to-end atproto application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atproto-statusphere-app)

## About

Statusphere is a minimal [atproto](https://atproto.com) app. You can build your own by [following the tutorial](https://atproto.com/guides/applications). This template runs a fork of that tutorial, which splits it into a Vite/React SPA frontend, and a Node.js backend. The database is a SQLite file stored in persistent railway volume.

The code for `statusphere-react` can be found here:
https://tangled.org/@samuel.bsky.team/statusphere-react

Atproto app generally require using long-running websockets, and therefore are a poor fit for serverless hosting platforms. Since Railway lets you run a persistent service, it's the perfect way to get started.

Aggregating every Statusphere Status event in the atproto network costs approximately $1.50 per month, which fits comfortably in the Railway hobby plan. Your mileage may vary, especially if you want to start aggregating Bluesky-related records.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| statusphere-react | [mozzius/statusphere-react](https://github.com/mozzius/statusphere-react) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | - | For example, statusphere.example.com |
| `PORT` | 8080 | - |
| `DB_PATH` | ../../../persistant/data.sqlite | - |
| `NODE_ENV` | production | - |
| `PUBLIC_URL` | - | For example: https://statusphere.example.com |
| `COOKIE_SECRET` | (secret) | Random string, min 32 characters. You can generate one using `openssl rand -base64 32` |
| `JETSTREAM_INSTANCE` | wss://jetstream2.us-east.bsky.network | - |

## Configuration

- **Start command:** `node ./packages/appview/dist/index.js`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/persistant`

**Category:** Starters · **Languages:** TypeScript, HTML, CSS

[View on Railway →](https://railway.com/deploy/atproto-statusphere-app)
