# Deploy Rakazo (Single Container) on Railway

Persistent AI teammates with memory and routines. BYO model key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rakazo-single-container)

## About

Rakazo is an open-source platform for persistent AI teammates: bots with their
own conversations, memory, routines and history, that you talk to from a web
app. Bring your own model key (OpenRouter, Anthropic, or an OpenAI-compatible
endpoint), and optionally give bots a cloud computer through E2B, Daytona or
Box.

A Rakazo deployment is a long-running api, a background worker, a web UI and
Postgres. This template bundles the api, worker and web UI into one container
because the api and worker share bot files on disk, and Railway attaches a
volume to exactly one service. Postgres runs as a separate Railway service with
its own persistent volume. The container is a thin wrapper over upstream's
published image that fixes volume ownership and boots all three processes with
migrations applied first.

On first boot the container migrates the database, then starts the api, worker
and web UI. That takes about a minute. Every secret the app needs (session
signing, at-rest encryption, screen proxy) is generated for you at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Rakazo | `ghcr.io/hmseeb/rakazo-railway/app:v0.1.6-r1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | Rakazo | 5173 | Pinned to the port the public domain targets. Railway injects 8080 otherwise and the healthcheck drifts off the real listener. |
| `DATA_DIR` | Rakazo | /data | - |
| `NODE_ENV` | Rakazo | production | - |
| `BOX_API_KEY` | Rakazo | (secret) | Only when SANDBOX_PROVIDER is box. |
| `E2B_API_KEY` | Rakazo | (secret) | Only when SANDBOX_PROVIDER is e2b. |
| `RAKAZO_HOST` | Rakazo | - | The web server only answers requests for this hostname (vite allowedHosts). It is the public domain and never needs changing. |
| `DATABASE_URL` | Rakazo | - | Wired to the Postgres service in this template. |
| `ENCRYPTION_KEY` | Rakazo | - | Encrypts the provider keys and bot secrets people add inside the app. Generated for you. Changing it makes every stored key permanently unreadable, so leave it alone. |
| `DAYTONA_API_KEY` | Rakazo | (secret) | Only when SANDBOX_PROVIDER is daytona. |
| `SIGNUPS_ENABLED` | Rakazo | true | The first registered user becomes the deployment owner. Set to false after registering to close the instance. |
| `SANDBOX_PROVIDER` | Rakazo | none | Where bot computers run: none, e2b, daytona or box. Docker is not possible on Railway, so the default is none: bots chat and use tools but cannot open a desktop. Pick a provider and fill in its API key below to enable computers. Safe to change later with a redeploy. |
| `BETTER_AUTH_SECRET` | Rakazo | (secret) | Signs everyone's sessions. Generated for you. Changing it signs everybody out; it loses no data. |
| `OPENROUTER_API_KEY` | Rakazo | (secret) | Deployment-wide fallback model key. Optional: a model can also be connected in the UI after signup, where the app verifies the key before storing it. Every model call is billed to the key you provide. |
| `PI_DEFAULT_PROVIDER` | Rakazo | openrouter | - |
| `SCREEN_PROXY_SECRET` | Rakazo | (secret) | Guards the noVNC screen proxy used when bots have computers. Generated for you. Unused while SANDBOX_PROVIDER is none. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/auth/capabilities`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/rakazo-single-container)
