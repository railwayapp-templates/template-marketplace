# Deploy heimdall-template on Railway

Heimdall dashboard on Railway - auth-protected, persistent, one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/heimdall-template)

## About

Deploying this template provisions exactly one Railway service:

- **heimdall** — built from the pinned `lscr.io/linuxserver/heimdall:2.8.3` image plus a small boot wrapper (`railway-entrypoint.sh`) that, before the app's init runs:
  1. seeds a hardened nginx site conf into `/config` (stock conf with basic auth enabled and the `/healthz` probe route added),
  2. writes `/config/nginx/.htpasswd` from the `DASHBOARD_USER` / `DASHBOARD_PASSWORD` variables (only when credentials changed — a restart with unchanged variables never rewrites it),
  3. hands off to the untouched upstream init.

One Railway volume is mounted at `/config` — Heimdall keeps its entire state there (SQLite database `app.sqlite`, app `.env`, nginx configs, icons/avatars/uploads), so your dashboard survives every restart and redeploy.

There is nothing to type at deploy time: the deploy form shows a single variable, `DASHBOARD_PASSWORD`, already set to auto-generate a 24-character random password per deployment. Read it after deploying in your service's **Variables** tab.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| heimdall | [lNamelessl/heimdall-railway-template](https://github.com/lNamelessl/heimdall-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DASHBOARD_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/heimdall-template)
