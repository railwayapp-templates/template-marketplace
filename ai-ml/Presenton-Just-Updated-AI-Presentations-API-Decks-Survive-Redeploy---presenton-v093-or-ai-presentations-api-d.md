# Deploy Presenton | (Just Updated) AI Presentations + API, Decks Survive Redeploy on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/presenton-v093-or-ai-presentations-api-d)

## About

Presenton is a self-hosted AI presentation generator: describe a deck or upload a document,
pick a template, and get editable slides plus PPTX and PDF export — with an HTTP API so your
own app can generate decks too. It talks to whichever model you already pay for (OpenAI,
Anthropic, Google, Bedrock, OpenRouter, Ollama and ~15 more), so there is no per-seat
subscription and your prompts stay on your own deployment.

This template runs it as a single service with a persistent volume and an admin account that
already belongs to you. Both of those matter more than they sound, and both were measured on
a live Railway deploy before this template was published.

**Everything Presenton keeps lives in one directory, and without a volume it is gone on every
redeploy.** `/app_data` holds the SQLite database (your presentations, slides, templates,
image assets, webhook subscriptions), the uploaded documents, the generated exports, the
custom fonts and the saved provider settings. A Presenton service deployed without a volume
looks completely healthy — it answers every request, the dashboard loads, decks generate —
and then a redeploy, a platform restart or a variable change resets it to an empty install.

This template mounts a volume at `/app_data`. Verified on this exact configuration: a
redeploy came back with the database intact and the same login working.

**Your instance is not open for someone else to claim.** Presenton requires a login, but with
no credentials configured it boots *unclaimed*: `GET /api/v1/auth/status` returns
`{"configured": false}` and the first person to POST to `/api/v1/auth/setup` — from anywhere
on the internet, with no authentication — becomes the administrator, with
`"role": "admin"`. That account can read every deck and open the provider settings page where
your model API keys are stored.

Reproduced on a stock deploy, then reproduced again after a restart:

```
GET  /api/v1/auth/status   -&gt;  {"configured": false}
POST /api/v1/auth/setup    -&gt;  200  {"username": "attacker", "role": "admin"}
[redeploy]
GET  /api/v1/auth/status   -&gt;  {"configured": false}      # the account is gone with the DB
POST /api/v1/auth/login    -&gt;  428                        # the real owner is locked out
POST /api/v1/auth/setup    -&gt;  200  {"username": "attacker2", "role": "admin"}
```

Without a volume the two problems compound: every redeploy hands the instance back to
whoever reaches the URL first.

This template creates your administrator at first boot from `AUTH_PASSWORD`, a generated
secret unique to your deployment and visible in the Railway variables panel. Log in as
`admin` with that value. On the same live check:

```
GET  /api/v1/auth/status   -&gt;  {"configured": true}
POST /api/v1/auth/setup    -&gt;  409  {"detail": "Credentials already configured"}
POST /api/v1/auth/login    -&gt;  200  admin
GET  /api/v1/ppt/...       -&gt;  401  (unauthenticated)
```

**It is served over HTTPS.** Presenton's bundled nginx has `listen 80` compiled into the
image and does not read Railway's injected `PORT`, which is why it is often published behind
a raw TCP proxy — a `http://…proxy.rlwy.net:PORT` address with no certificate, for an app
whose login form and provider API keys travel over it. This template rewrites that listener
to the injected port before the app starts, so the deploy gets an ordinary
`https://…up.railway.app` domain.

**The version is pinned** to `v0.9.3-beta` rather than tracking `latest`, so an unrelated
restart cannot move your deployment onto a build you have not tried — this app migrates its
database on startup, and those migrations only go forward.

**Cost.** One always-on service. The image carries a headless Chromium (used to render PPTX
and PDF exports) and a local embedding model, so give it a plan with room; there is no
separate database, worker or cache to pay for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| presenton | `ghcr.io/presenton/presenton:v0.9.3-beta` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTH_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export AUTH_USERNAME=admin MIGRATE_DATABASE_ON_STARTUP=true DISABLE_ANONYMOUS_TRACKING=true; sed -i "s/listen 80;/listen ${PORT:-8080};/" /etc/nginx/nginx.conf && exec node /app/start.js'`
- **Healthcheck:** `/api/v1/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/presenton-v093-or-ai-presentations-api-d)
