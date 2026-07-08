# Deploy orchestrator on Railway

Orchestrator is a single-binary workflow orchestration tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orchestrator)

## About

Orchestrator is a single-binary workflow orchestration tool. Flows are ordered lists of tasks — each task type is a drop-in plugin bundle (an executable in any language, with `http.request` shipped built-in) — with typed inputs, variables, cron triggers, parallel fan-out, retries, and full run observability. One Rust binary serves the web UI, JSON API, scheduler, and executor; all state lives in a single SQLite file.

Orchestrator ships as a prebuilt multi-arch Docker image (`ghcr.io/webstonehq/orchestrator:latest`), so hosting it is just that image plus a persistent volume — no build step on Railway. The binary is self-contained: the web UI is embedded, the `http.request` plugin is bundled, and state lives in one SQLite database. It binds `0.0.0.0:$PORT` and reads the `PORT` Railway injects, so networking works with no target-port configuration. Mount a volume at `/data` to persist the database and the encrypted `master.key` across redeploys. One setting is easy to miss: because the image runs as a non-root user and Railway mounts volumes as root, set `RAILWAY_RUN_UID=0` so the service can write to `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| orchestrator | `ghcr.io/webstonehq/orchestrator:latest` | Web service |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/orchestrator)
