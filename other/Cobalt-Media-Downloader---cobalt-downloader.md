# Deploy Cobalt Media Downloader on Railway

Download media from popular platforms with your own private web app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-downloader)

## About

Cobalt is a self-hosted media downloader that lets you save media from supported platforms through a clean web interface. This template deploys both the Cobalt API backend and a modern frontend, giving you a complete browser-based downloader without needing to configure the two services manually.

![Cobalt Tools](.png)

This template deploys two connected services:

* **Cobalt API** — handles media processing and download requests
* **Cobalt Web UI** — provides the browser interface for submitting media links

The frontend is pre-configured to communicate with the Cobalt backend inside the same Railway project, so the stack is ready to use immediately after deployment.

Cobalt can process supported media links from platforms such as YouTube, TikTok, Instagram, Twitter/X, and other compatible services.

The result is a simple self-hosted downloader with your own backend, your own frontend, and control over where the service runs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | `ghcr.io/spotdemo4/cobalt-web:latest` | Web service |
| API | `ghcr.io/imputnet/cobalt:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Web | 8787 | Public service port for the Cobalt Web UI |
| `WEB_HOST` | Web | - | Public URL of the Cobalt Web UI |
| `LOG_LEVEL` | Web | info | Logging verbosity level |
| `WEB_DEFAULT_API` | Web | - | Default Cobalt API endpoint used by the Web UI |
| `PORT` | API | 9000 | Public service port for the Cobalt API |
| `API_URL` | API | - | Public URL of the Cobalt API service |
| `API_PORT` | API | 9000 | Internal port used by the Cobalt API |
| `LOG_LEVEL` | API | info | Optional API logging verbosity level |
| `CORS_WILDCARD` | API | 1 | Allow requests from any origin |
| `RATELIMIT_MAX` | API | 20 | Maximum number of requests allowed within the rate-limit window |
| `DURATION_LIMIT` | API | 10800 | Maximum supported media duration in seconds |
| `TUNNEL_LIFESPAN` | API | 90 | Maximum tunnel lifetime in seconds |
| `RATELIMIT_WINDOW` | API | 60 | Rate-limit window duration in seconds |
| `API_LISTEN_ADDRESS` | API | 0.0.0.0 | Listen on all network interfaces |
| `PROCESSING_PRIORITY` | API | 10 | Processing priority used for media requests |
| `TUNNEL_RATELIMIT_MAX` | API | 40 | Maximum tunnel requests allowed within the tunnel rate-limit window |
| `SESSION_RATELIMIT_MAX` | API | 10 | Maximum requests allowed per session within its rate-limit window |
| `FORCE_LOCAL_PROCESSING` | API | never | Control whether media processing must always run locally |
| `TUNNEL_RATELIMIT_WINDOW` | API | 60 | Tunnel rate-limit window duration in seconds |
| `SESSION_RATELIMIT_WINDOW` | API | 60 | Session rate-limit window duration in seconds |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-downloader)
