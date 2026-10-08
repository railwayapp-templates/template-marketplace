# Deploy Convex | (Just Updated) Firebase Alternative, HTTP Actions on HTTPS, Admin Key in Logs on Railway

Convex backend and dashboard. HTTPS HTTP actions, data kept on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-or-just-updated-firebase-alternat)

## About

Convex is an open-source reactive backend: a database, server functions written in TypeScript, file storage,
scheduled jobs and live queries that push updates to every connected client. This template runs the official
self-hosted Convex backend and dashboard images (pinned by digest) as three Railway services, with the
database on a Railway volume.

- **Three services, one deploy.** `convex` is the backend (API and WebSocket sync), `site` is a small HTTPS
  proxy for HTTP actions, and `dashboard` is the admin UI. Nothing has to be typed into the deploy form.
- **HTTP actions get a real HTTPS URL.** Convex serves HTTP actions, webhooks and auth callbacks (Convex Auth,
  OAuth redirects) from a second port. The `site` service puts that port on its own public Railway domain and
  `CONVEX_SITE_ORIGIN` points at it, so callbacks work without any extra setup.
- **Data survives redeploys.** SQLite and file storage live on a Railway volume mounted at `/convex/data`.
  The instance secret is generated per deploy and stored on the volume with the instance credentials.
- **Admin key in the deploy log.** Every boot, the `convex` service prints a line starting with
  `[railway] DASHBOARD ADMIN KEY:`. Open the service's Deploy Logs, copy the key and paste it into the
  dashboard login.
- **Healthchecks.** The backend is checked on `/version`, the proxy on `/railway_health`, the dashboard on `/`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| site | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| convex | `ghcr.io/get-convex/convex-backend@sha256:d715e9ec088784407ca4ba2d3db592702cd328d02c76cdca3852c0018f2a76b4` | Web service |
| dashboard | `ghcr.io/get-convex/convex-dashboard@sha256:f85cf0d0448b9c835ae3df5c7c1c6f0145dd4c8f0f92eb0245daf304efdd9f1a` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `INSTANCE_SECRET` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'printf ":%s {\n\thandle /railway_health {\n\t\trespond \"ok\" 200\n\t}\n\thandle {\n\t\treverse_proxy %s:3211\n\t}\n}\n" "$PORT" "$BACKEND_HOST" > /etc/caddy/Caddyfile && echo "[railway] port=$PORT upstream=$BACKEND_HOST:3211" && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/railway_health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'cd /convex && export DISABLE_BEACON=true DO_NOT_REQUIRE_SSL=true; sed "s/--port 3210/--port $PORT/" ./run_backend.sh > ./railway_run.sh && chmod +x ./railway_run.sh; echo "[railway] port=$PORT cloud=$CONVEX_CLOUD_ORIGIN site=$CONVEX_SITE_ORIGIN"; echo "[railway] data dir owner=$(stat -c %u:%g /convex/data) writable=$(test -w /convex/data && echo yes || echo NO)"; echo "[railway] DASHBOARD ADMIN KEY: $(./generate_admin_key.sh 2>/dev/null)"; exec ./railway_run.sh'`
- **Healthcheck:** `/version`
- **Volume:** `/convex/data`
- **Healthcheck:** `/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/convex-or-just-updated-firebase-alternat)
