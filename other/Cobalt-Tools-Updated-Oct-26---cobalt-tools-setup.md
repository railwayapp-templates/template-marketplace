# Deploy Cobalt Tools [Updated Oct '26] on Railway

Self-host Cobalt: YouTube, TikTok & 20+ platforms. No ads. No tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-tools-setup)

## About

[cobalt](https://github.com/imputnet/cobalt) downloads media from YouTube, TikTok, Twitter/X, Instagram, and over 20 other platforms — no watermarks, no ads, no tracking, no account. This template deploys a complete self-hosted instance, API and web UI both, from the official images, unmodified. Railway's own reference template is already solid — 100 health score, 52 active deployments — so this one doesn't fix a broken deploy. It adds the one thing the reference is missing (a real healthcheck) and documents a startup behavior that's easy to mistake for a hung deploy if you've never seen it before.

Two services, two official images: `ghcr.io/imputnet/cobalt` (the API, AGPL-3.0) and `ghcr.io/spotdemo4/cobalt-web` (the web UI). Neither is forked or patched here — every difference from the reference template is in configuration, not code.

The reference template leaves `healthcheckPath` unset on both services. With no healthcheck, Railway has no way to tell a genuinely broken deploy from a working one before routing traffic to it — the deploy just completes once the container starts, whether or not the app inside it is actually serving requests. That's the real gap, and it's a small one precisely because this template is otherwise already solid: there's no dead variable to find, no wrong port, nothing structurally wrong. Just an absent safety check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/spotdemo4/cobalt-web:latest` | Web service |
| api | `ghcr.io/imputnet/cobalt:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 8787 | Must match the domain's target port. |
| `WEB_HOST` | web | - | This service's own public URL, used for canonical links. |
| `LOG_LEVEL` | web | info | Log verbosity for the static file server. |
| `WEB_DEFAULT_API` | web | - | The api service's public URL. Baked into the frontend at boot — requires both services to be in the same project with matching service names for this reference to resolve. |
| `PORT` | api | 9000 | Must match API_PORT and the domain's target port. |
| `API_URL` | api | - | The API's own public URL — used to build download tunnel links. |
| `API_PORT` | api | 9000 | Port the API listens on. |
| `CORS_WILDCARD` | api | 1 | Allows the web service (a different domain) to call this API from the browser. |
| `RATELIMIT_MAX` | api | 20 | Max requests per rate-limit window, per IP. |
| `DURATION_LIMIT` | api | 10800 | Max video duration in seconds cobalt will process. |
| `TUNNEL_LIFESPAN` | api | 90 | How long a download tunnel stays valid, in seconds. |
| `RATELIMIT_WINDOW` | api | 60 | Rate-limit window in seconds. |
| `API_LISTEN_ADDRESS` | api | 0.0.0.0 | Address the API server binds to. |
| `PROCESSING_PRIORITY` | api | 10 | Process niceness for media processing. |
| `TUNNEL_RATELIMIT_MAX` | api | 40 | Max tunnel requests per window, per IP. |
| `SESSION_RATELIMIT_MAX` | api | 10 | Max session creations per window, per IP. |
| `FORCE_LOCAL_PROCESSING` | api | never | Processing mode. |
| `TUNNEL_RATELIMIT_WINDOW` | api | 60 | Tunnel rate-limit window in seconds. |
| `SESSION_RATELIMIT_WINDOW` | api | 60 | Session rate-limit window in seconds. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-tools-setup)
