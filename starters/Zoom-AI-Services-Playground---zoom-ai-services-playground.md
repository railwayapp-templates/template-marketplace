# Deploy Zoom AI Services Playground on Railway

A Node.js/Express + React playground for the Zoom AI Services APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zoom-ai-services-playground)

## About

Use this template to deploy and host your service

```
playground/          Vite + React + tRPC client (port 5173)
    ├── /trpc         ──▶  Express + tRPC server (port 4000)
    │                          ├── Zoom AI Services API
    │                          └── AWS S3 (for batch jobs)
    └── /live/scribe  ──▶  WebSocket relay (same server) ──▶ Zoom Scribe live ASR
```

The playground proxies `/trpc` (REST) and `/live/scribe` (WebSocket) to the Express server. All Zoom calls happen server-side; the browser never touches Zoom credentials. For Live mode the browser can't set the `Authorization` header on a WebSocket, so the server relays mic audio up and transcription events down, injecting a fresh JWT.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ai-services-quickstart | [zoom/ai-services-quickstart](https://github.com/zoom/ai-services-quickstart) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ZOOM_API_KEY` | (secret) | # Zoom API credentials |
| `WEBHOOK_SECRET` | (secret) | WEBHOOK_SECRET |
| `ZOOM_API_SECRET` | (secret) | # Zoom API credentials |
| `AWS_ACCESS_KEY_ID` | - | AWS credentials — forwarded to Zoom for batch jobs that read/write S3 |
| `AWS_SESSION_TOKEN` | (secret) | AWS credentials — forwarded to Zoom for batch jobs that read/write S3 |
| `AWS_SECRET_ACCESS_KEY` | (secret) | AWS credentials — forwarded to Zoom for batch jobs that read/write S3 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Shell, JavaScript, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/zoom-ai-services-playground)
