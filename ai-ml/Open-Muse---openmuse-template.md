# Deploy Open Muse on Railway

Self-hosted OpenMuse: personal AI agent with browser, terminal, and files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openmuse-template)

## About

Two services are provisioned:

- **openmuse** — the Node API (CopilotKit runtime, task engine, files, PGlite-embedded Postgres) with in-process task worker, fronted by nginx which serves the React Native web build and proxies `/api` same-origin. A Railway volume is mounted at `/data` for the database, files, and signing key; the healthcheck is `GET /api/health`; restarts are automatic on failure. Threads, tasks, and uploads persist across deploys.
- **browser-worker** — the Playwright/Chromium browser service from upstream `apps/worker`, reachable only on Railway's project-private network (no public domain), storing browser profiles under `/data`. Delete this service if you don't need the browser tool; everything else keeps working.

Security notes: OpenMuse is a single-owner app without multi-user auth — treat your Railway domain as a secret. The API binds to loopback inside the container; nginx is the only public entry point over HTTPS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| browser-worker | [lNamelessl/openmuse-railway-template](https://github.com/lNamelessl/openmuse-railway-template) (root: apps/worker) | Worker |
| openmuse | [lNamelessl/openmuse-railway-template](https://github.com/lNamelessl/openmuse-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CPK_INTELLIGENCE_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openmuse-template)
