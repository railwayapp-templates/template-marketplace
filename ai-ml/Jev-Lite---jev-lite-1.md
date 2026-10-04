# Deploy Jev Lite on Railway

Self-hosted web console + API proxy for TypeSafe Jev decision model

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jev-lite-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/jev-lite-1)

**Jev Lite** is a self-hosted proxy + web console for [TypeSafe's Jev (System One)](https://console.typesafe.ai) decision API — turn freeform application state and a set of structured questions into a typed model call, then read back a clean JSON verdict.

This template ships the whole client in **one container**: a thin FastAPI proxy plus a single-file web console. No model weights, no GPU, no database, no companion service — the container is stateless and lightweight (~180 MB). Your TypeSafe API key stays server-side; the browser never sees it.

- Web console: **/** (build state + questions, read the verdict)
- API: **`POST /v1/decide`** with `{state, questions, model?}` (also **`GET /v1/status`**, **`GET /v1/models`**)
- **`/health`** — liveness + `key_configured` flag, unauthenticated (Railway healthcheck target)
- Optional lock-down: **`AUTH_TOKEN`**, when set, gates the UI and every `/v1` endpoint with `Authorization: Bearer ***` (or `?token=***` on the UI URL)

Single service, Dockerfile build from the pinned `python:3.12-slim` base:

1. **Pinned dependency layer** — `fastapi`, `uvicorn[standard]`, `httpx` installed once; only the app code changes
2. **Non-root runtime** — the container runs as uid 1000. There is no volume mounted, so there is nothing root-owned to collide with (the Railway volume EACCES trap only applies to mounted paths)
3. **Shell-form CMD** — `exec uvicorn … --port ${PORT:-8080}` so the `PORT` variable Railway injects is expanded at container start
4. **In-image healthcheck** — `python` probes `/health` on `PORT` with a 20 s start period, matching the `railway.json` builder

No volume is created: the client is fully stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jev-lite | [mc9max/jev-lite](https://github.com/mc9max/jev-lite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JEV_MODEL` | jev-latest | Model id sent as the default when a request omits 'model'. 'jev-latest' tracks the newest official release; pin a concrete version (e.g. jev-1.13.0) to stay stable across upstream releases. |
| `AUTH_TOKEN` | (secret) | Optional access lock-down. When set, the UI and every /v1 endpoint require 'Authorization: Bearer *** value>' (or append ?token=*** to the UI URL). Blank = open public instance (the default). |
| `TYPESAFE_API_KEY` | (secret) | TypeSafe API key for Jev (System One). Create one at console.typesafe.ai (Settings -> Keys). Required — /v1/decide returns a clear 'no_api_key' error while it is blank; the UI and /health still work so you can confirm the service is live before filling it in and redeploying. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/jev-lite-1)
