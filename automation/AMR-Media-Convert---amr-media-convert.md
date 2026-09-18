# Deploy AMR Media Convert on Railway

Self-hosted FFmpeg conversion API - URL in, converted file out

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/amr-media-convert)

## About

AMR Media Convert is a tiny, self-hosted FFmpeg conversion API. Send one POST request with a public source URL and a target format, and it returns a hosted URL for the converted file. It runs a FastAPI service wrapping FFmpeg, so there is no external object storage and no per-provider setup to configure.

Deploying this template builds the included Dockerfile from source and runs the containerized FastAPI + FFmpeg service. Railway generates a public domain and injects PUBLIC_BASE_URL plus an auto-generated MEDIA_API_KEY. The service exposes POST /convert (Bearer-authenticated), a /health check, and GET /files/ to download results. Converted files are hosted on the same service and are ephemeral (default TTL 24h). Add a Railway Volume mounted at /data if you want outputs to persist across restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AgentMarginRouter | [AgentMarginRouter/AgentMarginRouter](https://github.com/AgentMarginRouter/AgentMarginRouter) (branch: media-service) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MEDIA_API_KEY` | (secret) | Bearer token clients must send as Authorization: Bearer <key> on every /convert request. Auto-generated on deploy. |
| `PUBLIC_BASE_URL` | - | Public base URL the service uses to build downloadable output_url links. Leave as-is to auto-use the generated Railway domain. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Solidity, JavaScript, Dockerfile, Shell, Procfile

[View on Railway →](https://railway.com/deploy/amr-media-convert)
