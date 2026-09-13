# Deploy Cobalt Tools + YT - Complete Setup on Railway

Complete Cobalt web UI with reliable long-form YouTube support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-tools-yt-complete-setup)

## About

![Cobalt Tools Complete Setup](https://raw.githubusercontent.com/Timboslice212/Sora-2-prompt-generator-/1f0e8e35a3a0fd536fd8dddbba339d74a4b367af/docs/images/cobalt-tools-complete-setup-overview.png)

Deploy a complete, browser-ready Cobalt media downloader with a responsive web interface and improved YouTube support. Paste a supported public-media link, select video, audio, or mute, choose the available quality, and download directly from your browser. This setup is designed to handle both ordinary long-form YouTube videos and Shorts—not just API requests.

Cobalt is an open-source media processing service that turns supported public-media links into downloadable video or audio. This Railway template deploys the complete user-facing experience as two coordinated services:

- **web** — the responsive Cobalt interface where users paste links and select download options.
- **api** — the processing service that resolves media, streams downloads, remuxes video and audio when required, and exposes an API for integrations.

Railway generates HTTPS domains automatically and connects the web interface to the API with reference variables. Ports, CORS, health checks, processing limits, and YouTube compatibility settings are preconfigured.

The default deployment requires no database, Redis instance, persistent volume, cookie file, external API key, or manual variable entry.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/spotdemo4/cobalt-web:latest` | Web service |
| api | `ghcr.io/zimpatrick/cobalt:staging` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 8787 | Internal HTTP port used by the Cobalt web interface. Preconfigured for Railway; no user input required. |
| `WEB_HOST` | web | - | Public URL of this web service, generated automatically by Railway. |
| `LOG_LEVEL` | web | info | Application log verbosity. The default info level is recommended for normal operation. |
| `WEB_DEFAULT_API` | web | - | Public Cobalt API endpoint used by the web interface, linked automatically to the api service. |
| `PORT` | api | 9000 | Container HTTP port exposed by Railway. Must match API_PORT; preconfigured to 9000. |
| `API_URL` | api | - | Public API URL generated automatically from this service's Railway domain; required for Cobalt tunnels. |
| `API_PORT` | api | 9000 | Port used by the Cobalt API server. Preconfigured to Cobalt's standard port 9000. |
| `CORS_WILDCARD` | api | 1 | Allows the bundled web interface to call this API across origins. Enabled for the one-click web setup. |
| `RATELIMIT_MAX` | api | 20 | Maximum standard API requests allowed per RATELIMIT_WINDOW. Default: 20. |
| `DURATION_LIMIT` | api | 10800 | Maximum supported media duration in seconds. Default: 10800 seconds (3 hours). |
| `TUNNEL_LIFESPAN` | api | 90 | Seconds that download tunnel information remains in memory. Default: 90 for efficiency and privacy. |
| `RATELIMIT_WINDOW` | api | 60 | Standard API rate-limit window in seconds. Default: 60. |
| `API_LISTEN_ADDRESS` | api | 0.0.0.0 | Network address Cobalt binds to inside the container. 0.0.0.0 is required for Railway networking. |
| `YOUTUBE_USE_ONESIE` | api | 1 | Uses YouTube's Onesie delivery path with dynamic PoTokens to avoid empty tunnels on protected long-form streams. |
| `PROCESSING_PRIORITY` | api | 10 | Unix nice value for ffmpeg jobs; higher numbers mean lower CPU scheduling priority. Default: 10. |
| `TUNNEL_RATELIMIT_MAX` | api | 40 | Maximum tunnel or streaming requests per TUNNEL_RATELIMIT_WINDOW. Default: 40. |
| `SESSION_RATELIMIT_MAX` | api | 10 | Maximum session-creation requests per SESSION_RATELIMIT_WINDOW. Default: 10. |
| `FORCE_LOCAL_PROCESSING` | api | never | Controls client-side versus server-side processing. 'never' keeps Cobalt's normal selectable behavior. |
| `CUSTOM_INNERTUBE_CLIENT` | api | TV_SIMPLY | YouTube InnerTube client validated with dynamic PoToken generation for long-form videos and Shorts. |
| `TUNNEL_RATELIMIT_WINDOW` | api | 60 | Tunnel and streaming rate-limit window in seconds. Default: 60. |
| `SESSION_RATELIMIT_WINDOW` | api | 60 | Session-creation rate-limit window in seconds. Default: 60. |
| `YOUTUBE_GENERATE_PO_TOKENS` | api | (secret) | Generates fresh YouTube proof-of-origin tokens dynamically for each media request, improving long-form video reliability. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-tools-yt-complete-setup)
